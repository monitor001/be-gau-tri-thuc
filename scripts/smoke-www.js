/**
 * Smoke tĩnh cho www/ — hỗ trợ biên bản Hội đồng KT (không thay Playwright E2E).
 * Chạy: node scripts/smoke-www.js
 * Exit 1 nếu thiếu file / chuỗi bắt buộc.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const www = path.join(root, "www");
const fails = [];

function must(cond, msg) {
  if (!cond) fails.push(msg);
}

must(fs.existsSync(www), "thiếu thư mục www/ — chạy npm run build:web");

const files = [
  "index.html",
  "js/app.js",
  "js/tts.js",
  "js/voice-pack.js",
  "js/parent-audio.js",
  "js/friends.js",
  "js/lessons-data.js",
  "css/styles.css"
];
files.forEach((f) => {
  must(fs.existsSync(path.join(www, f)), `thiếu www/${f}`);
});

if (fs.existsSync(path.join(www, "index.html"))) {
  const html = fs.readFileSync(path.join(www, "index.html"), "utf8");
  must(html.includes("btn-parent-open-settings"), "index thiếu nút Mở Cài đặt máy");
  must(html.includes("parent-play-limit"), "index thiếu giới hạn chơi");
  must(html.includes("home-voice-warn"), "index thiếu cảnh báo thiếu TTS");
  must(html.includes("play-break-dialog"), "index thiếu dialog nghỉ chơi");
}

if (fs.existsSync(path.join(www, "js", "app.js"))) {
  const app = fs.readFileSync(path.join(www, "js", "app.js"), "utf8");
  must(app.includes("NUMBER_WORDS"), "app.js thiếu parent gate số bằng chữ");
  must(app.includes("shopBuying"), "app.js thiếu khóa đổi thưởng đôi");
  must(app.includes("storage.persist"), "app.js thiếu storage.persist");
  must(!/Cô Sương đố vui/.test(app), "app.js còn Cô Sương đố vui");
}

if (fs.existsSync(path.join(www, "js", "friends.js"))) {
  const fr = fs.readFileSync(path.join(www, "js", "friends.js"), "utf8");
  must(fr.includes("INTRO_VARIANTS"), "friends.js thiếu biến thể intro");
}

if (fs.existsSync(path.join(www, "js", "voice-pack.js"))) {
  const vp = fs.readFileSync(path.join(www, "js", "voice-pack.js"), "utf8");
  must(vp.includes("needsRerecord"), "voice-pack thiếu needsRerecord");
  must(vp.includes("openAppSettings"), "voice-pack thiếu openAppSettings");
}

console.log(fails.length ? `SMOKE FAIL (${fails.length})` : "SMOKE OK");
fails.forEach((f) => console.log(" -", f));
process.exit(fails.length ? 1 : 0);
