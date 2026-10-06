/**
 * Sinh SVG minh họa đúng màu cho MỌI món explore 8 bài màu.
 * Chạy: node scripts/generate-color-explore-svgs.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const canonPath = path.join(root, "content", "curriculum", "color-explore-canonical.json");
const outDir = path.join(root, "assets", "explore", "mau");
fs.mkdirSync(outDir, { recursive: true });

const canon = JSON.parse(fs.readFileSync(canonPath, "utf8"));

function slug(id, label) {
  const base = label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${id}-${base}`.slice(0, 64);
}

function wrap(label, bg, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="${label}">
  <circle cx="64" cy="64" r="60" fill="${bg}"/>
  ${inner}
</svg>
`;
}

const SHAPES = {
  "Quả chuối": (c) =>
    `<path d="M38 34 C28 48 26 72 36 92 C42 104 52 110 62 108 C72 106 78 96 80 84 C84 64 80 46 68 34 C58 26 46 26 38 34 Z" fill="${c.main}"/><path d="M66 30 Q72 18 80 16" stroke="#5C4033" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="36" cy="36" rx="6" ry="5" fill="#E67700"/>`,
  "Gà con": (c) =>
    `<circle cx="64" cy="72" r="28" fill="${c.main}"/><circle cx="78" cy="52" r="18" fill="${c.light}"/><circle cx="82" cy="48" r="3" fill="#212529"/><path d="M92 50 L104 48 L92 54 Z" fill="#F76707"/>`,
  "Hoa hướng dương": (c) =>
    `<circle cx="64" cy="64" r="22" fill="${c.dark}"/>${[0, 45, 90, 135, 180, 225, 270, 315]
      .map(
        (deg) =>
          `<ellipse cx="64" cy="36" rx="10" ry="18" fill="${c.main}" transform="rotate(${deg} 64 64)"/>`
      )
      .join("")}`,
  "Quả xoài chín": (c) =>
    `<ellipse cx="64" cy="70" rx="32" ry="40" fill="${c.main}"/><ellipse cx="58" cy="66" rx="18" ry="28" fill="${c.light}" opacity="0.85"/><path d="M64 32 Q60 18 66 14" stroke="#5C4033" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="74" cy="20" rx="12" ry="6" fill="#2F9E44" transform="rotate(-25 74 20)"/>`,
  "Hoa mai": (c) =>
    `<circle cx="64" cy="36" r="16" fill="${c.main}"/><circle cx="90" cy="54" r="16" fill="${c.main}"/><circle cx="80" cy="86" r="16" fill="${c.main}"/><circle cx="48" cy="86" r="16" fill="${c.main}"/><circle cx="38" cy="54" r="16" fill="${c.main}"/><circle cx="64" cy="64" r="14" fill="${c.dark}"/><circle cx="64" cy="64" r="6" fill="#FFEC99"/>`,
  "Vịt con": () =>
    `<ellipse cx="58" cy="78" rx="36" ry="28" fill="#FFD43B"/><circle cx="78" cy="48" r="22" fill="#FFE066"/><ellipse cx="98" cy="50" rx="12" ry="6" fill="#F76707"/><circle cx="82" cy="44" r="3.5" fill="#212529"/>`,
  "Việt quất": (c) =>
    `<circle cx="48" cy="70" r="16" fill="${c.main}"/><circle cx="72" cy="58" r="16" fill="${c.light}"/><circle cx="82" cy="78" r="14" fill="${c.dark}"/>`,
  "Xe xanh dương": (c) =>
    `<rect x="24" y="58" width="80" height="28" rx="8" fill="${c.main}"/><path d="M38 58 L50 40 H78 L92 58 Z" fill="${c.light}"/>`,
  "Áo tím": (c) =>
    `<path d="M40 40 L28 52 L40 60 L40 100 H88 V60 L100 52 L88 40 H74 L64 50 L54 40 Z" fill="${c.main}"/>`,
  "Áo hồng": (c) =>
    `<path d="M40 40 L28 52 L40 60 L40 100 H88 V60 L100 52 L88 40 H74 L64 50 L54 40 Z" fill="${c.main}"/>`,
  default: (c, label) =>
    `<rect x="32" y="32" width="64" height="64" rx="16" fill="${c.main}"/><text x="64" y="72" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">${label.slice(0, 8)}</text>`
};

const PALETTE = {
  "mau-do": { bg: "#FFE3E3", main: "#E03131", light: "#FF8787", dark: "#C92A2A" },
  "mau-vang": { bg: "#FFF6C2", main: "#FFD43B", light: "#FFE066", dark: "#F08C00" },
  "mau-xanh-duong": { bg: "#D0EBFF", main: "#1C7ED6", light: "#74C0FC", dark: "#1864AB" },
  "mau-xanh-la": { bg: "#D8F5D3", main: "#2F9E44", light: "#69DB7C", dark: "#087F5B" },
  "mau-cam": { bg: "#FFE8CC", main: "#F76707", light: "#FFA94D", dark: "#E8590C" },
  "mau-tim": { bg: "#F3D9FA", main: "#9C36B5", light: "#DA77F2", dark: "#7B2CAB" },
  "mau-hong": { bg: "#FFE3EC", main: "#F06595", light: "#F783AC", dark: "#D6336C" },
  "mau-nau": { bg: "#F1E4D3", main: "#8B5A2B", light: "#A67C52", dark: "#5C4033" }
};

let count = 0;
Object.keys(canon).forEach((lessonId) => {
  if (lessonId.startsWith("_")) return;
  const colors = PALETTE[lessonId] || PALETTE["mau-vang"];
  canon[lessonId].forEach((item) => {
    const file = `${slug(lessonId, item.label)}.svg`;
    const rel = `assets/explore/mau/${file}`;
    const abs = path.join(outDir, file);
    const draw = SHAPES[item.label] || SHAPES.default;
    const inner = draw(colors, item.label);
    fs.writeFileSync(abs, wrap(item.label, colors.bg, inner), "utf8");
    item.img = rel;
    delete item.note;
    count += 1;
  });
});

canon._meta.version = (canon._meta.version || 5) + 0;
canon._meta.version = 6;
canon._meta.exploreSvgGenerated = new Date().toISOString().slice(0, 10);
canon._meta.rule = "Moi mon explore bai mau bat buoc co img SVG — khong hien emoji lech mau";
fs.writeFileSync(canonPath, JSON.stringify(canon, null, 2) + "\n", "utf8");
console.log("Generated", count, "color explore SVGs in assets/explore/mau/");
