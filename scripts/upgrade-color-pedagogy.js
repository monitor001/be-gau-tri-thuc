/**
 * PEDA — Làm lại bài màu: nhiều đồ vật cùng màu + cửa hỏi cùng hình khác màu.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const COLOR_LESSONS = {
  "mau-do": {
    emoji: "🍎",
    speakText: "Màu đỏ",
    teachText: "Nhiều thứ màu đỏ! Táo, dâu, cà chua… cùng nhìn màu đỏ nào!",
    exploreHint: "Chạm từng món màu đỏ nhé!",
    exploreItems: [
      { emoji: "🍎", label: "Táo" },
      { emoji: "🍓", label: "Dâu" },
      { emoji: "🍅", label: "Cà chua" },
      { emoji: "🚒", label: "Xe cứu hỏa" },
      { emoji: "🐞", label: "Bọ rùa" },
      { emoji: "🎈", label: "Bóng bay" }
    ],
    gate: {
      promptVi: "Bóng nào màu đỏ?",
      sameShape: "ball",
      hideLabels: true,
      choices: [
        { color: "#e03131", speak: "đỏ" },
        { color: "#fab005", speak: "vàng" }
      ],
      correctIndex: 0
    }
  },
  "mau-vang": {
    emoji: "🍌",
    speakText: "Màu vàng",
    teachText: "Nhiều thứ màu vàng! Chuối, gà con, hoa… cùng nhìn màu vàng nào!",
    exploreHint: "Chạm từng món màu vàng nhé!",
    exploreItems: [
      { emoji: "🍌", label: "Chuối" },
      { emoji: "🐥", label: "Gà con" },
      { emoji: "🌻", label: "Hướng dương" },
      { emoji: "🍋", label: "Chanh" },
      { emoji: "🚕", label: "Taxi" },
      { emoji: "🌽", label: "Bắp" }
    ],
    gate: {
      promptVi: "Bóng nào màu vàng?",
      sameShape: "ball",
      hideLabels: true,
      choices: [
        { color: "#fab005", speak: "vàng" },
        { color: "#e03131", speak: "đỏ" }
      ],
      correctIndex: 0
    }
  },
  "mau-xanh-duong": {
    emoji: "🐋",
    speakText: "Màu xanh dương",
    teachText: "Nhiều thứ màu xanh dương! Bầu trời, cá voi, việt quất… cùng nhìn nào!",
    exploreHint: "Chạm từng món màu xanh dương nhé!",
    exploreItems: [
      { emoji: "🌤️", label: "Bầu trời" },
      { emoji: "🐋", label: "Cá voi" },
      { emoji: "🫐", label: "Việt quất" },
      { emoji: "👖", label: "Quần jean" },
      { emoji: "📘", label: "Sách xanh" },
      { emoji: "🧊", label: "Đá lạnh" }
    ],
    gate: {
      promptVi: "Bóng nào màu xanh dương?",
      sameShape: "ball",
      hideLabels: true,
      choices: [
        { color: "#1c7ed6", speak: "xanh dương" },
        { color: "#e03131", speak: "đỏ" }
      ],
      correctIndex: 0
    }
  },
  "mau-xanh-la": {
    emoji: "🍀",
    speakText: "Màu xanh lá",
    teachText: "Nhiều thứ màu xanh lá! Lá cây, ếch, dưa chuột… cùng nhìn nào!",
    exploreHint: "Chạm từng món màu xanh lá nhé!",
    exploreItems: [
      { emoji: "🍀", label: "Cỏ may" },
      { emoji: "🐸", label: "Ếch" },
      { emoji: "🥒", label: "Dưa chuột" },
      { emoji: "🥦", label: "Bông cải" },
      { emoji: "🌳", label: "Cây" },
      { emoji: "🥬", label: "Rau" }
    ],
    gate: {
      promptVi: "Bóng nào màu xanh lá?",
      sameShape: "ball",
      hideLabels: true,
      choices: [
        { color: "#2f9e44", speak: "xanh lá" },
        { color: "#e03131", speak: "đỏ" }
      ],
      correctIndex: 0
    }
  },
  "mau-cam": {
    emoji: "🎃",
    speakText: "Màu cam",
    teachText: "Nhiều thứ màu cam! Bí ngô, cà rốt, cáo… cùng nhìn màu cam nào!",
    exploreHint: "Chạm từng món màu cam nhé!",
    exploreItems: [
      { emoji: "🎃", label: "Bí ngô" },
      { emoji: "🥕", label: "Cà rốt" },
      { emoji: "🦊", label: "Cáo" },
      { emoji: "🏀", label: "Bóng rổ" },
      { emoji: "🍊", label: "Cam" },
      { emoji: "🔶", label: "Hình cam" }
    ],
    gate: {
      promptVi: "Bóng nào màu cam?",
      sameShape: "ball",
      hideLabels: true,
      choices: [
        { color: "#f76707", speak: "cam" },
        { color: "#e03131", speak: "đỏ" },
        { color: "#fab005", speak: "vàng" }
      ],
      correctIndex: 0
    }
  },
  "mau-tim": {
    emoji: "🍇",
    speakText: "Màu tím",
    teachText: "Nhiều thứ màu tím! Nho, cà tím, hoa… cùng nhìn màu tím nào!",
    exploreHint: "Chạm từng món màu tím nhé!",
    exploreItems: [
      { emoji: "🍇", label: "Nho" },
      { emoji: "🍆", label: "Cà tím" },
      { emoji: "💜", label: "Tim tím" },
      { emoji: "🦄", label: "Kỳ lân" },
      { emoji: "👾", label: "Bạn tím" },
      { emoji: "🔮", label: "Quả cầu" }
    ],
    gate: {
      promptVi: "Bóng nào màu tím?",
      sameShape: "ball",
      hideLabels: true,
      choices: [
        { color: "#9c36b5", speak: "tím" },
        { color: "#e03131", speak: "đỏ" },
        { color: "#fab005", speak: "vàng" }
      ],
      correctIndex: 0
    }
  },
  "mau-hong": {
    emoji: "🐷",
    speakText: "Màu hồng",
    teachText: "Nhiều thứ màu hồng! Heo, hoa, kẹo… cùng nhìn màu hồng nào!",
    exploreHint: "Chạm từng món màu hồng nhé!",
    exploreItems: [
      { emoji: "🐷", label: "Heo" },
      { emoji: "🌸", label: "Hoa" },
      { emoji: "🎀", label: "Nơ" },
      { emoji: "🦩", label: "Hồng hạc" },
      { emoji: "🧁", label: "Bánh" },
      { emoji: "🩷", label: "Tim hồng" }
    ],
    gate: {
      promptVi: "Bóng nào màu hồng?",
      sameShape: "ball",
      hideLabels: true,
      choices: [
        { color: "#f06595", speak: "hồng" },
        { color: "#e03131", speak: "đỏ" },
        { color: "#fab005", speak: "vàng" }
      ],
      correctIndex: 0
    }
  },
  "mau-nau": {
    emoji: "🧸",
    speakText: "Màu nâu",
    teachText: "Nhiều thứ màu nâu! Gấu bông, socola, gỗ… cùng nhìn màu nâu nào!",
    exploreHint: "Chạm từng món màu nâu nhé!",
    exploreItems: [
      { emoji: "🧸", label: "Gấu bông" },
      { emoji: "🍫", label: "Socola" },
      { emoji: "🪵", label: "Gỗ" },
      { emoji: "🥔", label: "Khoai" },
      { emoji: "🐴", label: "Ngựa" },
      { emoji: "🍪", label: "Bánh quy" }
    ],
    gate: {
      promptVi: "Bóng nào màu nâu?",
      sameShape: "ball",
      hideLabels: true,
      choices: [
        { color: "#8b5a2b", speak: "nâu" },
        { color: "#e03131", speak: "đỏ" },
        { color: "#fab005", speak: "vàng" }
      ],
      correctIndex: 0
    }
  }
};

for (const lesson of data.lessons) {
  const patch = COLOR_LESSONS[lesson.id];
  if (!patch) continue;
  Object.assign(lesson, patch);
}

// Thêm chữ Y (bảng chữ cái tiếng Việt 29 chữ — thiếu Y)
const hasY = data.lessons.some((l) => l.id === "chu-y");
if (!hasY) {
  const lastChu = data.lessons.filter((l) => l.topicId === "chu").sort((a, b) => a.order - b.order).at(-1);
  const order = (lastChu?.order || 38) + 0.5;
  data.lessons.push({
    id: "chu-y",
    topicId: "chu",
    order: 38.5,
    title: "Chữ Y",
    emoji: "🧶",
    speakText: "Chữ Y, như y tá",
    teachText: "Đây là chữ Y. y tá bắt đầu bằng chữ Y!",
    exploreHint: "Chạm hình và nghe trợ lý nhé!",
    gate: {
      promptVi: "Chữ nào là chữ Y?",
      choices: ["A", "Y", "Ă"],
      correctIndex: 1
    },
    rewardXu: 5,
    ageMin: 3
  });
  // Normalize orders for chu
  data.lessons
    .filter((l) => l.topicId === "chu")
    .sort((a, b) => a.order - b.order)
    .forEach((l, i) => {
      l.order = 11 + i;
    });
}

const chuTopic = data.topics.find((t) => t.id === "chu");
if (chuTopic) {
  chuTopic.lessonCount = data.lessons.filter((l) => l.topicId === "chu").length;
  chuTopic.emojiBig = "💡";
}

const mauTopic = data.topics.find((t) => t.id === "mau");
if (mauTopic) {
  mauTopic.emojiBig = "🎨";
}

// Map prompts thân thiện trẻ
data.map = data.map || {};
data.map.promptSpeak = "Bản đồ đẹp quá! Hôm nay bé muốn đi chơi đâu nào?";
data.map.promptText = "Hôm nay bé muốn đi chơi đâu nào?";

// Re-sort lessons globally by topic order then lesson order for consistency
const topicOrder = Object.fromEntries(data.topics.map((t) => [t.id, t.order]));
data.lessons.sort((a, b) => {
  const ta = topicOrder[a.topicId] ?? 99;
  const tb = topicOrder[b.topicId] ?? 99;
  if (ta !== tb) return ta - tb;
  return a.order - b.order;
});

// Renumber lesson orders sequentially within each topic
for (const topic of data.topics) {
  data.lessons
    .filter((l) => l.topicId === topic.id)
    .sort((a, b) => a.order - b.order)
    .forEach((l, i) => {
      l.order = i + 1;
    });
  topic.lessonCount = data.lessons.filter((l) => l.topicId === topic.id).length;
}

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);

console.log(
  "Color lessons upgraded:",
  Object.keys(COLOR_LESSONS).length,
  "| chu lessons:",
  data.lessons.filter((l) => l.topicId === "chu").length
);
