import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import cron from "node-cron";
import generateQiMenData from "./cron/qimenGenerator.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// __dirname w ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());

app.get("/api/qimen", (req, res) => {
  const filePath = path.join(__dirname, "data/qimenData.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Nie można odczytać danych." });
    }
    res.json(JSON.parse(data));
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`QiMen backend działa na porcie ${PORT}`);
});

// Uruchom generowanie danych od razu po starcie
generateQiMenData();

// Zaplanuj cykliczną aktualizację co 2 godziny (0 minut, co 2 godziny)
cron.schedule("0 */2 * * *", () => {
  console.log("Aktualizacja danych QiMen...");
  generateQiMenData();
});
