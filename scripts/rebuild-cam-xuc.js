/**
 * Rebuild Góc Cảm Xúc — 1 bài = 1 cảm xúc rõ, bỏ filler "Ôm bé" lẫn trên mọi bài.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const EMOTIONS = {
  "cx-vui": {
    title: "Vui",
    emoji: "😊",
    teach: "Đây là mặt Vui. Bé vui thì cười!",
    speak: "Bé vui",
    hint: "Chạm mặt vui và nghe nhé!",
    explore: [
      { label: "Mặt vui", speakLine: "Đây là mặt vui", detail: "smile" },
      { label: "Cười", speakLine: "Miệng cười vui", detail: "smile" },
      { label: "Nói vui", speakLine: "Bé vui", detail: "speak" }
    ],
    gate: { promptVi: "Mặt nào đang Vui?", choices: ["Vui", "Buồn"], correctIndex: 0 }
  },
  "cx-buon": {
    title: "Buồn",
    emoji: "😢",
    teach: "Đây là mặt Buồn. Buồn có nước mắt.",
    speak: "Bé buồn",
    hint: "Chạm mặt buồn và nghe nhé!",
    explore: [
      { label: "Mặt buồn", speakLine: "Đây là mặt buồn", detail: "sad" },
      { label: "Nước mắt", speakLine: "Buồn có nước mắt", detail: "tears" },
      { label: "Nói buồn", speakLine: "Bé buồn", detail: "speak" }
    ],
    gate: { promptVi: "Mặt nào đang Buồn?", choices: ["Buồn", "Vui"], correctIndex: 0 }
  },
  "cx-ngac-nhien": {
    title: "Ngạc nhiên",
    emoji: "😮",
    teach: "Đây là mặt Ngạc nhiên. Miệng tròn Ồ!",
    speak: "Ồ",
    hint: "Chạm mặt ngạc nhiên và nghe nhé!",
    explore: [
      { label: "Mặt ngạc nhiên", speakLine: "Đây là mặt ngạc nhiên", detail: "surprise" },
      { label: "Ồ!", speakLine: "Ồ ngạc nhiên", detail: "surprise" },
      { label: "Nói Ồ", speakLine: "Ồ", detail: "speak" }
    ],
    gate: { promptVi: "Mặt nào đang Ngạc nhiên?", choices: ["Ngạc nhiên", "Vui"], correctIndex: 0 }
  },
  "cx-yeu-thuong": {
    title: "Yêu thương",
    emoji: "🤗",
    teach: "Đây là mặt Yêu thương. Có trái tim ấm áp!",
    speak: "Yêu thương",
    hint: "Chạm mặt yêu thương và nghe nhé!",
    explore: [
      { label: "Mặt yêu thương", speakLine: "Đây là mặt yêu thương", detail: "love" },
      { label: "Trái tim", speakLine: "Yêu thương có trái tim", detail: "love" },
      { label: "Nói yêu", speakLine: "Yêu thương", detail: "speak" }
    ],
    gate: { promptVi: "Mặt nào đang Yêu thương?", choices: ["Yêu thương", "Buồn"], correctIndex: 0 }
  },
  "cx-gian-nhe": {
    title: "Giận nhẹ",
    emoji: "😠",
    teach: "Đây là mặt Giận nhẹ. Hơi giận, rồi hết!",
    speak: "Hơi giận",
    hint: "Chạm mặt giận nhẹ và nghe nhé!",
    explore: [
      { label: "Mặt giận nhẹ", speakLine: "Đây là mặt giận nhẹ", detail: "mad" },
      { label: "Hơi giận", speakLine: "Hơi giận rồi hết", detail: "mad" },
      { label: "Nói giận", speakLine: "Hơi giận", detail: "speak" }
    ],
    gate: { promptVi: "Mặt nào đang Giận nhẹ?", choices: ["Giận nhẹ", "Vui"], correctIndex: 0 }
  },
  "cx-met": {
    title: "Mệt",
    emoji: "😴",
    teach: "Đây là mặt Mệt. Mệt thì muốn ngủ!",
    speak: "Bé mệt",
    hint: "Chạm mặt mệt và nghe nhé!",
    explore: [
      { label: "Mặt mệt", speakLine: "Đây là mặt mệt", detail: "tired" },
      { label: "Ngáp", speakLine: "Mệt thì ngáp", detail: "tired" },
      { label: "Nói mệt", speakLine: "Bé mệt", detail: "speak" }
    ],
    gate: { promptVi: "Mặt nào đang Mệt?", choices: ["Mệt", "Vui"], correctIndex: 0 }
  }
};

const nghe = fs.existsSync(path.join(root, "assets/explore/ai/shared-nghe.jpg"))
  ? "assets/explore/ai/shared-nghe.jpg"
  : null;

let n = 0;
data.lessons.forEach((l) => {
  if (l.topicId !== "cam-xuc") return;
  const cfg = EMOTIONS[l.id];
  if (!cfg) return;
  const hero = `assets/explore/ai/${l.id}.jpg`;
  const hasHero = fs.existsSync(path.join(root, hero.replace(/\//g, path.sep)));

  l.title = cfg.title;
  l.emoji = cfg.emoji;
  l.speakText = cfg.speak;
  l.teachText = cfg.teach;
  l.exploreHint = cfg.hint;
  l.gate = cfg.gate;
  l.mapImg = hasHero ? hero : l.mapImg;

  if (l.friend) {
    l.friend.name = `Bạn ${cfg.title}`;
    l.friend.emoji = cfg.emoji;
    l.friend.tint = "#f08c00";
    if (hasHero) l.friend.img = hero;
  }

  if (l.story) {
    l.story.intro = `Cô Sương đố vui! Bé giúp giải cứu Bạn ${cfg.title} nhé!`;
    l.story.exploreLine = `Nhìn mặt ${cfg.title.toLowerCase()} nào!`;
    l.story.gateLine = `Câu đố của Cô Sương! ${cfg.gate.promptVi}`;
    l.story.winLine = `Yay! Bạn ${cfg.title} được giải cứu rồi!`;
  }

  l.exploreItems = cfg.explore.map((it, i) => {
    const isSpeak = it.detail === "speak";
    return {
      emoji: isSpeak ? "👂" : cfg.emoji,
      label: it.label,
      speakLine: it.speakLine,
      img: isSpeak ? nghe || (hasHero ? hero : undefined) : hasHero ? hero : undefined,
      source: "emotion-clear-v2"
    };
  });

  n += 1;
});

data.contentCouncil = {
  ...(data.contentCouncil || {}),
  camXucModel: "one-emotion-clear-face",
  camXucAt: new Date().toISOString()
};

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);
console.log("Rebuilt cam-xuc:", n, "lessons — removed filler Ôm bé");
