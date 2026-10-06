/**
 * Bạn bè đã giải cứu + gợi ý khi chọn sai.
 * Lời thoại: giọng trẻ / nhờ Bạn Gấu giúp — không khung “Cô Sương đố vui”.
 */
(() => {
  const KEY = "be-gau-friends-v1";

  const CHALLENGER = {
    id: "co-suong",
    name: "Cô Sương",
    emoji: "🌫️",
    speakIntro: "Bạn Gấu ơi, giúp mình với!",
    speakWrong: "Chưa đúng. Nhờ bạn đã cứu giúp mình với!",
    speakWin: "Cảm ơn Bạn Gấu! Mình về rồi!"
  };

  /** Bạn mặc định theo bài màu — các chủ đề khác suy ra từ lesson */
  const COLOR_FRIENDS = {
    "mau-do": { id: "ban-do", name: "Bạn Đỏ", emoji: "🍎", tint: "#e03131" },
    "mau-vang": { id: "ban-vang", name: "Bạn Vàng", emoji: "🍌", tint: "#ffd43b" },
    "mau-xanh-duong": { id: "ban-xanh-duong", name: "Bạn Xanh dương", emoji: "🐋", tint: "#3da9fc" },
    "mau-xanh-la": { id: "ban-xanh-la", name: "Bạn Xanh lá", emoji: "🐸", tint: "#2f9e44" },
    "mau-cam": { id: "ban-cam", name: "Bạn Cam", emoji: "🍊", tint: "#f76707" },
    "mau-tim": { id: "ban-tim", name: "Bạn Tím", emoji: "🍇", tint: "#9c36b5" },
    "mau-hong": { id: "ban-hong", name: "Bạn Hồng", emoji: "🐷", tint: "#f06595" },
    "mau-nau": { id: "ban-nau", name: "Bạn Nâu", emoji: "🧸", tint: "#8b5a2b" }
  };

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
      return Array.isArray(raw) ? raw : [];
    } catch {
      return [];
    }
  }

  function save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function list() {
    return load();
  }

  function has(friendId) {
    return load().some((f) => f.id === friendId);
  }

  function rescue(friend) {
    if (!friend?.id) return false;
    const cur = load();
    if (cur.some((f) => f.id === friend.id)) return false;
    cur.push({
      id: friend.id,
      name: friend.name,
      emoji: friend.emoji,
      tint: friend.tint || "#ffc857",
      lessonId: friend.lessonId || "",
      rescuedAt: Date.now()
    });
    save(cur);
    return true;
  }

  function friendForLesson(lesson) {
    if (!lesson) return null;
    if (lesson.friend) {
      return {
        id: lesson.friend.id,
        name: lesson.friend.name,
        emoji: lesson.friend.emoji || lesson.emoji,
        tint: lesson.friend.tint || lesson.gate?.questions?.[0]?.choices?.find((c) => c.color)?.color,
        lessonId: lesson.id
      };
    }
    const preset = COLOR_FRIENDS[lesson.id];
    if (preset) return { ...preset, lessonId: lesson.id };
    return {
      id: `ban-${lesson.id}`,
      name: `Bạn ${lesson.title}`,
      emoji: lesson.emoji || "⭐",
      tint: "#ffc857",
      lessonId: lesson.id
    };
  }

  /** Biến thể intro — tránh 107 bài cùng một câu; giọng nhờ giúp nhẹ (PEDA) */
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

  const TOPIC_LINES = {
    mau: () => `Cùng nhìn màu với mình nào!`,
    hinh: () => `Cùng nhìn hình với mình nào!`,
    so: () => `Cùng đếm với mình nào!`,
    chu: () => `Cùng nhìn chữ với mình nào!`,
    "dong-vat": (f) => `Chào Bạn Gấu! Mình là ${f}!`,
    "trai-cay": () => `Nhìn quả của mình nào!`,
    "do-vat": () => `Nhìn đồ của mình nào!`,
    "cam-xuc": () => `Cảm nhận cùng mình nào!`,
    "phuong-tien": () => `Nhìn xe của mình nào!`,
    "nhay-mua": () => `Nhảy cùng mình nào!`,
    "hoa-si": () => `Tô màu cùng mình nào!`
  };

  function storyForLesson(lesson) {
    const friend = friendForLesson(lesson);
    if (!friend) return null;
    if (lesson.story) {
      const rawIntro = lesson.story.intro || "";
      const intro =
        !rawIntro || /cứu mình với|giúp mình với|mình cần bạn|mình chờ Bạn Gấu|mình ở đây/i.test(rawIntro)
          ? introForLessonId(lesson.id)
          : rawIntro;
      return {
        friend,
        challenger: CHALLENGER,
        intro,
        exploreLine: lesson.story.exploreLine,
        gateLine: lesson.story.gateLine,
        winLine: lesson.story.winLine,
        theme: lesson.story.theme || lesson.topicId || "default"
      };
    }
    const exploreFn = TOPIC_LINES[lesson.topicId];
    const theme =
      lesson.topicId === "mau"
        ? "default"
        : lesson.topicId
          ? `topic-${lesson.topicId}`
          : "default";
    return {
      friend,
      challenger: CHALLENGER,
      intro: introForLessonId(lesson.id),
      exploreLine: exploreFn
        ? exploreFn(friend.name)
        : `Cùng khám phá với mình nào!`,
      gateLine: `${lesson.gate?.promptVi || "Chọn đúng giúp mình"} Giúp mình với!`,
      winLine: `Cảm ơn Bạn Gấu! ${friend.name} về rồi!`,
      theme
    };
  }

  /** Gợi ý từ một bạn đã cứu — ưu tiên bạn khác bài hiện tại */
  function pickHintFriend(excludeLessonId) {
    const cur = load();
    if (!cur.length) return null;
    const others = cur.filter((f) => f.lessonId !== excludeLessonId);
    const pool = others.length ? others : cur;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function hintLine(friend, correctSpeak) {
    const name = friend?.name || "Bạn";
    const label = correctSpeak || "đáp án đúng";
    return `${name} thì thầm: chọn ${label} giúp mình nhé!`;
  }

  function clearAll() {
    save([]);
  }

  window.BeGauFriends = {
    KEY,
    CHALLENGER,
    INTRO_VARIANTS,
    introForLessonId,
    list,
    has,
    rescue,
    friendForLesson,
    storyForLesson,
    pickHintFriend,
    hintLine,
    clearAll
  };
})();
