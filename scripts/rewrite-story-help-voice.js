/**
 * HDGD-VOICE + PEDA: đổi lời story sang giọng trẻ / nhờ giúp.
 * Intro: biến thể nhẹ (không 107 bài cùng 1 câu) — runtime friends.js cũng chọn theo lesson.id.
 * Không còn "Cô Sương đố vui".
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const INTRO_VARIANTS = [
  "Bạn Gấu ơi, giúp mình với!",
  "Bạn Gấu ơi, mình cần bạn!",
  "Bạn Gấu ơi, cứu mình với!",
  "Mình chờ Bạn Gấu giúp!",
  "Bạn Gấu ơi, mình ở đây này!"
];

function introForLessonId(lessonId) {
  const id = String(lessonId || "");
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h + id.charCodeAt(i) * (i + 1)) % INTRO_VARIANTS.length;
  return INTRO_VARIANTS[h];
}

function stripAdult(text) {
  return String(text || "")
    .replace(/Cô Sương đố vui!\s*/gi, "")
    .replace(/Cô Sương đố vui\s*/gi, "")
    .replace(/Câu đố của Cô Sương!\s*/gi, "")
    .replace(/Câu đố của Cô Sương\s*/gi, "")
    .replace(/cùng Cô Sương đố vui!\s*/gi, "")
    .replace(/Cứu (.+?) cùng Cô Sương đố vui!\s*/gi, "Cứu $1! ")
    .replace(/\s+/g, " ")
    .trim();
}

function friendShort(name) {
  return String(name || "Bạn")
    .replace(/^Bạn\s+/i, "")
    .trim() || "Bạn";
}

let n = 0;
for (const l of data.lessons) {
  if (!l.story) continue;
  const fname = l.friend?.name || `Bạn ${l.title}` || "Bạn";
  friendShort(fname);

  const intro = introForLessonId(l.id);
  l.story.intro = intro;
  if (!l.story.exploreLine || /Cô Sương/i.test(l.story.exploreLine)) {
    l.story.exploreLine = `Cùng khám phá với mình nào!`;
  } else {
    l.story.exploreLine = stripAdult(l.story.exploreLine)
      .replace(/^Bé giúp giải cứu .+? nhé!\s*/i, "")
      .replace(/^Bé giúp .+? nhé!\s*/i, "");
    if (!l.story.exploreLine) l.story.exploreLine = `Cùng nhìn với mình nào!`;
  }

  let gate = stripAdult(l.story.gateLine || "");
  gate = gate.replace(/^Câu đố đây!\s*/i, "").trim();
  if (!gate) gate = l.gate?.promptVi || "Chọn đúng giúp mình nhé!";
  if (!/giúp|cứu|mình/i.test(gate)) {
    l.story.gateLine = `${gate} Giúp mình với!`;
  } else {
    l.story.gateLine = gate;
  }

  l.story.winLine = `Cảm ơn Bạn Gấu! ${fname} về rồi!`;

  const knowledge = stripAdult(l.teachText || "")
    .replace(/^Bạn Gấu ơi,[^.!]*[.!]?\s*/i, "")
    .replace(/^Mình chờ Bạn Gấu giúp!\s*/i, "")
    .replace(/^Bé giúp giải cứu .+? nhé!\s*/i, "")
    .replace(/^Bé giúp .+? nhé!\s*/i, "")
    .replace(/^Cứu .+? nào!\s*/i, "")
    .trim();
  l.teachText = knowledge
    ? `${intro} ${knowledge}`
    : `${intro} Cùng chơi với ${fname} nào!`;

  n += 1;
}

data.contentCouncil = {
  ...(data.contentCouncil || {}),
  voiceHelpChild: "friend-plea-v2-variants",
  voiceHelpChildAt: new Date().toISOString()
};

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n", "utf8");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  `window.BeGauLessons = ${JSON.stringify(data)};\n`,
  "utf8"
);
console.log(`Rewrote help-voice story for ${n} lessons (${INTRO_VARIANTS.length} intro variants)`);
