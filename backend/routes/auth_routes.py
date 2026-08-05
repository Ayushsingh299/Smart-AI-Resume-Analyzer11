from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from database import get_db
from models import User
from schemas import UserCreate, UserResponse, Token, GoogleLoginRequest, ForgotPasswordRequest, ResetPasswordRequest
from auth_utils import get_password_hash, verify_password, create_access_token
from deps import get_current_user
from datetime import timedelta

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = User(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=Token)
def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(days=7)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        samesite="lax",
        secure=False, # Set to True in production with HTTPS
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/google", response_model=Token)
def google_login(response: Response, request: GoogleLoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        hashed_password = get_password_hash("google-oauth-placeholder-password")
        user = User(
            email=request.email,
            hashed_password=hashed_password,
            full_name=request.full_name
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    access_token_expires = timedelta(days=7)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        samesite="lax",
        secure=False,
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out successfully"}

@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.post("/forgot-password")
def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        return {"message": "If an account exists with this email, a reset link has been sent."}
    
    reset_token = create_access_token(
        data={"sub": user.email, "type": "reset"}, expires_delta=timedelta(minutes=30)
    )
    # Mocking email sending
    print(f"\n--- PASSWORD RESET EMAIL ---")
    print(f"To: {user.email}")
    print(f"Reset Link: http://localhost:3000/reset-password?token={reset_token}")
    print(f"----------------------------\n")
    return {"message": "If an account exists with this email, a reset link has been sent."}

@router.post("/reset-password")
def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    try:
        from jose import jwt, JWTError
        from auth_utils import SECRET_KEY, ALGORITHM
        payload = jwt.decode(request.token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        token_type: str = payload.get("type")
        if email is None or token_type != "reset":
            raise HTTPException(status_code=400, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
        
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    user.hashed_password = get_password_hash(request.new_password)
    db.commit()
    return {"message": "Password successfully reset"}
