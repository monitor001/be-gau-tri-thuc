const fs = require("fs");
const path = require("path");

const jsonPath = path.join(__dirname, "..", "content", "curriculum", "lessons.json");
let raw = fs.readFileSync(jsonPath, "utf8");
raw = raw.replace(/\r\n/g, "\n").trim();
raw = raw.replace(/\\n\s*$/g, "");
while (raw.endsWith("}")) {
  try {
    JSON.parse(raw);
    break;
  } catch {
    const idx = raw.lastIndexOf("}");
    if (idx <= 0) throw new Error("Cannot repair lessons.json");
    raw = raw.slice(0, idx).trimEnd();
    if (!raw.endsWith("}")) raw += "\n}";
  }
}
const data = JSON.parse(raw);
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log("Repaired lessons.json — lessons:", data.lessons.length);
