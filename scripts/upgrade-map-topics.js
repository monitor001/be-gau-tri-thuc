const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const raw = fs.readFileSync(path.join(root, "js", "lessons-data.js"), "utf8");
const jsonText = raw
  .replace(/^window\.BeGauLessons\s*=\s*/, "")
  .replace(/;\s*$/, "");
const data = JSON.parse(jsonText);

function slug(s) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const topicMeta = {
  so: {
    shortName: "Suối Số",
    mapName: "Suối Đếm Số",
    emoji: "🐟",
    emojiBig: "🐟🐠🐡",
    color: "#3da9fc",
    cardBg: "#d6efff",
    helper: "soc",
    speakName: "Suối Đếm Số"
  },
  chu: {
    shortName: "Hang Chữ",
    mapName: "Hang Chữ Sáng",
    emoji: "🦆",
    emojiBig: "💡🦆🅰️",
    color: "#7c5cff",
    cardBg: "#ebe4ff",
    helper: "be-gau",
    speakName: "Hang Chữ Sáng"
  },
  mau: {
    shortName: "Rừng Màu",
    mapName: "Rừng Màu Sắc",
    emoji: "🌳",
    emojiBig: "🌳🎨🌈",
    color: "#2f9e44",
    cardBg: "#d8f5d3",
    helper: "dom-dom",
    speakName: "Rừng Màu Sắc"
  },
  hinh: {
    shortName: "Đồi Hình",
    mapName: "Đồi Hình Khối",
    emoji: "🔺",
    emojiBig: "🔺⬛⭕",
    color: "#f76707",
    cardBg: "#ffe8d6",
    helper: "be-gau",
    speakName: "Đồi Hình Khối"
  },
  "dong-vat": {
    shortName: "Vườn Bạn",
    mapName: "Vườn Bạn Bè",
    emoji: "🐰",
    emojiBig: "🐰🐶🐱",
    color: "#fab005",
    cardBg: "#fff3bf",
    helper: "dom-dom",
    speakName: "Vườn Bạn Bè"
  },
  "do-vat": {
    shortName: "Nhà Đồ",
    mapName: "Nhà Đồ Vật",
    emoji: "⚽",
    emojiBig: "⚽📚🥛",
    color: "#e67700",
    cardBg: "#ffe8cc",
    helper: "be-gau",
    speakName: "Nhà Đồ Vật"
  },
  "trai-cay": {
    shortName: "Vườn Quả",
    mapName: "Vườn Trái Cây",
    emoji: "🍎",
    emojiBig: "🍎🍌🍊",
    color: "#e03131",
    cardBg: "#ffe3e3",
    helper: "dom-dom",
    speakName: "Vườn Trái Cây"
  },
  "cam-xuc": {
    shortName: "Trái Tim",
    mapName: "Góc Cảm Xúc",
    emoji: "😊",
    emojiBig: "😊🤗💛",
    color: "#f08c00",
    cardBg: "#fff4e0",
    helper: "dom-dom",
    speakName: "Góc Cảm Xúc"
  },
  "phuong-tien": {
    shortName: "Bến Xe",
    mapName: "Bến Phương Tiện",
    emoji: "🚌",
    emojiBig: "🚌✈️🚂",
    color: "#1971c2",
    cardBg: "#d0ebff",
    helper: "soc",
    speakName: "Bến Phương Tiện"
  }
};

data.topics = data.topics.map((t) => {
  const m = topicMeta[t.id] || {};
  return {
    ...t,
    ...m,
    title: m.mapName || t.title,
    starsMax: 3
  };
});

// remove old dance/art if re-run
data.lessons = data.lessons.filter(
  (l) => l.topicId !== "nhay-mua" && l.topicId !== "hoa-si"
);
data.topics = data.topics.filter(
  (t) => t.id !== "nhay-mua" && t.id !== "hoa-si"
);

let order = Math.max(...data.lessons.map((l) => l.order), 0);

function addLesson(topicId, id, title, emoji, speak, teach, choices, correctIndex) {
  order += 1;
  data.lessons.push({
    id,
    topicId,
    order,
    title,
    emoji,
    speakText: speak,
    teachText: teach,
    exploreHint: "Chạm hình và nghe trợ lý nhé!",
    gate: { promptVi: "Bé chọn đúng nào?", choices, correctIndex },
    rewardXu: 5,
    ageMin: 2
  });
}

const dances = [
  ["Vỗ tay", "👏", "Vỗ tay theo nhạc", "Cùng vỗ tay nào!"],
  ["Nhún chân", "🦶", "Nhún chân vui", "Nhún chân nhẹ nhàng!"],
  ["Xoay tròn", "🔄", "Xoay người vui", "Xoay tròn dịu dàng!"],
  ["Giơ tay cao", "🙌", "Giơ tay lên cao", "Giơ tay cao nào!"],
  ["Nhảy nhẹ", "🐰", "Nhảy nhẹ tại chỗ", "Nhảy nhẹ như thỏ!"],
  ["Lắc lư", "🎶", "Lắc lư theo nhạc", "Lắc lư vui vui!"]
];
dances.forEach(([name, em, speak, teach], i) => {
  const others = dances.filter((_, j) => j !== i).slice(0, 2).map((x) => x[0]);
  const set = [name, ...others].slice(0, 2);
  addLesson(
    "nhay-mua",
    "nm-" + slug(name),
    name,
    em,
    speak,
    teach,
    set,
    set.indexOf(name)
  );
});

const arts = [
  ["Tô đỏ", "🔴", "Tô màu đỏ", "Cùng tô màu đỏ nào!"],
  ["Tô vàng", "🟡", "Tô màu vàng", "Tô vàng như nắng!"],
  ["Vẽ vòng tròn", "⭕", "Vẽ hình tròn", "Vẽ một vòng tròn!"],
  ["Gõ trống", "🥁", "Gõ trống vui", "Gõ trống theo nhịp!"],
  ["Nghe sáo", "🎵", "Nghe tiếng sáo", "Nghe nhạc dịu dàng!"],
  ["Dán sao", "⭐", "Dán ngôi sao", "Dán sao lên tranh!"]
];
arts.forEach(([name, em, speak, teach], i) => {
  const others = arts.filter((_, j) => j !== i).slice(0, 2).map((x) => x[0]);
  const set = [name, ...others].slice(0, 2);
  addLesson(
    "hoa-si",
    "hs-" + slug(name),
    name,
    em,
    speak,
    teach,
    set,
    set.indexOf(name)
  );
});

const dance = {
  id: "nhay-mua",
  title: "Sân Nhảy Múa",
  shortName: "Sân Nhảy",
  mapName: "Sân Nhảy Múa",
  emoji: "💃",
  emojiBig: "💃🎵👏",
  color: "#e64980",
  cardBg: "#ffdeeb",
  helper: "dom-dom",
  speakName: "Sân Nhảy Múa",
  starsMax: 3
};
const art = {
  id: "hoa-si",
  title: "Góc Họa Sĩ",
  shortName: "Họa Sĩ",
  mapName: "Góc Họa Sĩ",
  emoji: "🎨",
  emojiBig: "🎨🖌️🌈",
  color: "#ae3ec9",
  cardBg: "#f3d9fa",
  helper: "be-gau",
  speakName: "Góc Họa Sĩ",
  starsMax: 3
};
data.topics.push(dance, art);

const pathOrder = [
  "mau",
  "hinh",
  "so",
  "chu",
  "dong-vat",
  "trai-cay",
  "do-vat",
  "cam-xuc",
  "phuong-tien",
  "nhay-mua",
  "hoa-si"
];
data.topics = pathOrder.map((id, i) => {
  const t = data.topics.find((x) => x.id === id);
  return {
    ...t,
    order: i + 1,
    lessonCount: data.lessons.filter((l) => l.topicId === id).length
  };
});

data.map = {
  title: "Bản đồ tri thức",
  promptSpeak: "Bản đồ tri thức đây rồi! Hôm nay bé muốn đi đâu nào?",
  promptText: "Hôm nay bé muốn đi đâu nào?"
};

fs.writeFileSync(
  path.join(root, "content", "curriculum", "lessons.json"),
  JSON.stringify(data, null, 2)
);
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);

console.log(
  data.topics
    .map((t) => `${t.order}. ${t.mapName} ${t.emoji} (${t.lessonCount})`)
    .join("\n")
);
console.log("total lessons", data.lessons.length);
