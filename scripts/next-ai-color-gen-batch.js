/** Print next N items needing GenerateImage (not in cursor assets). */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const cursorBase = path.join(
  process.env.CURSOR_PROJECT_ASSETS ||
    "C:/Users/hoang/.cursor/projects/d-APP-tre-duoi-5-tuoi/assets"
);
const repoBase = path.join(root, "assets/explore");
const data = JSON.parse(
  fs.readFileSync(path.join(root, "docs/eval/missing-ai-colors.json"), "utf8")
);
const n = Math.max(1, parseInt(process.argv[2] || "12", 10));
const priority = ["hinh-khoi", "dong-vat", "do-vat", "phuong-tien"];

function lessonId(file) {
  const base = file.replace(/\.jpg$/i, "");
  const parts = base.split("-");
  parts.pop();
  return parts.join("-");
}

function refFor(item) {
  if (!["dong-vat", "do-vat", "phuong-tien"].includes(item.folder)) return null;
  const hero = path.join(repoBase, "ai", `${lessonId(item.file)}.jpg`);
  return fs.existsSync(hero) ? hero.replace(/\\/g, "/") : null;
}

const todo = data.items
  .filter((i) => {
    const c = path.join(cursorBase, i.file);
    const r = path.join(repoBase, i.folder, i.file);
    if (fs.existsSync(c) && fs.existsSync(r)) return false;
    return !fs.existsSync(c);
  })
  .sort((a, b) => {
    const sa = priority.indexOf(a.folder);
    const sb = priority.indexOf(b.folder);
    return (sa === -1 ? 999 : sa) - (sb === -1 ? 999 : sb) || a.file.localeCompare(b.file);
  })
  .slice(0, n)
  .map((i) => ({
    file: i.file,
    folder: i.folder,
    description: i.description,
    ref: refFor(i)
  }));

console.log(JSON.stringify({ remaining: data.items.filter((i) => {
  const c = path.join(cursorBase, i.file);
  const r = path.join(repoBase, i.folder, i.file);
  return !(fs.existsSync(c) && fs.existsSync(r)) && !fs.existsSync(c);
}).length, batch: todo }, null, 2));
