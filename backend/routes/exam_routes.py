from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import User, ExamHistory
from schemas import ExamHistoryCreate, ExamHistoryResponse
from deps import get_current_user
from typing import List

router = APIRouter(prefix="/api/exams", tags=["exams"])

@router.post("/submit", response_model=ExamHistoryResponse)
def submit_exam(exam_data: ExamHistoryCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    new_exam = ExamHistory(
        user_id=current_user.id,
        score=exam_data.score,
        total_questions=exam_data.total_questions,
        skills_tested=exam_data.skills_tested
    )
    db.add(new_exam)
    db.commit()
    db.refresh(new_exam)
    return new_exam

@router.get("/history", response_model=List[ExamHistoryResponse])
def get_exam_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(ExamHistory).filter(ExamHistory.user_id == current_user.id).order_by(ExamHistory.completed_at.desc()).all()
