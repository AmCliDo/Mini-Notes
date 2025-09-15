import { create } from "zustand";
import { listNotes, createNote, updateNote, deleteNote } from "./api";

export const useNotes = create((set, get) => ({
  notes: [],
  loading: false,
  filter: { q: "", category: "", pinned: "" },

  fetch: async () => {
    set({ loading: true });
    const { q, category, pinned } = get().filter;
    const notes = await listNotes({
      q: q || undefined,
      category: category || undefined,
      pinned: pinned === "" ? undefined : pinned,
    });
    set({ notes, loading: false });
  },

  create: async (data) => {
    await createNote(data);
    await get().fetch();
  },
  update: async (id, data) => {
    await updateNote(id, data);
    await get().fetch();
  },
  remove: async (id) => {
    await deleteNote(id);
    await get().fetch();
  },
  setFilter: (patch) => set((s) => ({ filter: { ...s.filter, ...patch } })),
}));
