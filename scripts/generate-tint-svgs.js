/**
 * Sinh SVG cùng chủ thể × đúng màu (tránh ảnh AI một màu + recolor lệch).
 * Trái cây: shape vector. Còn lại: vòng màu lớn + emoji chủ thể.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "assets", "explore", "tint");
fs.mkdirSync(outDir, { recursive: true });

const data = JSON.parse(
  fs.readFileSync(path.join(root, "content", "curriculum", "lessons.json"), "utf8")
);

const COLORS = [
  { id: "do", name: "đỏ", hex: "#e03131" },
  { id: "vang", name: "vàng", hex: "#ffd43b" },
  { id: "xanh-duong", name: "xanh dương", hex: "#1c7ed6" },
  { id: "xanh-la", name: "xanh lá", hex: "#2f9e44" },
  { id: "cam", name: "cam", hex: "#f76707" },
  { id: "tim", name: "tím", hex: "#9c36b5" }
];

const BG = {
  do: "#FFE3E3",
  vang: "#FFF6C2",
  "xanh-duong": "#D0EBFF",
  "xanh-la": "#D8F5D3",
  cam: "#FFE8CC",
  tim: "#F3D9FA"
};

const SAME = new Set(["trai-cay", "do-vat", "dong-vat", "phuong-tien"]);

function wrap(label, bg, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="${label}">
  <circle cx="64" cy="64" r="60" fill="${bg}"/>
  ${body}
</svg>
`;
}

function lighten(hex, p = 0.25) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const L = (x) => Math.min(255, Math.round(x + (255 - x) * p));
  return `#${[L(r), L(g), L(b)].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

function darken(hex, p = 0.2) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * (1 - p));
  const g = Math.round(((n >> 8) & 255) * (1 - p));
  const b = Math.round((n & 255) * (1 - p));
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

/** Shape drawers for fruits + ball */
const SHAPES = {
  "tc-tao": (c) => {
    const m = c.hex;
    const hi = lighten(m, 0.35);
    return `
    <path d="M64 28 C52 28 44 36 42 48 C38 68 44 96 64 104 C84 96 90 68 86 48 C84 36 76 28 64 28 Z" fill="${m}"/>
    <ellipse cx="54" cy="58" rx="10" ry="16" fill="${hi}" opacity="0.55"/>
    <path d="M64 30 Q58 18 64 12" stroke="#5C4033" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="72" cy="20" rx="12" ry="6" fill="#2F9E44" transform="rotate(20 72 20)"/>`;
  },
  "tc-chuoi": (c) => `
    <path d="M38 34 C28 48 26 72 36 92 C42 104 52 110 62 108 C72 106 78 96 80 84 C84 64 80 46 68 34 C58 26 46 26 38 34 Z" fill="${c.hex}"/>
    <path d="M66 30 Q72 18 80 16" stroke="#5C4033" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="36" cy="36" rx="6" ry="5" fill="${darken(c.hex)}"/>`,
  "tc-cam": (c) => `
    <circle cx="64" cy="68" r="36" fill="${c.hex}"/>
    <circle cx="54" cy="58" r="8" fill="${lighten(c.hex)}" opacity="0.5"/>
    <path d="M64 34 Q60 22 66 18" stroke="#2F9E44" stroke-width="4" fill="none"/>
    <ellipse cx="72" cy="22" rx="10" ry="5" fill="#2F9E44"/>`,
  "tc-xoai": (c) => `
    <path d="M48 28 C28 48 26 78 42 98 C52 110 72 112 86 98 C104 78 102 48 84 30 C72 20 58 20 48 28 Z" fill="${c.hex}"/>
    <ellipse cx="70" cy="12" rx="10" ry="5" fill="#2F9E44" transform="rotate(-20 70 12)"/>`,
  "tc-dua-hau": (c) => `
    <ellipse cx="64" cy="70" rx="40" ry="34" fill="${c.id === "do" || c.id === "cam" ? "#2F9E44" : c.hex}"/>
    <path d="M64 40 L64 100" stroke="${c.id === "xanh-la" ? darken(c.hex) : "#1B5E20"}" stroke-width="3"/>
    <path d="M40 55 Q64 48 88 55" stroke="${c.id === "xanh-la" ? darken(c.hex) : "#1B5E20"}" stroke-width="2" fill="none"/>
    <path d="M64 70 L100 50 L100 90 Z" fill="${c.id === "do" ? c.hex : "#e03131"}"/>`,
  "tc-nho": (c) => `
    <circle cx="52" cy="58" r="14" fill="${c.hex}"/>
    <circle cx="72" cy="52" r="14" fill="${lighten(c.hex, 0.1)}"/>
    <circle cx="66" cy="72" r="14" fill="${darken(c.hex, 0.1)}"/>
    <circle cx="48" cy="76" r="12" fill="${c.hex}"/>
    <path d="M64 40 Q60 28 68 24" stroke="#5C4033" stroke-width="3" fill="none"/>`,
  "tc-dau": (c) => `
    <path d="M64 36 C48 36 40 52 42 68 C46 92 64 108 64 108 C64 108 82 92 86 68 C88 52 80 36 64 36 Z" fill="${c.hex}"/>
    <ellipse cx="64" cy="34" rx="16" ry="8" fill="#2F9E44"/>
    <circle cx="54" cy="60" r="2.5" fill="${lighten(c.hex, 0.5)}"/>
    <circle cx="68" cy="70" r="2.5" fill="${lighten(c.hex, 0.5)}"/>
    <circle cx="60" cy="80" r="2.5" fill="${lighten(c.hex, 0.5)}"/>`,
  "tc-dua": (c) => `
    <circle cx="64" cy="70" r="34" fill="${c.hex}"/>
    <ellipse cx="64" cy="70" rx="34" ry="12" fill="${darken(c.hex)}" opacity="0.25"/>
    <circle cx="64" cy="42" r="8" fill="${darken(c.hex)}"/>`,
  "dvat-bong": (c) => `
    <circle cx="64" cy="64" r="36" fill="${c.hex}"/>
    <path d="M64 28 L64 100 M28 64 L100 64 M40 40 L88 88 M88 40 L40 88" stroke="#fff" stroke-width="3" opacity="0.85"/>`
};

/** Vòng màu rõ + emoji chủ thể (nhận diện đối tượng + màu) */
function emojiSubject(emoji, c) {
  const safe = String(emoji || "⭐").replace(/[<>&]/g, "");
  return `
    <circle cx="64" cy="64" r="42" fill="${c.hex}"/>
    <circle cx="64" cy="64" r="42" fill="none" stroke="${darken(c.hex, 0.15)}" stroke-width="3"/>
    <ellipse cx="50" cy="48" rx="12" ry="8" fill="${lighten(c.hex, 0.45)}" opacity="0.55"/>
    <text x="64" y="78" text-anchor="middle" font-size="44">${safe}</text>`;
}

let n = 0;
const index = {};

data.lessons.forEach((l) => {
  if (!SAME.has(l.topicId)) return;
  const draw = SHAPES[l.id] || ((c) => emojiSubject(l.emoji, c));
  index[l.id] = {};
  COLORS.forEach((c) => {
    const file = `${l.id}-${c.id}.svg`;
    const abs = path.join(outDir, file);
    const label = `${l.title || l.id} ${c.name}`;
    fs.writeFileSync(abs, wrap(label, BG[c.id], draw(c)), "utf8");
    index[l.id][c.id] = `assets/explore/tint/${file}`;
    n += 1;
  });
});

fs.writeFileSync(path.join(outDir, "index.json"), JSON.stringify(index, null, 2) + "\n");
console.log("Generated", n, "tinted SVGs for", Object.keys(index).length, "lessons");
