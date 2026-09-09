# Buildifo

React/Vite frontend with a small Express API boundary for future server-side contact delivery.

## Run locally

```bash
npm install
copy .env.example .env
npm run dev
```

The frontend runs at `http://localhost:5173` and the API at `http://localhost:8787`.

## Structure

- `src/components` reusable page sections and UI components
- `src/data` content/configuration kept outside components
- `src/styles.css` global visual system and responsive layout
- `server/index.js` security middleware and validated API boundary

## Security notes

- `.env` is ignored and server-only values are never prefixed with `VITE_`.
- Helmet, strict CORS, JSON size limits, rate limiting, and Zod validation are enabled.
- Never log contact payloads or commit credentials. Add a mail provider behind `/api/contact` before accepting production submissions.
- Replace the placeholder `CLIENT_ORIGIN` with the exact deployed frontend origin in production.
