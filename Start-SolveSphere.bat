
@echo off
title SolveSphere Launcher

set "PROJECT=C:\Users\Lenovo\SolveSphere"
set "BACKEND=%PROJECT%\backend\solvesphere-backend"
set "FRONTEND=%PROJECT%\frontend"

for /f "delims=" %%A in ('powershell -NoProfile -Command "[Environment]::GetEnvironmentVariable('DB_PASSWORD','User')"') do set "DB_PASSWORD=%%A"

for /f "delims=" %%A in ('powershell -NoProfile -Command "[Environment]::GetEnvironmentVariable('JWT_SECRET','User')"') do set "JWT_SECRET=%%A"

if not defined DB_PASSWORD (
    echo ERROR: DB_PASSWORD is missing.
    pause
    exit /b 1
)

if not defined JWT_SECRET (
    echo ERROR: JWT_SECRET is missing.
    pause
    exit /b 1
)

echo Starting SolveSphere Backend...
start "SolveSphere Backend" cmd /k "cd /d "%BACKEND%" && set DB_PASSWORD=%DB_PASSWORD% && set JWT_SECRET=%JWT_SECRET% && mvnw.cmd spring-boot:run"

echo Waiting for backend to become ready...

:WAIT_BACKEND
powershell -NoProfile -Command "try { $r=Invoke-WebRequest -UseBasicParsing http://localhost:8080/api/health -TimeoutSec 2; if ($r.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }"

if errorlevel 1 (
    timeout /t 2 /nobreak >nul
    goto WAIT_BACKEND
)

echo Backend is ready!

echo Starting SolveSphere Frontend...
start "SolveSphere Frontend" cmd /k "cd /d "%FRONTEND%" && npm.cmd run dev"

timeout /t 5 /nobreak >nul

start http://localhost:5173

echo SolveSphere is ready!
