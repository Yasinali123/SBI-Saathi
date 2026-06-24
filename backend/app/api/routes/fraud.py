from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import google.generativeai as genai
from app.core.config import get_settings
import uuid
import json

router = APIRouter(prefix="/api/fraud-check", tags=["Fraud Detection"])
settings = get_settings()

class FraudAnalysisRequest(BaseModel):
    content: str
    content_type: str = "text"

@router.post("")
async def analyze_content(request: FraudAnalysisRequest):
    if not settings.gemini_api_key:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured")
        
    model = genai.GenerativeModel("gemini-2.5-flash")
    
    prompt = f"""
    Analyze the following content for potential fraud or scams.
    Content type: {request.content_type}
    Content: "{request.content}"
    
    Respond strictly with valid JSON with the following structure:
    {{
        "risk_score": <int 0-100>,
        "risk_level": "<safe|low|medium|high|critical>",
        "threat_type": "<string describing threat>",
        "explanation": "<string explaining why>",
        "recommended_action": "<string what user should do>",
        "red_flags": ["<string flag 1>", "<string flag 2>"]
    }}
    """
    
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        if text.endswith("```"):
            text = text[:-3]
        
        analysis = json.loads(text.strip())
    except Exception as e:
        # Fallback if json parsing fails
        analysis = {
            "risk_score": 50,
            "risk_level": "medium",
            "threat_type": "Unknown",
            "explanation": "Could not parse AI response. " + str(e),
            "recommended_action": "Proceed with caution.",
            "red_flags": []
        }
        
    return {
        "risk_score": analysis.get("risk_score", 50),
        "risk_level": analysis.get("risk_level", "medium"),
        "threat_type": analysis.get("threat_type", ""),
        "explanation": analysis.get("explanation", ""),
        "recommended_action": analysis.get("recommended_action", ""),
        "red_flags": analysis.get("red_flags", []),
        "report_id": str(uuid.uuid4()),
    }
