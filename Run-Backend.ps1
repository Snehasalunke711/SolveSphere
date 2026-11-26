
$ErrorActionPreference = "Stop"

Write-Host "Loading SolveSphere configuration..." -ForegroundColor Cyan

$env:DB_PASSWORD = [Environment]::GetEnvironmentVariable("DB_PASSWORD", "User")
$env:JWT_SECRET = [Environment]::GetEnvironmentVariable("JWT_SECRET", "User")

if ([string]::IsNullOrWhiteSpace($env:DB_PASSWORD)) {
    Write-Host "ERROR: DB_PASSWORD is missing from Windows environment variables." -ForegroundColor Red
    Read-Host "Press Enter to close"
    exit 1
}

if ([string]::IsNullOrWhiteSpace($env:JWT_SECRET)) {
    Write-Host "ERROR: JWT_SECRET is missing from Windows environment variables." -ForegroundColor Red
    Read-Host "Press Enter to close"
    exit 1
}

Set-Location "C:\Users\Lenovo\SolveSphere\backend\solvesphere-backend"

Write-Host "Starting SolveSphere Backend..." -ForegroundColor Green

& .\mvnw.cmd spring-boot:run

if ($LASTEXITCODE -ne 0) {
    Write-Host "Backend stopped with an error. Check the messages above." -ForegroundColor Red
}

Read-Host "Press Enter to close"
