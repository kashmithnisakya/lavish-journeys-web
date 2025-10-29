from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables
    """
    # SendGrid Configuration
    SENDGRID_API_KEY: str

    # Email Configuration
    FROM_EMAIL: str = "noreply@lavishtravelsandtours.online"
    SUPPORT_EMAIL: str = "support@lavishtravelsandtours.online"

    # CORS Configuration
    ALLOWED_ORIGINS: List[str] = ["*"]

    # Application Configuration
    APP_NAME: str = "Lavish Travels & Tours API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    # Server Configuration
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    class Config:
        env_file = ".env"
        case_sensitive = True


# Create settings instance
settings = Settings()
