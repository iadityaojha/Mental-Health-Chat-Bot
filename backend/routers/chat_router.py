from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.safety.safety_filter import safety_filter
# from services.llm_provider.hf_provider import hf_provider
from services.llm_provider.local_provider import local_provider
from typing import Optional, List

router = APIRouter()

class ChatRequest(BaseModel):
    user_id: str
    message: str
    lang: Optional[str] = "en"

class ChatResponse(BaseModel):
    reply: str
    safety_flag: bool
    safety_actions: List[dict] = []
    source: str

SYSTEM_PROMPT = """
You are a compassionate, supportive, and non-judgmental mental health chatbot for students. 
Your goal is to listen, provide empathy, and suggest healthy coping mechanisms.
You are NOT a doctor or therapist. DO NOT give medical advice or diagnoses.
If a user seems to be in danger, be supportive but firm about seeking professional help.
Keep responses concise (under 3 sentences) and conversational.
"""

@router.post("/", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    # 1. Safety Check
    safety_result = safety_filter.check_safety(request.message)
    
    if not safety_result["is_safe"]:
        return ChatResponse(
            reply="I'm concerned about what you're sharing. Please reach out to a professional or a helpline immediately. You are not alone.",
            safety_flag=True,
            safety_actions=safety_result["actions"],
            source="safety_filter"
        )

    # 2. RAG/FAQ Check (Placeholder for now)
    # faq_answer = faq_search.search(request.message)
    # if faq_answer: ...

    # 3. LLM Generation
    try:
        # llm_reply = hf_provider.generate_response(request.message, system_prompt=SYSTEM_PROMPT)
        llm_reply = local_provider.generate_response(request.message, system_prompt=SYSTEM_PROMPT)
        return ChatResponse(
            reply=llm_reply,
            safety_flag=False,
            source="llm"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
