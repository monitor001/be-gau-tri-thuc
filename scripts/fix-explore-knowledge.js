/**
 * Sửa explore lệch kiến thức ngoài màu/chữ:
 * - Động vật / quả / đồ: món 1 = khái niệm bài (không generic)
 * - Xoài quả dùng SVG vàng
 * - Màu hồng/nâu: emoji font ổn hơn
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "content", "curriculum", "lessons.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const ANIMAL = {
  "dv-meo": { sound: "Meo meo", soundEmoji: "🔊", food: "Cá", foodEmoji: "🐟" },
  "dv-cho": { sound: "Gâu gâu", soundEmoji: "🔊", food: "Xương", foodEmoji: "🦴" },
  "dv-ga": { sound: "Cục tác", soundEmoji: "🔊", food: "Thóc", foodEmoji: "🌾" },
  "dv-bo": { sound: "Ụm bò", soundEmoji: "🔊", food: "Cỏ", foodEmoji: "🌿" },
  "dv-heo": { sound: "Ụt ịt", soundEmoji: "🔊", food: "Cám", foodEmoji: "🥣" },
  "dv-vit": { sound: "Cạp cạp", soundEmoji: "🔊", food: "Thóc", foodEmoji: "🌾", img: "assets/explore/vit-con-vang.svg" },
  "dv-tho": { sound: "Kêu nhẹ", soundEmoji: "🔊", food: "Cà rốt", foodEmoji: "🥕" },
  "dv-ca": { sound: "Bơi bơi", soundEmoji: "🔊", food: "Nước", foodEmoji: "💧" },
  "dv-chim": { sound: "Chip chip", soundEmoji: "🔊", food: "Hạt", foodEmoji: "🌾" },
  "dv-ho": { sound: "Gầm", soundEmoji: "🔊", food: "Thịt", foodEmoji: "🥩" },
  "dv-voi": { sound: "Rống", soundEmoji: "🔊", food: "Cỏ", foodEmoji: "🌿" },
  "dv-khi": { sound: "Kêu vui", soundEmoji: "🔊", food: "Chuối", foodEmoji: "🍌" }
};

const FRUIT_EXTRA = {
  "tc-tao": { tip: "Giòn", tipEmoji: "✨" },
  "tc-chuoi": { tip: "Vàng", tipEmoji: "💛" },
  "tc-cam": { tip: "Chua ngọt", tipEmoji: "😋" },
  "tc-xoai": { tip: "Chín vàng", tipEmoji: "💛", img: "assets/explore/xoai-vang.svg" },
  "tc-dua-hau": { tip: "Mát", tipEmoji: "🧊" },
  "tc-nho": { tip: "Chùm", tipEmoji: "💜" },
  "tc-dau": { tip: "Ngọt", tipEmoji: "😋" },
  "tc-dua": { tip: "Nước dừa", tipEmoji: "💧" }
};

let n = 0;

data.lessons.forEach((l) => {
  if (l.topicId === "dong-vat" || l.topicId === "trai-cay" || l.topicId === "do-vat" || l.topicId === "phuong-tien") {
    // Explore 1 chủ thể × nhiều màu — scripts/rebuild-explore-same-subject.js
    return;
  }

  if (false && l.topicId === "dong-vat" && ANIMAL[l.id]) {
    const a = ANIMAL[l.id];
    const name = l.title;
    l.exploreItems = [
      {
        emoji: l.emoji,
        label: name,
        speakLine: l.speakText || `Con ${name}`,
        ...(a.img ? { img: a.img } : {})
      },
      { emoji: a.soundEmoji, label: a.sound, speakLine: a.sound },
      { emoji: a.foodEmoji, label: a.food, speakLine: `${name} thích ${a.food.toLowerCase()}` }
    ];
    n += 1;
  }

  if (false && l.topicId === "trai-cay" && FRUIT_EXTRA[l.id]) {
    const f = FRUIT_EXTRA[l.id];
    l.exploreItems = [
      {
        emoji: l.emoji,
        label: l.title,
        speakLine: `Quả ${l.title}`,
        ...(f.img ? { img: f.img } : {})
      },
      { emoji: "🧺", label: "Giỏ quả", speakLine: "Bỏ vào giỏ quả" },
      { emoji: f.tipEmoji, label: f.tip, speakLine: `${l.title} ${f.tip.toLowerCase()}` }
    ];
    n += 1;
  }

  if (false && l.topicId === "do-vat") {
    const name = l.title;
    l.exploreItems = [
      { emoji: l.emoji, label: name, speakLine: `Đây là ${name}` },
      { emoji: "👆", label: "Chạm nào", speakLine: `Chạm vào ${name}` },
      { emoji: "🏠", label: "Trong nhà", speakLine: `${name} ở trong nhà` }
    ];
    n += 1;
  }

  // Cảm xúc: bỏ gương 🪞 dễ thiếu font — dùng mặt cảm xúc + ôm
  if (l.topicId === "cam-xuc") {
    const name = l.title;
    l.exploreItems = [
      { emoji: l.emoji, label: name, speakLine: `Bé ${name.toLowerCase()}` },
      { emoji: "😊", label: "Mặt vui", speakLine: "Nhìn mặt cảm xúc nào" },
      { emoji: "🤗", label: "Ôm bé", speakLine: "Ôm bé Gấu nào" }
    ];
    // mặt vui trùng bài vui — chỉnh theo bài
    if (l.id === "cx-vui") {
      l.exploreItems[1] = { emoji: "😄", label: "Cười to", speakLine: "Cười vui nào" };
    } else if (l.id === "cx-buon") {
      l.exploreItems[1] = { emoji: "💧", label: "Nước mắt", speakLine: "Buồn có nước mắt" };
    } else if (l.id === "cx-ngac-nhien") {
      l.exploreItems[1] = { emoji: "❗", label: "Ồ!", speakLine: "Ồ ngạc nhiên!" };
    } else if (l.id === "cx-yeu-thuong") {
      l.exploreItems[1] = { emoji: "💛", label: "Trái tim", speakLine: "Yêu thương bé" };
    } else if (l.id === "cx-gian-nhe") {
      l.exploreItems[1] = { emoji: "☁️", label: "Hơi giận", speakLine: "Giận nhẹ rồi hết" };
    } else if (l.id === "cx-met") {
      l.exploreItems[1] = { emoji: "🌙", label: "Đi ngủ", speakLine: "Mệt thì đi ngủ" };
    }
    n += 1;
  }

  // Họa sĩ: bỏ trống/sáo lệch chủ đề — giữ tô/vẽ/sao
  if (l.id === "hs-go-trong") {
    l.title = "Gõ nhịp";
    l.teachText = "Bé gõ nhịp vui cùng màu sắc nào!";
    l.exploreItems = [
      { emoji: "🥁", label: "Gõ trống", speakLine: "Gõ trống nào" },
      { emoji: "🎨", label: "Bảng màu", speakLine: "Nhìn bảng màu" },
      { emoji: "⭐", label: "Sao vui", speakLine: "Sao vui quá" }
    ];
    n += 1;
  }
  if (l.id === "hs-nghe-sao") {
    l.title = "Nghe màu";
    l.teachText = "Bé nghe tên màu và nhìn hình nào!";
    l.emoji = "🎨";
    l.exploreItems = [
      { emoji: "🎨", label: "Bảng màu", speakLine: "Bảng màu đẹp" },
      { emoji: "🟡", label: "Màu vàng", speakLine: "Màu vàng" },
      { emoji: "👂", label: "Nghe màu", speakLine: "Nghe tên màu nào" }
    ];
    if (l.friend) l.friend.emoji = "🎨";
    n += 1;
  }
});

// Màu hồng / nâu — thay emoji dễ thiếu glyph
const hong = data.lessons.find((l) => l.id === "mau-hong");
if (hong) {
  // vẫn lấy từ canonical khi sync màu; patch file canonical riêng bên dưới
}

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(
  path.join(root, "js", "lessons-data.js"),
  "window.BeGauLessons = " + JSON.stringify(data) + ";\n"
);
console.log("Fixed explore knowledge for", n, "lessons");
