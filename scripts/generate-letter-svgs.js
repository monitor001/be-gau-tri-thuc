/**
 * Sinh SVG chữ cái lớn (Hang Chữ) — nhận diện khi che chữ.
 * Chạy: node scripts/generate-letter-svgs.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "assets", "explore", "chu");
fs.mkdirSync(outDir, { recursive: true });

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function slug(letter) {
  return letter.toLowerCase();
}

function svgFor(letter) {
  const fontSize = letter.length > 1 ? 56 : 72;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="Chữ ${letter}">
  <circle cx="64" cy="64" r="60" fill="#EDE7FF"/>
  <circle cx="64" cy="64" r="52" fill="#FFFFFF" stroke="#7C5CFF" stroke-width="4"/>
  <text x="64" y="76" text-anchor="middle" font-family="Segoe UI, Arial Rounded MT Bold, Arial, sans-serif" font-size="${fontSize}" font-weight="800" fill="#5F3DC4">${letter}</text>
</svg>
`;
}

LETTERS.forEach((letter) => {
  const file = path.join(outDir, `chu-${slug(letter)}.svg`);
  fs.writeFileSync(file, svgFor(letter), "utf8");
});

console.log("Generated", LETTERS.length, "letter SVGs in", outDir);
