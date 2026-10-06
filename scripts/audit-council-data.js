/**
 * Hội đồng Kiểm thử — Vòng 3 nhanh: audit lessons.json
 * Chạy: node scripts/audit-council-data.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const data = JSON.parse(
  fs.readFileSync(path.join(root, "content", "curriculum", "lessons.json"), "utf8")
);

const findings = [];
const push = (level, id, msg) => findings.push({ level, id, msg });

const TOPIC_BG = {
  mau: "ban-do-rung-mau.jpg",
  hinh: "ban-do-doi-hinh.jpg",
  so: "ban-do-suoi-so.jpg",
  chu: "ban-do-hang-chu.jpg",
  "dong-vat": "ban-do-vuon-ban.jpg",
  "trai-cay": "ban-do-vuon-qua.jpg",
  "do-vat": "ban-do-nha-do.jpg",
  "cam-xuc": "ban-do-trai-tim.jpg",
  "phuong-tien": "ban-do-ben-xe.jpg",
  "nhay-mua": "ban-do-san-nhay.jpg",
  "hoa-si": "ban-do-hoa-si.jpg"
};

console.log("=== Hội đồng KT — Audit dữ liệu ===");
console.log("topics:", data.topics.length, "| lessons:", data.lessons.length);

const byTopic = {};
data.lessons.forEach((l) => {
  byTopic[l.topicId] = (byTopic[l.topicId] || 0) + 1;

  if (!l.friend || !l.story) push(1, l.id, "thiếu friend/story");
  if (!l.gate) push(1, l.id, "thiếu gate");
  else {
    const qs = Array.isArray(l.gate.questions) ? l.gate.questions : [l.gate];
    qs.forEach((q, i) => {
      if (!q.promptVi) push(1, l.id, `gate thiếu promptVi #${i}`);
      if (!Array.isArray(q.choices) || q.choices.length < 2) {
        push(1, l.id, `gate choices < 2 #${i}`);
      }
      const ci = q.correctIndex ?? 0;
      if (ci < 0 || ci >= (q.choices || []).length) {
        push(1, l.id, `correctIndex ngoài phạm vi #${i}`);
      }
      if (/Bé chọn đúng nào/i.test(q.promptVi || "")) {
        push(2, l.id, "promptVi quá mơ hồ (Điều 6 che chữ)");
      }
    });
  }
  if (!l.teachText) push(2, l.id, "thiếu teachText");
  if (!l.emoji) push(2, l.id, "thiếu emoji");

  const blob = [l.teachText, l.story?.intro, l.story?.gateLine, l.story?.winLine].join(" ");
  if (/máu|chết|ma quỷ|súng|dao|quái vật/i.test(blob)) {
    push(1, l.id, "ngôn ngữ đáng sợ");
  }

  if (l.topicId === "phuong-tien" && /Xe chạy vui/i.test(l.teachText || "") && l.id !== "pt-xe-buyt" && l.id !== "pt-xe-may") {
    push(2, l.id, "teachText copy-paste 'Xe chạy vui' không khớp phương tiện");
  }

  if (l.id === "chu-p" && /phở/i.test(l.teachText || "")) {
    push(1, l.id, "kiến thức sai: phở bắt đầu bằng Ph, không phải P");
  }

  if (l.id === "hinh-rect" && l.friend?.name === "Bạn nhật") {
    push(2, l.id, "friend.name cắt cụt (Bạn nhật)");
  }
});

Object.entries(TOPIC_BG).forEach(([topic, file]) => {
  const p = path.join(root, "assets", "map", file);
  if (!fs.existsSync(p)) push(1, topic, `thiếu nền map ${file}`);
});

const withExplore = data.lessons.filter((l) => Array.isArray(l.exploreItems) && l.exploreItems.length).length;

console.log("byTopic:", byTopic);
console.log("có exploreItems:", withExplore, "/", data.lessons.length);
console.log("findings:", findings.length);

const byLevel = { 1: [], 2: [], 3: [] };
findings.forEach((f) => (byLevel[f.level] || byLevel[3]).push(f));
[1, 2, 3].forEach((lv) => {
  console.log(`\n--- Mức ${lv} (${byLevel[lv].length}) ---`);
  byLevel[lv].slice(0, 30).forEach((f) => console.log(`  [${f.id}] ${f.msg}`));
  if (byLevel[lv].length > 30) console.log(`  … +${byLevel[lv].length - 30} nữa`);
});

const shipBlock = byLevel[1].length > 0;
console.log("\n=== Kết luận audit data ===");
console.log(shipBlock ? "CHẶN SHIP: còn Mức 1" : "Data audit: không Mức 1 tự động");
process.exit(shipBlock ? 1 : 0);
