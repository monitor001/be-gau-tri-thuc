const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

// Icon vùng
const so = data.topics.find((t) => t.id === "so");
if (so) {
  so.emoji = "🐟🐠";
  so.emojiBig = "🐟🐠🐡";
}
const chu = data.topics.find((t) => t.id === "chu");
if (chu) {
  chu.emoji = "🅰️🦆";
  chu.emojiBig = "🅰️🦆";
}

// Đổi bí ngô Halloween + cỏ 4 lá
const cam = data.lessons.find((l) => l.id === "mau-cam");
if (cam) {
  cam.emoji = "🍊";
  cam.exploreItems = [
    { emoji: "🍊", label: "Quả cam", speakColor: "cam" },
    { emoji: "🥕", label: "Cà rốt", speakColor: "cam" },
    { emoji: "🦊", label: "Con cáo", speakColor: "cam" },
    { emoji: "🏀", label: "Bóng rổ", speakColor: "cam" },
    { emoji: "🥭", label: "Quả xoài", speakColor: "cam" },
    { emoji: "🔶", label: "Hình cam", speakColor: "cam" }
  ];
}

const xanhLa = data.lessons.find((l) => l.id === "mau-xanh-la");
if (xanhLa) {
  xanhLa.emoji = "🐸";
  xanhLa.exploreItems = [
    { emoji: "🐸", label: "Con ếch", speakColor: "xanh lá" },
    { emoji: "🍃", label: "Lá cây", speakColor: "xanh lá" },
    { emoji: "🥒", label: "Dưa chuột", speakColor: "xanh lá" },
    { emoji: "🍉", label: "Dưa hấu", speakColor: "xanh lá" },
    { emoji: "🌳", label: "Cây xanh", speakColor: "xanh lá" },
    { emoji: "🥬", label: "Rau xanh", speakColor: "xanh lá" }
  ];
}

// Gắn speakColor cho mọi exploreItems màu
const colorSpeak = {
  "mau-do": "đỏ",
  "mau-vang": "vàng",
  "mau-xanh-duong": "xanh dương",
  "mau-xanh-la": "xanh lá",
  "mau-cam": "cam",
  "mau-tim": "tím",
  "mau-hong": "hồng",
  "mau-nau": "nâu"
};

for (const lesson of data.lessons) {
  const color = colorSpeak[lesson.id];
  if (!color || !lesson.exploreItems) continue;
  lesson.exploreItems = lesson.exploreItems.map((it) => ({
    ...it,
    speakColor: it.speakColor || color,
    // Chuẩn hóa nhãn nghe: "Quả táo màu đỏ"
    speakLine:
      it.speakLine ||
      `${it.label || "người bạn này"} màu ${it.speakColor || color}`
  }));
  // Gate: dùng bóng màu + emoji dự phòng rõ ràng
  if (lesson.gate?.sameShape === "ball") {
    lesson.gate.choices = (lesson.gate.choices || []).map((c) => ({
      ...c,
      emoji: c.speak === "đỏ" || c.color === "#e03131" ? "🔴"
        : c.speak === "vàng" || c.color === "#fab005" ? "🟡"
        : c.speak === "xanh dương" || c.color === "#1c7ed6" ? "🔵"
        : c.speak === "xanh lá" || c.color === "#2f9e44" ? "🟢"
        : c.speak === "cam" || c.color === "#f76707" ? "🟠"
        : c.speak === "tím" || c.color === "#9c36b5" ? "🟣"
        : c.speak === "hồng" || c.color === "#f06595" ? "🩷"
        : c.speak === "nâu" || c.color === "#8b5a2b" ? "🟤"
        : "⚪"
    }));
  }
}

data.map.promptText = "Hôm nay bé muốn đi chơi đâu nào?";
data.map.promptSpeak = "Bản đồ đẹp quá! Hôm nay bé muốn đi chơi đâu nào?";

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);
console.log("Patched council v3 content");
