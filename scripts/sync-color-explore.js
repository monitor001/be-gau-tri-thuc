/**
 * Đồng bộ exploreItems 8 bài màu từ nguồn duyệt duy nhất.
 * Nguồn: content/curriculum/color-explore-canonical.json
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const canonPath = path.join(root, "content", "curriculum", "color-explore-canonical.json");
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");

const canon = JSON.parse(fs.readFileSync(canonPath, "utf8"));
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

let n = 0;
Object.keys(canon).forEach((lessonId) => {
  if (lessonId.startsWith("_")) return;
  const lesson = data.lessons.find((l) => l.id === lessonId);
  if (!lesson) {
    console.warn("Missing lesson", lessonId);
    return;
  }
  lesson.exploreItems = canon[lessonId].map(({ note, ...rest }) => rest);
  lesson.exploreHint = lesson.exploreHint || "Chạm hình và nghe trợ lý nhé!";
  n += 1;
});

// Số: glyph số + đếm N cá / N sao (count visual — trẻ nhìn thấy đúng số lượng)
data.lessons
  .filter((l) => l.topicId === "so")
  .forEach((lesson) => {
    const num = Number(lesson.id.replace("so-", ""));
    const hero = `assets/explore/ai/${lesson.id}.jpg`;
    const hasHero = fs.existsSync(path.join(root, hero.replace(/\//g, path.sep)));
    lesson.exploreItems = [
      {
        emoji: lesson.emoji || "🔢",
        label: `Số ${num}`,
        speakLine: `Đây là số ${num}`,
        ...(hasHero ? { img: hero } : {})
      },
      {
        emoji: "🐟",
        unitEmoji: "🐟",
        count: num,
        label: `${num} cá`,
        speakLine: `Đếm ${num} con cá`
      },
      {
        emoji: "⭐",
        unitEmoji: "⭐",
        count: num,
        label: `${num} sao`,
        speakLine: `${num} ngôi sao`
      }
    ];
  });

// Hang Chữ: KHÔNG ghi đè tại đây — dùng chu-explore-canonical.json
// Chạy: node scripts/generate-letter-svgs.js && node scripts/sync-chu-explore.js

const shopPath = path.join(root, "content", "economy", "shop.json");
if (fs.existsSync(shopPath)) {
  const shop = JSON.parse(fs.readFileSync(shopPath, "utf8"));
  data.shop = shop.items || shop;
}

data.contentCouncil = {
  colorExploreVersion: canon._meta?.version || 3,
  syncedAt: new Date().toISOString()
};

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);
console.log("Synced color explore for", n, "lessons from canonical v", canon._meta?.version);
