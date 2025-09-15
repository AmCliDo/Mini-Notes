import { useEffect, useState } from "react";
import { useNotes } from "./store";
import "./styles.css";

export default function App() {
  const { notes, loading, fetch, create, update, remove, setFilter, filter } =
    useNotes();
  //startet Formular mit Leeren Titel und Content, Kategorie private
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "private",
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", content: "" });

  //aktualisiert mit Datenbank wenn neu gestartet oder aktualisiert wird
  //aktualisiert wernn neue Filter gesetzt werden
  useEffect(() => {
    fetch();
  }, []);
  useEffect(() => {
    fetch();
  }, [filter.q, filter.category, filter.pinned]);

  //erstellt neue Notiz, setzt formular zurück
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await create(form);
    setForm({ title: "", content: "", category: "private" });
  };

  return (
    <div className="container">
      <header>
        <h1>MiniNotes</h1>
        <div className="filters">
          <input
            placeholder="Search..."
            value={filter.q}
            onChange={(e) => setFilter({ q: e.target.value })}
          />
          <select
            value={filter.category}
            onChange={(e) => setFilter({ category: e.target.value })}
          >
            <option value="">All categories </option>
            <option value="private">Private</option>
            <option value="work">Work</option>
            <option value="ideas">Ideas</option>
          </select>

          <select
            value={filter.pinned}
            onChange={(e) => setFilter({ pinned: e.target.value })}
          >
            <option value="">All</option>
            <option value="true">pinned</option>
            <option value="false">unpinned</option>
          </select>
        </div>
      </header>

      <form className="card" onSubmit={onSubmit}>
        <div className="row">
          <input
            placeholder="Titel *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="private">Private</option>
            <option value="work">Work</option>
            <option value="ideas">Ideas</option>
          </select>
          <button type="submit">Create note</button>
        </div>
        <textarea
          placeholder="Content (optional)"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
      </form>

      {loading && <p>Lade…</p>}
      <div className="grid">
        {notes.map((n) => (
          <article className={`card ${n.pinned ? "pinned" : ""}`} key={n._id}>
            <div className="note-header">
              <h3>{n.title}</h3>
              <div className="actions">
                <button onClick={() => update(n._id, { pinned: !n.pinned })}>
                  {n.pinned ? "Unpin" : "Pin"}
                </button>
                <button
                  onClick={() => {
                    setEditingId(n._id);
                    setEditForm({ title: n.title, content: n.content || "" });
                  }}
                >
                  Edit
                </button>
                <button onClick={() => remove(n._id)}>Delete</button>
              </div>
            </div>
            <p className="muted">
              {n.category} · {new Date(n.updatedAt).toLocaleString()}
            </p>
            {editingId === n._id ? (
              <form
                className="edit-form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  await update(n._id, {
                    title: editForm.title,
                    content: editForm.content,
                  });
                  setEditingId(null);
                }}
              >
                <input
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="Titel"
                />
                <textarea
                  value={editForm.content}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, content: e.target.value }))
                  }
                  placeholder="Inhalt"
                  rows={4}
                />
                <div className="actions">
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <p>{n.content || <em>(No content)</em>}</p>
            )}
          </article>
        ))}
      </div>
      <footer>© MiniNotes by Jasmine</footer>
    </div>
  );
}
