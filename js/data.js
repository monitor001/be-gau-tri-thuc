window.BeGauData = {
  intro: [
    "Ồ! Các bạn nhỏ đang cần giúp!",
    "Bạn Gấu ơi, cứu mình với!",
    "Đom Đóm và Sóc Nhí cùng đi giúp bạn!",
    "Nắm tay nhau, đi giúp bạn nào!"
  ],
  praises: [
    "Cảm ơn Bạn Gấu!",
    "Bạn Gấu giỏi quá!",
    "Giúp nhau vui lắm!",
    "Bạn về rồi, yay!",
    "Tuyệt vời lắm!"
  ],
  ending: [
    "Các bạn vui quá — cảm ơn Bạn Gấu!",
    "Giúp nhau vui hơn đánh nhau nhiều!",
    "Cảm ơn Bạn Gấu. Mai mình giúp tiếp nhé!"
  ],
  regions: [
    {
      id: "rung-mau-sac",
      title: "Rừng Màu Sắc",
      emoji: "🎨",
      game: "color-tap",
      starId: "sao-mau",
      color: "#ff6b4a",
      dialogueWin: "Cảm ơn Bạn Gấu đã giúp mình!"
    },
    {
      id: "doi-hinh-khoi",
      title: "Đồi Hình Khối",
      emoji: "⬜",
      game: "shape-fit",
      starId: "sao-hinh",
      color: "#4aa3df",
      dialogueWin: "Hình về rồi! Cảm ơn Bạn Gấu!"
    },
    {
      id: "suoi-dem-so",
      title: "Suối Đếm Số",
      emoji: "🍎",
      game: "count-together",
      starId: "sao-so",
      color: "#5fad56",
      dialogueWin: "Đếm xong rồi! Cảm ơn Bạn Gấu!"
    },
    {
      id: "hang-chu-cai",
      title: "Hang Chữ Cái",
      emoji: "🅰️",
      game: "letter-pick",
      starId: "sao-chu",
      color: "#9b6bff",
      dialogueWin: "Chữ về rồi! Cảm ơn Bạn Gấu!"
    },
    {
      id: "vuon-ban-be",
      title: "Vườn Bạn Bè",
      emoji: "🐰",
      game: "friend-match",
      starId: "sao-ban-be",
      color: "#ffc857",
      dialogueWin: "Bạn về nhà rồi! Cảm ơn Bạn Gấu!"
    }
  ],
  colorMap: {
    red: "#e74c3c",
    yellow: "#f1c40f",
    blue: "#3498db",
    green: "#27ae60",
    orange: "#e67e22",
    purple: "#8e44ad"
  },
  levels: {
    "color-tap": [
      {
        ageBand: "2-3",
        promptVi: "Chạm quả bóng đỏ giúp bé Gấu nhé!",
        targetColor: "red",
        targetCount: 2,
        choices: [
          { color: "red", labelVi: "Đỏ", emoji: "🍎" },
          { color: "yellow", labelVi: "Vàng", emoji: "⭐" }
        ]
      },
      {
        ageBand: "2-3",
        promptVi: "Tìm lá vàng trên cây nào!",
        targetColor: "yellow",
        targetCount: 2,
        choices: [
          { color: "yellow", labelVi: "Vàng", emoji: "🌻" },
          { color: "red", labelVi: "Đỏ", emoji: "🍓" },
          { color: "blue", labelVi: "Xanh dương", emoji: "💧" }
        ]
      },
      {
        ageBand: "4-5",
        promptVi: "Ngôi sao xanh dương đang lạc — chạm đúng nhé!",
        targetColor: "blue",
        targetCount: 3,
        choices: [
          { color: "blue", labelVi: "Xanh dương", emoji: "💙" },
          { color: "red", labelVi: "Đỏ", emoji: "🔴" },
          { color: "yellow", labelVi: "Vàng", emoji: "💛" },
          { color: "purple", labelVi: "Tím", emoji: "🟣" }
        ]
      }
    ],
    "shape-fit": [
      {
        ageBand: "2-3",
        promptVi: "Chạm hình, rồi chạm lỗ đúng giúp bé Gấu!",
        pieces: ["circle", "square"],
        slots: ["circle", "square"]
      },
      {
        ageBand: "4-5",
        promptVi: "Ba hình lạc đường — ghép đúng để mở lối lên đồi!",
        pieces: ["circle", "square", "triangle"],
        slots: ["triangle", "circle", "square"]
      }
    ],
    "count-together": [
      {
        ageBand: "2-3",
        promptVi: "Chạm từng quả táo, rồi chọn số đúng nhé!",
        count: 3,
        choices: [2, 3],
        requireTapEach: true,
        emoji: "🍎"
      },
      {
        ageBand: "4-5",
        promptVi: "Suối có bao nhiêu viên sỏi sáng?",
        count: 7,
        choices: [5, 6, 7, 8],
        requireTapEach: false,
        emoji: "💎"
      }
    ],
    "letter-pick": [
      {
        ageBand: "2-3",
        promptVi: "Tranh bắt đầu bằng chữ nào?",
        rounds: [
          { wordVi: "Áo", emoji: "👕", correct: "A", choices: ["A", "B"] },
          { wordVi: "Bóng", emoji: "⚽", correct: "B", choices: ["A", "B"] }
        ]
      },
      {
        ageBand: "4-5",
        promptVi: "Chọn chữ cái đầu của tranh trong hang!",
        rounds: [
          { wordVi: "Mèo", emoji: "🐱", correct: "M", choices: ["M", "N", "B"] },
          { wordVi: "Cá", emoji: "🐟", correct: "C", choices: ["C", "O", "D"] },
          { wordVi: "Ong", emoji: "🐝", correct: "O", choices: ["A", "O", "U"] }
        ]
      }
    ],
    "friend-match": [
      {
        ageBand: "2-3",
        promptVi: "Chạm bạn, rồi chạm đúng nhà ấm nhé!",
        pairs: [
          { from: "Cún 🐶", to: "Nhà cún 🏠" },
          { from: "Cá 🐟", to: "Bể cá 🫧" }
        ],
        distractors: []
      },
      {
        ageBand: "4-5",
        promptVi: "Ghép bạn với nhà hoặc cảm xúc phù hợp!",
        pairs: [
          { from: "Thỏ 🐰", to: "Nhà cà rốt 🥕" },
          { from: "Chim 🐦", to: "Tổ chim 🪺" },
          { from: "Buồn 😢", to: "Ôm an ủi 🤗" }
        ],
        distractors: ["Bóng ⚽"]
      }
    ]
  }
};
