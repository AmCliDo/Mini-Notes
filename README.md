# MiniNotes (MERN)

Einfaches Notiz-Tool mit Kategorien & Pin.  
Stack: **MongoDB + Express + React + Node.js**.

---

## Installation

1. Repository klonen:

   ```bash
   git clone https://github.com/AmCliDo/Mini-Notes.git
   cd Mini-Notes
   ```

2. Dependencies installieren (**Server & Client**):

   ```bash
   cd server && npm install
   cd ../client && npm install
   cd ..
   ```

3. Beispiel-Umgebungsdateien kopieren:

   ```bash
   cp server/.env.example server/.env
   cp client/.env.local.example client/.env.local
   ```

4. `.env` & `.env.local` mit deinen Werten ausfüllen:

   **server/.env**

   ```env
   MONGODB_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/mininotes
   PORT=4000
   CORS_ORIGIN=http://localhost:5173
   ```

   **client/.env.local**

   ```env
   VITE_API_URL=http://localhost:4000
   ```

---

## Start

### Alles zusammen starten (empfohlen)

Im Projekt-Root:

```bash
npm run dev
```

--> Startet **Backend** (Port 4000) und **Frontend** (Port 5173) gleichzeitig.

### Backend einzeln

```bash
cd server
npm run dev
```

### Frontend einzeln

```bash
cd client
npm run dev
```

---

## 📖 Bedienungsanleitung

- **Neue Notiz anlegen**: Titel eingeben, Kategorie wählen, optional Inhalt hinzufügen → „Notiz anlegen“ klicken.
- **Notiz bearbeiten**: Bei einer bestehenden Notiz auf „Edit“ klicken → Titel/Inhalt ändern → „Save“.
- **Notiz pinnen**: „Pin“-Button setzt eine Notiz ganz oben.
- **Notiz löschen**: Mit „Löschen“-Button entfernen.
- **Filter nutzen**: Oben nach Text suchen, nach Kategorie filtern oder nur gepinnte Notizen anzeigen.

---

## API Endpoints

- `GET /api/notes?q=&category=&pinned=` → Liste mit optionalen Filtern
- `POST /api/notes` → Neue Notiz erstellen
  ```json
  { "title": "Test", "content": "Inhalt", "category": "work", "pinned": false }
  ```
- `GET /api/notes/:id` → Einzelne Notiz lesen
- `PATCH /api/notes/:id` → Teilweise aktualisieren
- `PUT /api/notes/:id` → Komplette Aktualisierung
- `DELETE /api/notes/:id` → Notiz löschen

---

## Deployment

- **Backend**: [Render](https://render.com)
- **Frontend**: [Vercel](https://vercel.com)
- **Datenbank**: MongoDB Atlas

---

## Autor

- Jasmine Bossard
