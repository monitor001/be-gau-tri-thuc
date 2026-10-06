/**
 * Hang Chữ → chỉ chữ Latin A–Z (26 bài).
 * Bỏ Ă Â Đ Ê Ô Ơ Ư. Thêm F J W Z.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");

const LATIN = [
  { id: "chu-a", letter: "A", word: "áo", emoji: "👕", teach: "Đây là chữ A. Áo bắt đầu bằng chữ A!" },
  { id: "chu-b", letter: "B", word: "bò", emoji: "🐮", teach: "Đây là chữ B. Bò bắt đầu bằng chữ B!" },
  { id: "chu-c", letter: "C", word: "cá", emoji: "🐟", teach: "Đây là chữ C. Cá bắt đầu bằng chữ C!" },
  { id: "chu-d", letter: "D", word: "dê", emoji: "🐐", teach: "Đây là chữ D. Dê bắt đầu bằng chữ D!" },
  { id: "chu-e", letter: "E", word: "em", emoji: "👶", teach: "Đây là chữ E. Em bắt đầu bằng chữ E!" },
  { id: "chu-f", letter: "F", word: "fan", emoji: "🌀", teach: "Đây là chữ F. Fan bắt đầu bằng chữ F!" },
  { id: "chu-g", letter: "G", word: "gấu", emoji: "🐻", teach: "Đây là chữ G. Gấu bắt đầu bằng chữ G!" },
  { id: "chu-h", letter: "H", word: "hoa", emoji: "🌸", teach: "Đây là chữ H. Hoa bắt đầu bằng chữ H!" },
  { id: "chu-i", letter: "I", word: "i tờ", emoji: "🔤", teach: "Đây là chữ I. Bé nhìn chữ I tờ nhé!" },
  { id: "chu-j", letter: "J", word: "juice", emoji: "🧃", teach: "Đây là chữ J. Juice bắt đầu bằng chữ J!" },
  { id: "chu-k", letter: "K", word: "kem", emoji: "🍦", teach: "Đây là chữ K. Kem bắt đầu bằng chữ K!" },
  { id: "chu-l", letter: "L", word: "lá", emoji: "🍃", teach: "Đây là chữ L. Lá bắt đầu bằng chữ L!" },
  { id: "chu-m", letter: "M", word: "mèo", emoji: "🐱", teach: "Đây là chữ M. Mèo bắt đầu bằng chữ M!" },
  { id: "chu-n", letter: "N", word: "nón", emoji: "👒", teach: "Đây là chữ N. Nón bắt đầu bằng chữ N!" },
  { id: "chu-o", letter: "O", word: "ong", emoji: "🐝", teach: "Đây là chữ O. Ong bắt đầu bằng chữ O!" },
  { id: "chu-p", letter: "P", word: "pin", emoji: "🔋", teach: "Đây là chữ P. Pin bắt đầu bằng chữ P!" },
  { id: "chu-q", letter: "Q", word: "quạt", emoji: "🌀", teach: "Đây là chữ Q. Quạt bắt đầu bằng chữ Q!" },
  { id: "chu-r", letter: "R", word: "rùa", emoji: "🐢", teach: "Đây là chữ R. Rùa bắt đầu bằng chữ R!" },
  { id: "chu-s", letter: "S", word: "sách", emoji: "📚", teach: "Đây là chữ S. Sách bắt đầu bằng chữ S!" },
  { id: "chu-t", letter: "T", word: "táo", emoji: "🍎", teach: "Đây là chữ T. Táo bắt đầu bằng chữ T!" },
  { id: "chu-u", letter: "U", word: "uống", emoji: "🥤", teach: "Đây là chữ U. Uống bắt đầu bằng chữ U!" },
  { id: "chu-v", letter: "V", word: "voi", emoji: "🐘", teach: "Đây là chữ V. Voi bắt đầu bằng chữ V!" },
  { id: "chu-w", letter: "W", word: "watermelon", emoji: "🍉", teach: "Đây là chữ W. Watermelon bắt đầu bằng chữ W!" },
  { id: "chu-x", letter: "X", word: "xe", emoji: "🚲", teach: "Đây là chữ X. Xe bắt đầu bằng chữ X!" },
  { id: "chu-y", letter: "Y", word: "yêu", emoji: "💛", teach: "Đây là chữ Y. Yêu bắt đầu bằng chữ Y!" },
  { id: "chu-z", letter: "Z", word: "zebra", emoji: "🦓", teach: "Đây là chữ Z. Zebra bắt đầu bằng chữ Z!" }
];

const REMOVE = new Set([
  "chu-ab",
  "chu-ac",
  "chu-dd",
  "chu-ec",
  "chu-om",
  "chu-ox",
  "chu-uw"
]);

const canon = {
  _meta: {
    version: 2,
    alphabet: "latin-A-Z",
    approvedAt: "2026-10-05",
    council: "TD-PEDA + TD-CURR",
    note: "Chỉ chữ Latin A–Z (26). Không dùng Ă Â Đ Ê Ô Ơ Ư."
  }
};

LATIN.forEach((c) => {
  canon[c.id] = {
    letter: c.letter,
    word: c.word,
    emoji: c.emoji,
    teachText: c.teach,
    speakText: `Chữ ${c.letter}`
  };
});

fs.writeFileSync(
  path.join(root, "content", "curriculum", "chu-explore-canonical.json"),
  JSON.stringify(canon, null, 2) + "\n"
);

const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const existing = Object.fromEntries(
  data.lessons.filter((l) => l.topicId === "chu").map((l) => [l.id, l])
);

data.lessons = data.lessons.filter((l) => l.topicId !== "chu" || !REMOVE.has(l.id));
data.lessons = data.lessons.filter((l) => l.topicId !== "chu");

const newChu = LATIN.map((c, i) => {
  const prev = existing[c.id];
  const letter = c.letter;
  const slugMap = {};
  const imgLetter = `assets/explore/chu/chu-${letter.toLowerCase()}.svg`;
  const imgWord =
    fs.existsSync(path.join(root, "assets", "explore", "ai", `${c.id}.jpg`))
      ? `assets/explore/ai/${c.id}.jpg`
      : undefined;
  const nghe = fs.existsSync(path.join(root, "assets", "explore", "ai", "shared-nghe.jpg"))
    ? "assets/explore/ai/shared-nghe.jpg"
    : undefined;

  const wordLabel = c.word.charAt(0).toUpperCase() + c.word.slice(1);
  const speakWord =
    c.word === "i tờ"
      ? "Bé nhìn chữ I tờ nhé"
      : `${wordLabel} bắt đầu bằng chữ ${letter}`;

  return {
    id: c.id,
    topicId: "chu",
    order: i + 1,
    title: `Chữ ${letter}`,
    emoji: c.emoji,
    speakText: `Chữ ${letter}`,
    teachText: c.teach,
    exploreHint: `Chạm chữ ${letter} và nghe nhé!`,
    gate: prev?.gate && !/[ĂÂĐÊÔƠƯ]/.test(JSON.stringify(prev.gate))
      ? {
          ...prev.gate,
          promptVi: `Đâu là chữ ${letter}?`,
          choices: [letter, letter === "A" ? "B" : "A"],
          correctIndex: 0,
          correctSpeak: letter
        }
      : {
          promptVi: `Đâu là chữ ${letter}?`,
          choices: [letter, letter === "A" ? "B" : "A"],
          correctIndex: 0
        },
    rewardXu: 5,
    ageMin: 2,
    exploreItems: [
      {
        emoji: "🔤",
        label: `Chữ ${letter}`,
        speakLine: `Đây là chữ ${letter}`,
        img: imgLetter
      },
      {
        emoji: c.emoji,
        label: wordLabel,
        speakLine: speakWord,
        ...(imgWord ? { img: imgWord } : {})
      },
      {
        emoji: "👂",
        label: `Nghe ${letter}`,
        speakLine: `Chữ ${letter}`,
        ...(nghe ? { img: nghe } : {})
      }
    ],
    friend: {
      id: `ban-chu-${letter.toLowerCase()}`,
      name: `Bạn ${letter}`,
      emoji: c.emoji,
      tint: "#7c5cff",
      ...(imgWord || imgLetter ? { img: imgWord || imgLetter } : {})
    },
    story: {
      theme: "topic-chu",
      intro: `Cô Sương đố vui! Bé giúp giải cứu Bạn ${letter} nhé!`,
      exploreLine: `Nhìn chữ ${letter} và ${c.word} nào!`,
      gateLine: `Câu đố của Cô Sương! Đâu là chữ ${letter}?`,
      winLine: `Yay! Bạn ${letter} được giải cứu rồi!`
    }
  };
});

// insert chu lessons after so lessons (topic order)
const nonChu = data.lessons.filter((l) => l.topicId !== "chu");
const soIdx = nonChu.reduce((acc, l, i) => (l.topicId === "so" ? i : acc), -1);
const insertAt = soIdx >= 0 ? soIdx + 1 : nonChu.length;
// find last so index
let lastSo = -1;
nonChu.forEach((l, i) => {
  if (l.topicId === "so") lastSo = i;
});
const at = lastSo >= 0 ? lastSo + 1 : nonChu.length;
data.lessons = [...nonChu.slice(0, at), ...newChu, ...nonChu.slice(at)];

const topic = data.topics.find((t) => t.id === "chu");
if (topic) {
  topic.lessonCount = 26;
  topic.title = "Hang Chữ Latin";
  topic.mapName = "Hang Chữ Latin";
  topic.shortName = "Hang Chữ";
  topic.speakName = "Hang Chữ Latin";
  topic.emoji = "🅰️✨";
  topic.emojiBig = "🅰️🅱️";
}

data.contentCouncil = {
  ...(data.contentCouncil || {}),
  chuAlphabet: "latin-A-Z",
  chuLessonCount: 26,
  chuSyncedAt: new Date().toISOString()
};

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);

console.log("Hang Chữ Latin A–Z:", newChu.length, "bài");
console.log(
  "Letters:",
  newChu.map((l) => l.title.replace("Chữ ", "")).join(" ")
);
console.log("Total lessons:", data.lessons.length);
