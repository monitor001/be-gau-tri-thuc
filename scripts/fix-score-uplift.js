/**
 * Sửa P0/P1 nội dung kéo điểm Tổ hợp xuống ~1.9
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const PT_TEACH = {
  "pt-xe-buyt": "Đây là Xe buýt. Xe chạy trên đường vui!",
  "pt-may-bay": "Đây là Máy bay. Bay trên trời cao!",
  "pt-tau-lua": "Đây là Tàu lửa. Chạy trên đường ray!",
  "pt-thuyen": "Đây là Thuyền. Bơi trên mặt nước!",
  "pt-xe-may": "Đây là Xe máy. Chạy trên đường vui!",
  "pt-truc-thang": "Đây là Trực thăng. Quay cánh bay lên!"
};

function exploreFromLesson(lesson, extras = []) {
  const base = {
    emoji: lesson.emoji || "⭐",
    label: lesson.title,
    speakLine: lesson.speakText || lesson.title
  };
  const items = [base, ...extras];
  // unique by label
  const seen = new Set();
  return items.filter((it) => {
    const k = it.label;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

const HINH_EXTRAS = {
  "hinh-circle": [
    { emoji: "⚽", label: "Quả bóng", speakLine: "Quả bóng hình tròn" },
    { emoji: "🕐", label: "Đồng hồ", speakLine: "Đồng hồ hình tròn" }
  ],
  "hinh-square": [
    { emoji: "📦", label: "Hộp", speakLine: "Hộp hình vuông" },
    { emoji: "🪟", label: "Cửa sổ", speakLine: "Cửa sổ hình vuông" }
  ],
  "hinh-triangle": [
    { emoji: "🍕", label: "Miếng bánh", speakLine: "Miếng bánh hình tam giác" },
    { emoji: "⛺", label: "Lều", speakLine: "Lều hình tam giác" }
  ],
  "hinh-rect": [
    { emoji: "📱", label: "Điện thoại", speakLine: "Điện thoại hình chữ nhật" },
    { emoji: "🚪", label: "Cánh cửa", speakLine: "Cánh cửa hình chữ nhật" }
  ],
  "hinh-star": [
    { emoji: "⭐", label: "Ngôi sao", speakLine: "Ngôi sao lấp lánh" },
    { emoji: "🌟", label: "Sao sáng", speakLine: "Sao sáng trên trời" }
  ],
  "hinh-heart": [
    { emoji: "❤️", label: "Trái tim", speakLine: "Trái tim ấm áp" },
    { emoji: "💕", label: "Tim nhỏ", speakLine: "Tim nhỏ dễ thương" }
  ],
  "hinh-oval": [
    { emoji: "🥚", label: "Quả trứng", speakLine: "Quả trứng hình bầu dục" },
    { emoji: "🪞", label: "Gương bầu dục", speakLine: "Gương hình bầu dục" }
  ]
};

let n = 0;
data.lessons.forEach((lesson) => {
  // P0 chu-p
  if (lesson.id === "chu-p") {
    lesson.speakText = "Chữ P, như pin";
    lesson.teachText = "Đây là chữ P. Pin bắt đầu bằng chữ P!";
    lesson.emoji = "🔋";
    if (lesson.friend) lesson.friend.emoji = "🔋";
    n++;
  }

  // hinh-rect friend name
  if (lesson.id === "hinh-rect" && lesson.friend) {
    lesson.friend.name = "Bạn Chữ nhật";
    if (lesson.story) {
      lesson.story.intro = "Cô Sương đố vui! Bé giúp giải cứu Bạn Chữ nhật nhé!";
      lesson.story.exploreLine = "Cùng nhìn hình của Bạn Chữ nhật nào!";
      lesson.story.winLine = "Yay! Bạn Chữ nhật được giải cứu rồi!";
    }
    n++;
  }

  // oval → bầu dục
  if (lesson.id === "hinh-oval") {
    lesson.title = "Hình Bầu dục";
    lesson.speakText = "Hình Bầu dục";
    lesson.teachText = "Đây là hình Bầu dục. Dài hơn hình tròn một chút!";
    if (lesson.friend) lesson.friend.name = "Bạn Bầu dục";
    if (lesson.story) {
      lesson.story.intro = "Cô Sương đố vui! Bé giúp giải cứu Bạn Bầu dục nhé!";
      lesson.story.exploreLine = "Cùng nhìn hình của Bạn Bầu dục nào!";
      lesson.story.gateLine = "Câu đố của Cô Sương! Đâu là hình Bầu dục?";
      lesson.story.winLine = "Yay! Bạn Bầu dục được giải cứu rồi!";
    }
    if (lesson.gate) {
      lesson.gate.promptVi = "Đâu là hình Bầu dục?";
      lesson.gate.choices = ["Bầu dục", "Tròn", "Vuông"];
      lesson.gate.correctIndex = 0;
    }
    n++;
  }

  // mau-vang soft story — KHÔNG đụng exploreItems (xem color-explore-canonical.json)
  if (lesson.id === "mau-vang") {
    lesson.story.intro = "Cô Sương đố vui! Bé giúp Bạn Vàng nhé!";
    lesson.teachText =
      "Cô Sương đố vui! Nhiều thứ màu vàng! Chuối, hoa mai, vịt con… cùng nhìn màu vàng nào!";
    if (lesson.friend) lesson.friend.emoji = "🍌";
    n++;
  }

  // phương tiện teach
  if (PT_TEACH[lesson.id]) {
    lesson.teachText = PT_TEACH[lesson.id];
    n++;
  }

  // nhay-mua / hoa-si clear prompts
  if (lesson.topicId === "nhay-mua" || lesson.topicId === "hoa-si") {
    const name = lesson.title;
    if (lesson.gate) {
      lesson.gate.promptVi = `Đâu là ${name}?`;
    }
    if (lesson.story) {
      lesson.story.gateLine = `Câu đố của Cô Sương! Đâu là ${name}?`;
      if (lesson.topicId === "hoa-si" && /Gõ trống|Nghe sáo|Nghe nhạc/.test(lesson.teachText || "")) {
        // keep teach but soften explore to activity
        lesson.story.exploreLine = `Cùng làm ${name} với bạn nào!`;
      }
    }
    n++;
  }

  // exploreItems for hinh
  if (lesson.topicId === "hinh" && (!lesson.exploreItems || !lesson.exploreItems.length)) {
    lesson.exploreItems = exploreFromLesson(lesson, HINH_EXTRAS[lesson.id] || []);
    lesson.exploreHint = lesson.exploreHint || "Chạm hình và nghe trợ lý nhé!";
    n++;
  }

  // exploreItems for so — count dots metaphor via fish/stars
  if (lesson.topicId === "so" && (!lesson.exploreItems || !lesson.exploreItems.length)) {
    const num = lesson.id.replace("so-", "");
    lesson.exploreItems = [
      { emoji: lesson.emoji || "🔢", label: `Số ${num}`, speakLine: `Đây là số ${num}` },
      { emoji: "🐟", label: `${num} cá`, speakLine: `Đếm ${num} con cá` },
      { emoji: "⭐", label: `${num} sao`, speakLine: `${num} ngôi sao` }
    ];
    lesson.exploreHint = "Chạm và đếm cùng bé Gấu nào!";
    n++;
  }

  // light explore for dong-vat / trai-cay / do-vat / cam-xuc / phuong-tien (1-3 items)
  if (
    ["dong-vat", "trai-cay", "do-vat", "cam-xuc", "phuong-tien", "nhay-mua", "hoa-si", "chu"].includes(
      lesson.topicId
    ) &&
    (!lesson.exploreItems || !lesson.exploreItems.length)
  ) {
    const items = exploreFromLesson(lesson);
    if (lesson.topicId === "chu") {
      const letter = lesson.title.replace(/^Chữ\s+/i, "");
      items.push({
        emoji: lesson.emoji || "🔤",
        label: `Chữ ${letter}`,
        speakLine: lesson.speakText || `Chữ ${letter}`
      });
    }
    lesson.exploreItems = items.slice(0, 3);
    lesson.exploreHint = lesson.exploreHint || "Chạm hình và nghe trợ lý nhé!";
    n++;
  }
});

// topic emojiBig for trai-cay
const tc = data.topics.find((t) => t.id === "trai-cay");
if (tc) {
  tc.emojiBig = "🍎🍌🍊";
  tc.emoji = "🍎🧺";
}

const shopPath = path.join(root, "content", "economy", "shop.json");
if (fs.existsSync(shopPath)) {
  const shop = JSON.parse(fs.readFileSync(shopPath, "utf8"));
  data.shop = shop.items || shop;
}

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);

const withExplore = data.lessons.filter((l) => l.exploreItems?.length).length;
console.log("Patched content ops ~", n);
console.log("exploreItems coverage", withExplore, "/", data.lessons.length);
