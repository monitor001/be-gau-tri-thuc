/** SVG hình tròn thuần — khóa HDGD-VIS (không AI nhân vật) */
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "assets", "explore", "hinh-khoi");
fs.mkdirSync(dir, { recursive: true });

const COLORS = {
  do: { hex: "#e03131", bg: "#FFE3E3", name: "đỏ" },
  vang: { hex: "#ffd43b", bg: "#FFF6C2", name: "vàng" },
  "xanh-duong": { hex: "#1c7ed6", bg: "#D0EBFF", name: "xanh dương" },
  "xanh-la": { hex: "#2f9e44", bg: "#D8F5D3", name: "xanh lá" },
  cam: { hex: "#f76707", bg: "#FFE8CC", name: "cam" },
  tim: { hex: "#9c36b5", bg: "#F3D9FA", name: "tím" }
};

Object.entries(COLORS).forEach(([id, c]) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="hinh tron ${id}">
  <circle cx="64" cy="64" r="60" fill="${c.bg}"/>
  <circle cx="64" cy="64" r="40" fill="${c.hex}"/>
</svg>
`;
  fs.writeFileSync(path.join(dir, `hinh-circle-${id}.svg`), svg, "utf8");
});

console.log("Wrote", Object.keys(COLORS).length, "circle SVGs →", dir);
