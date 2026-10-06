/**
 * PEDA: Bài đối tượng = 1 chủ thể × nhiều màu (đối xứng bài màu = 1 màu × nhiều vật).
 * Áp dụng: do-vat, trai-cay, dong-vat, phuong-tien
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const COLORS = [
  { id: "do", name: "đỏ", hex: "#e03131" },
  { id: "vang", name: "vàng", hex: "#ffd43b" },
  { id: "xanh-duong", name: "xanh dương", hex: "#1c7ed6" },
  { id: "xanh-la", name: "xanh lá", hex: "#2f9e44" },
  { id: "cam", name: "cam", hex: "#f76707" },
  { id: "tim", name: "tím", hex: "#9c36b5" }
];

const TOPICS = new Set(["do-vat", "trai-cay", "dong-vat", "phuong-tien"]);

function tintImg(lessonId, colorId) {
  const rel = `assets/explore/tint/${lessonId}-${colorId}.svg`;
  return fs.existsSync(path.join(root, rel.replace(/\//g, path.sep))) ? rel : null;
}

function heroImg(lessonId) {
  const rel = `assets/explore/ai/${lessonId}.jpg`;
  return fs.existsSync(path.join(root, rel.replace(/\//g, path.sep))) ? rel : null;
}

function subjectName(lesson) {
  return (lesson.title || "Bạn").trim();
}

function article(topicId) {
  if (topicId === "trai-cay") return "Quả";
  if (topicId === "dong-vat") return "Con";
  return "";
}

function buildExplore(lesson) {
  const name = subjectName(lesson);
  const emoji = lesson.emoji || "⭐";
  const hero = heroImg(lesson.id);

  // 6 màu — cùng một chủ thể; ưu tiên SVG tô đúng màu
  return COLORS.map((c) => {
    const shortLabel = `${name} ${c.name}`;
    const tinted = tintImg(lesson.id, c.id);
    return {
      emoji,
      label: shortLabel,
      speakLine: `${name} màu ${c.name}`,
      speakColor: c.name,
      tint: c.hex,
      colorId: c.id,
      // SVG màu đúng > ảnh AI (ảnh AI một màu sẽ bị tô lại bằng CSS)
      img: tinted || hero || undefined,
      recolor: !tinted && Boolean(hero)
    };
  });
}

let n = 0;
data.lessons.forEach((l) => {
  if (!TOPICS.has(l.topicId)) return;
  const name = subjectName(l);
  l.exploreItems = buildExplore(l);
  l.exploreHint = `Chạm từng ${name.toLowerCase()} màu khác nhau nhé!`;
  l.teachText =
    l.topicId === "trai-cay"
      ? `Đây là quả ${name}. ${name} có nhiều màu! Bé nhìn nào!`
      : l.topicId === "dong-vat"
        ? `Đây là con ${name}. ${name} có nhiều màu! Bé nhìn nào!`
        : `Đây là ${name}. ${name} có nhiều màu! Bé nhìn nào!`;
  if (l.story) {
    l.story.exploreLine = `Nhìn ${name} màu đỏ, vàng, xanh… nào!`;
  }
  if (l.friend) {
    const img = heroImg(l.id);
    if (img) l.friend.img = img;
  }
  n += 1;
});

data.contentCouncil = {
  ...(data.contentCouncil || {}),
  exploreModel: "same-subject-many-colors",
  exploreModelTopics: [...TOPICS],
  exploreModelAt: new Date().toISOString()
};

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);
console.log("Rewrote explore (1 subject × 6 colors) for", n, "lessons");
