import mongoose from "mongoose";

const dumpSchema = new mongoose.Schema({
  method: { type: String, required: true },
  headers: { type: Object, required: true },
  body: { type: Object, required: true },
  url: { type: String, required: true },
  dumpId: { type: String, required: true },
});

const Dump = mongoose.model("Dump", dumpSchema);

export default Dump;
