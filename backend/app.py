from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat_router, helplines_router, appointments_router, admin_router, features_router
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Mental Health Chatbot API",
    description="Backend for Student Mental Health Chatbot",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost:5173", # Vite default
    "http://localhost:3000",
    "*" # Allow all for dev/demo
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(chat_router.router, prefix="/api/chat", tags=["Chat"])
app.include_router(helplines_router.router, prefix="/api/helplines", tags=["Helplines"])
app.include_router(appointments_router.router, prefix="/api/appointments", tags=["Appointments"])
app.include_router(admin_router.router, prefix="/api/admin", tags=["Admin"])
app.include_router(features_router.router, prefix="/api", tags=["Features"])

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
