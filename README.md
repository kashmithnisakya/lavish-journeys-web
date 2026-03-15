# Lavish Journeys Web

A web application for Lavish Travels & Tours - a travel and tour booking platform.

## Project Structure

```
lavish-journeys-web/
├── frontend/              # React frontend application
├── lambda/                # AWS Lambda inquiry API
├── buildspec-frontend.yml # CodeBuild spec for frontend
└── buildspec-lambda.yml   # CodeBuild spec for Lambda
```

## Tech Stack

### Frontend

- React + TypeScript
- Vite
- Tailwind CSS + Shadcn UI
- React Router
- i18next (English, Russian, Hindi)

### Backend (Lambda)

- AWS Lambda (Node.js 20)
- AWS SES (Email service)
- API Gateway (HTTP API)
- AWS SAM (Infrastructure as Code)

## Quick Start

### Frontend

```bash
cd frontend
npm install
cp .env.example .env    # Set your API Gateway URL
npm run dev
```

### Lambda (Local)

```bash
cd lambda
sam build
sam local start-api
```

### Deploy Lambda

```bash
cd lambda
sam build
sam deploy --guided
```

## Environment Variables

### Frontend (`frontend/.env`)

| Variable       | Description                      |
| -------------- | -------------------------------- |
| `VITE_API_URL` | Lambda API Gateway endpoint URL  |

### Lambda (AWS Console / CodeBuild)

| Variable          | Description                                    |
| ----------------- | ---------------------------------------------- |
| `FROM_EMAIL`      | Verified SES sender email                      |
| `SUPPORT_EMAIL`   | Email to receive inquiry notifications         |
| `ALLOWED_ORIGINS` | CORS allowed origin                            |
| `SES_REGION`      | (Optional) SES region if different from Lambda |
