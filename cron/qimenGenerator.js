import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// __dirname w ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dodaj losowe wartości
const stars = [
  "天蓬",
  "天任",
  "天冲",
  "天辅",
  "天英",
  "天禽",
  "天柱",
  "天心",
  "天芮",
];
const gates = ["开", "休", "生", "伤", "杜", "景", "死", "惊"];
const deities = [
  "太陰",
  "六合",
  "螣蛇",
  "白虎",
  "玄武",
  "勾陳",
  "直符",
  "天心",
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function generateQiMenData() {
  const now = new Date();

  const cells = Array(9)
    .fill()
    .map((_, i) => {
      const star = getRandom(stars);
      const gate = getRandom(gates);
      const deity = getRandom(deities);

      return {
        id: i,
        position: i + 1,
        energyType: ["wood", "fire", "earth", "metal", "water"][i % 5],
        star,
        gate,
        deity,
        symbols: [star, deity, gate],
      };
    });

  const data = {
    generatedAt: now.toISOString(),
    cells,
  };

  const filePath = path.join(__dirname, "../data/qimenData.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  console.log("✅ Zapisano nowe dane QiMen.");
}
