from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """
    Application settings
    SendGrid settings are required from environment variables (.env file)
    All other settings are hardcoded with default values
    """
    # SendGrid Configuration - REQUIRED from .env file
    SENDGRID_API_KEY: str
    SENDGRID_FROM_EMAIL: str
    SUPPORT_EMAIL: str

    # CORS Configuration - Allow all origins
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
