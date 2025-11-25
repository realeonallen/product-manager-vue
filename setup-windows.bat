@echo off
setlocal enabledelayedexpansion

REM Check if node is available
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Node.js is already installed
    node --version
    npm --version
    goto :install_deps
)

echo Downloading Node.js...
set "NODE_URL=https://nodejs.org/dist/v20.10.0/node-v20.10.0-win-x64.zip"
set "ZIP_PATH=%TEMP%\node.zip"
set "EXTRACT_PATH=C:\"

powershell -NoProfile -Command "(New-Object System.Net.WebClient).DownloadFile('%NODE_URL%', '%ZIP_PATH%')" 
echo Downloaded Node.js ZIP to %ZIP_PATH%

powershell -NoProfile -Command "Expand-Archive -Path '%ZIP_PATH%' -DestinationPath '%EXTRACT_PATH%' -Force"
echo Extracted Node.js

REM Add to PATH temporarily
set "PATH=C:\node-v20.10.0-win-x64;%PATH%"

node --version
npm --version

:install_deps
echo Installing dependencies...
call npm install
echo Done!
pause
