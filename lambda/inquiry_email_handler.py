import json
import os
from datetime import datetime
import uuid
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    """
    AWS Lambda function to handle inquiry form submissions and send emails via SendGrid
    """
    try:
        # Parse the incoming request body
        if 'body' in event:
            body = json.loads(event['body']) if isinstance(event['body'], str) else event['body']
        else:
            body = event

        # Extract form data
        user_email = body.get('email')
        user_name = body.get('name')
        user_phone = body.get('phone', '')
        user_question = body.get('question', '')
        inquiry_type = body.get('inquiry_type', 'General Inquiry')

        # Validate required fields
        if not user_email or not user_name:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS'
                },
                'body': json.dumps({
                    'error': 'Email and name are required fields'
                })
            }

        # Get SendGrid API key from environment variables
        sendgrid_api_key = os.environ.get('SENDGRID_API_KEY')
        if not sendgrid_api_key:
            logger.error("SendGrid API key not found in environment variables")
            return {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS'
                },
                'body': json.dumps({
                    'error': 'Email service configuration error'
                })
            }

        sg = SendGridAPIClient(api_key=sendgrid_api_key)

        # Generate unique inquiry ID and timestamp
        inquiry_id = str(uuid.uuid4())[:8].upper()
        timestamp = datetime.now().strftime("%B %d, %Y at %I:%M %p UTC")

        # Send email to support team
        support_email_sent = send_support_email(sg, user_name, user_email, user_phone, user_question, inquiry_type, inquiry_id, timestamp)

        # Send confirmation email to user
        user_email_sent = send_user_confirmation_email(sg, user_name, user_email, inquiry_type, inquiry_id, timestamp)

        if support_email_sent and user_email_sent:
            logger.info(f"Emails sent successfully for inquiry from {user_email}")
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS'
                },
                'body': json.dumps({
                    'message': 'Inquiry submitted successfully. You will receive a confirmation email shortly.',
                    'success': True
                })
            }
        else:
            return {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS'
                },
                'body': json.dumps({
                    'error': 'Failed to send email. Please try again later.'
                })
            }

    except Exception as e:
        logger.error(f"Error processing inquiry: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps({
                'error': 'Internal server error. Please try again later.'
            })
        }

def send_support_email(sg, user_name, user_email, user_phone, user_question, inquiry_type, inquiry_id, timestamp):
    """
    Send email notification to support team using HTML template
    """
    try:
        # Load and process the support email template
        template_content = load_email_template('support_email.html')

        # Replace placeholders with actual values
        placeholders = {
            '{{USER_NAME}}': user_name,
            '{{USER_EMAIL}}': user_email,
            '{{USER_PHONE}}': user_phone if user_phone else 'Not provided',
            '{{INQUIRY_TYPE}}': inquiry_type,
            '{{USER_QUESTION}}': user_question if user_question else 'No specific question provided',
            '{{TIMESTAMP}}': timestamp,
            '{{INQUIRY_ID}}': inquiry_id
        }

        support_email_content = replace_placeholders(template_content, placeholders)

        message = Mail(
            from_email='noreply@lavishtravelsandtours.online',
            to_emails='support@lavishtravelsandtours.online',
            subject=f'🚨 New Inquiry: {inquiry_type} - {user_name}',
            html_content=support_email_content
        )

        response = sg.send(message)
        logger.info(f"Support email sent successfully. Status code: {response.status_code}")
        return response.status_code == 202

    except Exception as e:
        logger.error(f"Error sending support email: {str(e)}")
        return False

def send_user_confirmation_email(sg, user_name, user_email, inquiry_type, inquiry_id, timestamp):
    """
    Send confirmation email to the user using HTML template
    """
    try:
        # Load and process the user confirmation email template
        template_content = load_email_template('user_confirmation_email.html')

        # Replace placeholders with actual values
        placeholders = {
            '{{USER_NAME}}': user_name,
            '{{USER_EMAIL}}': user_email,
            '{{INQUIRY_TYPE}}': inquiry_type,
            '{{TIMESTAMP}}': timestamp,
            '{{INQUIRY_ID}}': inquiry_id
        }

        user_email_content = replace_placeholders(template_content, placeholders)

        message = Mail(
            from_email='noreply@lavishtravelsandtours.online',
            to_emails=user_email,
            subject=f'✈️ Thank you for your inquiry - Lavish Travels & Tours',
            html_content=user_email_content
        )

        response = sg.send(message)
        logger.info(f"User confirmation email sent successfully. Status code: {response.status_code}")
        return response.status_code == 202

    except Exception as e:
        logger.error(f"Error sending user confirmation email: {str(e)}")
        return False

def load_email_template(template_name):
    """
    Load HTML email template from templates directory
    """
    try:
        # Get the directory where this script is located
        current_dir = os.path.dirname(os.path.abspath(__file__))
        template_path = os.path.join(current_dir, 'templates', template_name)

        with open(template_path, 'r', encoding='utf-8') as file:
            return file.read()
    except Exception as e:
        logger.error(f"Error loading template {template_name}: {str(e)}")
        # Return a basic fallback template
        return """
        <html>
        <body>
        <h1>Email Template Error</h1>
        <p>There was an error loading the email template. Please contact support.</p>
        </body>
        </html>
        """

def replace_placeholders(template_content, placeholders):
    """
    Replace placeholders in template with actual values
    """
    try:
        content = template_content
        for placeholder, value in placeholders.items():
            # Escape HTML special characters in the value for security
            escaped_value = html_escape(str(value))
            content = content.replace(placeholder, escaped_value)
        return content
    except Exception as e:
        logger.error(f"Error replacing placeholders: {str(e)}")
        return template_content

def html_escape(text):
    """
    Escape HTML special characters for security
    """
    if not text:
        return ''

    html_escape_table = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
    }

    return ''.join(html_escape_table.get(c, c) for c in str(text))

# Handle OPTIONS requests for CORS
def handle_options():
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        'body': ''
    }