# Lavish Travels & Tours - FastAPI Backend

A modern, production-ready FastAPI backend for handling inquiry form submissions and email notifications via SendGrid.

## Features

- **RESTful API** built with FastAPI
- **Email notifications** via SendGrid
- **CORS support** for frontend integration
- **Data validation** using Pydantic
- **Async/await** for better performance
- **Docker support** for containerized deployment
- **Health check endpoint** for monitoring
- **Auto-generated API documentation** (Swagger UI & ReDoc)
- **Type hints** throughout the codebase
- **Comprehensive error handling** and logging

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI application
│   ├── config.py                  # Configuration settings
│   ├── services/
│   │   ├── __init__.py
│   │   └── email_service.py       # Email service logic
│   └── templates/                 # Email HTML templates
│       ├── support_email.html
│       └── user_confirmation_email.html
├── requirements.txt               # Python dependencies
├── Dockerfile                     # Docker configuration
├── docker-compose.yml             # Docker Compose configuration
├── .env.example                   # Example environment variables
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

## Prerequisites

- Python 3.11 or higher
- SendGrid account with API key
- Docker and Docker Compose (optional, for containerized deployment)

## Quick Start

### Option 1: Local Development (without Docker)

1. **Clone the repository and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and add your SendGrid API key and other settings
   ```

5. **Run the application:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

6. **Access the API:**
   - API: http://localhost:8000
   - Swagger UI (Interactive API docs): http://localhost:8000/docs
   - ReDoc (Alternative API docs): http://localhost:8000/redoc
   - Health check: http://localhost:8000/health

### Option 2: Docker Deployment

1. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and add your SendGrid API key and other settings
   ```

2. **Build and run with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

3. **View logs:**
   ```bash
   docker-compose logs -f
   ```

4. **Stop the application:**
   ```bash
   docker-compose down
   ```

5. **Access the API:**
   - API: http://localhost:8000
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key_here

# Email Configuration
FROM_EMAIL=noreply@lavishtravelsandtours.online
SUPPORT_EMAIL=support@lavishtravelsandtours.online

# CORS Configuration
ALLOWED_ORIGINS=*  # Use specific origins in production

# Application Configuration
APP_NAME=Lavish Travels & Tours API
APP_VERSION=1.0.0
DEBUG=false

# Server Configuration
HOST=0.0.0.0
PORT=8000
```

### Important Notes:
- **SENDGRID_API_KEY**: Required. Get this from your SendGrid account.
- **ALLOWED_ORIGINS**: In production, set this to your frontend domain(s) (comma-separated).
- **DEBUG**: Set to `true` only in development for verbose logging.

## API Endpoints

### Health Check
```http
GET /health
```
Returns the health status of the API.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-29T12:00:00",
  "service": "lavish-travels-api"
}
```

### Submit Inquiry
```http
POST /api/inquiry
```
Submit a new inquiry form and send email notifications.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "question": "I'm interested in a trip to Bali",
  "inquiry_type": "Tour Package"
}
```

**Required Fields:**
- `name`: Customer's full name
- `email`: Valid email address

**Optional Fields:**
- `phone`: Contact phone number
- `question`: Customer's inquiry/question
- `inquiry_type`: Type of inquiry (defaults to "General Inquiry")

**Success Response (200):**
```json
{
  "message": "Inquiry submitted successfully. You will receive a confirmation email shortly.",
  "success": true,
  "inquiry_id": "A1B2C3D4"
}
```

**Error Response (400/500):**
```json
{
  "error": "Error message",
  "detail": "Detailed error information"
}
```

## Frontend Integration

### JavaScript/React Example

```javascript
const submitInquiry = async (formData) => {
  try {
    const response = await fetch('http://localhost:8000/api/inquiry', {
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
      console.log('Success:', result);
      alert('Thank you! Your inquiry has been submitted.');
    } else {
      console.error('Error:', result);
      alert('There was an error. Please try again.');
    }
  } catch (error) {
    console.error('Network error:', error);
    alert('Network error. Please check your connection.');
  }
};
```

### Fetch API Example

```javascript
fetch('http://localhost:8000/api/inquiry', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    question: 'Interested in Bali tour',
    inquiry_type: 'Tour Package'
  })
})
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
```

## SendGrid Setup

1. **Create a SendGrid account** at https://sendgrid.com/

2. **Generate an API key:**
   - Go to Settings → API Keys
   - Create a new API key with "Mail Send" permissions
   - Copy the API key (you won't be able to see it again)

3. **Verify your domain:**
   - Go to Settings → Sender Authentication
   - Verify `lavishtravelsandtours.online`
   - Set up DNS records as instructed

4. **Set up sender email:**
   - Ensure `noreply@lavishtravelsandtours.online` is authorized
   - Verify `support@lavishtravelsandtours.online` can receive emails

## Email Templates

The API uses HTML email templates with placeholder replacement:

### Support Team Email
- **To:** support@lavishtravelsandtours.online
- **Subject:** 🚨 New Inquiry: [Type] - [Name]
- **Template:** `app/templates/support_email.html`

### User Confirmation Email
- **To:** Customer's email
- **Subject:** ✈️ Thank you for your inquiry - Lavish Travels & Tours
- **Template:** `app/templates/user_confirmation_email.html`

### Template Placeholders
- `{{USER_NAME}}` - Customer's name
- `{{USER_EMAIL}}` - Customer's email
- `{{USER_PHONE}}` - Customer's phone
- `{{INQUIRY_TYPE}}` - Type of inquiry
- `{{USER_QUESTION}}` - Customer's question
- `{{TIMESTAMP}}` - Submission timestamp
- `{{INQUIRY_ID}}` - Unique inquiry ID

## Deployment

### AWS ECS/Fargate

1. **Build and push Docker image to ECR:**
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
   docker build -t lavish-travels-api .
   docker tag lavish-travels-api:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/lavish-travels-api:latest
   docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/lavish-travels-api:latest
   ```

2. **Create ECS task definition with environment variables**

3. **Create ECS service with Application Load Balancer**

4. **Configure health check to use `/health` endpoint**

### AWS App Runner

1. **Push Docker image to ECR** (same as above)

2. **Create App Runner service:**
   - Select ECR image
   - Set port to 8000
   - Add environment variables
   - Configure health check to `/health`

### Railway/Render/Heroku

1. **Connect your Git repository**

2. **Set environment variables in platform dashboard**

3. **Deploy using the Dockerfile**

## Development

### Running Tests
```bash
# Install dev dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

### Code Formatting
```bash
# Install formatting tools
pip install black isort

# Format code
black app/
isort app/
```

### Type Checking
```bash
# Install mypy
pip install mypy

# Run type checking
mypy app/
```

## Monitoring and Logging

The application includes comprehensive logging:

- All requests are logged with timestamp
- Errors are logged with stack traces
- Email sending status is logged
- Use `/health` endpoint for health checks

### CloudWatch Logs (AWS)
If deployed on AWS, logs are automatically sent to CloudWatch.

### Docker Logs
```bash
docker-compose logs -f
```

## Security Considerations

- Environment variables are used for sensitive data
- CORS is configurable for production
- HTML escaping prevents XSS attacks
- Input validation using Pydantic
- Non-root user in Docker container
- No sensitive data in logs

## Troubleshooting

### SendGrid Emails Not Sending
- Verify API key is correct
- Check SendGrid account status
- Verify domain authentication
- Check SendGrid activity logs

### CORS Errors
- Update `ALLOWED_ORIGINS` in `.env`
- Ensure frontend origin is included
- Check browser console for specific error

### Port Already in Use
- Change `PORT` in `.env`
- Or kill process using port 8000:
  ```bash
  lsof -ti:8000 | xargs kill -9
  ```

## Migration from Lambda

This FastAPI backend replaces the AWS Lambda function with these improvements:

- **Better developer experience** with auto-generated docs
- **Easier local development** without AWS SAM/LocalStack
- **More deployment options** (Docker, Kubernetes, serverless, VMs)
- **Better performance** with persistent connections
- **Enhanced monitoring** and logging capabilities
- **Type safety** with Pydantic models

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checking
5. Submit a pull request

## License

Copyright © 2025 Lavish Travels & Tours. All rights reserved.

## Support

For issues or questions:
- Email: support@lavishtravelsandtours.online
- Check logs for detailed error messages
- Review API documentation at `/docs`
