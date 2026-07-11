@echo off
echo =======================================
echo   Nova Studio — Push to GitHub
echo =======================================
cd /d D:\2\NovaStudioPortfolio

echo [1/7] Removing any lock files...
del /f /q .git\config.lock 2>nul
del /f /q .git\index.lock 2>nul

echo [2/7] Setting git identity...
git config user.email "yaswanthbyrapuneni@gmail.com"
git config user.name "Nova Studio"

echo [3/7] Removing bun.lockb from tracking (if tracked)...
git rm --cached bun.lockb 2>nul
echo (OK if error above — means it was never tracked)

echo [4/7] Staging all changes...
git add .

echo [5/7] Committing...
git commit -m "Nova Studio — migrate to static CSR + Vercel" 2>nul || echo (nothing new to commit, OK)

echo [6/7] Setting remote...
git remote remove origin 2>nul
git remote add origin https://github.com/SuryaChittimoju-04/nova-studio-portfolio.git

echo [7/7] Pushing to GitHub...
git push -u origin main --force

echo.
echo =======================================
echo Done! Check: github.com/SuryaChittimoju-04/nova-studio-portfolio
echo =======================================
pause
