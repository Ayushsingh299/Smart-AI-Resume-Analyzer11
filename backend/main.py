from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import ai_routes

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

@app.get("/")
def read_root():
    return {"message": "Welcome to Smart AI Resume Analyzer API"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}
