@echo off
echo =======================================
echo   Nova Studio — Git Setup + Push
echo =======================================
cd /d D:\2\NovaStudioPortfolio

echo [1/6] Removing lock files...
del /f /q .git\config.lock 2>nul
del /f /q .git\index.lock 2>nul

echo [2/6] Setting git identity...
git config user.email "yaswanthbyrapuneni@gmail.com"
git config user.name "Nova Studio"

echo [3/6] Staging all files...
git add .

echo [4/6] Creating initial commit...
git commit -m "Nova Studio — initial commit" 2>nul || echo (already committed, skipping)

echo [5/6] Setting branch to main...
git branch -M main

echo [6/6] Adding remote and pushing...
git remote remove origin 2>nul
git remote add origin https://github.com/SuryaChittimoju-04/nova-studio-portfolio.git
git push -u origin main

echo.
echo =======================================
echo   Done! Visit: github.com/SuryaChittimoju-04/nova-studio-portfolio
echo =======================================
pause
