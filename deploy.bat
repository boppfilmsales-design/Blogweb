@echo off
cd /d C:\Users\DELL\.qwenpaw\workspaces\default\Blogweb

echo === Step 1: Git Status ===
git status

echo === Step 2: Git Add & Commit ===
git add -A
git commit -m "fix: sync prisma schema with supabase postgresql" || echo Nothing to commit

echo === Step 3: Git Push ===
git push origin main

echo === Step 4: Deploy to Vercel ===
vercel --prod --force --yes

echo === DONE ===
