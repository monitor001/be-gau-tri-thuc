/**
 * Gắn explore/friend/map của Đồi Hình sang SVG hình học (HDGD-VIS).
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const SHAPES = ["circle", "square", "triangle", "rect", "star", "heart", "oval"];
const FRIEND_COLOR = {
  circle: "cam",
  square: "xanh-duong",
  triangle: "xanh-la",
  rect: "do",
  star: "vang",
  heart: "do",
  oval: "vang"
};

let patched = 0;
for (const lesson of data.lessons) {
  if (!lesson.id || !lesson.id.startsWith("hinh-")) continue;
  const kind = lesson.id.replace(/^hinh-/, "");
  if (!SHAPES.includes(kind)) continue;

  if (Array.isArray(lesson.exploreItems)) {
    for (const it of lesson.exploreItems) {
      if (!it.colorId) continue;
      it.img = `assets/explore/hinh-khoi/hinh-${kind}-${it.colorId}.svg`;
      it.recolor = false;
      it.source = "geometry-svg-vis";
      patched += 1;
    }
  }
  const fc = FRIEND_COLOR[kind] || "do";
  const hero = `assets/explore/hinh-khoi/hinh-${kind}-${fc}.svg`;
  if (lesson.friend) lesson.friend.img = hero;
  lesson.mapImg = hero;
}

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n", "utf8");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  `window.BeGauLessons = ${JSON.stringify(data)};\n`,
  "utf8"
);
console.log(`Bound ${patched} explore items → geometry SVG; wrote lessons.json + lessons-data.js`);
