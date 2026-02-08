<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1USNccoCfTQkso4nqmYrMTiBAH08MkkLD

<div align="center">
  <h1>Neura Judge — AI Portfolio Auditor</h1>
  <p>A lightweight React + Vite app that analyzes engineering portfolios using Google Gemini.</p>
</div>

## Demo

- Run locally: `npm run dev` → http://localhost:3000
- Deploy: add `VITE_GEMINI_API_KEY` to your hosting provider (see Deploy section)

## Features

- Analyze engineering portfolio text against program rubrics
- Produce structured audit reports (scores, evidence, gaps, suggestions)
- Rewrite assistant and examples library to improve portfolio text

## Quickstart

1. Install dependencies

```bash
npm install
```

2. Create a local env file from the example and set your Gemini API key

```bash
cp .env.example .env.local
# then edit .env.local and set VITE_GEMINI_API_KEY
```

3. Run development server

```bash
npm run dev
```

Open http://localhost:3000

## Environment variables

- `VITE_GEMINI_API_KEY` — your Google Gemini API key. Vite exposes only variables prefixed with `VITE_` to the browser.

Keep `.env.local` private — do not commit it.

## Deployment

You must set `VITE_GEMINI_API_KEY` in your hosting provider's environment settings.

### Vercel
1. Project → Settings → Environment Variables
2. Add `VITE_GEMINI_API_KEY` with your key
3. Redeploy

### Netlify
1. Site settings → Build & deploy → Environment
2. Add `VITE_GEMINI_API_KEY`
3. Redeploy

> Note: GitHub Pages does not support runtime env vars — use Vercel/Netlify or another provider that supports them.

## Files of interest

- `services/geminiService.ts` — Gemini client integration
- `vite.config.ts` — Vite config reading `VITE_GEMINI_API_KEY`
- `components/` — UI components: `AuditReportView`, `RewriteStudio`, `ExamplesLibrary`

## Troubleshooting

- Blank page in production: ensure `VITE_GEMINI_API_KEY` is set and redeploy.
- "An API Key must be set when running in a browser": verify `VITE_` prefix on env var.
- 404s for assets (`/index.css`, `/favicon.ico`): check assets exist and build includes them.

## Contributing

Contributions welcome — open an issue or PR. Keep changes focused and follow the existing code style.

## License

MIT
