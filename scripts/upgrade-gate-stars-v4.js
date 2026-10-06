/**
 * Hội đồng v4: 3 câu hỏi/bài màu, nội dung vàng VN, bóng vàng chanh, icon vùng.
 */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const BALL = {
  do: { color: "#e03131", speak: "đỏ", emoji: "🔴" },
  vang: { color: "#ffd43b", speak: "vàng", emoji: "🟡" }, // vàng chanh rõ
  xanhDuong: { color: "#1c7ed6", speak: "xanh dương", emoji: "🔵" },
  xanhLa: { color: "#2f9e44", speak: "xanh lá", emoji: "🟢" },
  cam: { color: "#f76707", speak: "cam", emoji: "🟠" },
  tim: { color: "#9c36b5", speak: "tím", emoji: "🟣" },
  hong: { color: "#f06595", speak: "hồng", emoji: "🩷" },
  nau: { color: "#8b5a2b", speak: "nâu", emoji: "🟤" }
};

function q(promptVi, correctKey, distractors) {
  const correct = BALL[correctKey];
  const choices = [correct, ...distractors.map((k) => BALL[k])];
  return {
    promptVi,
    sameShape: "ball",
    hideLabels: true,
    choices,
    correctSpeak: correct.speak
  };
}

const COLOR = {
  "mau-do": {
    emoji: "🍎",
    speakText: "Màu đỏ",
    teachText: "Nhiều thứ màu đỏ! Táo, dâu, cà chua… cùng nhìn màu đỏ nào!",
    exploreItems: [
      { emoji: "🍎", label: "Quả táo", speakLine: "Quả táo màu đỏ" },
      { emoji: "🍓", label: "Quả dâu", speakLine: "Quả dâu màu đỏ" },
      { emoji: "🍅", label: "Cà chua", speakLine: "Cà chua màu đỏ" },
      { emoji: "🚒", label: "Xe cứu hỏa", speakLine: "Xe cứu hỏa màu đỏ" },
      { emoji: "🐞", label: "Bọ rùa", speakLine: "Bọ rùa màu đỏ" },
      { emoji: "🎈", label: "Bóng bay", speakLine: "Bóng bay màu đỏ" }
    ],
    questions: [
      q("Bóng nào màu đỏ? Bé chạm vào nhé!", "do", ["vang"]),
      q("Bóng nào màu đỏ? Bé chọn bóng đỏ nhé!", "do", ["xanhDuong"]),
      q("Đâu là bóng màu đỏ?", "do", ["cam"])
    ]
  },
  "mau-vang": {
    emoji: "🍌",
    speakText: "Màu vàng",
    teachText: "Nhiều thứ màu vàng! Chuối, hoa mai, vịt con… cùng nhìn màu vàng nào!",
    exploreItems: [
      { emoji: "🍌", label: "Quả chuối", speakLine: "Quả chuối màu vàng" },
      { emoji: "🐥", label: "Gà con", speakLine: "Gà con màu vàng" },
      { emoji: "🌻", label: "Hoa hướng dương", speakLine: "Hoa hướng dương màu vàng" },
      { emoji: "🥭", label: "Quả xoài chín", speakLine: "Quả xoài chín màu vàng" },
      { emoji: "🌼", label: "Hoa mai", speakLine: "Hoa mai màu vàng" },
      { emoji: "🐤", label: "Vịt con", speakLine: "Vịt con màu vàng" }
    ],
    questions: [
      q("Bóng nào màu vàng? Bé chạm vào nhé!", "vang", ["do"]),
      q("Bóng nào màu vàng? Bé chọn bóng vàng nhé!", "vang", ["xanhLa"]),
      q("Đâu là bóng màu vàng?", "vang", ["cam"])
    ]
  },
  "mau-xanh-duong": {
    emoji: "🐋",
    speakText: "Màu xanh dương",
    teachText: "Nhiều thứ màu xanh dương! Bầu trời, cá voi… cùng nhìn nào!",
    exploreItems: [
      { emoji: "🌤️", label: "Bầu trời", speakLine: "Bầu trời màu xanh dương" },
      { emoji: "🐋", label: "Cá voi", speakLine: "Cá voi màu xanh dương" },
      { emoji: "🫐", label: "Việt quất", speakLine: "Việt quất màu xanh dương" },
      { emoji: "👖", label: "Quần jean", speakLine: "Quần jean màu xanh dương" },
      { emoji: "📘", label: "Quyển sách", speakLine: "Quyển sách màu xanh dương" },
      { emoji: "🧊", label: "Cục đá lạnh", speakLine: "Cục đá lạnh màu xanh dương" }
    ],
    questions: [
      q("Bóng nào màu xanh dương? Bé chạm vào nhé!", "xanhDuong", ["do"]),
      q("Bóng nào màu xanh dương?", "xanhDuong", ["vang"]),
      q("Đâu là bóng màu xanh dương?", "xanhDuong", ["xanhLa"])
    ]
  },
  "mau-xanh-la": {
    emoji: "🐸",
    speakText: "Màu xanh lá",
    teachText: "Nhiều thứ màu xanh lá! Ếch, lá cây, dưa hấu… cùng nhìn nào!",
    exploreItems: [
      { emoji: "🐸", label: "Con ếch", speakLine: "Con ếch màu xanh lá" },
      { emoji: "🍃", label: "Lá cây", speakLine: "Lá cây màu xanh lá" },
      { emoji: "🥒", label: "Dưa chuột", speakLine: "Dưa chuột màu xanh lá" },
      { emoji: "🍉", label: "Dưa hấu", speakLine: "Dưa hấu màu xanh lá" },
      { emoji: "🌳", label: "Cây xanh", speakLine: "Cây xanh màu xanh lá" },
      { emoji: "🥬", label: "Rau xanh", speakLine: "Rau xanh màu xanh lá" }
    ],
    questions: [
      q("Bóng nào màu xanh lá? Bé chạm vào nhé!", "xanhLa", ["do"]),
      q("Bóng nào màu xanh lá?", "xanhLa", ["xanhDuong"]),
      q("Đâu là bóng màu xanh lá?", "xanhLa", ["vang"])
    ]
  },
  "mau-cam": {
    emoji: "🍊",
    speakText: "Màu cam",
    teachText: "Nhiều thứ màu cam! Quả cam, cà rốt, cáo… cùng nhìn màu cam nào!",
    exploreItems: [
      { emoji: "🍊", label: "Quả cam", speakLine: "Quả cam màu cam" },
      { emoji: "🥕", label: "Cà rốt", speakLine: "Cà rốt màu cam" },
      { emoji: "🦊", label: "Con cáo", speakLine: "Con cáo màu cam" },
      { emoji: "🏀", label: "Bóng rổ", speakLine: "Bóng rổ màu cam" },
      { emoji: "🥭", label: "Quả xoài", speakLine: "Quả xoài màu cam" },
      { emoji: "🔶", label: "Hình cam", speakLine: "Hình này màu cam" }
    ],
    questions: [
      q("Bóng nào màu cam? Bé chạm vào nhé!", "cam", ["do"]),
      q("Bóng nào màu cam?", "cam", ["vang"]),
      q("Đâu là bóng màu cam?", "cam", ["hong"])
    ]
  },
  "mau-tim": {
    emoji: "🍇",
    speakText: "Màu tím",
    teachText: "Nhiều thứ màu tím! Nho, cà tím… cùng nhìn màu tím nào!",
    exploreItems: [
      { emoji: "🍇", label: "Quả nho", speakLine: "Quả nho màu tím" },
      { emoji: "🍆", label: "Cà tím", speakLine: "Cà tím màu tím" },
      { emoji: "💜", label: "Trái tim", speakLine: "Trái tim màu tím" },
      { emoji: "🦄", label: "Kỳ lân", speakLine: "Kỳ lân màu tím" },
      { emoji: "👾", label: "Bạn tím", speakLine: "Bạn này màu tím" },
      { emoji: "🔮", label: "Quả cầu", speakLine: "Quả cầu màu tím" }
    ],
    questions: [
      q("Bóng nào màu tím? Bé chạm vào nhé!", "tim", ["do"]),
      q("Bóng nào màu tím?", "tim", ["hong"]),
      q("Đâu là bóng màu tím?", "tim", ["vang"])
    ]
  },
  "mau-hong": {
    emoji: "🐷",
    speakText: "Màu hồng",
    teachText: "Nhiều thứ màu hồng! Heo, hoa… cùng nhìn màu hồng nào!",
    exploreItems: [
      { emoji: "🐷", label: "Con heo", speakLine: "Con heo màu hồng" },
      { emoji: "🌸", label: "Bông hoa", speakLine: "Bông hoa màu hồng" },
      { emoji: "🎀", label: "Chiếc nơ", speakLine: "Chiếc nơ màu hồng" },
      { emoji: "🦩", label: "Hồng hạc", speakLine: "Hồng hạc màu hồng" },
      { emoji: "🧁", label: "Bánh kem", speakLine: "Bánh kem màu hồng" },
      { emoji: "🩷", label: "Trái tim", speakLine: "Trái tim màu hồng" }
    ],
    questions: [
      q("Bóng nào màu hồng? Bé chạm vào nhé!", "hong", ["do"]),
      q("Bóng nào màu hồng?", "hong", ["tim"]),
      q("Đâu là bóng màu hồng?", "hong", ["vang"])
    ]
  },
  "mau-nau": {
    emoji: "🧸",
    speakText: "Màu nâu",
    teachText: "Nhiều thứ màu nâu! Gấu bông, sô cô la… cùng nhìn màu nâu nào!",
    exploreItems: [
      { emoji: "🧸", label: "Gấu bông", speakLine: "Gấu bông màu nâu" },
      { emoji: "🍫", label: "Sô cô la", speakLine: "Sô cô la màu nâu" },
      { emoji: "🪵", label: "Khúc gỗ", speakLine: "Khúc gỗ màu nâu" },
      { emoji: "🥔", label: "Khoai tây", speakLine: "Khoai tây màu nâu" },
      { emoji: "🐴", label: "Con ngựa", speakLine: "Con ngựa màu nâu" },
      { emoji: "🍪", label: "Bánh quy", speakLine: "Bánh quy màu nâu" }
    ],
    questions: [
      q("Bóng nào màu nâu? Bé chạm vào nhé!", "nau", ["do"]),
      q("Bóng nào màu nâu?", "nau", ["vang"]),
      q("Đâu là bóng màu nâu?", "nau", ["cam"])
    ]
  }
};

for (const lesson of data.lessons) {
  const patch = COLOR[lesson.id];
  if (!patch) continue;
  lesson.emoji = patch.emoji;
  lesson.speakText = patch.speakText;
  lesson.teachText = patch.teachText;
  lesson.exploreItems = patch.exploreItems;
  lesson.gate = {
    mode: "multi",
    questions: patch.questions
  };
}

const mau = data.topics.find((t) => t.id === "mau");
if (mau) {
  mau.emoji = "🌈🌳";
  mau.emojiBig = "🌈";
}
const so = data.topics.find((t) => t.id === "so");
if (so) {
  so.emoji = "🐟🐠🐡";
  so.emojiBig = "🐟🐠🐡";
}
const chu = data.topics.find((t) => t.id === "chu");
if (chu) {
  chu.emoji = "🅰️🦆";
  chu.emojiBig = "🅰️🦆";
}

data.dialect = "bac"; // chuẩn hóa từ vựng miền Bắc trong nội dung

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);
console.log("Upgraded color gates to 3 questions + VN yellow set");
