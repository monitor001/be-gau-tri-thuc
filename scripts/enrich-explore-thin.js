/**
 * Bổ sung exploreItems (2–4 món) cho bài ngoài màu còn mỏng — Hội đồng ND.
 * Không đụng topic mau (canonical).
 */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const EXTRA = {
  "dong-vat": (l) => [
    { emoji: l.emoji, label: l.title, speakLine: l.speakText || `Đây là ${l.title}` },
    { emoji: "🏠", label: "Nhà bạn", speakLine: `${l.title} về nhà vui` },
    { emoji: "💛", label: "Bạn thân", speakLine: `${l.title} là bạn của bé` }
  ],
  "trai-cay": (l) => [
    { emoji: l.emoji, label: l.title, speakLine: l.speakText || `Đây là quả ${l.title}` },
    { emoji: "🧺", label: "Giỏ quả", speakLine: `Bỏ ${l.title} vào giỏ` },
    { emoji: "😋", label: "Ngon", speakLine: `${l.title} ngon lành` }
  ],
  "do-vat": (l) => [
    { emoji: l.emoji, label: l.title, speakLine: l.speakText || `Đây là ${l.title}` },
    { emoji: "👆", label: "Chạm", speakLine: `Chạm vào ${l.title}` },
    { emoji: "🏠", label: "Trong nhà", speakLine: `${l.title} ở trong nhà` }
  ],
  "cam-xuc": (l) => [
    { emoji: l.emoji, label: l.title, speakLine: l.speakText || `Cảm xúc ${l.title}` },
    { emoji: "🪞", label: "So gương", speakLine: `Mặt ${l.title} như thế này` },
    { emoji: "🤗", label: "Ôm bé", speakLine: `Bé cảm thấy ${l.title}` }
  ],
  "phuong-tien": (l) => [
    { emoji: l.emoji, label: l.title, speakLine: l.speakText || `Đây là ${l.title}` },
    { emoji: "🛣️", label: "Đường đi", speakLine: `${l.title} đi trên đường` },
    { emoji: "👋", label: "Vẫy tay", speakLine: `Vẫy tay chào ${l.title}` }
  ],
  "nhay-mua": (l) => [
    { emoji: l.emoji, label: l.title, speakLine: l.speakText || l.title },
    { emoji: "🎵", label: "Nhạc vui", speakLine: `Nhạc vui cùng ${l.title}` },
    { emoji: "🐻", label: "Bé Gấu", speakLine: `Bé Gấu cùng ${l.title}` }
  ],
  "hoa-si": (l) => [
    { emoji: l.emoji, label: l.title, speakLine: l.speakText || l.title },
    { emoji: "🎨", label: "Bảng màu", speakLine: "Bảng màu của họa sĩ" },
    { emoji: "🖌️", label: "Cọ vẽ", speakLine: "Cọ vẽ của họa sĩ" }
  ]
};

let n = 0;
data.lessons.forEach((l) => {
  if (l.topicId === "mau" || l.topicId === "hinh" || l.topicId === "so" || l.topicId === "chu") return;
  const fn = EXTRA[l.topicId];
  if (!fn) return;
  const items = fn(l);
  const thin = !l.exploreItems || l.exploreItems.length < 2;
  if (thin || l.exploreItems.length < 3) {
    l.exploreItems = items;
    l.exploreHint = l.exploreHint || "Chạm hình và nghe trợ lý nhé!";
    n += 1;
  }
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
console.log("Enriched explore for", n, "lessons");
