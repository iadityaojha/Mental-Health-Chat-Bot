from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class User(BaseModel):
    uid: str
    email: str
    display_name: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)

class MoodEntry(BaseModel):
    user_id: str
    mood_score: int = Field(..., ge=1, le=5, description="1 (Very Bad) to 5 (Very Good)")
    tags: List[str] = []
    note: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.now)

class JournalEntry(BaseModel):
    user_id: str
    content: str
    is_private: bool = True
    tags: List[str] = []
    timestamp: datetime = Field(default_factory=datetime.now)

class ChatLog(BaseModel):
    user_id: str
    message: str
    reply: str
    safety_flag: bool
    timestamp: datetime = Field(default_factory=datetime.now)
