from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter()

# In-memory storage (mocking database for simplicity as per user snippet)
moods_db = []
settings_db = {"theme": "light"}

# Data Models
class MoodEntry(BaseModel):
    mood: str
    note: Optional[str] = ""
    ts: Optional[float] = None

class Settings(BaseModel):
    theme: str

# Static Data
EXERCISES = [
    {"id": "breath-1", "title": "4-4-4 Breathing", "duration": 60, "steps": ["Inhale 4s", "Hold 4s", "Exhale 4s"]},
    {"id": "box-2", "title": "Box Breathing", "duration": 90, "steps": ["Inhale 4s", "Hold 4s", "Exhale 4s", "Hold 4s"]}
]

RESOURCES = [
    {"id": "r1", "title": "Campus Counselor", "desc": "Schedule appointment with campus counseling."},
    {"id": "r2", "title": "Meditation Session", "desc": "3 minute guided meditation."}
]

SOS_NUMBERS = [
    {"country": "IN", "number": "112", "desc": "Emergency number"},
    {"country": "US", "number": "988", "desc": "Suicide & Crisis Lifeline"}
]

# Endpoints

@router.get("/exercises")
async def get_exercises():
    return {"exercises": EXERCISES}

@router.get("/resources")
async def get_resources():
    return {"resources": RESOURCES}

@router.get("/sos")
async def get_sos():
    return {"list": SOS_NUMBERS}

@router.get("/moods")
async def get_moods():
    return {"moods": moods_db}

@router.post("/moods")
async def add_mood(entry: MoodEntry):
    entry.ts = datetime.now().timestamp() * 1000
    moods_db.append(entry)
    return {"ok": True, "mood": entry}

@router.get("/settings")
async def get_settings():
    return settings_db

@router.post("/settings")
async def update_settings(settings: Settings):
    settings_db["theme"] = settings.theme
    return {"ok": True, "settings": settings_db}

@router.post("/location")
async def save_location(data: dict):
    # Just echo back for now
    return {"ok": True, "lat": data.get("lat"), "lng": data.get("lng")}
