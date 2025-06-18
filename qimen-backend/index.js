import express from "express";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/qimen", (req, res) => {
  fs.readFile("./data/qimenData.json", "utf8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu danych:", err);
      return res.status(500).send("Błąd serwera");
    }
    res.send(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`✅ Serwer działa na porcie ${PORT}`);
});
