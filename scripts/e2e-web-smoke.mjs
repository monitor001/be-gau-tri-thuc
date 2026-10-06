/**
 * E2E web smoke — Home → Map → Rừng Màu → Màu Vàng → Explore → Gate
 * Chạy khi server :5500 đang bật (hoặc load file local).
 */
import { Window } from "happy-dom";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const base = process.env.BEGAU_BASE || "http://localhost:5500";

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.text();
}

const findings = [];
const ok = (m) => console.log("OK", m);
const bad = (m) => {
  findings.push(m);
  console.log("FAIL", m);
};

const window = new Window({ url: `${base}/index.html` });
const { document } = window;
Object.assign(globalThis, {
  window,
  document,
  localStorage: window.localStorage,
  HTMLElement: window.HTMLElement,
  fetch: globalThis.fetch
});

window.speechSynthesis = {
  getVoices: () => [{ lang: "vi-VN", name: "vi" }],
  speak() {},
  cancel() {},
  pending: false,
  speaking: false
};
window.SpeechSynthesisUtterance = function (t) {
  this.text = t;
  this.lang = "vi-VN";
  this.rate = 1;
  this.pitch = 1;
  this.onend = null;
};

const html = await fetchText(`${base}/index.html`);
document.write(html);

// Phải set trước khi app.js đọc state
window.localStorage.setItem("be-gau-cleared-v2", JSON.stringify(["mau-do"]));
window.localStorage.setItem("be-gau-stars-v3", JSON.stringify({ "mau-do": 3 }));

const scriptSrcs = [
  "js/lessons-data.js",
  "js/tts.js",
  "js/sfx.js",
  "js/npc.js",
  "js/friends.js",
  "js/map-world.js",
  "js/app.js"
];
for (const src of scriptSrcs) {
  const code = await fetchText(`${base}/${src}`);
  window.eval(code);
}

// Wait microtasks / DOMContentLoaded handlers
await new Promise((r) => setTimeout(r, 50));
document.dispatchEvent(new window.Event("DOMContentLoaded"));
await new Promise((r) => setTimeout(r, 80));

const $ = (sel) => document.querySelector(sel);
const click = (el, label) => {
  if (!el) {
    bad(`không thấy ${label}`);
    return false;
  }
  if (typeof el.click === "function") el.click();
  else el.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
  return true;
};
const activeScreen = () => [...document.querySelectorAll(".screen")].find((s) => s.classList.contains("active"))?.id;

if (!$("#btn-play")) bad("thiếu nút Chơi");
else {
  click($("#btn-play"), "play");
  await new Promise((r) => setTimeout(r, 300));
  if (activeScreen() === "screen-topics") ok("vào bản đồ thế giới");
  else bad(`sau play: ${activeScreen()}`);
}

console.log(
  "islands world",
  [...document.querySelectorAll("#map-nodes .adv-island")].map((b) => b.textContent.replace(/\s+/g, " ").trim())
);

// Click Rừng Màu island (label shortName)
const mauBtn = [...document.querySelectorAll("#map-nodes .adv-island")].find((b) =>
  /Rừng Màu/i.test(b.textContent || "")
);
if (!mauBtn) bad("không thấy đảo Rừng Màu");
else click(mauBtn, "Rừng Màu");
await new Promise((r) => setTimeout(r, 450));
if (activeScreen() === "screen-lessons") ok("vào map bài (Rừng Màu)");
else bad(`sau chọn vùng: ${activeScreen()} · nodes=${document.querySelectorAll("#lesson-nodes .adv-island").length}`);

// Click bài Màu Vàng
let lessonBtns = [...document.querySelectorAll("#lesson-nodes .adv-island")];
console.log(
  "lesson islands",
  lessonBtns.map((b) => b.textContent.replace(/\s+/g, " ").trim())
);
let yellow = lessonBtns.find((b) => /Vàng/i.test(b.textContent || ""));
if (!yellow) yellow = lessonBtns.find((b) => !b.classList.contains("is-locked"));
if (!yellow) bad("không có bài để mở");
else click(yellow, "bài Màu Vàng");
await new Promise((r) => setTimeout(r, 450));
if (activeScreen() === "screen-explore") ok("vào khám phá");
else bad(`sau chọn bài: ${activeScreen()}`);

const items = [...document.querySelectorAll(".explore-item")];
console.log("explore items", items.length, items.map((b) => b.textContent.trim()).join(" | "));
if (items.length >= 4) ok(`explore hiện ${items.length} món`);
else bad(`explore ít món: ${items.length}`);

const vitImg = document.querySelector(".explore-item-img");
const vitSrc = vitImg?.getAttribute("src") || "";
if (vitSrc.includes("vit-con-vang")) ok("UI có SVG vịt con vàng");
else if (items.some((b) => /Vịt/i.test(b.textContent))) bad("có nhãn Vịt nhưng thiếu img SVG trên UI");
else if (items.length) console.log("NOTE: không thấy Vịt trên UI bài hiện tại");

// Data assert mau-vang regardless of which lesson unlocked
const y = window.BeGauLessons.lessons.find((l) => l.id === "mau-vang");
const vit = y.exploreItems.find((i) => /Vịt/i.test(i.label));
if (vit?.img?.includes("vit-con-vang")) ok("data mau-vang: vịt có img");
else bad("data mau-vang thiếu img vịt");
if (y.exploreItems.some((i) => /xoài/i.test(i.label))) ok("data mau-vang: có xoài chín");
else bad("data mau-vang thiếu xoài");
if (y.exploreItems.some((i) => /chanh/i.test(i.label))) bad("data mau-vang còn chanh");
else ok("data mau-vang: không chanh");

// SVG fetchable
try {
  const svgRes = await fetch(`${base}/assets/explore/vit-con-vang.svg`);
  if (svgRes.ok) ok(`SVG HTTP ${svgRes.status}`);
  else bad(`SVG HTTP ${svgRes.status}`);
} catch (e) {
  bad("SVG fetch lỗi: " + e.message);
}

click($("#btn-to-gate"), "qua cửa");
await new Promise((r) => setTimeout(r, 200));
if (activeScreen() === "screen-gate") ok("vào cửa đố vui");
else bad(`sau qua cửa: ${activeScreen()}`);

const choices = [...document.querySelectorAll("#gate-choices .choice, #gate-choices button")];
console.log("gate choices", choices.length);
if (choices.length >= 2) ok(`gate ${choices.length} lựa chọn`);
else bad("gate thiếu lựa chọn");

// pick correct if marked
const right = document.querySelector('#gate-choices [data-correct="1"]');
if (right) {
  click(right, "đáp án đúng");
  await new Promise((r) => setTimeout(r, 1000));
  ok("đã chạm đáp án đúng (câu 1)");
} else bad("không có data-correct=1");

console.log("\n=== KẾT QUẢ E2E WEB ===");
console.log("findings:", findings.length ? findings : "none");
console.log("active:", activeScreen());
process.exit(findings.length ? 1 : 0);
