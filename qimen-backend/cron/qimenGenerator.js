import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// __dirname w ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function generateQiMenData() {
  const now = new Date();

  const data = {
    generatedAt: now.toISOString(),
    cells: Array(9)
      .fill()
      .map((_, i) => ({
        id: i,
        energyType: ["wood", "fire", "earth", "metal", "water"][i % 5],
        star: "天蓬",
        gate: "开",
        symbols: ["✔", "✘", "-"],
      })),
  };

  const filePath = path.join(__dirname, "../data/qimenData.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  console.log("Zapisano nowe dane QiMen.");
}
