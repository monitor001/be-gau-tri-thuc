/**
 * Hội đồng Thẩm định Từng Bài — audit máy 1 phiếu / 1 lesson.id
 * Chạy: node scripts/audit-lesson-by-lesson.js
 * Exit 1 nếu còn Mức 1.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const data = JSON.parse(
  fs.readFileSync(path.join(root, "content", "curriculum", "lessons.json"), "utf8")
);

const findings = [];
const push = (level, lessonId, topicId, code, msg, seat = "TB-MATCH") =>
  findings.push({ level, lessonId, topicId, code, msg, seat });

const exists = (rel) =>
  rel && fs.existsSync(path.join(root, String(rel).replace(/\//g, path.sep)));

const BANNED_FILLER =
  /^(Giỏ quả|Giòn|Chạm nào|Trong nhà|Đường đi|Vẫy tay|Bạn thân|Nhà bạn|Bảng màu|Cọ vẽ)$/i;

const COLOR_NAME = {
  do: /đỏ/,
  vang: /vàng/,
  "xanh-duong": /xanh dương/,
  "xanh-la": /xanh lá/,
  cam: /cam/,
  tim: /tím/
};

const SAME_SUBJECT = new Set(["trai-cay", "hinh", "do-vat", "dong-vat", "phuong-tien"]);

const AI_COLOR_FOLDER = {
  "trai-cay": "trai-cay",
  hinh: "hinh-khoi",
  "dong-vat": "dong-vat",
  "do-vat": "do-vat",
  "phuong-tien": "phuong-tien"
};

const byLesson = {};
data.lessons.forEach((l) => {
  byLesson[l.id] = { peda: 3, vis: 3, match: 3, gate: 3, safe: 3, fail: [] };
});

function fail(l, level, code, msg, seat, dims = ["match"]) {
  push(level, l.id, l.topicId, code, msg, seat);
  const card = byLesson[l.id];
  card.fail.push(code);
  dims.forEach((d) => {
    if (level === 1) card[d] = Math.min(card[d], 0);
    else if (level === 2) card[d] = Math.min(card[d], 1);
    else card[d] = Math.min(card[d], 2);
  });
}

data.lessons.forEach((l) => {
  const ex = l.exploreItems || [];

  // --- GATE ---
  if (!l.gate) fail(l, 1, "GATE-0", "thiếu gate", "TB-GATE", ["gate"]);
  else {
    const qs = Array.isArray(l.gate.questions) ? l.gate.questions : [l.gate];
    qs.forEach((q, i) => {
      if (!q.promptVi) fail(l, 1, "GATE-1", `thiếu promptVi #${i}`, "TB-GATE", ["gate"]);
      if (!Array.isArray(q.choices) || q.choices.length < 2) {
        fail(l, 1, "GATE-2", `choices < 2 #${i}`, "TB-GATE", ["gate"]);
      }
      if (/Bé chọn đúng nào/i.test(q.promptVi || "")) {
        fail(l, 2, "GATE-3", `prompt mơ hồ #${i}`, "TB-GATE", ["gate", "peda"]);
      }
    });
  }

  if (!ex.length) fail(l, 1, "EX-0", "thiếu exploreItems", "TB-PEDA", ["peda", "vis"]);

  // --- CHỮ LATIN ---
  if (l.topicId === "chu") {
    const letter = (l.title || "").replace(/^Chữ\s+/i, "").trim();
    if (!/^[A-Z]$/.test(letter)) {
      fail(l, 1, "CHU-LATIN", `không phải chữ Latin A–Z: ${l.title}`, "TB-CURR", ["peda"]);
    }
    const hasLetterSvg = ex.some((it) => it.img && /\/chu\//.test(it.img) && exists(it.img));
    if (!hasLetterSvg) fail(l, 2, "CHU-SVG", "thiếu SVG chữ lớn", "TB-VIS", ["vis"]);
  }

  // --- MÀU ---
  if (l.topicId === "mau") {
    ex.forEach((it) => {
      if (!it.img) fail(l, 1, "MAU-IMG", `thiếu img: ${it.label}`, "TB-VIS", ["vis", "match"]);
      else if (!exists(it.img)) fail(l, 1, "MAU-FILE", `thiếu file: ${it.img}`, "TB-VIS", ["vis"]);
    });
  }

  // --- SỐ: count visual ---
  if (l.topicId === "so") {
    const num = Number(String(l.id).replace("so-", ""));
    ex.forEach((it) => {
      const mCa = /^(\d+)\s*cá$/i.exec(it.label || "");
      const mSao = /^(\d+)\s*sao$/i.exec(it.label || "");
      const m = mCa || mSao;
      if (m) {
        const n = Number(m[1]);
        if (it.count !== n) {
          fail(
            l,
            1,
            "SO-COUNT",
            `nhãn "${it.label}" phải có count:${n} (hiện ${it.count}) — trẻ không đếm được nếu 1 hình`,
            "TB-MATCH",
            ["match", "vis", "peda"]
          );
        }
        if (it.img && !it.count) {
          fail(l, 1, "SO-IMG1", `"${it.label}" không được dùng 1 ảnh đơn thay cho đếm`, "TB-MATCH", [
            "match",
            "vis"
          ]);
        }
      }
      if (/^Số\s+/i.test(it.label || "") && it.img && !exists(it.img)) {
        fail(l, 2, "SO-HERO", `thiếu file glyph số: ${it.img}`, "TB-VIS", ["vis"]);
      }
      if (Number.isFinite(num) && m && Number(m[1]) !== num) {
        fail(l, 1, "SO-MISMATCH", `explore "${it.label}" lệch số bài ${num}`, "TB-PEDA", ["peda"]);
      }
    });
  }

  // --- CÙNG CHỦ THỂ × NHIỀU MÀU ---
  if (SAME_SUBJECT.has(l.topicId)) {
    const colorIds = new Set();
    ex.forEach((it) => {
      if (BANNED_FILLER.test((it.label || "").trim())) {
        fail(l, 1, "FILLER", `filler không dạy khái niệm: "${it.label}"`, "TB-PEDA", ["peda", "safe"]);
      }
      if (it.colorId) colorIds.add(it.colorId);
      if (it.colorId && COLOR_NAME[it.colorId]) {
        if (!COLOR_NAME[it.colorId].test(it.label || "")) {
          fail(
            l,
            1,
            "COLOR-LABEL",
            `nhãn "${it.label}" không khớp colorId=${it.colorId}`,
            "TB-MATCH",
            ["match"]
          );
        }
      }
      if (it.img && !exists(it.img)) {
        fail(l, 1, "FILE", `thiếu file: ${it.img}`, "TB-VIS", ["vis"]);
      }
      // REG-01: cùng chủ thể × màu → ảnh AI (.jpg) hoặc SVG hình học khóa VIS (.svg)
      if (it.colorId) {
        const folder = AI_COLOR_FOLDER[l.topicId];
        const aiJpg = folder ? `assets/explore/${folder}/${l.id}-${it.colorId}.jpg` : null;
        const geoSvg = folder ? `assets/explore/${folder}/${l.id}-${it.colorId}.svg` : null;
        const tintPath = `assets/explore/tint/${l.id}-${it.colorId}.svg`;
        const img = String(it.img || "");
        const imgIsJpg = aiJpg && img.includes(`/${folder}/${l.id}-${it.colorId}.jpg`);
        const imgIsSvg = geoSvg && img.includes(`/${folder}/${l.id}-${it.colorId}.svg`);
        if (folder) {
          if (!imgIsJpg && !imgIsSvg) {
            fail(
              l,
              1,
              "TOPIC-AI",
              `"${it.label}" phải dùng ${aiJpg} hoặc SVG hình học ${geoSvg}`,
              "TB-MATCH",
              ["match", "vis"]
            );
          } else if (imgIsJpg && !exists(aiJpg)) {
            fail(l, 1, "TOPIC-FILE", `thiếu file: ${aiJpg}`, "TB-VIS", ["vis"]);
          } else if (imgIsSvg && !exists(geoSvg)) {
            fail(l, 1, "TOPIC-FILE", `thiếu file: ${geoSvg}`, "TB-VIS", ["vis"]);
          }
        } else if (!img.includes(`/tint/${l.id}-${it.colorId}.svg`)) {
          fail(l, 1, "TINT-SVG", `"${it.label}" phải dùng ${tintPath}`, "TB-MATCH", ["match", "vis"]);
        } else if (!exists(tintPath)) {
          fail(l, 1, "TINT-FILE", `thiếu file tint: ${tintPath}`, "TB-VIS", ["vis"]);
        }
      }
    });
    if (ex.length >= 4 && colorIds.size < 4) {
      fail(
        l,
        2,
        "FEW-COLORS",
        `explore cùng chủ thể nên ≥4 màu (hiện ${colorIds.size})`,
        "TB-CURR",
        ["peda"]
      );
    }
  }

  // --- FILE IMG CHUNG ---
  ex.forEach((it) => {
    if (it.img && !exists(it.img)) {
      // may already pushed
      if (!findings.some((f) => f.lessonId === l.id && f.msg.includes(it.img))) {
        fail(l, 1, "FILE-X", `thiếu file: ${it.img}`, "TB-VIS", ["vis"]);
      }
    }
  });

  if (l.friend?.img && !exists(l.friend.img)) {
    fail(l, 2, "FRIEND-IMG", `friend.img thiếu file: ${l.friend.img}`, "TB-VIS", ["vis"]);
  }

  // --- STORY: cấm khung “Cô Sương đố vui” (đã chuyển giọng trẻ nhờ giúp) ---
  const storyBlob = [
    l.story?.intro,
    l.story?.exploreLine,
    l.story?.gateLine,
    l.story?.winLine,
    l.teachText,
    l.speakText,
    l.gate?.promptVi,
    ...(Array.isArray(l.gate?.questions) ? l.gate.questions.map((q) => q.promptVi) : [])
  ]
    .filter(Boolean)
    .join(" | ");
  if (/Cô Sương đố vui|Câu đố của Cô Sương/i.test(storyBlob)) {
    fail(
      l,
      1,
      "VOICE-COSUONG",
      "còn chuỗi «Cô Sương đố vui» / «Câu đố của Cô Sương» — chạy rewrite-story-help-voice",
      "TB-SAFE",
      ["safe", "peda"]
    );
  }
});

// Verdict per lesson
const verdicts = data.lessons.map((l) => {
  const c = byLesson[l.id];
  const m1 = findings.filter((f) => f.lessonId === l.id && f.level === 1).length;
  const m2 = findings.filter((f) => f.lessonId === l.id && f.level === 2).length;
  let status = "DAT";
  if (m1) status = "KHONG_DAT";
  else if (m2) status = "DAT_CO_DIEU_KIEN";
  const avg = (c.peda + c.vis + c.match + c.gate + c.safe) / 5;
  return {
    id: l.id,
    topicId: l.topicId,
    title: l.title,
    status,
    scores: { peda: c.peda, vis: c.vis, match: c.match, gate: c.gate, safe: c.safe, avg: Number(avg.toFixed(2)) },
    m1,
    m2,
    codes: c.fail
  };
});

const summary = {
  generated: new Date().toISOString(),
  lessons: data.lessons.length,
  dat: verdicts.filter((v) => v.status === "DAT").length,
  datDieuKien: verdicts.filter((v) => v.status === "DAT_CO_DIEU_KIEN").length,
  khongDat: verdicts.filter((v) => v.status === "KHONG_DAT").length,
  findingsM1: findings.filter((f) => f.level === 1).length,
  findingsM2: findings.filter((f) => f.level === 2).length,
  findingsM3: findings.filter((f) => f.level === 3).length
};

const out = { summary, findings, verdicts };
const outPath = path.join(root, "docs", "eval", "phieu-tung-bai.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n");

// Markdown digest
const md = [];
md.push(`# Phiếu Thẩm định Từng Bài — máy`);
md.push(`**Sinh:** ${summary.generated}`);
md.push(`**Tổng bài:** ${summary.lessons} · **Đạt:** ${summary.dat} · **Đạt ĐK:** ${summary.datDieuKien} · **Không đạt:** ${summary.khongDat}`);
md.push(`**Findings:** M1=${summary.findingsM1} · M2=${summary.findingsM2}`);
md.push("");
md.push(`## Mức 1 (chặn)`);
findings
  .filter((f) => f.level === 1)
  .forEach((f) => md.push(`- **${f.lessonId}** [${f.code}] ${f.msg}`));
if (!summary.findingsM1) md.push("- *(không)*");
md.push("");
md.push(`## Mức 2`);
findings
  .filter((f) => f.level === 2)
  .slice(0, 40)
  .forEach((f) => md.push(`- **${f.lessonId}** [${f.code}] ${f.msg}`));
if (summary.findingsM2 > 40) md.push(`- … +${summary.findingsM2 - 40} nữa`);
if (!summary.findingsM2) md.push("- *(không)*");
md.push("");
md.push(`## Không đạt (danh sách id)`);
md.push(
  verdicts
    .filter((v) => v.status === "KHONG_DAT")
    .map((v) => `\`${v.id}\``)
    .join(", ") || "*(không)*"
);
fs.writeFileSync(path.join(root, "docs", "eval", "phieu-tung-bai.md"), md.join("\n") + "\n");

console.log("=== Hội đồng Thẩm định Từng Bài ===");
console.log(JSON.stringify(summary, null, 2));
console.log("\n--- Mức 1 ---");
findings.filter((f) => f.level === 1).forEach((f) => console.log(`[${f.lessonId}] ${f.code}: ${f.msg}`));
console.log("\n--- Mức 2 (max 25) ---");
findings
  .filter((f) => f.level === 2)
  .slice(0, 25)
  .forEach((f) => console.log(`[${f.lessonId}] ${f.code}: ${f.msg}`));
console.log("\nJSON:", outPath);
console.log("MD: docs/eval/phieu-tung-bai.md");

process.exit(summary.findingsM1 ? 1 : 0);
