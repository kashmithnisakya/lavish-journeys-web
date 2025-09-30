# Lavish Travels Email Handler Lambda Function

This AWS Lambda function handles inquiry form submissions from the frontend and sends emails using SendGrid.

## Features

- Receives inquiry form data from frontend
- Sends notification email to support team (`support@lavishtravelsandtours.online`)
- Sends confirmation email to the user
- Handles CORS for frontend integration
- Comprehensive error handling and logging

## Project Structure

```
lambda/
├── inquiry_email_handler.py     # Main Lambda function
├── requirements.txt             # Python dependencies
├── templates/                   # Email HTML templates
│   ├── support_email.html      # Support team notification template
│   └── user_confirmation_email.html  # User confirmation template
└── README.md                   # This documentation
```

## Setup Instructions

### 1. SendGrid Configuration

1. Create a SendGrid account at https://sendgrid.com/
2. Generate an API key with "Mail Send" permissions
3. Verify your domain (`lavishtravelsandtours.online`) in SendGrid
4. Set up sender authentication for `noreply@lavishtravelsandtours.online`

### 2. AWS Lambda Deployment

1. Create a new Lambda function in AWS Console
2. Choose Python 3.9 or later as runtime
3. Upload the function code with templates:
   ```bash
   # Create deployment package
   pip install -r requirements.txt -t .

   # Include the templates directory
   cp -r templates/ .

   # Create deployment zip
   zip -r lambda-deployment.zip . -x "*.pyc" "__pycache__/*" "*.git*"
   ```
4. Upload the zip file to Lambda
5. Set the handler to: `inquiry_email_handler.lambda_handler`

### 3. Environment Variables

Configure these environment variables in Lambda:

```
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

### 4. Lambda Configuration

- **Memory**: 256 MB (recommended)
- **Timeout**: 30 seconds
- **Runtime**: Python 3.9+

### 5. API Gateway Setup

1. Create a new API Gateway (REST API)
2. Create a new resource (e.g., `/inquiry`)
3. Create POST method
4. Set integration type to Lambda Function
5. Enable CORS:
   - Access-Control-Allow-Origin: `*` (or your domain)
   - Access-Control-Allow-Headers: `Content-Type`
   - Access-Control-Allow-Methods: `POST, OPTIONS`

### 6. Frontend Integration

The frontend should send POST requests to your API Gateway endpoint with this JSON structure:

```javascript
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",  // optional
  "question": "I'm interested in a trip to Bali",  // optional
  "inquiry_type": "Tour Package"  // optional, defaults to "General Inquiry"
}
```

### Example Frontend Code

```javascript
const handleInquirySubmit = async (formData) => {
  try {
    const response = await fetch('YOUR_API_GATEWAY_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        question: formData.question,
        inquiry_type: formData.inquiryType || 'General Inquiry'
      })
    });

    const result = await response.json();

    if (response.ok) {
      alert('Thank you for your inquiry! We will get back to you soon.');
    } else {
      alert('There was an error submitting your inquiry. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('There was an error submitting your inquiry. Please try again.');
  }
};
```

## Email Templates

The Lambda function uses modern, responsive HTML email templates with placeholder replacement.

### Support Team Email (`templates/support_email.html`)
- **To**: support@lavishtravelsandtours.online
- **Subject**: 🚨 New Inquiry: [Inquiry Type] - [Customer Name]
- **Features**:
  - Modern gradient design with professional styling
  - Customer information prominently displayed
  - Action items and next steps clearly outlined
  - Direct email reply button
  - Inquiry tracking ID and timestamp

### User Confirmation Email (`templates/user_confirmation_email.html`)
- **To**: User's email address
- **Subject**: ✈️ Thank you for your inquiry - Lavish Travels & Tours
- **Features**:
  - Brand-consistent design with travel theme
  - Personalized greeting and inquiry summary
  - Clear next steps and timeline
  - Multiple contact options
  - Social media links
  - Mobile-responsive design

### Template Placeholders
Both templates use the following placeholders that are automatically replaced:

- `{{USER_NAME}}` - Customer's name
- `{{USER_EMAIL}}` - Customer's email address
- `{{USER_PHONE}}` - Customer's phone number (optional)
- `{{INQUIRY_TYPE}}` - Type of inquiry (e.g., "Tour Package")
- `{{USER_QUESTION}}` - Customer's question/message
- `{{TIMESTAMP}}` - When the inquiry was submitted
- `{{INQUIRY_ID}}` - Unique inquiry reference ID

### Customizing Templates
To customize the email templates:

1. Edit the HTML files in the `templates/` directory
2. Maintain the placeholder format `{{PLACEHOLDER_NAME}}`
3. Test the templates thoroughly before deployment
4. Ensure mobile responsiveness and cross-client compatibility

## Error Handling

The function includes comprehensive error handling:
- Validates required fields (name, email)
- Handles SendGrid API errors
- Returns appropriate HTTP status codes
- Logs all errors for debugging

## Testing

You can test the function using AWS Lambda test events:

```json
{
  "body": "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"phone\":\"+1234567890\",\"question\":\"Test inquiry\",\"inquiry_type\":\"General Inquiry\"}"
}
```

## Monitoring

- Check CloudWatch logs for function execution details
- Monitor SendGrid dashboard for email delivery status
- Set up CloudWatch alarms for error rates

## Security Considerations

- API key is stored securely in environment variables
- CORS is configured for your domain
- No sensitive data is logged
- Input validation prevents injection attacks