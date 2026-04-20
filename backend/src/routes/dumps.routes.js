import express from "express";
import {
  getDumpById,
  handleDumpRequest,
} from "../controllers/dumps.controller.js";

const dumpsRouter = express.Router();

dumpsRouter.get("/api/:dumpId", getDumpById);

dumpsRouter.all("/:dumpId/:rest*", handleDumpRequest);

export default dumpsRouter;
