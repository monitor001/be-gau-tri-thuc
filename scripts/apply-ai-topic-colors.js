/**
 * Gắn ảnh AI đúng chủ thể × màu (mô hình giống mục quả).
 * Thư mục: assets/explore/{folder}/{lessonId}-{colorId}.jpg
 *
 * node scripts/apply-ai-topic-colors.js [topicId|all]
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const cursorAssets = path.join(
  process.env.USERPROFILE || "",
  ".cursor",
  "projects",
  "d-APP-tre-duoi-5-tuoi",
  "assets"
);

const COLORS_META = [
  { id: "do", name: "đỏ", hex: "#e03131" },
  { id: "vang", name: "vàng", hex: "#ffd43b" },
  { id: "xanh-duong", name: "xanh dương", hex: "#1c7ed6" },
  { id: "xanh-la", name: "xanh lá", hex: "#2f9e44" },
  { id: "cam", name: "cam", hex: "#f76707" },
  { id: "tim", name: "tím", hex: "#9c36b5" }
];

const TOPIC_CFG = {
  "trai-cay": {
    folder: "trai-cay",
    article: (name) => `Quả ${name}`,
    teach: (name) => `Đây là quả ${name}. ${name} có nhiều màu! Bé nhìn nào!`,
    friendColor: {
      "tc-tao": "do",
      "tc-chuoi": "vang",
      "tc-cam": "cam",
      "tc-xoai": "vang",
      "tc-dua-hau": "xanh-la",
      "tc-nho": "tim",
      "tc-dau": "do",
      "tc-dua": "vang"
    }
  },
  hinh: {
    folder: "hinh-khoi",
    article: (name) => `Hình ${name}`,
    teach: (name) => `Đây là hình ${name}. Hình ${name} có nhiều màu! Bé nhìn nào!`,
    friendColor: {
      "hinh-circle": "cam",
      "hinh-square": "xanh-duong",
      "hinh-triangle": "xanh-la",
      "hinh-rect": "tim",
      "hinh-star": "vang",
      "hinh-heart": "do",
      "hinh-oval": "xanh-duong"
    }
  },
  "dong-vat": {
    folder: "dong-vat",
    article: (name) => `Con ${name}`,
    teach: (name) => `Đây là con ${name}. ${name} có nhiều màu! Bé nhìn nào!`,
    friendColor: {
      "dv-meo": "cam",
      "dv-cho": "cam",
      "dv-ga": "vang",
      "dv-bo": "cam",
      "dv-heo": "cam",
      "dv-vit": "vang",
      "dv-tho": "vang",
      "dv-ca": "xanh-duong",
      "dv-chim": "cam",
      "dv-ho": "cam",
      "dv-voi": "xanh-duong",
      "dv-khi": "cam"
    }
  },
  "do-vat": {
    folder: "do-vat",
    article: (name) => name,
    teach: (name) => `Đây là ${name}. ${name} có nhiều màu! Bé nhìn nào!`,
    friendColor: {
      "dvat-bong": "xanh-la",
      "dvat-sach": "cam",
      "dvat-coc": "xanh-duong",
      "dvat-thia": "vang",
      "dvat-mu": "cam",
      "dvat-giay": "do",
      "dvat-xe-hoi": "do",
      "dvat-xe-dap": "xanh-duong",
      "dvat-tui": "cam",
      "dvat-ghe": "cam",
      "dvat-giuong": "xanh-duong",
      "dvat-ban-chai": "xanh-la"
    }
  },
  "phuong-tien": {
    folder: "phuong-tien",
    article: (name) => name,
    teach: (name) => `Đây là ${name}. ${name} có nhiều màu! Bé nhìn nào!`,
    friendColor: {
      "pt-xe-buyt": "vang",
      "pt-may-bay": "xanh-duong",
      "pt-tau-lua": "do",
      "pt-thuyen": "xanh-duong",
      "pt-xe-may": "do",
      "pt-truc-thang": "xanh-duong"
    }
  }
};

function shapeShortTitle(lesson) {
  const t = (lesson.title || "").replace(/^Hình\s+/i, "").trim();
  return t || lesson.title;
}

function subjectName(lesson) {
  if (lesson.topicId === "hinh") return shapeShortTitle(lesson);
  return (lesson.title || "Bạn").trim();
}

function imgPath(folder, lessonId, colorId) {
  return `assets/explore/${folder}/${lessonId}-${colorId}.jpg`;
}

function existsRel(rel) {
  return fs.existsSync(path.join(root, rel.replace(/\//g, path.sep)));
}

function copyFromCursor(name, dest) {
  const src = path.join(cursorAssets, name);
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    return true;
  }
  return false;
}

function applyTopic(data, topicId) {
  const cfg = TOPIC_CFG[topicId];
  if (!cfg) return 0;
  const outDir = path.join(root, "assets", "explore", cfg.folder);
  fs.mkdirSync(outDir, { recursive: true });

  let n = 0;
  data.lessons.forEach((l) => {
    if (l.topicId !== topicId) return;
    const name = subjectName(l);
    const emoji = l.emoji || "⭐";

    COLORS_META.forEach((c) => {
      const file = `${l.id}-${c.id}.jpg`;
      const dest = path.join(outDir, file);
      if (!fs.existsSync(dest)) {
        copyFromCursor(file, dest);
      }
    });

    l.exploreItems = COLORS_META.map((c) => {
      const rel = imgPath(cfg.folder, l.id, c.id);
      if (!existsRel(rel)) {
        throw new Error(`Thiếu ảnh AI: ${rel} (chạy gen hoặc copy vào ${cursorAssets})`);
      }
      const label =
        topicId === "hinh"
          ? `Hình ${name.toLowerCase()} ${c.name}`
          : `${name} ${c.name}`;
      return {
        emoji,
        label,
        speakLine: `${name} màu ${c.name}`,
        speakColor: c.name,
        tint: c.hex,
        colorId: c.id,
        img: rel,
        recolor: false,
        source: "ai-topic-color"
      };
    });

    l.exploreHint = `Chạm từng ${name.toLowerCase()} màu khác nhau nhé!`;
    l.teachText = cfg.teach(name);
    if (l.story) {
      l.story.exploreLine = `Nhìn ${name} màu đỏ, vàng, xanh… nào!`;
    }
    const fc = (cfg.friendColor && cfg.friendColor[l.id]) || "vang";
    const fmeta = COLORS_META.find((x) => x.id === fc);
    const fimg = imgPath(cfg.folder, l.id, fc);
    if (l.friend) {
      l.friend.img = fimg;
      if (fmeta) l.friend.tint = fmeta.hex;
    }
    l.mapImg = fimg;
    n += 1;
  });
  return n;
}

const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const arg = process.argv[2] || "all";
const topics =
  arg === "all" ? Object.keys(TOPIC_CFG) : [arg].filter((t) => TOPIC_CFG[t]);

let total = 0;
const errors = [];
topics.forEach((t) => {
  try {
    const n = applyTopic(data, t);
    console.log("Applied", t, n, "lessons");
    total += n;
  } catch (e) {
    errors.push(`${t}: ${e.message}`);
  }
});

if (errors.length) {
  console.error("Lỗi:\n", errors.join("\n"));
  process.exit(1);
}

data.contentCouncil = {
  ...(data.contentCouncil || {}),
  aiTopicColors: topics,
  aiTopicColorsAt: new Date().toISOString()
};

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);
console.log("Total lessons updated:", total);
