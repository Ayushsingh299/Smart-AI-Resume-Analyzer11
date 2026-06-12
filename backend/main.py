from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import ai_routes, auth_routes, user_routes, exam_routes
from database import engine
import models

# Initialize database schema
models.Base.metadata.create_all(bind=engine)
app = FastAPI(
    title="Smart AI Resume Analyzer API",
    description="Backend API for Resume Analysis, Rewriting, and Scoring",
    version="2.0.0"
)

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_routes.router, prefix="/api/ai", tags=["AI Engine"])
app.include_router(auth_routes.router)
app.include_router(user_routes.router)
app.include_router(exam_routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Smart AI Resume Analyzer API"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}
