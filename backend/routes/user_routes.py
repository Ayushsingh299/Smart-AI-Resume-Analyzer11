from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import User
from schemas import UserResponse, ProfileUpdate
from deps import get_current_user

router = APIRouter(prefix="/api/users", tags=["users"])

@router.put("/profile", response_model=UserResponse)
def update_profile(profile_data: ProfileUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if profile_data.full_name is not None:
        current_user.full_name = profile_data.full_name
    if profile_data.target_job is not None:
        current_user.target_job = profile_data.target_job
    if profile_data.bio is not None:
        current_user.bio = profile_data.bio
        
    db.commit()
    db.refresh(current_user)
    return current_user
