<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1USNccoCfTQkso4nqmYrMTiBAH08MkkLD

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local` and set your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
3. Run the app:
   `npm run dev`

## Deploy

When deploying to production (Vercel, Netlify, etc.), make sure to add the environment variable:
- **Variable name:** `VITE_GEMINI_API_KEY`
- **Value:** Your Gemini API key

### Vercel
1. Go to your project settings
2. Navigate to Environment Variables
3. Add `VITE_GEMINI_API_KEY` with your API key
4. Redeploy

### Netlify
1. Go to Site settings → Environment variables
2. Add `VITE_GEMINI_API_KEY` with your API key
3. Redeploy
