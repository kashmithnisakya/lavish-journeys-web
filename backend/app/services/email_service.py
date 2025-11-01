import logging
from pathlib import Path
import asyncio
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, From, To, Subject, HtmlContent

from app.config import settings

logger = logging.getLogger(__name__)


class EmailService:
    """Service for sending emails via SendGrid"""

    def __init__(self):
        """Initialize the email service with SendGrid API key"""
        self.api_key = settings.SENDGRID_API_KEY
        self.sendgrid_client = SendGridAPIClient(self.api_key)
        # Debug: Log first 20 chars of API key to verify which one is loaded
        logger.info(f"EmailService initialized with API key: {self.api_key[:20]}...")
        logger.info(f"Using from email: {settings.SENDGRID_FROM_EMAIL}")

    def _send_email_sync(self, to_email: str, subject: str, html_content: str) -> bool:
        """
        Send email using SendGrid SDK (synchronous)

        Args:
            to_email: Recipient email address
            subject: Email subject
            html_content: HTML content of the email

        Returns:
            bool: True if email sent successfully, False otherwise
        """
        try:
            # Create Mail object using SendGrid SDK
            message = Mail(
                from_email=From(settings.SENDGRID_FROM_EMAIL),
                to_emails=To(to_email),
                subject=Subject(subject),
                html_content=HtmlContent(html_content)
            )

            # Send the email using SendGrid client
            response = self.sendgrid_client.send(message)

            # SendGrid returns 202 for successful queuing
            if response.status_code == 202:
                logger.info(f"Email sent successfully via SendGrid SDK to {to_email}")
                return True
            else:
                logger.error(f"Failed to send email via SendGrid SDK. Status: {response.status_code}, Body: {response.body}")
                return False

        except Exception as e:
            logger.error(f"Error sending email via SendGrid SDK: {str(e)}", exc_info=True)
            return False

    async def _send_email(self, to_email: str, subject: str, html_content: str) -> bool:
        """
        Send email using SendGrid SDK (async wrapper)

        Args:
            to_email: Recipient email address
            subject: Email subject
            html_content: HTML content of the email

        Returns:
            bool: True if email sent successfully, False otherwise
        """
        # Run the synchronous SendGrid SDK call in a thread pool
        return await asyncio.to_thread(self._send_email_sync, to_email, subject, html_content)

    async def send_support_email(
        self,
        user_name: str,
        user_email: str,
        user_phone: str,
        user_question: str,
        inquiry_type: str,
        inquiry_id: str,
        timestamp: str
    ) -> bool:
        """
        Send email notification to support team using HTML template

        Args:
            user_name: Customer's name
            user_email: Customer's email
            user_phone: Customer's phone number
            user_question: Customer's inquiry/question
            inquiry_type: Type of inquiry
            inquiry_id: Unique inquiry ID
            timestamp: Timestamp of the inquiry

        Returns:
            bool: True if email sent successfully, False otherwise
        """
        try:
            # Load and process the support email template
            template_content = self._load_email_template('support_email.html')

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

            support_email_content = self._replace_placeholders(template_content, placeholders)

            # Send email using SendGrid SDK
            logger.info(f"Sending support email to {settings.SUPPORT_EMAIL}")
            success = await self._send_email(
                to_email=settings.SUPPORT_EMAIL,
                subject=f'New Inquiry: {inquiry_type} - {user_name}',
                html_content=support_email_content
            )

            if success:
                logger.info(f"Support email sent successfully")
            return success

        except Exception as e:
            # Log detailed error information for debugging
            logger.error(f"Error sending support email: {str(e)}", exc_info=True)
            if hasattr(e, 'body'):
                logger.error(f"SendGrid error body: {e.body}")
            if hasattr(e, 'to_dict'):
                logger.error(f"SendGrid error details: {e.to_dict}")
            return False

    async def send_user_confirmation_email(
        self,
        user_name: str,
        user_email: str,
        inquiry_type: str,
        inquiry_id: str,
        timestamp: str
    ) -> bool:
        """
        Send confirmation email to the user using HTML template

        Args:
            user_name: Customer's name
            user_email: Customer's email
            inquiry_type: Type of inquiry
            inquiry_id: Unique inquiry ID
            timestamp: Timestamp of the inquiry

        Returns:
            bool: True if email sent successfully, False otherwise
        """
        try:
            # Load and process the user confirmation email template
            template_content = self._load_email_template('user_confirmation_email.html')

            # Replace placeholders with actual values
            placeholders = {
                '{{USER_NAME}}': user_name,
                '{{USER_EMAIL}}': user_email,
                '{{INQUIRY_TYPE}}': inquiry_type,
                '{{TIMESTAMP}}': timestamp,
                '{{INQUIRY_ID}}': inquiry_id
            }

            user_email_content = self._replace_placeholders(template_content, placeholders)

            # Send email using SendGrid SDK
            logger.info(f"Sending user confirmation email to {user_email}")
            success = await self._send_email(
                to_email=user_email,
                subject='Thank you for your inquiry - Lavish Travels & Tours',
                html_content=user_email_content
            )

            if success:
                logger.info(f"User confirmation email sent successfully")
            return success

        except Exception as e:
            # Log detailed error information for debugging
            logger.error(f"Error sending user confirmation email: {str(e)}", exc_info=True)
            if hasattr(e, 'body'):
                logger.error(f"SendGrid error body: {e.body}")
            if hasattr(e, 'to_dict'):
                logger.error(f"SendGrid error details: {e.to_dict}")
            return False

    def _load_email_template(self, template_name: str) -> str:
        """
        Load HTML email template from templates directory

        Args:
            template_name: Name of the template file

        Returns:
            str: Template content

        Raises:
            FileNotFoundError: If template file doesn't exist
        """
        try:
            # Get the templates directory path
            current_dir = Path(__file__).parent.parent
            template_path = current_dir / 'templates' / template_name

            with open(template_path, 'r', encoding='utf-8') as file:
                return file.read()

        except FileNotFoundError:
            logger.error(f"Template {template_name} not found at {template_path}")
            # Return a basic fallback template
            return """
            <html>
            <body>
            <h1>Email Template Error</h1>
            <p>There was an error loading the email template. Please contact support.</p>
            </body>
            </html>
            """
        except Exception as e:
            logger.error(f"Error loading template {template_name}: {str(e)}")
            raise

    def _replace_placeholders(self, template_content: str, placeholders: dict) -> str:
        """
        Replace placeholders in template with actual values

        Args:
            template_content: The template content
            placeholders: Dictionary of placeholder keys and values

        Returns:
            str: Template with replaced placeholders
        """
        try:
            content = template_content
            for placeholder, value in placeholders.items():
                # Escape HTML special characters in the value for security
                escaped_value = self._html_escape(str(value))
                content = content.replace(placeholder, escaped_value)
            return content

        except Exception as e:
            logger.error(f"Error replacing placeholders: {str(e)}")
            return template_content

    @staticmethod
    def _html_escape(text: str) -> str:
        """
        Escape HTML special characters for security

        Args:
            text: Text to escape

        Returns:
            str: Escaped text
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
