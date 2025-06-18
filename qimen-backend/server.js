const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

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
const cron = require("node-cron");
const generateQiMenData = require("./cron/qimenGenerator");

// Co 2 godziny: 0 */2 * * *
// Od razu uruchom po starcie
generateQiMenData();

cron.schedule("0 */2 * * *", () => {
  console.log("Aktualizacja danych QiMen...");
  generateQiMenData();
});
