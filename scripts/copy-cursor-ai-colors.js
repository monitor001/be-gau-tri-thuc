/** Copy {lesson}-{color}.jpg từ Cursor assets → assets/explore/{folder}/ */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const src = path.join(
  process.env.USERPROFILE || "",
  ".cursor",
  "projects",
  "d-APP-tre-duoi-5-tuoi",
  "assets"
);

const FOLDERS = ["hinh-khoi", "dong-vat", "do-vat", "phuong-tien", "trai-cay"];
let n = 0;
FOLDERS.forEach((folder) => {
  const dest = path.join(root, "assets", "explore", folder);
  fs.mkdirSync(dest, { recursive: true });
  if (!fs.existsSync(src)) return;
  for (const name of fs.readdirSync(src)) {
    if (!/\.jpe?g$/i.test(name)) continue;
    const prefix = folder === "hinh-khoi" ? "hinh-" : "";
    const match =
      folder === "trai-cay"
        ? /^tc-/.test(name)
        : folder === "hinh-khoi"
          ? /^hinh-/.test(name)
          : folder === "dong-vat"
            ? /^dv-/.test(name)
            : folder === "do-vat"
              ? /^dvat-/.test(name)
              : /^pt-/.test(name);
    if (!match || !/-(do|vang|xanh-duong|xanh-la|cam|tim)\.jpe?g$/i.test(name)) continue;
    fs.copyFileSync(path.join(src, name), path.join(dest, name));
    n += 1;
  }
});
console.log("Copied", n, "color JPGs into explore folders");
