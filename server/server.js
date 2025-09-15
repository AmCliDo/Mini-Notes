import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import Note from "./models/Note.js";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") ?? "*" }));
app.use(express.json());
app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Mongo error:", err);
    process.exit(1);
  });

app.get("/api/health", (_, res) => res.json({ ok: true }));

app.get("/api/notes", async (req, res) => {
  const { q, category, pinned } = req.query;
  const filter = {};
  if (q)
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { content: { $regex: q, $options: "i" } },
    ];
  if (category) filter.category = category;
  if (typeof pinned !== "undefined") filter.pinned = pinned === "true";
  const notes = await Note.find(filter).sort({ pinned: -1, updatedAt: -1 });
  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/notes/:id", async (req, res) => {
  const n = await Note.findById(req.params.id);
  if (!n) return res.status(404).json({ error: "Not found" });
  res.json(n);
});

app.put("/api/notes/:id", async (req, res) => {
  const n = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    overwrite: false,
  });
  if (!n) return res.status(404).json({ error: "Not found" });
  res.json(n);
});

app.patch("/api/notes/:id", async (req, res) => {
  const n = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!n) return res.status(404).json({ error: "Not found" });
  res.json(n);
});

app.delete("/api/notes/:id", async (req, res) => {
  const n = await Note.findByIdAndDelete(req.params.id);
  if (!n) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
