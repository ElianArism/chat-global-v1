import express from "express";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

const sv = createServer(app);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "..", "/public", "/index.html"));
});

sv.listen(3000, () => {
  console.log("Server running at: http://localhost:3000");
});
