/**
 * Chuyên gia Giáo dục — thẩm định toàn kho 11 chủ đề / 110 bài
 * ND-PEDA + ND-VIS + ND-CURR heuristics trên lessons.json
 * Chạy: node scripts/tham-dinh-toan-kho.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const data = JSON.parse(
  fs.readFileSync(path.join(root, "content", "curriculum", "lessons.json"), "utf8")
);
let canon = {};
const canonPath = path.join(root, "content", "curriculum", "color-explore-canonical.json");
if (fs.existsSync(canonPath)) {
  canon = JSON.parse(fs.readFileSync(canonPath, "utf8"));
}

const findings = [];
const push = (level, topicId, lessonId, msg, seat = "ND-VIS") =>
  findings.push({ level, topicId, lessonId, msg, seat });

const topicMeta = Object.fromEntries(data.topics.map((t) => [t.id, t]));

data.lessons.forEach((l) => {
  const tid = l.topicId;
  const ex = l.exploreItems || [];

  if (ex.length < 2) push(1, tid, l.id, "exploreItems < 2", "ND-CURR");
  if (!l.friend?.emoji) push(2, tid, l.id, "friend thiếu emoji (nhận diện captive)", "ND-VIS");
  if (!l.story?.intro) push(1, tid, l.id, "thiếu story.intro", "ND-VOICE");

  ex.forEach((it) => {
    if (it.img) {
      const assetPath = path.join(root, it.img.replace(/\//g, path.sep));
      if (!fs.existsSync(assetPath)) push(1, tid, l.id, `thiếu file minh họa: ${it.img}`, "ND-VIS");
    }
    if (!it.emoji && !it.img) push(1, tid, l.id, `explore không emoji/img: ${it.label}`, "ND-VIS");
  });

  const qs = Array.isArray(l.gate?.questions)
    ? l.gate.questions
    : l.gate
      ? [l.gate]
      : [];
  qs.forEach((q, i) => {
    if (/Bé chọn đúng nào/i.test(q.promptVi || "")) {
      push(2, tid, l.id, `prompt gate mơ hồ #${i}`, "ND-PEDA");
    }
    if (!q.hideLabels && Array.isArray(q.choices)) {
      q.choices.forEach((c, ci) => {
        const lab = typeof c === "string" ? c : c.label || c.speak || "";
        if (!lab && !(c && (c.emoji || c.color))) {
          push(2, tid, l.id, `gate choice thiếu nhận diện #${i}.${ci}`, "ND-VIS");
        }
      });
    }
  });

  if (l.id === "mau-vang") {
    const vit = ex.find((x) => /vịt/i.test(x.label || ""));
    if (vit && /🦆/.test(vit.emoji || "") && !vit.img) {
      push(1, tid, l.id, "vịt trời không vàng", "ND-VIS");
    }
  }

  if (tid === "chu") {
    const letter = l.title.replace(/^Chữ\s+/i, "").trim();
    const first = ex[0];
    if (first && !new RegExp(letter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(first.label || "")) {
      push(2, tid, l.id, `explore[0] nhãn không khớp chữ ${letter}`, "ND-CURR");
    }
    if (l.emoji === "🦆") push(2, tid, l.id, "emoji bài chữ là vịt trời", "ND-VIS");
  }

  if (tid === "hinh" && /Oval/i.test(l.title)) push(1, tid, l.id, "tên Oval chưa Việt hóa", "ND-PEDA");
  if (l.id === "hinh-rect" && /Bạn nhật/i.test(l.friend?.name || "")) {
    push(1, tid, l.id, "friend.name cắt cụt", "ND-VIS");
  }

  if (tid === "so") {
    const num = l.id.replace("so-", "");
    const blob = ex.map((x) => x.label).join(" ");
    if (!blob.includes(num)) push(2, tid, l.id, `explore không nhắc số ${num}`, "ND-PEDA");
  }

  if (tid === "phuong-tien") {
    const title = (l.title || "").toLowerCase();
    const teach = (l.teachText || "").toLowerCase();
    if (/xe chạy vui/.test(teach) && !/xe|tàu|thuyền|máy bay|ô tô/.test(title)) {
      push(2, tid, l.id, "teachText copy 'Xe chạy vui'", "ND-PEDA");
    }
  }

  if (l.id === "chu-p" && /phở/i.test(l.teachText || "")) {
    push(1, tid, l.id, "P dạy sai (phở)", "ND-PEDA");
  }

  const teachLen = (l.teachText || "").split(/\s+/).length;
  if (teachLen > 25) push(2, tid, l.id, `teachText dài (${teachLen} từ) — trẻ 2–3 khó nghe hết`, "ND-PEDA");
});

data.topics.forEach((t) => {
  if (/🦆/.test(t.emoji || "") || /🦆/.test(t.emojiBig || "")) {
    push(2, t.id, "topic", "icon chủ đề có vịt trời", "ND-VIS");
  }
  const count = data.lessons.filter((l) => l.topicId === t.id).length;
  if (t.lessonCount !== count) {
    push(1, t.id, "topic", `lessonCount ${t.lessonCount} != thực tế ${count}`, "ND-CURR");
  }
});

Object.keys(canon).forEach((id) => {
  if (id.startsWith("_")) return;
  const lesson = data.lessons.find((l) => l.id === id);
  if (!lesson) return;
  const a = JSON.stringify((lesson.exploreItems || []).map((x) => x.label));
  const b = JSON.stringify(canon[id].map((x) => x.label));
  if (a !== b) push(1, "mau", id, "explore lệch color-explore-canonical.json", "ND-CURR");
});

/** Ghi chú thẩm định thủ công đã thống nhất hội đồng (Mức 3) */
const CHU_WEAK_EMOJI = {
  "chu-ab": "cơm 🍚 không gắn Â",
  "chu-ac": "cà phê ☕ không gắn Â",
  "chu-dd": "bóng đèn 💡 không gắn Đ",
  "chu-e": "em bé 👶 không gắn E",
  "chu-ec": "giường 🛏️ không gắn Ê",
  "chu-i": "giấy 📄 không gắn I",
  "chu-om": "xe 🚗 không gắn Ô",
  "chu-ox": "ngạc nhiên 😮 không gắn Ơ",
  "chu-q": "quạt 🪭 hiếm — trẻ khó đoán Q",
  "chu-uw": "gương 🪞 không gắn Ư",
};

const visNotes = [
  { id: "mau-vang", msg: "Hoa mai dùng emoji cúc trắng — che chữ dễ lẫn; nên SVG hoa mai vàng" },
  { id: "mau-vang", msg: "Xoài chín emoji đỏ-cam — đúng quả, ít gợi ý vàng thuần" },
  { id: "dv-vit", msg: "Vịt trời emoji — OK bài động vật; có thể dùng vit-con-vang.svg thống nhất" },
];
Object.entries(CHU_WEAK_EMOJI).forEach(([id, msg]) => {
  visNotes.push({ id, msg: `Hang Chữ: ${msg} — nên thêm SVG chữ lớn` });
});
visNotes.forEach(({ id, msg }) => {
  const lesson = data.lessons.find((l) => l.id === id);
  push(3, lesson?.topicId || "?", id, msg, "ND-VIS");
});

/** Chấm điểm theo chủ đề (0–3) */
const TOPIC_IDS = [
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

function scoreTopic(topicId) {
  const ls = data.lessons.filter((l) => l.topicId === topicId);
  const ff = findings.filter((f) => f.topicId === topicId);
  const m1 = ff.filter((f) => f.level === 1).length;
  const m2 = ff.filter((f) => f.level === 2).length;
  const m3 = ff.filter((f) => f.level === 3).length;

  let peda = 3;
  let vis = 3;
  let curr = 3;

  if (m1) {
    peda = 1;
    vis = 1;
    curr = 1;
  } else {
    if (topicId === "mau") {
      vis = m2 ? 2 : 3;
      peda = 3;
      curr = 3;
    } else if (topicId === "chu") {
      peda = 2;
      vis = m2 > 3 ? 2 : 2;
      curr = 2;
    } else if (["dong-vat", "trai-cay", "do-vat"].includes(topicId)) {
      vis = m2 ? 2 : 2;
      peda = m2 ? 2 : 3;
      curr = 3;
    } else {
      peda = m2 ? 2 : 3;
      vis = m2 ? 2 : 2;
      curr = 3;
    }
    if (m3 >= 2 && vis === 3) vis = 2;
  }

  const avg = ((peda + vis + curr) / 3).toFixed(1);
  return { topicId, lessons: ls.length, m1, m2, m3, peda, vis, curr, avg };
}

const scores = TOPIC_IDS.map(scoreTopic);
const outPath = path.join(root, "docs", "eval", "tham-dinh-findings.json");
fs.writeFileSync(
  outPath,
  JSON.stringify(
    {
      generated: new Date().toISOString(),
      lessonsJsonMtime: fs.statSync(path.join(root, "content", "curriculum", "lessons.json")).mtime.toISOString(),
      findings,
      scores
    },
    null,
    2
  ) + "\n"
);

console.log("=== Thẩm định toàn kho — 11 chủ đề ===");
console.log("findings:", findings.length, "| M1:", findings.filter((f) => f.level === 1).length);
scores.forEach((s) => {
  const name = topicMeta[s.topicId]?.shortName || s.topicId;
  console.log(
    `${name.padEnd(12)} ${s.lessons} bài | PEDA ${s.peda} VIS ${s.vis} CURR ${s.curr} | avg ${s.avg} | M1 ${s.m1} M2 ${s.m2} M3 ${s.m3}`
  );
});
console.log("\nJSON:", outPath);
process.exit(findings.some((f) => f.level === 1) ? 1 : 0);
