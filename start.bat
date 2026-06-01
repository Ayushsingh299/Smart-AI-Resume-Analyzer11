@echo off
echo Starting Backend Server...
start cmd /k "cd backend && pip install -r requirements.txt && uvicorn main:app --reload"

echo Starting Frontend Server...
start cmd /k "cd frontend && npm install && npm run dev"

echo Both servers are starting. 
echo Frontend will be at http://localhost:3000
echo Backend API docs will be at https://smart-ai-resume-analyzer11.onrender.com/docs
pause
