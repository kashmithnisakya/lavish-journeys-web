import os
import logging
from pathlib import Path
from typing import Optional

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

from app.config import settings

logger = logging.getLogger(__name__)


class EmailService:
    """Service for sending emails via SendGrid"""

    def __init__(self):
        """Initialize the email service with SendGrid API key"""
        self.sg = SendGridAPIClient(api_key=settings.SENDGRID_API_KEY)
        self.from_email = settings.FROM_EMAIL
        self.support_email = settings.SUPPORT_EMAIL

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

            message = Mail(
                from_email=self.from_email,
                to_emails=self.support_email,
                subject=f'🚨 New Inquiry: {inquiry_type} - {user_name}',
                html_content=support_email_content
            )

            response = self.sg.send(message)
            logger.info(f"Support email sent successfully. Status code: {response.status_code}")
            return response.status_code == 202

        except Exception as e:
            logger.error(f"Error sending support email: {str(e)}", exc_info=True)
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

            message = Mail(
                from_email=self.from_email,
                to_emails=user_email,
                subject=f'✈️ Thank you for your inquiry - Lavish Travels & Tours',
                html_content=user_email_content
            )

            response = self.sg.send(message)
            logger.info(f"User confirmation email sent successfully. Status code: {response.status_code}")
            return response.status_code == 202

        except Exception as e:
            logger.error(f"Error sending user confirmation email: {str(e)}", exc_info=True)
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
