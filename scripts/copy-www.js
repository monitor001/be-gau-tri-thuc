const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const www = path.join(root, "www");

function rmrf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copy(path.join(src, name), path.join(dest, name));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

rmrf(www);
fs.mkdirSync(www, { recursive: true });

copy(path.join(root, "index.html"), path.join(www, "index.html"));
copy(path.join(root, "css"), path.join(www, "css"));
copy(path.join(root, "js"), path.join(www, "js"));
if (fs.existsSync(path.join(root, "assets"))) {
  copy(path.join(root, "assets"), path.join(www, "assets"));
}
["audio", "curriculum", "economy"].forEach((folder) => {
  const src = path.join(root, "content", folder);
  if (fs.existsSync(src)) copy(src, path.join(www, "content", folder));
});

console.log("www/ ready (with TTS scripts)");
