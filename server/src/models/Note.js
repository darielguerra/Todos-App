import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema (
  {
    title: string,
    description: string
  }
)

const NoteModel = mongoose.model("notes", NoteSchema);
export default NoteModel;