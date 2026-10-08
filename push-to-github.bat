@echo off
echo =======================================
echo   Nova Studio — Push to GitHub
echo =======================================
cd /d D:\2\NovaStudioPortfolio

echo [1/6] Removing lock files...
del /f /q .git\config.lock 2>nul
del /f /q .git\index.lock 2>nul

echo [2/6] Setting git identity...
git config user.email "suryachittimoju3@gmail.com"
git config user.name "SuryaChittimoju-04"

echo [3/6] Removing bun.lockb from tracking...
git rm --cached bun.lockb 2>nul

echo [4/6] Staging all changes...
git add .

echo [5/6] Committing...
git commit -m "fix: marquee after pricing, contact emails+phones, smaller hero text, work page video cards" 2>nul || echo (nothing new to commit, OK)

echo [6/6] Setting remote and pushing...
git remote remove origin 2>nul
git remote add origin https://github.com/SuryaChittimoju-04/nova-studio-portfolio.git

echo.
echo *** IMPORTANT: When asked for password, do NOT enter your GitHub password ***
echo *** Instead enter your Personal Access Token (PAT) ***
echo *** Get one at: github.com/settings/tokens - Classic token with 'repo' scope ***
echo.

git push -u origin main --force
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo PUSH FAILED! This usually means wrong password.
  echo Go to github.com/settings/tokens and create a Classic token.
  echo Use that token as your password when prompted.
) else (
  echo.
  echo SUCCESS! Check: github.com/SuryaChittimoju-04/nova-studio-portfolio
  echo Vercel will auto-deploy in 1-2 minutes.
)

echo.
pause
