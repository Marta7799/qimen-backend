const fs = require("fs");
const path = require("path");

function generateQiMenData() {
  const now = new Date();

  // Tu powinien być algorytm Qi Men Dun Jia
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

module.exports = generateQiMenData;
