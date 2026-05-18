# Deployment Guide: Smart AI Resume Analyzer

This architecture is completely decoupled, meaning the Frontend and Backend are hosted on different optimized platforms.

---

## Step 1: Push to GitHub
Before deploying, make sure all your code (including `vercel.json` and `render.yaml`) is pushed to your GitHub repository.

```bash
git add .
git commit -m "feat: migrate to nextjs and fastapi architecture"
git push origin main
```

---

## Step 2: Deploy Backend & Database to Render (Free)
Render uses Infrastructure as Code (`render.yaml`) to automatically spin up your Postgres Database and FastAPI server.

1. Create a free account at [Render.com](https://render.com).
2. Go to your Dashboard and click **New +** -> **Blueprint**.
3. Connect your GitHub account and select this repository (`Smart-AI-Resume-Analyzer`).
4. Render will automatically detect the `render.yaml` file.
5. Click **Apply**. 
6. Render will now provision a PostgreSQL database and deploy the FastAPI backend. 
7. **Important Setup**: Once deployed, click on your `smart-resume-backend` web service in Render, go to **Environment**, and manually add your `GOOGLE_API_KEY` value (since it is hidden in the yaml for security).
8. Copy the backend URL Render gives you (e.g., `https://smart-resume-backend.onrender.com`).

---

## Step 3: Connect Frontend to Backend (Vercel)
Before deploying the frontend, we need to make sure it points to the live Render backend, not `localhost:8000`.

1. Open `vercel.json` in your code.
2. In the "rewrites" array, ensure the destination URL matches the Render URL you copied in Step 2:
```json
"destination": "https://your-actual-render-url.onrender.com/api/:path*"
```
3. Commit and push this change to GitHub.

---

## Step 4: Deploy Frontend to Vercel (Free)
Vercel is optimized for Next.js and provides lightning-fast edge hosting.

1. Create a free account at [Vercel.com](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Import this GitHub repository.
4. Vercel will automatically detect that the framework is Next.js. 
5. Because we created the Next app inside the `frontend/` folder, open the **Root Directory** setting and click `Edit`. Select `frontend`.
6. Click **Deploy**.

## Final Result 🎉
Your users will now go to your Vercel domain (e.g., `https://smart-ai-resume.vercel.app`). When they upload a resume, Vercel will securely route that API request to your Render FastAPI backend, process the PDF, and return the ATS score!
