
@echo off
title SolveSphere Launcher

set "PROJECT=C:\Users\Lenovo\SolveSphere"
set "BACKEND=%PROJECT%\backend\solvesphere-backend"
set "FRONTEND=%PROJECT%\frontend"

echo.
echo ====================================
echo       STARTING SOLVESPHERE
echo ====================================
echo.

echo Starting Backend...
start "SolveSphere Backend" powershell.exe -NoProfile -ExecutionPolicy Bypass -NoExit -File "%PROJECT%\Run-Backend.ps1"

echo Waiting for Backend...

for /L %%i in (1,1,60) do (
    powershell -NoProfile -Command "try { $r=Invoke-WebRequest -UseBasicParsing http://localhost:8080/api/health -TimeoutSec 2; if ($r.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }"

    if not errorlevel 1 goto BACKEND_READY

    timeout /t 2 /nobreak >nul
)

echo.
echo ERROR: Backend did not start within 120 seconds.
echo Check the SolveSphere Backend window for the actual error.
pause
exit /b 1

:BACKEND_READY

echo Backend started successfully!
echo.
echo Starting Frontend...

start "SolveSphere Frontend" /D "%FRONTEND%" cmd /k "npm.cmd run dev"

timeout /t 5 /nobreak >nul

start http://localhost:5173

echo.
echo ====================================
echo       SOLVESPHERE IS READY!
echo ====================================
