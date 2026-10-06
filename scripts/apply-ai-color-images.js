/**
 * Gắn ảnh AI (JPG) vào color-explore-canonical + friend.img bài màu.
 * Ảnh nguồn: assets/explore/mau/mau-*.jpg
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const mauDir = path.join(root, "assets", "explore", "mau");
const canonPath = path.join(root, "content", "curriculum", "color-explore-canonical.json");
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");

function slug(id, label) {
  const base = label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${id}-${base}`.slice(0, 64);
}

const canon = JSON.parse(fs.readFileSync(canonPath, "utf8"));
let ok = 0;
let missing = [];

Object.keys(canon).forEach((lessonId) => {
  if (lessonId.startsWith("_")) return;
  canon[lessonId].forEach((item) => {
    const base = slug(lessonId, item.label);
    const jpg = `${base}.jpg`;
    const abs = path.join(mauDir, jpg);
    if (fs.existsSync(abs)) {
      item.img = `assets/explore/mau/${jpg}`;
      item.source = "ai-gen";
      ok += 1;
    } else {
      missing.push(jpg);
    }
  });
});

canon._meta.version = 7;
canon._meta.imagePipeline = "ai-jpg";
canon._meta.approvedAt = "2026-10-05";
canon._meta.note =
  "Explore 8 bài màu dùng ảnh AI JPG (kiểm duyệt TD-VIS). Không fallback emoji lệch màu.";

fs.writeFileSync(canonPath, JSON.stringify(canon, null, 2) + "\n", "utf8");

// Sync vào lessons
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
Object.keys(canon).forEach((lessonId) => {
  if (lessonId.startsWith("_")) return;
  const lesson = data.lessons.find((l) => l.id === lessonId);
  if (!lesson) return;
  lesson.exploreItems = canon[lessonId].map(({ note, source, ...rest }) => rest);
  const hero = lesson.exploreItems[0];
  if (lesson.friend && hero?.img) {
    lesson.friend.img = hero.img;
  }
});

data.contentCouncil = {
  ...(data.contentCouncil || {}),
  colorExploreVersion: 7,
  imagePipeline: "ai-jpg",
  syncedAt: new Date().toISOString()
};

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n", "utf8");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n",
  "utf8"
);

console.log("Applied AI images:", ok);
if (missing.length) {
  console.log("Missing:", missing.join(", "));
  process.exit(1);
}
