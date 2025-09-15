# MiniNotes (MERN)

Einfaches Notiz-Tool mit Kategorien & Pin.

## Start

### Backend
```bash
cd server
npm i
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd client
npm i
cp .env.local.example .env.local
npm run dev
```

## API
- GET /api/notes?q=&category=&pinned=
- POST /api/notes { title, content?, category?, pinned? }
- GET /api/notes/:id
- PATCH /api/notes/:id {...}
- DELETE /api/notes/:id

## Deployment
Backend auf Render/Heroku, Frontend auf Vercel, DB auf MongoDB Atlas.
