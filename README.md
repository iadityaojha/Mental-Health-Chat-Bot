# Mental Health Chatbot (Student Project)

A privacy-first, AI-powered mental health chatbot designed for students. It provides a safe space for conversation, mood tracking, and quick access to emergency resources.

## Features
- **AI Chat Companion**: Empathetic responses using Hugging Face Inference.
- **Safety First**: Real-time safety filters detect high-risk language and trigger emergency protocols.
- **Geo-Aware Helplines**: Finds nearby government and NGO resources based on location.
- **Mood Tracking**: Log daily moods and view trends.
- **Privacy Focused**: Minimal data logging; anonymous reporting.

## Tech Stack
- **Backend**: FastAPI, Python 3.9+
- **Frontend**: React, Vite, TailwindCSS
- **Database**: Firebase Firestore (or Mock mode)
- **LLM**: Hugging Face API

## Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- Firebase Project (Optional for local dev, required for prod)

### Backend Setup
1. Navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Create virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Configure Environment:
   Create a `.env` file in `backend/` with:
   ```
   HF_API_TOKEN=your_hugging_face_token
   GOOGLE_APPLICATION_CREDENTIALS=path/to/firebase_credentials.json (Optional)
   ```
4. Run the server:
   ```bash
   uvicorn app:app --reload
   ```
   API will be at `http://localhost:8000`.

### Frontend Setup
1. Navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   App will be at `http://localhost:5173`.

## Testing
Run backend tests:
```bash
cd backend
pytest
```

## Deployment
- **Frontend**: Deploy to Vercel or Firebase Hosting.
- **Backend**: Deploy to Vercel Serverless or Render.

## Disclaimer
**This is not a medical device.** If you are in immediate danger, please call your local emergency number.