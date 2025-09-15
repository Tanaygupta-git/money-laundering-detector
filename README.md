# AI Money Laundering Detector

A production-ready, full-stack platform to detect suspicious money laundering activity in uploaded documents or structured data, using AI/ML.

## Features

- Modern, responsive React frontend
- File upload (PDF, images, CSV, Excel)
- OCR for images/PDFs
- AI/ML-powered predictions (mock or real model)
- Contact form (with CAPTCHA)
- Admin dashboard (view past analyses, logs)
- Security (input sanitization, file type/size checks, admin auth)
- Dockerized for easy deployment

## Quick Start

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 1. Clone and setup

```bash
git clone https://github.com/youruser/money-laundering-detector.git
cd money-laundering-detector
```

### 2. Configure Environment

Set environment variables in `docker-compose.yml` (see `MAIL_USERNAME`, `MAIL_PASSWORD`, etc).

### 3. Run with Docker Compose

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api

### 4. Test the system

- Use files in `sample_files/` to test detection.
- Access `/admin` for the dashboard (default: admin/adminpass).

## Deployment

Deploy anywhere Docker is supported (Heroku, AWS, Render, Railway, etc).

## File Structure

See repo tree above.

## Security Notes

- All file uploads are sanitized and checked for type/size.
- Admin endpoints are protected.
- CAPTCHA on contact form.
- Logs are accessible only to admins.

## Extending

- To use a real ML model, replace `backend/models/mock_model.py` with your own model loading/inference code.

## Sample files

See `sample_files/` for test CSV, PDF, and image files.

## License

MIT