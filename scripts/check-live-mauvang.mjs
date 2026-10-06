const base = process.env.BEGAU_BASE || "http://localhost:5500";
const js = await (await fetch(`${base}/js/lessons-data.js`)).text();
const d = JSON.parse(js.replace(/^window\.BeGauLessons\s*=\s*/, "").replace(/;\s*$/, ""));
const y = d.lessons.find((l) => l.id === "mau-vang");
console.log("LIVE mau-vang @", base);
for (const i of y.exploreItems) {
  console.log("-", i.img || i.emoji, i.label);
}
const svg = await fetch(`${base}/assets/explore/vit-con-vang.svg`);
console.log("SVG", svg.status, (await svg.text()).slice(0, 60));
const css = await fetch(`${base}/css/styles.css`);
console.log("CSS", css.status, "has explore-item-img", (await css.text()).includes("explore-item-img"));
