import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize SES client (uses Lambda's region by default, override with SES_REGION if needed)
const ses = new SESClient({
  region: process.env.SES_REGION || process.env.AWS_REGION,
});

const FROM_EMAIL = process.env.FROM_EMAIL;
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || "*";

function loadTemplate(name) {
  return readFileSync(join(__dirname, "templates", name), "utf-8");
}

function htmlEscape(text) {
  if (!text) return "";
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" };
  return String(text).replace(/[&<>"']/g, (c) => map[c]);
}

function replacePlaceholders(template, placeholders) {
  let content = template;
  for (const [key, value] of Object.entries(placeholders)) {
    content = content.replaceAll(key, htmlEscape(value));
  }
  return content;
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };
}

function validatePayload(body) {
  const errors = [];
  if (!body.name || typeof body.name !== "string" || body.name.trim().length === 0) {
    errors.push("name is required");
  } else if (body.name.length > 100) {
    errors.push("name must be 100 characters or less");
  }

  if (!body.email || typeof body.email !== "string") {
    errors.push("email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push("invalid email format");
  }

  if (body.phone && body.phone.length > 20) {
    errors.push("phone must be 20 characters or less");
  }

  if (body.question && body.question.length > 1000) {
    errors.push("question must be 1000 characters or less");
  }

  if (body.inquiry_type && body.inquiry_type.length > 100) {
    errors.push("inquiry_type must be 100 characters or less");
  }

  return errors;
}

function sendEmail({ to, subject, html }) {
  return ses.send(
    new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: { Html: { Data: html, Charset: "UTF-8" } },
      },
    })
  );
}

export async function handler(event) {
  // Handle CORS preflight
  if (event.requestContext?.http?.method === "OPTIONS" || event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders(), body: "" };
  }

  try {
    const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;

    // Validate
    const errors = validatePayload(body);
    if (errors.length > 0) {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({ success: false, error: errors.join(", ") }),
      };
    }

    const inquiryId = randomUUID().slice(0, 8).toUpperCase();
    const timestamp = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    }) + " UTC";

    const inquiryType = body.inquiry_type || "General Inquiry";

    // Load templates
    const supportTemplate = loadTemplate("support_email.html");
    const userTemplate = loadTemplate("user_confirmation_email.html");

    // Build support email
    const supportHtml = replacePlaceholders(supportTemplate, {
      "{{USER_NAME}}": body.name,
      "{{USER_EMAIL}}": body.email,
      "{{USER_PHONE}}": body.phone || "Not provided",
      "{{INQUIRY_TYPE}}": inquiryType,
      "{{USER_QUESTION}}": body.question || "No specific question provided",
      "{{TIMESTAMP}}": timestamp,
      "{{INQUIRY_ID}}": inquiryId,
    });

    // Build user confirmation email
    const userHtml = replacePlaceholders(userTemplate, {
      "{{USER_NAME}}": body.name,
      "{{USER_EMAIL}}": body.email,
      "{{INQUIRY_TYPE}}": inquiryType,
      "{{TIMESTAMP}}": timestamp,
      "{{INQUIRY_ID}}": inquiryId,
    });

    // Send both emails via SES
    await Promise.all([
      sendEmail({
        to: SUPPORT_EMAIL,
        subject: `New Inquiry: ${inquiryType} - ${body.name}`,
        html: supportHtml,
      }),
      sendEmail({
        to: body.email,
        subject: "Thank you for your inquiry - Lavish Travels & Tours",
        html: userHtml,
      }),
    ]);

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({
        success: true,
        message: "Inquiry submitted successfully. You will receive a confirmation email shortly.",
        inquiry_id: inquiryId,
      }),
    };
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({
        success: false,
        error: "Internal server error. Please try again later.",
      }),
    };
  }
}
