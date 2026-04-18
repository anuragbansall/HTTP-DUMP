import express from "express";
import dumpsRouter from "./routes/dumps.routes.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.use("/dumps", dumpsRouter);

export default app;
