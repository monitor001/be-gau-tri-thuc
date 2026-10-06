/**
 * HDGD-VIS: khóa hình học thuần (SVG) — cấm AI nhân vật trong Đồi Hình.
 * Sinh circle / square / triangle / oval / rect / star / heart × 6 màu.
 */
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "assets", "explore", "hinh-khoi");
fs.mkdirSync(dir, { recursive: true });

const COLORS = {
  do: { hex: "#e03131", bg: "#FFE3E3" },
  vang: { hex: "#ffd43b", bg: "#FFF6C2" },
  "xanh-duong": { hex: "#1c7ed6", bg: "#D0EBFF" },
  "xanh-la": { hex: "#2f9e44", bg: "#D8F5D3" },
  cam: { hex: "#f76707", bg: "#FFE8CC" },
  tim: { hex: "#9c36b5", bg: "#F3D9FA" }
};

function wrap(label, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="${label}">
  <circle cx="64" cy="64" r="60" fill="BG"/>
${inner}
</svg>
`.replace("BG", "___BG___");
}

function shapeInner(kind, fill) {
  switch (kind) {
    case "circle":
      return `  <circle cx="64" cy="64" r="40" fill="${fill}"/>`;
    case "square":
      return `  <rect x="32" y="32" width="64" height="64" rx="4" fill="${fill}"/>`;
    case "triangle":
      return `  <polygon points="64,28 100,96 28,96" fill="${fill}"/>`;
    case "oval":
      return `  <ellipse cx="64" cy="64" rx="28" ry="42" fill="${fill}"/>`;
    case "rect":
      return `  <rect x="24" y="48" width="80" height="32" rx="4" fill="${fill}"/>`;
    case "star":
      return `  <polygon points="64,26 72,50 98,50 78,66 86,92 64,76 42,92 50,66 30,50 56,50" fill="${fill}"/>`;
    case "heart":
      return `  <path fill="${fill}" d="M64 98 C64 98 28 74 28 50 C28 36 38 28 48 28 C56 28 62 34 64 40 C66 34 72 28 80 28 C90 28 100 36 100 50 C100 74 64 98 64 98 Z"/>`;
    default:
      throw new Error(kind);
  }
}

const SHAPES = ["circle", "square", "triangle", "oval", "rect", "star", "heart"];
let n = 0;

for (const kind of SHAPES) {
  for (const [id, c] of Object.entries(COLORS)) {
    const body = wrap(`hinh ${kind} ${id}`, shapeInner(kind, c.hex)).replace("___BG___", c.bg);
    fs.writeFileSync(path.join(dir, `hinh-${kind}-${id}.svg`), body, "utf8");
    n += 1;
  }
}

console.log(`Wrote ${n} geometry SVGs → ${dir}`);
