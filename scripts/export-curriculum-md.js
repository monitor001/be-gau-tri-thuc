/**
 * Sinh docs/chuong-trinh-chi-tiet.md từ lessons.json (đầy đủ chủ đề + bài).
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const data = JSON.parse(
  fs.readFileSync(path.join(root, "content", "curriculum", "lessons.json"), "utf8")
);

const topics = [...data.topics].sort((a, b) => (a.order || 0) - (b.order || 0));
const lines = [];
const W = (s = "") => lines.push(s);
const esc = (s) => String(s || "").replace(/\|/g, "\\|").replace(/\n/g, " ");

const GOALS = {
  mau: "Nhận biết và gọi tên màu cơ bản; ghép màu với đồ vật quen thuộc.",
  hinh: "Nhận biết hình học phẳng thuần (không nhân vật AI); phân biệt tròn / vuông / tam giác…",
  so: "Đếm và nhận diện số 1–10; khớp số lượng với chữ số.",
  chu: "Nhận diện chữ cái Latin A–Z; gắn với từ / minh họa đơn giản.",
  "dong-vat": "Nhận biết và gọi tên con vật quen thuộc (explore thường × 6 màu).",
  "trai-cay": "Nhận biết trái cây quen thuộc (explore thường × màu).",
  "do-vat": "Nhận biết đồ vật gần gũi hàng ngày (explore thường × màu).",
  "cam-xuc": "Nhận biết cảm xúc cơ bản qua mặt / hình (vui, buồn…).",
  "phuong-tien": "Nhận biết phương tiện (xe, tàu, máy bay…).",
  "nhay-mua": "Bắt chước động tác vận động nhẹ (vỗ tay, giơ tay…).",
  "hoa-si": "Hành động sáng tạo đơn giản (tô màu, vẽ tròn, bảng màu…)."
};

function lessonRows(topicId) {
  return data.lessons
    .filter((l) => l.topicId === topicId)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

const total = topics.reduce((acc, t) => acc + lessonRows(t.id).length, 0);

W("# Chương trình học — Chi tiết chủ đề & bài học");
W();
W("**Cập nhật:** 2026-10-06  ");
W("**Nguồn data:** `content/curriculum/lessons.json` · `js/lessons-data.js`  ");
W("**Mô hình:** `" + (data.model || "one-lesson-one-screen") + "` · **version:** " + (data.version || "?") + "  ");
W("**Luồng:** " + (data.flow || []).join(" → ") + "  ");
W("**Tổng:** **" + total + " màn / " + topics.length + " chủ đề**");
W();
W("> Dùng để theo dõi & phát triển. Đổi bài → cập nhật data → chạy `node scripts/export-curriculum-md.js`.  ");
W("> Liên quan: `docs/curr-danh-sach-man.md` (rút gọn) · `docs/trang-thai-trien-khai.md` (tiến độ kỹ thuật)");
W();
W("---");
W();
W("## 0. Quy ước chung");
W();
W("| Khái niệm | Ý nghĩa |");
W("|-----------|---------|");
W("| 1 màn = 1 bài | Không gộp nhiều khái niệm trong một màn |");
W("| Explore | Trẻ chạm nhìn / nghe / chạm ví dụ (thường × màu hoặc × khái niệm) |");
W("| Gate | Câu đố nhận diện (che chữ + TTS) |");
W("| Friend | “Bạn” cần cứu — gắn với bài |");
W("| Story intro | Lời nhờ giúp: *Bạn Gấu ơi, cứu mình với!* |");
W("| Audio slots NL | Phụ huynh ghi âm: `intro` · `explore` · `gate` · `win` |");
W("| Hình học | Đồi Hình dùng SVG thuần (`geometry-svg-vis`) |");
W();
W("### Bảng tổng quan chủ đề");
W();
W("| # | ID | Tên map | Màn | Trợ lý | Màu |");
W("|---|-----|---------|-----|--------|-----|");
topics.forEach((t, i) => {
  const n = lessonRows(t.id).length;
  W(
    "| " +
      (i + 1) +
      " | `" +
      t.id +
      "` | " +
      (t.mapName || t.title) +
      " " +
      (t.emoji || "") +
      " | **" +
      n +
      "** | `" +
      (t.helper || "—") +
      "` | `" +
      (t.color || "—") +
      "` |"
  );
});
W("| | | **Tổng** | **" + total + "** | | |");
W();

topics.forEach((t, ti) => {
  const lessons = lessonRows(t.id);
  W("---");
  W();
  W("## " + (ti + 1) + ". " + (t.mapName || t.title) + " (`" + t.id + "`) — " + lessons.length + " màn");
  W();
  W("| Trường | Giá trị |");
  W("|---------|---------|");
  W("| shortName | " + (t.shortName || "") + " |");
  W("| speakName | " + (t.speakName || "") + " |");
  W("| emoji | " + (t.emoji || "") + " |");
  W("| helper | `" + (t.helper || "") + "` |");
  W("| color | `" + (t.color || "") + "` |");
  W("| order | " + (t.order || "") + " |");
  W();
  W("### Mục tiêu sư phạm");
  W();
  W(GOALS[t.id] || "Xem `teachText` từng bài.");
  W();
  W("### Danh sách bài (bảng nhanh)");
  W();
  W("| # | ID | Tiêu đề | Bạn | Ô explore | Gate (prompt) | Xu | Tuổi |");
  W("|---|-----|---------|-----|-----------|---------------|-----|------|");
  lessons.forEach((l) => {
    const friend = l.friend ? (l.friend.emoji || "") + " " + l.friend.name : "—";
    const gate = (l.gate && l.gate.promptVi) || "—";
    const exN = (l.exploreItems || []).length;
    W(
      "| " +
        l.order +
        " | `" +
        l.id +
        "` | " +
        (l.emoji || "") +
        " " +
        esc(l.title) +
        " | " +
        esc(friend) +
        " | " +
        exN +
        " | " +
        esc(gate) +
        " | " +
        (l.rewardXu ?? 5) +
        " | " +
        (l.ageMin ?? 2) +
        " |"
    );
  });
  W();
  W("### Chi tiết từng bài");
  W();
  lessons.forEach((l) => {
    W("#### `" + l.id + "` — " + (l.emoji || "") + " " + l.title);
    W();
    W("- **speakText:** " + esc(l.speakText));
    W("- **teachText:** " + esc(l.teachText));
    W("- **exploreHint:** " + esc(l.exploreHint));
    if (l.friend) {
      W(
        "- **friend:** `" +
          l.friend.id +
          "` · " +
          (l.friend.emoji || "") +
          " " +
          l.friend.name +
          (l.friend.tint ? " · tint `" + l.friend.tint + "`" : "")
      );
    }
    if (l.story) {
      W("- **story.intro:** " + esc(l.story.intro));
      W("- **story.exploreLine:** " + esc(l.story.exploreLine));
      W("- **story.gateLine:** " + esc(l.story.gateLine));
      W("- **story.winLine:** " + esc(l.story.winLine));
      if (l.story.theme) W("- **story.theme:** `" + l.story.theme + "`");
    }
    if (l.gate) {
      W("- **gate.promptVi:** " + esc(l.gate.promptVi));
      const choices = l.gate.choices || [];
      if (choices.length) {
        const labels = choices.map((c) => {
          if (c && typeof c === "object") return c.speak || c.label || c.emoji || "?";
          return String(c);
        });
        W(
          "- **gate.choices:** " +
            labels.map(esc).join(" · ") +
            " *(correctIndex=" +
            (l.gate.correctIndex ?? 0) +
            ")*"
        );
      }
      if (Array.isArray(l.gate.questions) && l.gate.questions.length) {
        W("- **gate.questions:** " + l.gate.questions.length + " câu");
        l.gate.questions.forEach((q, qi) => {
          W("  - Q" + (qi + 1) + ": " + esc(q.promptVi || ""));
        });
      }
    }
    if (l.mapImg) W("- **mapImg:** `" + l.mapImg + "`");
    const items = l.exploreItems || [];
    if (items.length) {
      W("- **exploreItems (" + items.length + "):**");
      items.forEach((it) => {
        const img = it.img ? " · `" + it.img + "`" : "";
        const color = it.colorId ? " `[" + it.colorId + "]`" : "";
        const src = it.source ? " _(" + it.source + ")_" : "";
        W(
          "  -" +
            color +
            " " +
            esc(it.label) +
            " — *" +
            esc(it.speakLine) +
            "*" +
            img +
            src
        );
      });
    }
    W(
      "- **Audio slots (Người lớn):** `lesson:" +
        l.id +
        ":intro` · `explore` · `gate` · `win`"
    );
    W();
  });
});

W("---");
W();
W("## Phụ lục A — Tra cứu ID nhanh");
W();
topics.forEach((t) => {
  const ids = lessonRows(t.id)
    .map((l) => "`" + l.id + "`")
    .join(", ");
  W("- **" + t.id + ":** " + ids);
});
W();
W("## Phụ lục B — Cập nhật tài liệu");
W();
W("```bash");
W("node scripts/export-curriculum-md.js");
W("```");
W();
W("Output: `docs/chuong-trinh-chi-tiet.md`");
W();

const outPath = path.join(root, "docs", "chuong-trinh-chi-tiet.md");
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log("Wrote", outPath, "(" + lines.length + " lines,", total, "lessons)");
