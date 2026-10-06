/**
 * Gắn friend + story giải cứu (Cô Sương) cho mọi bài / mọi map.
 * Không nhân đôi teachText khi chạy lại.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const TOPIC_META = {
  mau: {
    explore: (f, short) => `Nhìn những món màu của ${f} nào!`,
    gateHint: (short) => `Bóng nào màu ${short}?`,
    themePrefix: "rescue"
  },
  hinh: {
    explore: (f) => `Cùng nhìn hình của ${f} nào!`,
    gateHint: (short) => `Đâu là hình ${short}?`,
    theme: "topic-hinh"
  },
  so: {
    explore: (f) => `Cùng đếm với ${f} nào!`,
    gateHint: (short) => `Đâu là số ${short}?`,
    theme: "topic-so"
  },
  chu: {
    explore: (f) => `Cùng nhìn chữ của ${f} nào!`,
    gateHint: (short) => `Đâu là chữ ${short}?`,
    theme: "topic-chu"
  },
  "dong-vat": {
    explore: (f) => `Chào ${f} nào!`,
    gateHint: (short) => `Đâu là ${short}?`,
    theme: "topic-dong-vat"
  },
  "trai-cay": {
    explore: (f) => `Nhìn quả của ${f} nào!`,
    gateHint: (short) => `Đâu là ${short}?`,
    theme: "topic-trai-cay"
  },
  "do-vat": {
    explore: (f) => `Nhìn đồ của ${f} nào!`,
    gateHint: (short) => `Đâu là ${short}?`,
    theme: "topic-do-vat"
  },
  "cam-xuc": {
    explore: (f) => `Cảm nhận cùng ${f} nào!`,
    gateHint: (short) => `Đâu là cảm xúc ${short}?`,
    theme: "topic-cam-xuc"
  },
  "phuong-tien": {
    explore: (f) => `Nhìn xe của ${f} nào!`,
    gateHint: (short) => `Đâu là ${short}?`,
    theme: "topic-phuong-tien"
  },
  "nhay-mua": {
    explore: (f) => `Nhảy cùng ${f} nào!`,
    gateHint: (short) => `Đâu là động tác ${short}?`,
    theme: "topic-nhay-mua"
  },
  "hoa-si": {
    explore: (f) => `Tô màu cùng ${f} nào!`,
    gateHint: (short) => `Đâu là ${short}?`,
    theme: "topic-hoa-si"
  }
};

/** Story màu đã tinh chỉnh — giữ nguyên nếu có */
const COLOR_STORIES = {
  "mau-do": {
    friend: { id: "ban-do", name: "Bạn Đỏ", emoji: "🍎", tint: "#e03131" },
    story: {
      theme: "rescue-red",
      intro: "Cô Sương đố vui! Bé giúp giải cứu Bạn Đỏ nhé!",
      exploreLine: "Nhìn những món màu đỏ của Bạn Đỏ nào!",
      gateLine: "Câu đố đây! Bóng nào màu đỏ?",
      winLine: "Bạn Đỏ được giải cứu rồi!"
    }
  },
  "mau-vang": {
    friend: { id: "ban-vang", name: "Bạn Vàng", emoji: "🍌", tint: "#ffd43b" },
    story: {
      theme: "rescue-yellow",
      intro: "Cô Sương đố vui! Bé giúp Bạn Vàng nhé!",
      exploreLine: "Nhìn những món màu vàng của Bạn Vàng nào!",
      gateLine: "Câu đố của Cô Sương! Bóng nào màu vàng?",
      winLine: "Yay! Bạn Vàng về với bé rồi!"
    }
  },
  "mau-xanh-duong": {
    friend: { id: "ban-xanh-duong", name: "Bạn Xanh dương", emoji: "🐋", tint: "#3da9fc" },
    story: {
      theme: "rescue-blue",
      intro: "Cô Sương đố vui! Cứu Bạn Xanh dương nào!",
      exploreLine: "Nhìn những món màu xanh dương nào!",
      gateLine: "Bóng nào màu xanh dương?",
      winLine: "Bạn Xanh dương được giải cứu!"
    }
  },
  "mau-xanh-la": {
    friend: { id: "ban-xanh-la", name: "Bạn Xanh lá", emoji: "🐸", tint: "#2f9e44" },
    story: {
      theme: "rescue-green",
      intro: "Cứu Bạn Xanh lá cùng Cô Sương đố vui!",
      exploreLine: "Nhìn những món màu xanh lá nào!",
      gateLine: "Bóng nào màu xanh lá?",
      winLine: "Bạn Xanh lá vui quá!"
    }
  },
  "mau-cam": {
    friend: { id: "ban-cam", name: "Bạn Cam", emoji: "🍊", tint: "#f76707" },
    story: {
      theme: "rescue-orange",
      intro: "Cứu Bạn Cam nào!",
      exploreLine: "Nhìn những món màu cam nào!",
      gateLine: "Bóng nào màu cam?",
      winLine: "Bạn Cam được giải cứu!"
    }
  },
  "mau-tim": {
    friend: { id: "ban-tim", name: "Bạn Tím", emoji: "🍇", tint: "#9c36b5" },
    story: {
      theme: "rescue-purple",
      intro: "Cứu Bạn Tím nào!",
      exploreLine: "Nhìn những món màu tím nào!",
      gateLine: "Bóng nào màu tím?",
      winLine: "Bạn Tím về rồi!"
    }
  },
  "mau-hong": {
    friend: { id: "ban-hong", name: "Bạn Hồng", emoji: "🐷", tint: "#f06595" },
    story: {
      theme: "rescue-pink",
      intro: "Cứu Bạn Hồng nào!",
      exploreLine: "Nhìn những món màu hồng nào!",
      gateLine: "Bóng nào màu hồng?",
      winLine: "Bạn Hồng được giải cứu!"
    }
  },
  "mau-nau": {
    friend: { id: "ban-nau", name: "Bạn Nâu", emoji: "🧸", tint: "#8b5a2b" },
    story: {
      theme: "rescue-brown",
      intro: "Cứu Bạn Nâu nào!",
      exploreLine: "Nhìn những món màu nâu nào!",
      gateLine: "Bóng nào màu nâu?",
      winLine: "Bạn Nâu vui lắm!"
    }
  }
};

const topicById = Object.fromEntries((data.topics || []).map((t) => [t.id, t]));

function shortTitle(lesson) {
  let t = (lesson.title || "").trim();
  t = t.replace(/^Hình\s+/i, "");
  t = t.replace(/^Số\s+(\d+)\s*[—–-].*$/i, "$1");
  t = t.replace(/^Chữ\s+/i, "");
  t = t.replace(/^Cảm xúc\s+/i, "");
  return t || lesson.title || "bạn";
}

function friendName(lesson) {
  const short = shortTitle(lesson);
  if (lesson.topicId === "chu") return `Bạn Chữ ${short}`;
  if (lesson.topicId === "so") return `Bạn Số ${short}`;
  if (lesson.topicId === "hinh") return `Bạn ${short}`;
  if (lesson.topicId === "cam-xuc") return `Bạn ${short}`;
  if (lesson.topicId === "nhay-mua") return `Bạn ${short}`;
  if (lesson.topicId === "hoa-si") return `Bạn ${short}`;
  return `Bạn ${short}`;
}

function friendId(lesson) {
  return `ban-${lesson.id}`;
}

function gatePrompt(lesson) {
  const g = lesson.gate || {};
  if (g.promptVi) return g.promptVi;
  if (Array.isArray(g.questions) && g.questions[0]?.promptVi) return g.questions[0].promptVi;
  return "";
}

function buildPack(lesson) {
  const preset = COLOR_STORIES[lesson.id];
  if (preset) return preset;

  const topic = topicById[lesson.topicId] || {};
  const meta = TOPIC_META[lesson.topicId] || {
    explore: (f) => `Cùng khám phá với ${f} nào!`,
    gateHint: () => "Trả lời đúng để cứu bạn!",
    theme: `topic-${lesson.topicId || "default"}`
  };
  const name = friendName(lesson);
  const short = shortTitle(lesson);
  const tint = topic.color || "#ffc857";
  const emoji = lesson.emoji || "⭐";
  const prompt = gatePrompt(lesson);
  const gateLine = prompt
    ? `Câu đố của Cô Sương! ${prompt}`
    : `Câu đố của Cô Sương! ${meta.gateHint(short)}`;

  return {
    friend: {
      id: friendId(lesson),
      name,
      emoji,
      tint
    },
    story: {
      theme: meta.theme || `topic-${lesson.topicId}`,
      intro: `Cô Sương đố vui! Bé giúp giải cứu ${name} nhé!`,
      exploreLine: meta.explore(name, short),
      gateLine,
      winLine: `Yay! ${name} được giải cứu rồi!`
    }
  };
}

let patched = 0;
data.lessons.forEach((lesson) => {
  const pack = buildPack(lesson);
  lesson.friend = pack.friend;
  lesson.story = pack.story;
  patched += 1;
});

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

const withStory = data.lessons.filter((l) => l.friend && l.story).length;
console.log(`Patched rescue for ${patched} lessons (${withStory} with friend+story)`);
const byTopic = {};
data.lessons.forEach((l) => {
  byTopic[l.topicId] = (byTopic[l.topicId] || 0) + 1;
});
console.log(byTopic);
