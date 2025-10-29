from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
import logging
from datetime import datetime
import uuid

from app.services.email_service import EmailService
from app.config import settings

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Lavish Travels & Tours API",
    description="API for handling inquiry form submissions and email notifications",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize email service
email_service = EmailService()


# Pydantic models
class InquiryRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    question: Optional[str] = Field(None, max_length=1000)
    inquiry_type: str = Field(default="General Inquiry", max_length=100)

    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "phone": "+1234567890",
                "question": "I'm interested in a trip to Bali",
                "inquiry_type": "Tour Package"
            }
        }


class InquiryResponse(BaseModel):
    message: str
    success: bool
    inquiry_id: Optional[str] = None


class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None


# Health check endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "lavish-travels-api"
    }


# Main inquiry endpoint
@app.post(
    "/api/inquiry",
    response_model=InquiryResponse,
    responses={
        400: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    },
    tags=["Inquiry"]
)
async def submit_inquiry(inquiry: InquiryRequest):
    """
    Handle inquiry form submissions and send email notifications

    - **name**: Customer's full name (required)
    - **email**: Customer's email address (required)
    - **phone**: Customer's phone number (optional)
    - **question**: Customer's inquiry/question (optional)
    - **inquiry_type**: Type of inquiry (defaults to "General Inquiry")
    """
    try:
        # Generate unique inquiry ID and timestamp
        inquiry_id = str(uuid.uuid4())[:8].upper()
        timestamp = datetime.now().strftime("%B %d, %Y at %I:%M %p UTC")

        logger.info(f"Processing inquiry from {inquiry.email} (ID: {inquiry_id})")

        # Send email to support team
        support_email_sent = await email_service.send_support_email(
            user_name=inquiry.name,
            user_email=inquiry.email,
            user_phone=inquiry.phone or "",
            user_question=inquiry.question or "",
            inquiry_type=inquiry.inquiry_type,
            inquiry_id=inquiry_id,
            timestamp=timestamp
        )

        # Send confirmation email to user
        user_email_sent = await email_service.send_user_confirmation_email(
            user_name=inquiry.name,
            user_email=inquiry.email,
            inquiry_type=inquiry.inquiry_type,
            inquiry_id=inquiry_id,
            timestamp=timestamp
        )

        if support_email_sent and user_email_sent:
            logger.info(f"Emails sent successfully for inquiry {inquiry_id}")
            return InquiryResponse(
                message="Inquiry submitted successfully. You will receive a confirmation email shortly.",
                success=True,
                inquiry_id=inquiry_id
            )
        else:
            logger.error(f"Failed to send emails for inquiry {inquiry_id}")
            raise HTTPException(
                status_code=500,
                detail="Failed to send email. Please try again later."
            )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing inquiry: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Internal server error. Please try again later."
        )


# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to Lavish Travels & Tours API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
