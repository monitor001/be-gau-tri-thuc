/** Copy generated AI color JPGs from Cursor assets → assets/explore/{folder}/ */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const cursorBase = path.join(
  process.env.CURSOR_PROJECT_ASSETS ||
    "C:/Users/hoang/.cursor/projects/d-APP-tre-duoi-5-tuoi/assets"
);
const listPath = path.join(root, "docs/eval/missing-ai-colors.json");
const data = JSON.parse(fs.readFileSync(listPath, "utf8"));
const repoBase = path.join(root, "assets/explore");

let copied = 0;
for (const item of data.items) {
  const src = path.join(cursorBase, item.file);
  const dest = path.join(repoBase, item.folder, item.file);
  if (!fs.existsSync(src)) continue;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  copied++;
}
console.log("Copied", copied, "of", data.count, "listed files (where cursor asset exists).");
