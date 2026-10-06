/** Inventory which explore imgs are AI JPG vs tint/SVG */
const fs = require("fs");
const path = require("path");
const d = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "content", "curriculum", "lessons.json"), "utf8")
);
const by = {};
const aiRows = [];
for (const l of d.lessons) {
  if (!by[l.topicId]) by[l.topicId] = { lessons: 0, aiExplore: 0, tint: 0, chu: 0, friendAi: 0 };
  by[l.topicId].lessons++;
  for (const it of l.exploreItems || []) {
    const img = it.img || "";
    if (img.includes("/ai/") || img.includes("/mau/")) {
      by[l.topicId].aiExplore++;
      aiRows.push({ lessonId: l.id, topicId: l.topicId, label: it.label, img });
    } else if (img.includes("/tint/")) by[l.topicId].tint++;
    else if (img.includes("/chu/")) by[l.topicId].chu++;
  }
  if (l.friend?.img && (l.friend.img.includes("/ai/") || l.friend.img.includes("/mau/"))) {
    by[l.topicId].friendAi++;
  }
}
console.log(JSON.stringify(by, null, 2));
console.log("AI explore rows:", aiRows.length);
console.log(
  "sample:",
  aiRows
    .slice(0, 15)
    .map((r) => `${r.lessonId}|${r.label}|${r.img}`)
    .join("\n")
);
