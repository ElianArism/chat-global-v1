import express from "express";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";

const app = express();

const sv = createServer(app);

const io = new Server(sv);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "..", "/public", "/index.html"));
});

io.on("connection", (socket) => {
  console.log("A new user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("to-sv-message", (msg) => {
    console.log("Message received: " + msg);
    io.emit("to-client-message", msg);
  });
});

sv.listen(3000, () => {
  console.log("Server running at: http://localhost:3000");
});
