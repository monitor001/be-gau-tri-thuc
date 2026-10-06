/**
 * Gắn ảnh AI quả đúng hình × đúng màu vào explore (thay SVG oval lệch hình).
 * Nguồn: Cursor assets/*.jpg → assets/explore/trai-cay/{lessonId}-{colorId}.jpg
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const cursorAssets = path.join(
  process.env.USERPROFILE || "",
  ".cursor",
  "projects",
  "d-APP-tre-duoi-5-tuoi",
  "assets"
);
const outDir = path.join(root, "assets", "explore", "trai-cay");
fs.mkdirSync(outDir, { recursive: true });

const FRUITS = ["tc-tao", "tc-chuoi", "tc-cam", "tc-xoai", "tc-dua-hau", "tc-nho", "tc-dau", "tc-dua"];
const COLORS = ["do", "vang", "xanh-duong", "xanh-la", "cam", "tim"];

/** Friend dùng màu “tự nhiên” của quả */
const FRIEND_COLOR = {
  "tc-tao": "do",
  "tc-chuoi": "vang",
  "tc-cam": "cam",
  "tc-xoai": "vang",
  "tc-dua-hau": "xanh-la",
  "tc-nho": "tim",
  "tc-dau": "do",
  "tc-dua": "vang"
};

const COLORS_META = [
  { id: "do", name: "đỏ", hex: "#e03131" },
  { id: "vang", name: "vàng", hex: "#ffd43b" },
  { id: "xanh-duong", name: "xanh dương", hex: "#1c7ed6" },
  { id: "xanh-la", name: "xanh lá", hex: "#2f9e44" },
  { id: "cam", name: "cam", hex: "#f76707" },
  { id: "tim", name: "tím", hex: "#9c36b5" }
];

let copied = 0;
const missing = [];

FRUITS.forEach((id) => {
  COLORS.forEach((c) => {
    const name = `${id}-${c}.jpg`;
    const src = path.join(cursorAssets, name);
    const dest = path.join(outDir, name);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      copied += 1;
    } else if (fs.existsSync(dest)) {
      // already in place
    } else {
      missing.push(name);
    }
  });
});

console.log("Copied", copied, "fruit color JPGs → assets/explore/trai-cay/");
if (missing.length) console.warn("Missing:", missing.join(", "));

const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

function fruitImg(lessonId, colorId) {
  const rel = `assets/explore/trai-cay/${lessonId}-${colorId}.jpg`;
  return fs.existsSync(path.join(root, rel.replace(/\//g, path.sep))) ? rel : null;
}

let n = 0;
data.lessons.forEach((l) => {
  if (l.topicId !== "trai-cay") return;
  const name = (l.title || "Quả").trim();
  const emoji = l.emoji || "🍎";
  l.exploreItems = COLORS_META.map((c) => {
    const img = fruitImg(l.id, c.id);
    if (!img) throw new Error(`Thiếu ảnh AI quả: ${l.id}-${c.id}`);
    return {
      emoji,
      label: `${name} ${c.name}`,
      speakLine: `${name} màu ${c.name}`,
      speakColor: c.name,
      tint: c.hex,
      colorId: c.id,
      img,
      recolor: false,
      source: "ai-fruit-color"
    };
  });
  l.exploreHint = `Chạm từng ${name.toLowerCase()} màu khác nhau nhé!`;
  l.teachText = `Đây là quả ${name}. ${name} có nhiều màu! Bé nhìn nào!`;
  if (l.story) l.story.exploreLine = `Nhìn ${name} màu đỏ, vàng, xanh… nào!`;
  if (l.friend) {
    const fc = FRIEND_COLOR[l.id] || "vang";
    const fimg = fruitImg(l.id, fc);
    if (fimg) l.friend.img = fimg;
    const meta = COLORS_META.find((c) => c.id === fc);
    if (meta) l.friend.tint = meta.hex;
  }
  n += 1;
});

data.contentCouncil = {
  ...(data.contentCouncil || {}),
  fruitImages: "ai-per-color-v1",
  fruitImagesAt: new Date().toISOString()
};

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);
console.log("Updated explore AI fruit colors for", n, "lessons");
