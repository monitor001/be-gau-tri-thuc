/**
 * Đồng bộ 29 bài Hang Chữ từ chu-explore-canonical.json
 * + gắn SVG chữ lớn. Chạy sau generate-letter-svgs.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const canon = JSON.parse(
  fs.readFileSync(path.join(root, "content", "curriculum", "chu-explore-canonical.json"), "utf8")
);
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const SLUG = {};

function letterSlug(letter) {
  return SLUG[letter] || letter.toLowerCase();
}

let n = 0;
Object.keys(canon).forEach((id) => {
  if (id.startsWith("_")) return;
  const c = canon[id];
  const lesson = data.lessons.find((l) => l.id === id);
  if (!lesson) {
    console.warn("Missing", id);
    return;
  }
  const letter = c.letter;
  const img = `assets/explore/chu/chu-${letterSlug(letter)}.svg`;
  const imgPath = path.join(root, img.replace(/\//g, path.sep));
  if (!fs.existsSync(imgPath)) {
    console.warn("Missing SVG", img);
  }

  lesson.emoji = c.emoji;
  lesson.speakText = c.speakText || `Chữ ${letter}`;
  lesson.teachText = c.teachText;
  lesson.exploreHint = `Chạm chữ ${letter} và nghe nhé!`;
  lesson.exploreItems = [
    {
      emoji: "🔤",
      label: `Chữ ${letter}`,
      speakLine: `Đây là chữ ${letter}`,
      img
    },
    {
      emoji: c.emoji,
      label: c.word.charAt(0).toUpperCase() + c.word.slice(1),
      speakLine: c.word === "bưởi" || c.word === "i tờ"
        ? c.teachText.replace(/^Đây là chữ [^.]+\.\s*/, "").replace(/!$/, "")
        : `${c.word.charAt(0).toUpperCase() + c.word.slice(1)} bắt đầu bằng chữ ${letter}`
    },
    {
      emoji: "👂",
      label: `Nghe ${letter}`,
      speakLine: `Chữ ${letter}`
    }
  ];
  if (lesson.friend) {
    lesson.friend.emoji = c.emoji;
    lesson.friend.name = `Bạn ${letter}`;
  }
  if (lesson.story) {
    lesson.story.exploreLine = `Nhìn chữ ${letter} và ${c.word} nào!`;
    lesson.story.gateLine = `Câu đố của Cô Sương! Đâu là chữ ${letter}?`;
  }
  n += 1;
});

data.contentCouncil = {
  ...(data.contentCouncil || {}),
  chuExploreVersion: canon._meta?.version || 1,
  chuSyncedAt: new Date().toISOString()
};

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);
console.log("Synced Hang Chữ explore for", n, "lessons");
