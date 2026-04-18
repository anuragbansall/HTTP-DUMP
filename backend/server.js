import app from "./src/app.js";
import connectDb from "./src/db/connectDb.js";
import http from "http";
import { initSocket } from "./socket.js";

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDb();

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
