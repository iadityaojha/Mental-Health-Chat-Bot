from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List
import uuid

router = APIRouter()

class AppointmentRequest(BaseModel):
    user_id: str
    name: str
    email: EmailStr
    preferred_slots: List[str]
    note: str

class AppointmentResponse(BaseModel):
    request_id: str
    status: str
    message: str

@router.post("/", response_model=AppointmentResponse)
async def request_appointment(request: AppointmentRequest):
    # In a real app, save to DB and send email notification
    request_id = str(uuid.uuid4())
    
    # Mock Notification Logic
    print(f"New Appointment Request: {request.name} ({request.email}) - {request.note}")
    
    return AppointmentResponse(
        request_id=request_id,
        status="pending",
        message="Your appointment request has been sent to the counseling center."
    )
