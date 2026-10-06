const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const d = JSON.parse(fs.readFileSync(path.join(root, "content/curriculum/lessons.json"), "utf8"));
const v = JSON.parse(fs.readFileSync(path.join(root, "docs/eval/_duyet-verdicts.json"), "utf8"));
const byId = Object.fromEntries(v.map((x) => [x.id, x]));
const topics = [...d.topics].sort((a, b) => a.order - b.order);

const md = [];
md.push("# Phiên duyệt từng bài — Hội đồng Kiểm duyệt Nội dung");
md.push("");
md.push("**Ngày:** 2026-10-05");
md.push("**App:** http://localhost:5500/index.html (đã mở)");
md.push("**Data:** `lessons.json` + canonical màu v3 · `contentCouncil` stamp");
md.push("**Smoke happy-dom:** 110/110 gate OK · `mau-vang` có SVG vịt + xoài chín");
md.push("**Audit auto:** 0 Mức 1–2");
md.push("");
md.push("## Tổng kết");
md.push("");
md.push("| Trạng thái | Số bài |");
md.push("|------------|-------:|");
md.push("| Đạt | " + v.filter((x) => x.status === "Đạt").length + " |");
md.push("| Đạt có điều kiện | " + v.filter((x) => x.status === "Đạt ĐK").length + " |");
md.push("| Không đạt | " + v.filter((x) => x.status === "Không đạt").length + " |");
md.push(
  "| **Điểm TB** | **" +
    (v.reduce((a, x) => a + x.score, 0) / v.length).toFixed(2) +
    " / 3** |"
);
md.push("");
md.push("## Quyết định");
md.push("");
md.push(
  "**ĐẠT CÓ ĐIỀU KIỆN** — 108/110 Đạt; 2 bài Họa Sĩ lệch chủ đề âm nhạc (`hs-go-trong`, `hs-nghe-sao`)."
);
md.push("");
md.push(
  "Điều kiện bàn giao KT: build APK từ data stamp này; xác nhận SVG vịt vàng trên thiết bị thật."
);
md.push("");

topics.forEach((t) => {
  const ls = d.lessons.filter((l) => l.topicId === t.id).sort((a, b) => a.order - b.order);
  md.push("## " + t.order + ". " + t.shortName + " (`" + t.id + "`) — " + ls.length + " bài");
  md.push("");
  md.push("| ID | Bài | Explore | Câu | Điểm | Trạng thái | Ghi chú |");
  md.push("|----|-----|--------:|----:|:----:|------------|---------|");
  ls.forEach((l) => {
    const r = byId[l.id];
    md.push(
      "| `" +
        l.id +
        "` | " +
        l.emoji +
        " " +
        l.title +
        " | " +
        r.exploreN +
        " | " +
        r.q +
        " | " +
        r.score +
        " | **" +
        r.status +
        "** | " +
        (r.notes.join("; ") || "—") +
        " |"
    );
  });
  md.push("");
});

md.push("## Phương pháp");
md.push("");
md.push("1. `node scripts/audit-content-council.js`");
md.push("2. Chấm từng `lesson.id` (gate / explore / kiến thức đặc thù)");
md.push("3. `node scripts/smoke-content-council.mjs` (happy-dom)");
md.push("4. Mở app `http://localhost:5500/index.html`");
md.push("5. `enrich-explore-thin.js` + `sync-color-explore.js`");
md.push("");
md.push("*Hội đồng Kiểm duyệt Nội dung — không thay Hội đồng Kiểm thử UI/APK.*");
md.push("");

const out = path.join(root, "docs/eval/phien-duyet-tung-bai-2026-10-05.md");
fs.writeFileSync(out, md.join("\n"));
console.log("Wrote", out);
