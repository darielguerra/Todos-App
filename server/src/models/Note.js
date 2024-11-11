import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema (
  {
    title: String,
    description: String
  }
)

const NoteModel = mongoose.model("notes", NoteSchema);
export default NoteModel;