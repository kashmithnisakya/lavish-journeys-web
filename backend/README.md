# Lavish Journeys - Backend

FastAPI backend service for handling inquiry forms and email notifications.

## Tech Stack

- FastAPI
- Python 3.11+
- SendGrid (Email service)
- Pydantic (Data validation)
- Uvicorn

## Setup

1. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env and add your SendGrid API key
   ```

4. **Run the server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## API Endpoints

- `GET /health` - Health check
- `POST /api/inquiry` - Submit inquiry form
- `GET /docs` - Swagger UI documentation

## Environment Variables

```env
SENDGRID_API_KEY=your_api_key
FROM_EMAIL=noreply@lavishtravelsandtours.online
SUPPORT_EMAIL=support@lavishtravelsandtours.online
ALLOWED_ORIGINS=*
```

## Docker

```bash
docker-compose up -d
```
