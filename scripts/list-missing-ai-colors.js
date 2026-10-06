/** Liệt kê file ảnh AI × màu còn thiếu */
const fs = require("fs");
const path = require("path");
const prompts = require("./ai-prompt-map");

const root = path.join(__dirname, "..");
const data = JSON.parse(
  fs.readFileSync(path.join(root, "content", "curriculum", "lessons.json"), "utf8")
);

const COLORS = ["do", "vang", "xanh-duong", "xanh-la", "cam", "tim"];
const COLOR_EN = {
  do: "RED",
  vang: "YELLOW",
  "xanh-duong": "BLUE",
  "xanh-la": "GREEN",
  cam: "ORANGE",
  tim: "PURPLE"
};

const FOLDERS = {
  hinh: "hinh-khoi",
  "dong-vat": "dong-vat",
  "do-vat": "do-vat",
  "phuong-tien": "phuong-tien"
};

const SHAPE = {
  "hinh-circle": "a perfect flat circle shape",
  "hinh-square": "a perfect flat square shape",
  "hinh-triangle": "a perfect flat triangle pointing up",
  "hinh-rect": "a perfect flat horizontal rectangle",
  "hinh-star": "a perfect flat five-pointed star",
  "hinh-heart": "a perfect flat heart shape",
  "hinh-oval": "a perfect flat upright oval"
};

const style = prompts.style;
const missing = [];

data.lessons.forEach((l) => {
  const folder = FOLDERS[l.topicId];
  if (!folder) return;
  COLORS.forEach((c) => {
    const rel = `assets/explore/${folder}/${l.id}-${c}.jpg`;
    const abs = path.join(root, rel.replace(/\//g, path.sep));
    if (fs.existsSync(abs)) return;
    let subject = prompts[l.id] || SHAPE[l.id] || `cute ${l.title}`;
    if (l.topicId === "hinh") {
      subject = `${SHAPE[l.id] || "shape"}, solid ${COLOR_EN[c]} fill`;
    } else {
      subject = `${subject}, entire subject colored ${COLOR_EN[c]}, clearly that color`;
    }
    missing.push({
      file: `${l.id}-${c}.jpg`,
      folder,
      description: `${style}. ${subject}. Soft pastel circular background. NO text NO letters NO watermark.`
    });
  });
});

const out = path.join(root, "docs", "eval", "missing-ai-colors.json");
fs.writeFileSync(out, JSON.stringify({ count: missing.length, items: missing }, null, 2) + "\n");
console.log("Missing:", missing.length, "→", out);
