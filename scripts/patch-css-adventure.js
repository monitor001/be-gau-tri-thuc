const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "..", "css", "styles.css");
let s = fs.readFileSync(p, "utf8");
const start = s.indexOf("/* Placeholder remove old lego");
const end = s.indexOf(".map-top-right {");
if (start < 0 || end < 0) {
  console.error("markers", start, end);
  process.exit(1);
}
const insert = `
.map-select-sparkle {
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 200, 87, 0.9) 0%, transparent 70%);
  animation: mapSparkle 0.65s ease-out forwards;
  pointer-events: none;
  z-index: 5;
}
@keyframes mapSparkle {
  from { transform: scale(0.6); opacity: 0.9; }
  to { transform: scale(1.4); opacity: 0; }
}

/* Màn trong vùng — nền đặc, không phủ bản đồ (KT-005) */
.lessons-solid-screen {
  background:
    linear-gradient(180deg, rgba(255,248,231,0.95), color-mix(in srgb, var(--topic-bg, #d8f5d3) 55%, #fff8e7));
}
.lessons-content {
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--topic-tint, #5fad56) 12%, #fff8e7), #fff8e7);
  border-radius: 18px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  box-shadow: inset 0 0 0 3px color-mix(in srgb, var(--topic-tint, #5fad56) 25%, transparent);
}
.lessons-guide-row {
  max-width: min(96vw, 640px);
  width: 100%;
}
.lessons-guide-row .lessons-guide {
  width: 100%;
  max-height: none;
  margin: 0;
}
.lessons-guide-row .npc-figure.hero .npc-portrait.hero {
  width: clamp(64px, 12vh, 88px);
  height: clamp(64px, 12vh, 88px);
}
.lessons-guide-row .npc-bubble {
  font-size: clamp(0.9rem, 2.2vw, 1.05rem);
}
.lesson-path {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 0.55rem;
  padding: 0.65rem;
  align-content: start;
}
.lesson-card {
  position: relative;
  border: 4px solid var(--node-color, #5fad56);
  border-radius: 18px;
  background: rgba(255, 248, 231, 0.98);
  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.12);
  padding: 0.55rem 0.4rem 0.45rem;
  display: grid;
  justify-items: center;
  gap: 0.2rem;
  cursor: pointer;
  font: inherit;
  color: var(--ink);
  min-height: 118px;
}
.lesson-card-num {
  position: absolute;
  top: 0.3rem;
  left: 0.35rem;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--node-color, #5fad56);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.85rem;
  display: grid;
  place-items: center;
}
.lesson-card-emoji {
  font-size: clamp(2rem, 5vh, 2.6rem);
  line-height: 1;
  margin-top: 0.2rem;
}
.lesson-card-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(0.85rem, 2vw, 1rem);
  text-align: center;
  color: var(--bear-dark);
}
.lesson-card.is-current {
  outline: 3px solid var(--sun);
  animation: bob 2s ease-in-out infinite;
}
.lesson-card.is-complete {
  box-shadow: 0 5px 0 rgba(255, 200, 87, 0.5);
}
.lesson-card.is-locked {
  opacity: 0.5;
  filter: grayscale(0.35);
  cursor: not-allowed;
}
.map-screen .map-topbar {
  grid-template-columns: 56px 1fr auto;
  gap: 0.25rem;
}

`;
s = s.slice(0, start) + insert + s.slice(end);
fs.writeFileSync(p, s);
console.log("css cleaned ok");
