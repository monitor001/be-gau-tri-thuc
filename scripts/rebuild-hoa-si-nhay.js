/**
 * Rebuild Góc Họa Sĩ + Sân Nhảy — 1 bài = 1 hành động rõ cho trẻ 2–5.
 * Bỏ filler "Bảng màu/Cọ vẽ/Nhạc vui/Bé Gấu" trùng ảnh.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const nghe = fs.existsSync(path.join(root, "assets/explore/ai/shared-nghe.jpg"))
  ? "assets/explore/ai/shared-nghe.jpg"
  : null;

function hero(id) {
  const rel = `assets/explore/ai/${id}.jpg`;
  return fs.existsSync(path.join(root, rel.replace(/\//g, path.sep))) ? rel : null;
}

const HOA_SI = {
  "hs-to-do": {
    title: "Tô đỏ",
    emoji: "🔴",
    teach: "Bé tô màu đỏ nào!",
    speak: "Tô đỏ",
    hint: "Chạm tô đỏ và nghe nhé!",
    explore: [
      { label: "Tô đỏ", speak: "Tô màu đỏ" },
      { label: "Màu đỏ", speak: "Đây là màu đỏ" },
      { label: "Nói tô đỏ", speak: "Tô đỏ", listen: true }
    ],
    gate: { promptVi: "Đâu là tô màu đỏ?", choices: ["Tô đỏ", "Tô vàng"], correctIndex: 0 }
  },
  "hs-to-vang": {
    title: "Tô vàng",
    emoji: "🟡",
    teach: "Bé tô màu vàng nào!",
    speak: "Tô vàng",
    hint: "Chạm tô vàng và nghe nhé!",
    explore: [
      { label: "Tô vàng", speak: "Tô màu vàng" },
      { label: "Màu vàng", speak: "Đây là màu vàng" },
      { label: "Nói tô vàng", speak: "Tô vàng", listen: true }
    ],
    gate: { promptVi: "Đâu là tô màu vàng?", choices: ["Tô vàng", "Tô đỏ"], correctIndex: 0 }
  },
  "hs-ve-vong-tron": {
    title: "Vẽ tròn",
    emoji: "⭕",
    teach: "Bé vẽ hình tròn nào!",
    speak: "Vẽ tròn",
    hint: "Chạm vẽ tròn và nghe nhé!",
    explore: [
      { label: "Vẽ tròn", speak: "Vẽ hình tròn" },
      { label: "Hình tròn", speak: "Đây là hình tròn" },
      { label: "Nói vẽ tròn", speak: "Vẽ tròn", listen: true }
    ],
    gate: { promptVi: "Đâu là vẽ hình tròn?", choices: ["Vẽ tròn", "Tô đỏ"], correctIndex: 0 }
  },
  "hs-go-trong": {
    title: "Gõ trống",
    emoji: "🥁",
    teach: "Bé gõ trống vui nào!",
    speak: "Gõ trống",
    hint: "Chạm trống và nghe nhé!",
    explore: [
      { label: "Gõ trống", speak: "Gõ trống nào" },
      { label: "Trống", speak: "Đây là trống" },
      { label: "Nói gõ trống", speak: "Gõ trống", listen: true }
    ],
    gate: { promptVi: "Đâu là gõ trống?", choices: ["Gõ trống", "Tô đỏ"], correctIndex: 0 }
  },
  "hs-nghe-sao": {
    title: "Bảng màu",
    emoji: "🎨",
    teach: "Đây là bảng màu. Bé nhìn màu nào!",
    speak: "Bảng màu",
    hint: "Chạm bảng màu và nghe nhé!",
    explore: [
      { label: "Bảng màu", speak: "Đây là bảng màu" },
      { label: "Cọ vẽ", speak: "Cọ để tô màu", img: "assets/explore/ai/hs-co-ve.svg" },
      { label: "Nói bảng màu", speak: "Bảng màu", listen: true }
    ],
    gate: { promptVi: "Đâu là bảng màu?", choices: ["Bảng màu", "Trống"], correctIndex: 0 }
  },
  "hs-dan-sao": {
    title: "Dán sao",
    emoji: "⭐",
    teach: "Bé dán ngôi sao nào!",
    speak: "Dán sao",
    hint: "Chạm ngôi sao và nghe nhé!",
    explore: [
      { label: "Dán sao", speak: "Dán ngôi sao" },
      { label: "Ngôi sao", speak: "Đây là ngôi sao" },
      { label: "Nói dán sao", speak: "Dán sao", listen: true }
    ],
    gate: { promptVi: "Đâu là dán sao?", choices: ["Dán sao", "Tô đỏ"], correctIndex: 0 }
  }
};

const NHAY = {
  "nm-vo-tay": {
    title: "Vỗ tay",
    emoji: "👏",
    teach: "Bé vỗ tay nào!",
    speak: "Vỗ tay",
    hint: "Chạm vỗ tay và làm theo nhé!",
    explore: [
      { label: "Vỗ tay", speak: "Vỗ tay nào" },
      { label: "Hai tay", speak: "Vỗ hai tay" },
      { label: "Nói vỗ tay", speak: "Vỗ tay", listen: true }
    ],
    gate: { promptVi: "Đâu là vỗ tay?", choices: ["Vỗ tay", "Nhún chân"], correctIndex: 0 }
  },
  "nm-nhun-chan": {
    title: "Nhún chân",
    emoji: "🦶",
    teach: "Bé nhún chân nhẹ nào!",
    speak: "Nhún chân",
    hint: "Chạm nhún chân và làm theo nhé!",
    explore: [
      { label: "Nhún chân", speak: "Nhún chân nào" },
      { label: "Chân nhún", speak: "Chân nhún nhẹ" },
      { label: "Nói nhún chân", speak: "Nhún chân", listen: true }
    ],
    gate: { promptVi: "Đâu là nhún chân?", choices: ["Nhún chân", "Vỗ tay"], correctIndex: 0 }
  },
  "nm-xoay-tron": {
    title: "Xoay tròn",
    emoji: "🔄",
    teach: "Bé xoay tròn nhẹ nào!",
    speak: "Xoay tròn",
    hint: "Chạm xoay tròn và làm theo nhé!",
    explore: [
      { label: "Xoay tròn", speak: "Xoay tròn nào" },
      { label: "Quay vòng", speak: "Quay vòng vui" },
      { label: "Nói xoay tròn", speak: "Xoay tròn", listen: true }
    ],
    gate: { promptVi: "Đâu là xoay tròn?", choices: ["Xoay tròn", "Vỗ tay"], correctIndex: 0 }
  },
  "nm-gio-tay-cao": {
    title: "Giơ tay",
    emoji: "🙌",
    teach: "Bé giơ tay cao nào!",
    speak: "Giơ tay cao",
    hint: "Chạm giơ tay và làm theo nhé!",
    explore: [
      { label: "Giơ tay", speak: "Giơ tay cao nào" },
      { label: "Tay cao", speak: "Hai tay cao" },
      { label: "Nói giơ tay", speak: "Giơ tay cao", listen: true }
    ],
    gate: { promptVi: "Đâu là giơ tay cao?", choices: ["Giơ tay", "Vỗ tay"], correctIndex: 0 }
  },
  "nm-nhay-nhe": {
    title: "Nhảy nhẹ",
    emoji: "🐰",
    teach: "Bé nhảy nhẹ như thỏ nào!",
    speak: "Nhảy nhẹ",
    hint: "Chạm nhảy nhẹ và làm theo nhé!",
    explore: [
      { label: "Nhảy nhẹ", speak: "Nhảy nhẹ nào" },
      { label: "Nhảy như thỏ", speak: "Nhảy như thỏ" },
      { label: "Nói nhảy nhẹ", speak: "Nhảy nhẹ", listen: true }
    ],
    gate: { promptVi: "Đâu là nhảy nhẹ?", choices: ["Nhảy nhẹ", "Vỗ tay"], correctIndex: 0 }
  },
  "nm-lac-lu": {
    title: "Lắc lư",
    emoji: "🎵",
    teach: "Bé lắc lư vui nào!",
    speak: "Lắc lư",
    hint: "Chạm lắc lư và làm theo nhé!",
    explore: [
      { label: "Lắc lư", speak: "Lắc lư nào" },
      { label: "Lắc người", speak: "Lắc người vui" },
      { label: "Nói lắc lư", speak: "Lắc lư", listen: true }
    ],
    gate: { promptVi: "Đâu là lắc lư?", choices: ["Lắc lư", "Vỗ tay"], correctIndex: 0 }
  }
};

function apply(topicId, map) {
  let n = 0;
  data.lessons.forEach((l) => {
    if (l.topicId !== topicId) return;
    const cfg = map[l.id];
    if (!cfg) return;
    const img = hero(l.id);
    l.title = cfg.title;
    l.emoji = cfg.emoji;
    l.speakText = cfg.speak;
    l.teachText = cfg.teach;
    l.exploreHint = cfg.hint;
    l.gate = cfg.gate;
    if (img) l.mapImg = img;
    if (l.friend) {
      l.friend.name = `Bạn ${cfg.title}`;
      l.friend.emoji = cfg.emoji;
      if (img) l.friend.img = img;
    }
    if (l.story) {
      l.story.intro = "Bạn Gấu ơi, cứu mình với!";
      l.story.exploreLine = cfg.hint.replace(/nhé!$/, "với mình nào!");
      l.story.gateLine = `${cfg.gate.promptVi} Giúp mình với!`;
      l.story.winLine = `Cảm ơn Bạn Gấu! Bạn ${cfg.title} về rồi!`;
    }
    l.exploreItems = cfg.explore.map((it) => ({
      emoji: it.listen ? "👂" : cfg.emoji,
      label: it.label,
      speakLine: it.speak,
      img: it.listen ? nghe || img : it.img || img || undefined,
      source: it.img ? "geometry-svg-vis" : "toddler-clear-v1"
    }));
    n += 1;
  });
  return n;
}

const a = apply("hoa-si", HOA_SI);
const b = apply("nhay-mua", NHAY);

data.contentCouncil = {
  ...(data.contentCouncil || {}),
  hoaSiNhayModel: "one-action-clear",
  hoaSiNhayAt: new Date().toISOString()
};

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);
console.log("hoa-si:", a, "nhay-mua:", b);
