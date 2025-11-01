# Lavish Journeys Web

A full-stack web application for Lavish Travels & Tours - a travel and tour booking platform.

## Project Structure

```
lavish-journeys-web/
├── frontend/          # React frontend application
├── backend/           # FastAPI backend service
├── buildspec-frontend.yml
└── buildspec-backend.yml
```

## Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS + Shadcn UI
- React Router

### Backend
- FastAPI (Python)
- SendGrid (Email service)
- Pydantic (Data validation)

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Documentation

See the README files in each directory for detailed setup instructions:
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
