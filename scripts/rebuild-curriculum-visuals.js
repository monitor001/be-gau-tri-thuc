/**
 * Khóa minh họa đúng kiến thức: màu (SVG) + chữ + explore khác.
 * Chạy: node scripts/rebuild-curriculum-visuals.js
 */
const { execSync } = require("child_process");
const path = require("path");

const root = path.join(__dirname, "..");
const run = (cmd) => {
  console.log(">", cmd);
  execSync(cmd, { cwd: root, stdio: "inherit" });
};

run("node scripts/repair-lessons-json.js");
run("node scripts/generate-letter-svgs.js");
run("node scripts/generate-color-explore-svgs.js");
run("node scripts/sync-color-explore.js");
run("node scripts/sync-chu-explore.js");
run("node scripts/fix-explore-knowledge.js");
run("node scripts/audit-content-council.js");
