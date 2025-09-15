const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

//GET bzw. READ (ohne "Method" standardmässig GET)
export const listNotes = async (params = {}) => {
  const url = new URL(API + "/api/notes");
  Object.entries(params).forEach(
    ([k, v]) => v !== undefined && url.searchParams.set(k, v)
  );
  const r = await fetch(url);
  return r.json();
};

//POST bzw. CREATE
export const createNote = async (data) => {
  const r = await fetch(API + "/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return r.json();
};

//PATCH bzw UPDATE
export const updateNote = async (id, data) => {
  const r = await fetch(API + `/api/notes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return r.json();
};

// DELETE
export const deleteNote = async (id) => {
  const r = await fetch(API + `/api/notes/${id}`, { method: "DELETE" });
  return r.json();
};
