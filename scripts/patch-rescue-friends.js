/**
 * Gắn story giải cứu + friend cho 8 bài màu (Cô Sương dịu dàng).
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const STORIES = {
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
    friend: { id: "ban-vang", name: "Bạn Vàng", emoji: "🌟", tint: "#ffd43b" },
    story: {
      theme: "rescue-yellow",
      intro: "Cô Sương đang giữ Bạn Vàng. Bé đấu trí nhẹ để cứu bạn nhé!",
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

data.lessons.forEach((lesson) => {
  const pack = STORIES[lesson.id];
  if (!pack) return;
  lesson.friend = pack.friend;
  lesson.story = pack.story;
  if (pack.story.intro) lesson.teachText = pack.story.intro + " " + (lesson.teachText || "");
});

const shopPath = path.join(root, "content", "economy", "shop.json");
const shop = JSON.parse(fs.readFileSync(shopPath, "utf8"));
data.shop = shop.items || shop;

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);
console.log("Patched rescue stories for", Object.keys(STORIES).length, "color lessons");
