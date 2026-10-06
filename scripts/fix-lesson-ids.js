const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const idMap = {
  "Chữ A": "chu-a",
  "Chữ Ă": "chu-ab",
  "Chữ Â": "chu-ac",
  "Chữ Đ": "chu-dd",
  "Chữ Ê": "chu-ec",
  "Chữ Ô": "chu-om",
  "Chữ Ơ": "chu-ox",
  "Chữ Ư": "chu-uw"
};

let changed = 0;
for (const lesson of data.lessons) {
  const nextId = idMap[lesson.title];
  if (nextId && lesson.id !== nextId) {
    lesson.id = nextId;
    changed += 1;
  }
}

const seen = new Set();
for (const lesson of data.lessons) {
  if (seen.has(lesson.id)) {
    console.error("Still duplicate:", lesson.id, lesson.title);
    process.exit(1);
  }
  seen.add(lesson.id);
}

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);
console.log("Fixed lesson ids:", changed, "total lessons:", data.lessons.length);
