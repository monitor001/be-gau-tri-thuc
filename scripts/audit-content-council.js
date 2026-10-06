/**
 * Hội đồng Kiểm duyệt Nội dung — audit lessons.json + canonical màu
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const data = JSON.parse(
  fs.readFileSync(path.join(root, "content", "curriculum", "lessons.json"), "utf8")
);
const canonPath = path.join(root, "content", "curriculum", "color-explore-canonical.json");
const canon = JSON.parse(fs.readFileSync(canonPath, "utf8"));

const findings = [];
const push = (level, id, msg) => findings.push({ level, id, msg });

const BAD_YELLOW = /🦆/; // vịt trời — không vàng
const BANNED = /phở bắt đầu bằng chữ P|Bé chọn đúng nào/i;

data.lessons.forEach((l) => {
  if (!l.gate) push(1, l.id, "thiếu gate");
  else {
    const qs = Array.isArray(l.gate.questions) ? l.gate.questions : [l.gate];
    qs.forEach((q, i) => {
      if (!q.promptVi) push(1, l.id, `thiếu promptVi #${i}`);
      if (!Array.isArray(q.choices) || q.choices.length < 2) push(1, l.id, `choices <2 #${i}`);
      if (/Bé chọn đúng nào/i.test(q.promptVi || "")) push(2, l.id, "prompt mơ hồ");
    });
  }
  if (!l.exploreItems?.length) push(2, l.id, "thiếu exploreItems");
  const blob = [l.teachText, l.speakText, ...(l.exploreItems || []).map((x) => x.label)].join(" ");
  if (BANNED.test(blob)) push(1, l.id, "nội dung cấm/sai kiến thức");
  (l.exploreItems || []).forEach((it) => {
    if (l.topicId === "mau" && !it.img) {
      push(1, l.id, `bài màu bắt buộc ảnh AI/SVG — thiếu img: ${it.label}`);
    }
    if (l.topicId === "mau" && it.img && !/\.(jpg|jpeg|png|webp|svg)$/i.test(it.img)) {
      push(1, l.id, `định dạng minh họa không hỗ trợ: ${it.img}`);
    }
    if (it.img) {
      const assetPath = path.join(root, it.img.replace(/\//g, path.sep));
      if (!fs.existsSync(assetPath)) {
        push(1, l.id, `thiếu file minh họa: ${it.img}`);
      }
    }
    if (l.id === "mau-vang" && BAD_YELLOW.test(it.emoji || "") && !it.img) {
      push(1, l.id, `Vịt/emoji không vàng: ${it.emoji} ${it.label}`);
    }
    if (l.id === "mau-vang" && /chanh/i.test(it.label || "")) {
      push(1, l.id, "Quả chanh — hội đồng đã yêu cầu xoài chín / không regress chanh");
    }
    // P0 nhận diện (che chữ) — emoji dễ lệch màu thiết bị phải có SVG
    if (l.id === "mau-vang" && /hoa mai/i.test(it.label || "") && !it.img) {
      push(1, l.id, "Hoa mai thiếu SVG vàng (🌼 = cúc trắng)");
    }
    if (l.id === "mau-vang" && /xoài/i.test(it.label || "") && !it.img) {
      push(1, l.id, "Xoài thiếu SVG vàng (🥭 hay đỏ-cam)");
    }
    if (l.id === "mau-xanh-duong" && /việt quất/i.test(it.label || "") && !it.img) {
      push(1, l.id, "Việt quất thiếu SVG (🫐 hay thiếu glyph)");
    }
    if (l.id === "mau-xanh-duong" && /xe xanh/i.test(it.label || "") && !it.img) {
      push(1, l.id, "Xe xanh dương thiếu SVG (🚙 = xanh lá)");
    }
    if (l.id === "mau-tim" && /áo tím/i.test(it.label || "") && !it.img) {
      push(1, l.id, "Áo tím thiếu SVG (👚 = áo hồng)");
    }
  });

  // Hang Chữ Latin: không còn chữ Việt đặc thù
  if (l.topicId === "chu" && /[ĂÂĐÊÔƠƯ]/.test(l.title || "")) {
    push(1, l.id, "chữ ngoài bảng Latin A–Z — chạy rebuild-chu-latin.js");
  }
  if (l.topicId === "chu") {
    const hasLetterImg = (l.exploreItems || []).some((it) => it.img && /chu\//.test(it.img));
    if (!hasLetterImg) push(2, l.id, "thiếu SVG chữ lớn");
  }
  const labs = (l.exploreItems || []).map((x) => x.label);
  const dups = labs.filter((x, i) => labs.indexOf(x) !== i);
  if (dups.length) push(2, l.id, "explore trùng nhãn: " + [...new Set(dups)].join(", "));
});

// Drift: lessons màu vs canonical
Object.keys(canon).forEach((id) => {
  if (id.startsWith("_")) return;
  const lesson = data.lessons.find((l) => l.id === id);
  if (!lesson) return;
  const a = JSON.stringify((lesson.exploreItems || []).map((x) => x.label));
  const b = JSON.stringify(canon[id].map((x) => x.label));
  if (a !== b) push(1, id, "explore lệch color-explore-canonical.json — chạy sync-color-explore.js");
});

const st = fs.statSync(path.join(root, "content", "curriculum", "lessons.json"));
console.log("=== Hội đồng Kiểm duyệt Nội dung — Audit ===");
console.log("lessons.json mtime:", st.mtime.toISOString());
console.log("canonical v:", canon._meta?.version, "approved:", canon._meta?.approvedAt);
console.log("topics", data.topics.length, "lessons", data.lessons.length);
console.log("contentCouncil stamp:", data.contentCouncil || "(chưa sync)");
console.log("findings", findings.length);
const by = { 1: [], 2: [], 3: [] };
findings.forEach((f) => (by[f.level] || by[3]).push(f));
[1, 2, 3].forEach((lv) => {
  console.log(`\n--- Mức ${lv} (${by[lv].length}) ---`);
  by[lv].forEach((f) => console.log(`  [${f.id}] ${f.msg}`));
});
process.exit(by[1].length ? 1 : 0);
