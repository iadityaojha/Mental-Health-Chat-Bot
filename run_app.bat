@echo off
echo ===================================================
echo Starting Mental Health Chatbot (Localhost)
echo ===================================================

echo 1. Starting Backend Server (FastAPI)...
echo Installing dependencies...
start "Backend Server" cmd /k "cd backend && pip install -r requirements.txt && python -m uvicorn app:app --reload"

echo Waiting for backend to initialize...
timeout /t 5

echo 2. Starting Frontend Server (Vite)...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo Waiting for frontend to initialize...
timeout /t 5

echo 3. Opening Application in Browser...
start http://localhost:5173

echo ===================================================
echo App is running! 
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo Close the popup command windows to stop the app.
echo ===================================================
pause
