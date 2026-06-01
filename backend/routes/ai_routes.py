from fastapi import APIRouter, Depends, HTTPException, File, Form, UploadFile
from fastapi.responses import Response
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from ai_engine.rewriter import ResumeRewriter
from ai_engine.matcher import SemanticMatcher
from ai_engine.ats_scorer import ATSScorer
from services.pdf_generator import ProfessionalResumeGenerator
import io
import PyPDF2

router = APIRouter()

# Initialize AI tools
rewriter = ResumeRewriter()
matcher = SemanticMatcher()
ats_scorer = ATSScorer()
pdf_generator = ProfessionalResumeGenerator()

class RewriteRequest(BaseModel):
    bullets: List[str]
    job_description: Optional[str] = None

class MatchRequest(BaseModel):
    resume_text: str
    job_description: str

@router.post("/rewrite")
def rewrite_bullets(request: RewriteRequest):
    """
    Rewrite bullet points using Gemini.
    """
    try:
        results = rewriter.rewrite_bullet_points(request.bullets, request.job_description)
        return {"rewritten_bullets": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/match")
def match_resume_to_jd(request: MatchRequest):
    """
    Calculate semantic match score using FAISS vector search logic.
    """
    try:
        score = matcher.calculate_resume_match(request.resume_text, request.job_description)
        return {"match_score_percentage": score}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ats-score")
def calculate_ats_score(request: MatchRequest):
    """
    Calculate a comprehensive ATS score analyzing structure, keywords, and impact.
    """
    try:
        results = ats_scorer.analyze_resume(request.resume_text, request.job_description)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-pdf")
def generate_resume_pdf(resume_data: Dict[str, Any]):
    """
    Generate a highly professional, ATS-friendly PDF from structured resume data.
    """
    try:
        pdf_bytes = pdf_generator.generate_pdf(resume_data)
        return Response(
            content=pdf_bytes, 
            media_type="application/pdf", 
            headers={"Content-Disposition": "attachment; filename=Professional_Resume.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload-and-score")
async def upload_and_score_resume(
    file: UploadFile = File(...), 
    job_description: str = Form("General Software Engineer Role")
):
    """
    Accepts a PDF file, extracts the text, and runs the ATS Scorer against a Job Description.
    """
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are currently supported for direct upload.")
        
    try:
        contents = await file.read()
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
        
        resume_text = ""
        for page in pdf_reader.pages:
            extracted = page.extract_text()
            if extracted:
                resume_text += extracted + "\n"
        
        if not resume_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from this PDF. It may be an image-based PDF or have restricted permissions.")
            
            
        results = ats_scorer.analyze_resume(resume_text, job_description)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")
