//definiert wir eine Notiz in MongoDB aufgebaut ist
import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    category: { type: String, enum: ["private", "work", "ideas"], default: "private" },
    pinned: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Note", NoteSchema);
