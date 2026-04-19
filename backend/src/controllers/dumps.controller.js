import Dump from "../models/dumps.model.js";
import { getIO } from "../../socket.js"; // adjust path if needed

export const handleDumpRequest = async (req, res) => {
  try {
    const { dumpId } = req.params;

    const newDump = await Dump.create({
      method: req.method || "UNKNOWN",
      headers: req.headers || {},
      body: req.body || {},
      url: req.originalUrl || "UNKNOWN",
      dumpId: dumpId,
    });

    const io = getIO();
    io.emit("new_dump_created", {
      dumpId,
    });

    res.json({
      message: `Received request for dump ID: ${dumpId}`,
      dump: newDump,
    });
  } catch (error) {
    console.error("Error handling dump request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDumpById = async (req, res) => {
  try {
    const { dumpId } = req.params;
    const dump = await Dump.find({ dumpId });

    if (!dump) {
      return res.status(404).json({ error: "Dump not found" });
    }

    res.json({ dump });
  } catch (error) {
    console.error("Error fetching dump:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
