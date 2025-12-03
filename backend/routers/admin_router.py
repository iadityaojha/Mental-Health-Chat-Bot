from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List

router = APIRouter()

@router.post("/helpline-upload")
async def upload_helplines(file: UploadFile = File(...)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="File must be a CSV")
    
    # Mock processing
    content = await file.read()
    # In real app: parse CSV, validate, update DB
    print(f"Received CSV with {len(content)} bytes")
    
    return {"message": "Helpline dataset updated successfully", "rows_processed": 10} # Mock
