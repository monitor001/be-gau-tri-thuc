/** Số + Chữ: mapImg & explore AI (không dùng emoji keycap trên bản đồ) */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const nghe = fs.existsSync(path.join(root, "assets/explore/ai/shared-nghe.jpg"))
  ? "assets/explore/ai/shared-nghe.jpg"
  : null;

let soN = 0;
data.lessons.forEach((l) => {
  if (l.topicId !== "so") return;
  const n = Number(String(l.id).replace("so-", ""));
  const hero = `assets/explore/ai/${l.id}.jpg`;
  if (!fs.existsSync(path.join(root, hero.replace(/\//g, path.sep)))) return;
  l.mapImg = hero;
  if (l.friend) l.friend.img = hero;
  const items = l.exploreItems || [];
  const glyph = items.find((it) => /^Số\s+/i.test(it.label || ""));
  if (glyph) {
    glyph.img = hero;
    glyph.recolor = false;
  }
  items.forEach((it) => {
    const m = /^(\d+)\s*(cá|sao)$/i.exec(it.label || "");
    if (m && Number(m[1]) === n) {
      it.count = n;
      delete it.img;
    }
  });
  l.exploreItems = items;
  soN += 1;
});

let chuN = 0;
data.lessons.forEach((l) => {
  if (l.topicId !== "chu") return;
  const letter = (l.title || "").replace(/^Chữ\s+/i, "").trim();
  const svg = `assets/explore/chu/chu-${letter.toLowerCase()}.svg`;
  const word = `assets/explore/ai/${l.id}.jpg`;
  const hasWord = fs.existsSync(path.join(root, word.replace(/\//g, path.sep)));
  const hasSvg = fs.existsSync(path.join(root, svg.replace(/\//g, path.sep)));
  l.mapImg = hasWord ? word : hasSvg ? svg : l.mapImg;
  if (l.friend) {
    l.friend.img = hasWord ? word : hasSvg ? svg : l.friend.img;
  }
  l.exploreItems = (l.exploreItems || []).map((it) => {
    if (/^Chữ\s+/i.test(it.label || "")) return { ...it, img: hasSvg ? svg : it.img };
    if (it.label === "Nghe " + letter || /^Nghe/.test(it.label || "")) {
      return { ...it, ...(nghe ? { img: nghe } : {}) };
    }
    if (hasWord && !/^Chữ/.test(it.label || "") && !/^Nghe/.test(it.label || "")) {
      return { ...it, img: word };
    }
    return it;
  });
  chuN += 1;
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);
console.log("so:", soN, "chu:", chuN);
