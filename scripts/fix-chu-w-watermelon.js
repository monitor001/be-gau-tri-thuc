/** Update chu-w Wifi → Watermelon (dễ nhận diện hơn cho trẻ 2–5) */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const p = path.join(root, "content", "curriculum", "lessons.json");
const d = JSON.parse(fs.readFileSync(p, "utf8"));
const l = d.lessons.find((x) => x.id === "chu-w");
if (!l) throw new Error("no chu-w");
l.emoji = "🍉";
l.teachText = "Đây là chữ W. Watermelon bắt đầu bằng chữ W!";
l.exploreHint = "Chạm chữ W và nghe nhé!";
l.exploreItems = (l.exploreItems || []).map((it) => {
  if (it.label === "Wifi" || it.label === "Watermelon" || /wifi/i.test(it.speakLine || "")) {
    return {
      ...it,
      emoji: "🍉",
      label: "Watermelon",
      speakLine: "Watermelon bắt đầu bằng chữ W",
      img: "assets/explore/ai/chu-w.jpg"
    };
  }
  return it;
});
if (l.friend) {
  l.friend.emoji = "🍉";
  l.friend.img = "assets/explore/ai/chu-w.jpg";
}
if (l.story) {
  l.story.exploreLine = "Nhìn chữ W và watermelon (dưa hấu) nào!";
}
fs.writeFileSync(p, JSON.stringify(d, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(d) + ";\n"
);
console.log("chu-w → Watermelon OK");
