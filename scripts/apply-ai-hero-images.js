/**
 * Copy ảnh AI từ Cursor assets → assets/explore/ai
 * Gắn img cho mọi explore còn thiếu (ngoài màu đã có mau/*.jpg)
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const srcDir = path.join(
  process.env.USERPROFILE || "",
  ".cursor",
  "projects",
  "d-APP-tre-duoi-5-tuoi",
  "assets"
);
const aiDir = path.join(root, "assets", "explore", "ai");
fs.mkdirSync(aiDir, { recursive: true });

// Copy all relevant jpgs
let copied = 0;
if (fs.existsSync(srcDir)) {
  for (const name of fs.readdirSync(srcDir)) {
    if (!/\.jpe?g$/i.test(name)) continue;
    // skip mau-* (already in explore/mau)
    if (name.startsWith("mau-") && !name.startsWith("mau-explore")) continue;
    fs.copyFileSync(path.join(srcDir, name), path.join(aiDir, name));
    copied += 1;
  }
}
console.log("Copied", copied, "jpgs → assets/explore/ai");

const SHARED = {
  nghe: "assets/explore/ai/shared-nghe.jpg",
  nha: "assets/explore/ai/shared-nha.jpg",
  gio: "assets/explore/ai/shared-gio-qua.jpg",
  cham: "assets/explore/ai/shared-cham.jpg",
  sao: "assets/explore/ai/shared-sao.jpg",
  ca: "assets/explore/ai/shared-ca.jpg",
  mauve: "assets/explore/ai/shared-mau-ve.jpg",
  nhac: "assets/explore/ai/shared-nhac.jpg",
  duong: "assets/explore/ai/shared-duong.jpg",
  vay: "assets/explore/ai/shared-vay-tay.jpg",
  ban: "assets/explore/ai/shared-ban-than.jpg",
  gau: "assets/explore/ai/shared-be-gau.jpg"
};

const HINH_EXTRA = {
  "Quả bóng": "assets/explore/ai/hinh-extra-bong.jpg",
  "Đồng hồ": "assets/explore/ai/hinh-extra-dong-ho.jpg",
  Hộp: "assets/explore/ai/hinh-extra-hop.jpg",
  "Cửa sổ": "assets/explore/ai/hinh-extra-cua-so.jpg",
  "Miếng bánh": "assets/explore/ai/hinh-extra-banh.jpg",
  Lều: "assets/explore/ai/hinh-extra-leu.jpg",
  "Điện thoại": "assets/explore/ai/hinh-extra-dien-thoai.jpg",
  "Cánh cửa": "assets/explore/ai/hinh-extra-cua.jpg",
  "Quả trứng": "assets/explore/ai/hinh-extra-trung.jpg",
  "Gương bầu dục": "assets/explore/ai/hinh-extra-guong.jpg",
  "Ngôi sao": "assets/explore/ai/shared-sao.jpg",
  "Sao sáng": "assets/explore/ai/hinh-extra-sao-sang.jpg",
  "Trái tim": "assets/explore/ai/hinh-heart.jpg",
  "Tim nhỏ": "assets/explore/ai/hinh-extra-tim-nho.jpg"
};

function aiPath(id) {
  const p = path.join(aiDir, `${id}.jpg`);
  return fs.existsSync(p) ? `assets/explore/ai/${id}.jpg` : null;
}

function matchShared(label) {
  const t = (label || "").toLowerCase();
  if (/^nghe/.test(t)) return SHARED.nghe;
  if (/nhà bạn|trong nhà|nhà/.test(t)) return SHARED.nha;
  if (/giỏ quả/.test(t)) return SHARED.gio;
  if (/chạm/.test(t)) return SHARED.cham;
  if (/sao/.test(t)) return SHARED.sao;
  if (/\d+\s*cá|cá$/.test(t) || /^cá/.test(t)) return SHARED.ca;
  if (/bảng màu|cọ|màu/.test(t) && /vẽ|bảng|cọ/.test(t)) return SHARED.mauve;
  if (/nhạc/.test(t)) return SHARED.nhac;
  if (/đường/.test(t)) return SHARED.duong;
  if (/vẫy/.test(t)) return SHARED.vay;
  if (/bạn thân|ôm/.test(t)) return SHARED.ban;
  if (/bé gấu|gấu/.test(t)) return SHARED.gau;
  if (/ngon|giòn|vàng|chua|mát|chùm|ngọt|nước/.test(t)) return SHARED.sao;
  if (/cười|nước mắt|ồ|trái tim|hơi giận|đi ngủ|mặt/.test(t)) return null;
  if (/tiếng|meo|gâu|cục|ụm|ụt|cạp|chip|gầm|rống|kêu|bơi/.test(t)) return null;
  if (/thóc|cám|xương|cỏ|cá$|hạt|thịt|chuối|cà rốt/.test(t)) return null;
  return null;
}

const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

let filled = 0;
let missingHero = [];

data.lessons.forEach((l) => {
  if (l.topicId === "mau") return; // đã có mau/*.jpg
  // Giữ explore 1 chủ thể × nhiều màu
  if (["do-vat", "trai-cay", "dong-vat", "phuong-tien"].includes(l.topicId)) {
    const hero = aiPath(l.id);
    if (hero && l.friend) l.friend.img = hero;
    (l.exploreItems || []).forEach((it) => {
      if (hero) it.img = hero;
    });
    return;
  }

  const hero = aiPath(l.id);
  if (!hero) missingHero.push(l.id);

  if (!Array.isArray(l.exploreItems)) l.exploreItems = [];

  l.exploreItems.forEach((it, idx) => {
    if (it.img && fs.existsSync(path.join(root, it.img.replace(/\//g, path.sep)))) {
      return; // keep existing good img (letter SVG etc.)
    }

    // Hang Chữ: item chữ giữ SVG; item từ = hero AI; nghe = shared
    if (l.topicId === "chu") {
      if (/^Chữ\s/i.test(it.label || "") && it.img) return;
      if (/^Nghe/i.test(it.label || "")) {
        it.img = SHARED.nghe;
        filled += 1;
        return;
      }
      if (hero && !/^Chữ\s/i.test(it.label || "")) {
        it.img = hero;
        filled += 1;
        return;
      }
    }

    // primary / first item
    if (idx === 0 && hero) {
      it.img = hero;
      filled += 1;
      return;
    }

    // hinh extras
    if (l.topicId === "hinh" && HINH_EXTRA[it.label]) {
      it.img = HINH_EXTRA[it.label];
      filled += 1;
      return;
    }

    // so: số = hero; cá/sao = count visual (không gắn 1 ảnh đơn)
    if (l.topicId === "so") {
      if (it.count) return;
      if (/cá|sao/i.test(it.label || "")) return;
      if (hero) {
        it.img = hero;
        filled += 1;
        return;
      }
    }

    // animal food/sound — use hero for animal name; shared for house/friend
    if (l.topicId === "dong-vat") {
      if (/nhà/i.test(it.label || "")) {
        it.img = SHARED.nha;
        filled += 1;
        return;
      }
      if (/bạn/i.test(it.label || "")) {
        it.img = SHARED.ban;
        filled += 1;
        return;
      }
      if (idx === 0 && hero) {
        it.img = hero;
        filled += 1;
        return;
      }
      // sound / food: reuse hero so every tile has art
      if (hero) {
        it.img = hero;
        filled += 1;
        return;
      }
    }

    if (l.topicId === "trai-cay") {
      if (/giỏ/i.test(it.label || "")) {
        it.img = SHARED.gio;
        filled += 1;
        return;
      }
      if (hero) {
        it.img = hero;
        filled += 1;
        return;
      }
    }

    if (l.topicId === "do-vat") {
      if (/chạm/i.test(it.label || "")) {
        it.img = SHARED.cham;
        filled += 1;
        return;
      }
      if (/nhà/i.test(it.label || "")) {
        it.img = SHARED.nha;
        filled += 1;
        return;
      }
      if (hero) {
        it.img = hero;
        filled += 1;
        return;
      }
    }

    if (l.topicId === "cam-xuc") {
      if (/ôm/i.test(it.label || "")) {
        it.img = SHARED.ban;
        filled += 1;
        return;
      }
      if (hero) {
        it.img = hero;
        filled += 1;
        return;
      }
    }

    if (l.topicId === "phuong-tien") {
      if (/đường/i.test(it.label || "")) {
        it.img = SHARED.duong;
        filled += 1;
        return;
      }
      if (/vẫy/i.test(it.label || "")) {
        it.img = SHARED.vay;
        filled += 1;
        return;
      }
      if (hero) {
        it.img = hero;
        filled += 1;
        return;
      }
    }

    if (l.topicId === "nhay-mua") {
      if (/nhạc/i.test(it.label || "")) {
        it.img = SHARED.nhac;
        filled += 1;
        return;
      }
      if (/gấu|bé/i.test(it.label || "")) {
        it.img = SHARED.gau;
        filled += 1;
        return;
      }
      if (hero) {
        it.img = hero;
        filled += 1;
        return;
      }
    }

    if (l.topicId === "hoa-si") {
      if (/bảng|cọ|màu/i.test(it.label || "")) {
        it.img = SHARED.mauve;
        filled += 1;
        return;
      }
      if (/sao/i.test(it.label || "")) {
        it.img = SHARED.sao;
        filled += 1;
        return;
      }
      if (hero) {
        it.img = hero;
        filled += 1;
        return;
      }
    }

    const shared = matchShared(it.label);
    if (shared) {
      it.img = shared;
      filled += 1;
      return;
    }

    if (hero) {
      it.img = hero;
      filled += 1;
    }
  });

  if (l.friend) {
    l.friend.img = hero || l.exploreItems.find((x) => x.img)?.img || l.friend.img;
  }
});

data.contentCouncil = {
  ...(data.contentCouncil || {}),
  aiHeroVersion: 1,
  aiHeroSyncedAt: new Date().toISOString()
};

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);

// coverage
let need = 0;
let have = 0;
data.lessons.forEach((l) => {
  (l.exploreItems || []).forEach((it) => {
    if (it.img) have += 1;
    else need += 1;
  });
});
console.log("Filled slots:", filled);
console.log("Coverage explore with img:", have, "missing:", need);
if (missingHero.length) console.log("Missing hero files:", missingHero.join(", "));
