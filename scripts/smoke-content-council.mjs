/**
 * Smoke Hội đồng ND: load app trong happy-dom, kiểm tra data + explore mau-vang.
 */
import { Window } from "happy-dom";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const window = new Window({ url: "http://localhost:5500/index.html" });
const { document } = window;
globalThis.window = window;
globalThis.document = document;
globalThis.localStorage = window.localStorage;
globalThis.HTMLElement = window.HTMLElement;

// stub speech / capacitor
window.speechSynthesis = { getVoices: () => [], speak() {}, cancel() {}, pending: false };
window.SpeechSynthesisUtterance = function (t) {
  this.text = t;
};

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
document.write(html);

// load scripts in order (skip remote)
const scripts = [
  "js/lessons-data.js",
  "js/tts.js",
  "js/sfx.js",
  "js/npc.js",
  "js/friends.js",
  "js/map-world.js",
  "js/app.js"
];
for (const src of scripts) {
  const code = fs.readFileSync(path.join(root, src), "utf8");
  window.eval(code);
}

const data = window.BeGauLessons;
const findings = [];
if (!data?.lessons?.length) findings.push("BeGauLessons missing");

const y = data.lessons.find((l) => l.id === "mau-vang");
const vit = y?.exploreItems?.find((i) => /Vịt/i.test(i.label));
if (!vit?.img) findings.push("mau-vang thiếu img vịt");
if (y?.exploreItems?.some((i) => /chanh/i.test(i.label))) findings.push("mau-vang còn chanh");
if (!y?.exploreItems?.some((i) => /xoài/i.test(i.label))) findings.push("mau-vang thiếu xoài");

// SVG exists
const svgPath = path.join(root, "assets/explore/vit-con-vang.svg");
if (!fs.existsSync(svgPath)) findings.push("thiếu vit-con-vang.svg");

// every lesson gate
let gateOk = 0;
data.lessons.forEach((l) => {
  const qs = Array.isArray(l.gate?.questions) ? l.gate.questions : [l.gate].filter(Boolean);
  if (qs.length && qs.every((q) => q.promptVi && q.choices?.length >= 2)) gateOk += 1;
});

console.log("lessons", data.lessons.length, "gateOk", gateOk);
console.log("mau-vang vit", vit);
console.log("findings", findings.length ? findings : "none");
console.log("DOM screens", [...document.querySelectorAll(".screen")].map((s) => s.id).join(", "));
process.exit(findings.length ? 1 : 0);
