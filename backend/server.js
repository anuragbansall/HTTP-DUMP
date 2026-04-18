import app from "./src/app.js";
import connectDb from "./src/db/connectDb.js";
import http from "http";
import { initSocket } from "./socket.js";

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
