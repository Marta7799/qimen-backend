import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// __dirname w ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function generateQiMenData() {
  const now = new Date();

  // Przykładowe dane QiMen – możesz je rozszerzyć później
  const stars = [
    "天蓬",
    "天任",
    "天冲",
    "天辅",
    "天英",
    "天芮",
    "天柱",
    "天心",
    "天禽",
  ];
  const gates = ["休", "生", "伤", "杜", "景", "死", "惊", "开"];
  const spirits = [
    "白虎",
    "螣蛇",
    "勾陳",
    "六合",
    "太陰",
    "玄武",
    "直符",
    "天心",
  ];

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const cells = Array(9)
    .fill()
    .map((_, i) => {
      const spirit = getRandom(spirits);
      const star = getRandom(stars);
      const gate = getRandom(gates);

      const symbols = [star, spirit, gate]; // lub dowolna logika kolejności

      return {
        id: i,
        energyType: ["wood", "fire", "earth", "metal", "water"][i % 5],
        star,
        gate,
        spirit, // <--- DODANE!
        symbols,
      };
    });

  console.log("DEBUG - cells:", cells);

  const data = {
    generatedAt: now.toISOString(),
    cells,
  };

  const filePath = path.join(__dirname, "../data/qimenData.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  console.log("✅ Zapisano nowe dane QiMen.");
}
