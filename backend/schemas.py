from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    target_job: Optional[str] = None
    bio: Optional[str] = None
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    target_job: Optional[str] = None
    bio: Optional[str] = None

class ExamHistoryCreate(BaseModel):
    score: int
    total_questions: int
    skills_tested: str # JSON string of skills

class ExamHistoryResponse(ExamHistoryCreate):
    id: int
    user_id: int
    completed_at: datetime

    class Config:
        from_attributes = True

class FeedbackCreate(BaseModel):
    rating: int
    comment: Optional[str] = None
