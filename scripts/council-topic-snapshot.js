/** Snapshot từng chủ đề cho Hội đồng Chuyên gia Giáo dục */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const data = JSON.parse(
  fs.readFileSync(path.join(root, "content", "curriculum", "lessons.json"), "utf8")
);

const exists = (rel) =>
  rel && fs.existsSync(path.join(root, String(rel).replace(/\//g, path.sep)));

const FILLER =
  /^(Giỏ quả|Giòn|Chạm nào|Trong nhà|Ôm bé|Nhạc vui|Bé Gấu|Bảng màu|Cọ vẽ)$/i;

const topics = data.topics || [];
const byTopic = {};
topics.forEach((t) => {
  byTopic[t.id] = {
    id: t.id,
    title: t.title || t.mapName || t.id,
    lessons: [],
    missingImg: 0,
    filler: 0,
    colorExplore: 0,
    countItems: 0,
    countOk: 0,
    mapImg: 0,
    friendImg: 0
  };
});

data.lessons.forEach((l) => {
  const b = byTopic[l.topicId];
  if (!b) return;
  const ex = l.exploreItems || [];
  const row = {
    id: l.id,
    title: l.title,
    teach: l.teachText,
    gate: l.gate?.promptVi,
    choices: l.gate?.choices,
    explore: ex.map((it) => ({
      label: it.label,
      img: it.img || null,
      count: it.count,
      colorId: it.colorId,
      imgOk: it.img ? exists(it.img) : it.count != null
    }))
  };
  ex.forEach((it) => {
    if (it.img && !exists(it.img)) b.missingImg += 1;
    if (FILLER.test((it.label || "").trim())) b.filler += 1;
    if (it.colorId) b.colorExplore += 1;
    if (it.count != null) {
      b.countItems += 1;
      const m = /^(\d+)/.exec(it.label || "");
      if (m && Number(m[1]) === it.count) b.countOk += 1;
    }
  });
  if (l.mapImg && exists(l.mapImg)) b.mapImg += 1;
  if (l.friend?.img && exists(l.friend.img)) b.friendImg += 1;
  b.lessons.push(row);
});

const out = {
  generated: new Date().toISOString(),
  council: "Hoi-dong-Chuyen-gia-Giao-duc",
  lessonCount: data.lessons.length,
  topics: Object.values(byTopic).map((b) => ({
    id: b.id,
    title: b.title,
    n: b.lessons.length,
    missingImg: b.missingImg,
    filler: b.filler,
    colorExplore: b.colorExplore,
    countItems: b.countItems,
    countOk: b.countOk,
    mapImg: b.mapImg,
    friendImg: b.friendImg,
    sampleIds: b.lessons.slice(0, 3).map((x) => x.id),
    lessons: b.lessons
  }))
};

const jsonPath = path.join(root, "docs", "eval", "hdgd-topic-snapshot.json");
fs.writeFileSync(jsonPath, JSON.stringify(out, null, 2) + "\n");
console.log("topics", out.topics.map((t) => `${t.id}:${t.n} miss=${t.missingImg} fill=${t.filler}`).join(" | "));
console.log("→", jsonPath);
