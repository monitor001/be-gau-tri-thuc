(() => {
  const DATA = window.BeGauLessons;
  const TTS = window.BeGauTTS;
  const SFX = window.BeGauSFX;
  const NPC = window.BeGauNPC;
  const MAP = window.BeGauMapWorld;
  const FRIENDS = window.BeGauFriends;

  const KEYS = {
    cleared: "be-gau-cleared-v2",
    xu: "be-gau-xu-v2",
    owned: "be-gau-owned-v2",
    stars: "be-gau-stars-v3",
    starsLegacy: "be-gau-stars-v2",
    playLimit: "be-gau-play-limit-min-v1"
  };

  const NUMBER_WORDS = {
    13: "mười ba",
    14: "mười bốn",
    15: "mười lăm",
    16: "mười sáu",
    17: "mười bảy",
    18: "mười tám",
    19: "mười chín"
  };

  function migrateStars() {
    let stars = loadJson(KEYS.stars, null);
    if (stars && typeof stars === "object" && Object.keys(stars).length) return stars;
    const legacy = loadJson(KEYS.starsLegacy, {});
    if (legacy && typeof legacy === "object" && Object.keys(legacy).length) {
      try {
        localStorage.setItem(KEYS.stars, JSON.stringify(legacy));
      } catch {
        /* ignore */
      }
      return legacy;
    }
    return {};
  }

  /** Đường asset — web + Capacitor */
  function assetUrl(relativePath) {
    if (!relativePath) return "";
    const clean = relativePath.replace(/^\//, "");
    if (window.Capacitor?.convertFileSrc) {
      return window.Capacitor.convertFileSrc(clean);
    }
    return clean;
  }

  const state = {
    cleared: loadJson(KEYS.cleared, []),
    xu: Number(localStorage.getItem(KEYS.xu) || 0),
    owned: loadJson(KEYS.owned, []),
    stars: migrateStars(),
    topic: null,
    lesson: null,
    shopReturn: "topics",
    gateSession: null,
    mapLevel: "world"
  };

  const $ = (s) => document.querySelector(s);
  const screens = {
    home: $("#screen-home"),
    topics: $("#screen-topics"),
    lessons: $("#screen-lessons"),
    explore: $("#screen-explore"),
    gate: $("#screen-gate"),
    reward: $("#screen-reward"),
    friends: $("#screen-friends"),
    shop: $("#screen-shop"),
    parent: $("#screen-parent")
  };

  function lessonAudioKey(lesson, slot) {
    return lesson?.id ? `lesson:${lesson.id}:${slot}` : "";
  }

  function loadJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch {
      return fallback;
    }
  }

  function save() {
    localStorage.setItem(KEYS.cleared, JSON.stringify(state.cleared));
    localStorage.setItem(KEYS.xu, String(state.xu));
    localStorage.setItem(KEYS.owned, JSON.stringify(state.owned));
    localStorage.setItem(KEYS.stars, JSON.stringify(state.stars));
  }

  function requestPersistentStorage() {
    try {
      if (navigator.storage?.persist) {
        navigator.storage.persist().catch(() => {});
      }
    } catch {
      /* ignore */
    }
  }

  let playSessionStart = Date.now();
  let playBreakShown = false;
  let shopBuying = false;

  function getPlayLimitMin() {
    const n = Number(localStorage.getItem(KEYS.playLimit) || 0);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }

  function setPlayLimitMin(min) {
    localStorage.setItem(KEYS.playLimit, String(Number(min) || 0));
  }

  function resetPlaySession() {
    playSessionStart = Date.now();
    playBreakShown = false;
  }

  function checkPlayBreak() {
    const limit = getPlayLimitMin();
    if (!limit || playBreakShown) return;
    const elapsed = (Date.now() - playSessionStart) / 60000;
    if (elapsed < limit) return;
    playBreakShown = true;
    const dlg = $("#play-break-dialog");
    const msg = $("#play-break-msg");
    if (msg) {
      msg.textContent = `Bé đã chơi khoảng ${limit} phút. Nghỉ một chút rồi chơi tiếp nhé!`;
    }
    try {
      dlg?.showModal?.();
    } catch {
      /* ignore */
    }
    TTS.speak("Nghỉ một chút nhé! Cùng vươn vai với bố mẹ!", { force: true, rate: 0.95 });
  }

  function unlockAudio() {
    TTS.unlock();
    SFX.unlock();
  }

  function refreshHomeVoiceWarn() {
    const el = $("#home-voice-warn");
    if (!el || !TTS.checkVoiceHealth) return;
    const h = TTS.checkVoiceHealth();
    if (h.ok) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    el.textContent =
      "Máy thiếu giọng tiếng Việt. Vào Người lớn → ghi âm lời đọc, hoặc cài giọng vi-VN trên máy.";
  }

  function show(name) {
    Object.values(screens).forEach((el) => el?.classList.remove("active"));
    screens[name].classList.add("active");
  }

  function totalStarsEarned() {
    return Object.values(state.stars).reduce((acc, n) => acc + Math.min(3, Number(n) || 0), 0);
  }

  function updateXuBadges() {
    const xuText = String(state.xu);
    const starText = String(totalStarsEarned());
    const xuHome = document.getElementById("xu-home");
    if (xuHome) xuHome.textContent = `🪙 ${xuText} Xu Gấu`;
    const xuShop = document.getElementById("xu-shop");
    if (xuShop) xuShop.textContent = xuText;
    const parentXu = document.getElementById("parent-xu");
    if (parentXu) parentXu.textContent = xuText;
    ["xu-topics", "xu-lessons"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = `🪙 <span class="xu-value">${xuText}</span>`;
    });
    ["stars-topics", "stars-lessons"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = `★ <span class="star-value">${starText}</span>`;
    });
    const prog = $("#parent-progress");
    if (prog) prog.textContent = String(state.cleared.length);
  }

  let shopToastTimer = 0;
  function showShopToast(emoji, text) {
    const toast = $("#shop-toast");
    const em = $("#shop-toast-emoji");
    const tx = $("#shop-toast-text");
    if (!toast || !em || !tx) return;
    em.textContent = emoji || "🎁";
    tx.textContent = text || "Yay!";
    toast.hidden = false;
    clearTimeout(shopToastTimer);
    shopToastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 1600);
  }

  function lessonStars(lessonId) {
    return Math.min(3, Number(state.stars[lessonId] || 0));
  }

  function topicStarFill(topicId) {
    const lessons = topicLessons(topicId);
    if (!lessons.length) return 0;
    // Trung bình các màn đã có sao / đã qua — tránh về 0 khi mới chơi 1 bài
    const scored = lessons.filter(
      (l) => lessonStars(l.id) > 0 || state.cleared.includes(l.id)
    );
    if (!scored.length) return 0;
    const sum = scored.reduce((acc, l) => acc + lessonStars(l.id), 0);
    return Math.min(3, Math.max(1, Math.round(sum / scored.length)));
  }

  function topicLessons(topicId) {
    return DATA.lessons
      .filter((l) => l.topicId === topicId)
      .sort((a, b) => a.order - b.order);
  }

  /** Mọi màn luôn mở — bé chọn tự do, không xếp hạng / không khóa tuần tự */
  function isLessonUnlocked(_topicId, _lesson, _lessonIndex) {
    return true;
  }

  function hideLessonNpc() {
    const slot = $("#lessons-npc");
    if (slot) {
      slot.hidden = true;
      slot.innerHTML = "";
    }
  }

  function showLessonNpc(topic) {
    hideLessonNpc();
    const slot = $("#lessons-npc");
    if (!slot || !topic) return;
    const alias = npcRegionAlias(topic);
    NPC.renderCompanion(alias, "#lessons-npc");
    slot.hidden = false;
    slot.classList.add("lessons-guide");
  }

  function helperForTopic(topic) {
    return topic?.helper || "be-gau";
  }

  /** Dùng region id giả để tái sử dụng NPC panel */
  function npcRegionAlias(topic) {
    const map = {
      so: "suoi-dem-so",
      chu: "hang-chu-cai",
      mau: "rung-mau-sac",
      hinh: "doi-hinh-khoi",
      "dong-vat": "vuon-ban-be",
      "do-vat": "hang-chu-cai",
      "trai-cay": "rung-mau-sac",
      "cam-xuc": "vuon-ban-be",
      "phuong-tien": "suoi-dem-so",
      "nhay-mua": "vuon-ban-be",
      "hoa-si": "rung-mau-sac"
    };
    return map[topic?.id] || "rung-mau-sac";
  }

  function starProgressHtml(filled) {
    const max = 3;
    const n = Math.max(0, Math.min(max, Number(filled) || 0));
    let html = '<span class="star-row" aria-hidden="true">';
    for (let i = 0; i < max; i += 1) {
      html += `<span class="map-star ${i < n ? "lit" : "dim"}">★</span>`;
    }
    html += "</span>";
    return html;
  }

  function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function currentTopicIndex() {
    const ordered = [...DATA.topics].sort((a, b) => a.order - b.order);
    let idx = 0;
    for (let i = 0; i < ordered.length; i += 1) {
      const lessons = topicLessons(ordered[i].id);
      const done = lessons.filter((l) => state.cleared.includes(l.id)).length;
      if (done < lessons.length) {
        idx = i;
        break;
      }
      idx = i;
    }
    return idx;
  }

  function ensureMapMounted() {
    if (MAP && screens.topics) MAP.mount(screens.topics);
  }

  function ensureLessonMapMounted() {
    if (MAP && screens.lessons) MAP.mount(screens.lessons);
  }

  let lessonPopTimer = null;

  function hideLessonPopNpc() {
    const pop = $("#lesson-pop-npc");
    if (!pop) return;
    pop.classList.remove("is-visible", "is-leaving");
    pop.hidden = true;
    if (lessonPopTimer) {
      clearTimeout(lessonPopTimer);
      lessonPopTimer = null;
    }
  }

  function showLessonPopNpc(topic, text) {
    const pop = $("#lesson-pop-npc");
    const bubble = $("#lesson-pop-bubble");
    const img = $("#lesson-pop-img");
    const nameEl = $("#lesson-pop-name");
    const helperId = helperForTopic(topic);
    const npc = NPC.NPCS?.[helperId];
    if (!pop || !bubble) {
      NPC.say(helperId, text, { force: true, rate: 0.95 });
      return;
    }
    if (lessonPopTimer) clearTimeout(lessonPopTimer);
    if (img && npc?.img) img.src = npc.img;
    if (nameEl) nameEl.textContent = npc?.name || "Bạn";
    bubble.textContent = text;
    pop.hidden = false;
    pop.classList.remove("is-leaving");
    void pop.offsetWidth;
    pop.classList.add("is-visible");
    NPC.say(helperId, text, { force: true, rate: 0.95 });
    lessonPopTimer = setTimeout(() => {
      pop.classList.add("is-leaving");
      pop.classList.remove("is-visible");
      lessonPopTimer = setTimeout(() => {
        pop.hidden = true;
        pop.classList.remove("is-leaving");
        lessonPopTimer = null;
      }, 420);
    }, 4200);
  }

  function currentLessonIndex(lessons) {
    let currentLessonIdx = 0;
    for (let i = 0; i < lessons.length; i += 1) {
      if (!state.cleared.includes(lessons[i].id) && isLessonUnlocked(state.topic.id, lessons[i], i)) {
        currentLessonIdx = i;
        break;
      }
      if (state.cleared.includes(lessons[i].id)) currentLessonIdx = i;
    }
    return currentLessonIdx;
  }

  let mapPopTimer = null;

  function hideMapPopNpc() {
    const pop = $("#map-pop-npc");
    if (!pop) return;
    pop.classList.remove("is-visible", "is-leaving");
    pop.hidden = true;
    if (mapPopTimer) {
      clearTimeout(mapPopTimer);
      mapPopTimer = null;
    }
  }

  function showMapPopNpc(text, options = {}) {
    const pop = $("#map-pop-npc");
    const bubble = $("#map-pop-bubble");
    if (!pop || !bubble) {
      NPC.say("soc", text, { force: true, rate: 0.95 });
      return;
    }
    if (mapPopTimer) clearTimeout(mapPopTimer);
    bubble.textContent = text;
    pop.hidden = false;
    pop.classList.remove("is-leaving");
    void pop.offsetWidth;
    pop.classList.add("is-visible");
    NPC.say("soc", text, { force: true, rate: 0.95 });

    const stayMs = options.stayMs ?? 4200;
    mapPopTimer = setTimeout(() => {
      pop.classList.add("is-leaving");
      pop.classList.remove("is-visible");
      mapPopTimer = setTimeout(() => {
        pop.hidden = true;
        pop.classList.remove("is-leaving");
        mapPopTimer = null;
      }, 420);
    }, stayMs);
  }

  function speakMapWelcome() {
    const text =
      DATA.map?.promptSpeak ||
      "Bản đồ tri thức đây rồi! Hôm nay bé muốn đi đâu nào?";
    const short =
      DATA.map?.promptText || "Hôm nay bé muốn đi đâu nào?";
    const prompt = $("#map-prompt");
    if (prompt) prompt.textContent = short;
    showMapPopNpc(text);
  }

  function renderTopics() {
    updateXuBadges();
    state.mapLevel = "world";
    state.topic = null;
    hideLessonNpc();
    NPC.clearMapWalker?.("#map-viewport");
    ensureMapMounted();
    const prompt = $("#map-prompt");
    if (prompt) {
      prompt.textContent = DATA.map?.promptText || "Hôm nay bé muốn đi đâu nào?";
    }
    const title = $("#map-title");
    if (title) title.textContent = DATA.map?.title || "Bản đồ tri thức";
    const ordered = [...DATA.topics].sort((a, b) => a.order - b.order);
    MAP?.renderWorld({
      topics: ordered,
      currentIndex: currentTopicIndex(),
      starFill: topicStarFill,
      starHtml: starProgressHtml,
      lessonsForTopic: topicLessons,
      isCleared: (id) => state.cleared.includes(id),
      onSelect: (topic) => {
        unlockAudio();
        hideMapPopNpc();
        openTopic(topic);
      }
    });
  }

  function openTopic(topic) {
    unlockAudio();
    state.topic = topic;
    state.mapLevel = "topic";
    hideMapPopNpc();
    hideLessonNpc();
    renderLessons();
    show("lessons");
    const speakName = topic.speakName || topic.mapName || topic.title;
    const guide = `${speakName}! Bé chọn một bạn nhé!`;
    showLessonPopNpc(topic, guide);
  }

  function renderLessons() {
    if (!state.topic) {
      renderTopics();
      show("topics");
      return;
    }
    updateXuBadges();
    hideLessonNpc();
    NPC.clearMapWalker?.("#map-viewport");
    NPC.clearMapWalker?.("#lesson-viewport");
    ensureLessonMapMounted();
    const title = $("#lessons-title");
    if (title) title.textContent = state.topic.mapName || state.topic.title;
    const world = $("#lessons-content");
    if (world) {
      world.style.setProperty("--topic-tint", state.topic.color || "#5fad56");
      world.style.setProperty("--topic-bg", state.topic.cardBg || "#fff8e7");
    }

    const lessons = topicLessons(state.topic.id);
    MAP?.renderTopic({
      topic: state.topic,
      lessons,
      currentIndex: currentLessonIndex(lessons),
      starHtml: starProgressHtml,
      lessonStars,
      isUnlocked: (lesson, index) => isLessonUnlocked(state.topic.id, lesson, index),
      isCleared: (id) => state.cleared.includes(id),
      onSelect: (payload) => {
        hideLessonPopNpc();
        const lesson = payload?.__locked ? payload.lesson : payload;
        if (!lesson?.id) return;
        startExplore(lesson);
      }
    });
  }

  function renderExploreItems(lesson) {
    const wrap = $("#explore-items");
    const hero = $("#explore-hero");
    if (!wrap || !hero) return;

    // Luôn gắn dữ liệu bài hiện tại — không để sót táo đỏ từ HTML mặc định
    $("#explore-emoji").textContent = lesson.emoji || "⭐";
    $("#explore-label").textContent = lesson.title || "";

    const items = lesson.exploreItems;
    if (Array.isArray(items) && items.length >= 2) {
      wrap.hidden = false;
      wrap.removeAttribute("hidden");
      hero.hidden = true;
      hero.setAttribute("hidden", "");
      hero.classList.add("is-hidden");
      wrap.innerHTML = "";
      items.forEach((item, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "explore-item hint-bounce";
        btn.style.animationDelay = `${i * 0.12}s`;
        if (item.tint) {
          btn.style.setProperty("--item-tint", item.tint);
          btn.classList.add("has-tint");
        }
        const count = Number(item.count);
        if (Number.isFinite(count) && count >= 1 && (item.unitEmoji || item.emoji)) {
          const grid = document.createElement("span");
          grid.className = "explore-count-grid";
          grid.dataset.count = String(count);
          const unit = item.unitEmoji || item.emoji;
          for (let k = 0; k < count; k += 1) {
            const u = document.createElement("span");
            u.className = "explore-count-unit";
            u.textContent = unit;
            u.setAttribute("aria-hidden", "true");
            grid.appendChild(u);
          }
          btn.appendChild(grid);
        } else if (item.img && (item.recolor || (item.tint && item.colorId))) {
          // Ảnh AI một màu → tô lại bằng blend; SVG tint đã đúng màu thì chỉ cần frame
          const frame = document.createElement("span");
          const needsRecolor = item.recolor !== false && !/\.svg$/i.test(item.img || "");
          frame.className =
            "explore-item-frame" + (needsRecolor ? " explore-item-recolor" : "");
          frame.style.setProperty("--item-tint", item.tint || "#ffd43b");
          const img = document.createElement("img");
          img.className =
            "explore-item-img" + (needsRecolor ? " is-recolor" : "");
          img.src = assetUrl(item.img);
          img.alt = item.label || "";
          img.width = 72;
          img.height = 72;
          img.addEventListener("error", () => {
            const span = document.createElement("span");
            span.className = "explore-item-emoji";
            span.textContent = item.emoji || "🍎";
            img.replaceWith(span);
          });
          frame.appendChild(img);
          btn.appendChild(frame);
        } else if (item.img) {
          const frame = document.createElement("span");
          frame.className = "explore-item-frame";
          const img = document.createElement("img");
          img.className = "explore-item-img";
          img.src = assetUrl(item.img);
          img.alt = item.label || "";
          img.width = 72;
          img.height = 72;
          let retried = false;
          img.addEventListener("error", () => {
            if (!retried && item.img.startsWith("assets/")) {
              retried = true;
              img.src = assetUrl("./" + item.img);
              return;
            }
            const span = document.createElement("span");
            span.className = "explore-item-fallback";
            span.textContent = (item.label || "?").slice(0, 1);
            span.title = item.label || "";
            img.replaceWith(span);
          });
          frame.appendChild(img);
          btn.appendChild(frame);
        } else if (item.tint && item.emoji) {
          // Fallback: emoji tô màu theo tint
          const frame = document.createElement("span");
          frame.className = "explore-item-frame explore-item-recolor";
          frame.style.setProperty("--item-tint", item.tint);
          const span = document.createElement("span");
          span.className = "explore-item-emoji explore-emoji-recolor";
          span.textContent = item.emoji;
          const hue = {
            vang: "48deg",
            cam: "22deg",
            "xanh-la": "95deg",
            "xanh-duong": "195deg",
            tim: "275deg",
            do: "0deg"
          }[item.colorId] || "0deg";
          if (item.colorId && item.colorId !== "do") {
            span.style.filter = `hue-rotate(${hue}) saturate(1.5)`;
          }
          frame.appendChild(span);
          btn.appendChild(frame);
        } else {
          const span = document.createElement("span");
          span.className = "explore-item-emoji";
          span.textContent = item.emoji || "⭐";
          btn.appendChild(span);
        }
        const lbl = document.createElement("span");
        lbl.className = "explore-item-label";
        lbl.textContent = item.label || "";
        btn.appendChild(lbl);
        btn.addEventListener("click", () => {
          unlockAudio();
          const colorWord = (lesson.speakText || "").replace(/^Màu\s*/i, "").trim();
          const line =
            item.speakLine ||
            (item.speakColor
              ? `${item.label || "Bạn này"} màu ${item.speakColor}`
              : `${item.label || "Bạn này"} màu ${colorWord}`);
          NPC.say(helperForTopic(state.topic), line, { force: true, rate: 0.95 });
        });
        wrap.appendChild(btn);
      });
      return;
    }

    wrap.hidden = true;
    wrap.innerHTML = "";
    hero.hidden = false;
    hero.removeAttribute("hidden");
    hero.classList.remove("is-hidden");
    hero.classList.add("hint-bounce");
  }

  function setStageDots(activeIndex, total = 4) {
    const host = $("#stage-dots");
    if (!host) return;
    // 1 chấm nhìn + N chấm câu hỏi
    const count = Math.max(2, total);
    host.innerHTML = Array.from({ length: count }, (_, i) => {
      return `<span class="stage-dot ${i === activeIndex ? "is-on" : ""}" aria-hidden="true"></span>`;
    }).join("");
  }

  function updateCaptiveVisual(prefix, friend, held) {
    const emoji = document.getElementById(`${prefix}-captive-emoji`) ||
      (prefix === "reward" ? $("#reward-friend-emoji") : null);
    const name = document.getElementById(`${prefix}-captive-name`);
    const status = document.getElementById(`${prefix}-captive-status`);
    const panel = document.getElementById(`${prefix}-captive`);
    const cage = panel?.querySelector(".captive-cage");
    if (emoji) {
      const art = friend?.img || state.lesson?.exploreItems?.[0]?.img;
      if (art) {
        emoji.innerHTML = "";
        const img = document.createElement("img");
        img.className = "captive-emoji-img";
        img.src = assetUrl(art);
        img.alt = friend?.name || "";
        img.width = 72;
        img.height = 72;
        img.addEventListener("error", () => {
          emoji.textContent = friend?.emoji || "🌟";
        });
        emoji.appendChild(img);
      } else {
        emoji.textContent = friend?.emoji || "🌟";
      }
    }
    if (name) name.textContent = friend?.name || "Bạn";
    if (status) {
      status.textContent = held
        ? `${friend?.name || "Bạn"} đang chờ Bạn Gấu giúp!`
        : `${friend?.name || "Bạn"} vui về với bé rồi!`;
    }
    if (cage) {
      cage.classList.toggle("is-held", Boolean(held));
      cage.classList.toggle("is-free", !held);
    }
    if (panel) {
      panel.style.setProperty("--friend-tint", friend?.tint || "#ffc857");
      panel.hidden = !friend;
    }
  }

  function applyStageTheme(lesson, options = {}) {
    const held = options.held !== false;
    const story = FRIENDS?.storyForLesson?.(lesson);
    const theme = story?.theme || lesson?.topicId || "default";
    const tint = story?.friend?.tint || state.topic?.color || "#5fad56";
    ["explore", "gate", "reward"].forEach((name) => {
      const el = screens[name];
      if (!el) return;
      el.dataset.theme = theme;
      el.style.setProperty("--stage-tint", tint);
    });
    const friend = story?.friend;
    const friendEmoji = friend?.emoji || lesson?.emoji || "🌟";
    const lineExplore = story?.exploreLine || lesson?.teachText || "";
    const lineGate = story?.gateLine || "Trả lời đúng để cứu bạn!";
    const setBanner = (lineId, friendId, text) => {
      const line = document.getElementById(lineId);
      const el = document.getElementById(friendId);
      if (line) line.textContent = text;
      if (el) el.textContent = friendEmoji;
    };
    setBanner("explore-rescue-line", "explore-rescue-friend", lineExplore);
    setBanner("gate-rescue-line", "gate-rescue-friend", lineGate);
    updateCaptiveVisual("explore", friend, held);
    updateCaptiveVisual("gate", friend, held);
    updateCaptiveVisual("reward", friend, false);
    return story;
  }

  function startExplore(lesson) {
    unlockAudio();
    state.lesson = lesson;
    state.gateSession = null;
    const alias = npcRegionAlias(state.topic);
    hideLessonNpc();
    const story = applyStageTheme(lesson);
    show("explore");
    const friend = story?.friend;
    $("#explore-title").textContent = friend
      ? `Cứu ${friend.name}`
      : lesson.title;
    const qCount = gateQuestionsFor(lesson).length;
    setStageDots(0, 1 + qCount);
    const teach = story?.intro || lesson.teachText;
    $("#explore-teach").textContent = teach;
    const hearBtn = $("#btn-explore-hear");
    if (hearBtn) {
      hearBtn.hidden = false;
      hearBtn.removeAttribute("hidden");
    }
    renderExploreItems(lesson);
    NPC.mountExploreCompanion?.();
    NPC.renderCompanion(alias);
    const helperId = helperForTopic(state.topic);
    NPC.say(helperId, teach, {
      force: true,
      rate: 0.95,
      focus: true,
      audioKey: lessonAudioKey(lesson, "intro")
    });
    const exploreLine = story?.exploreLine;
    if (exploreLine && exploreLine !== teach) {
      setTimeout(() => {
        if (state.lesson?.id !== lesson.id) return;
        if (screens.explore?.classList.contains("active")) {
          NPC.say(helperId, exploreLine, {
            force: true,
            rate: 0.95,
            focus: true,
            audioKey: lessonAudioKey(lesson, "explore")
          });
        }
      }, 2200);
    }
  }

  function hearExplore() {
    if (!state.lesson) return;
    unlockAudio();
    const story = FRIENDS?.storyForLesson?.(state.lesson);
    const line = story?.intro || state.lesson.teachText || state.lesson.speakText;
    NPC.say(helperForTopic(state.topic), line, {
      force: true,
      rate: 0.95,
      focus: true,
      audioKey: lessonAudioKey(state.lesson, "intro")
    });
  }

  function choiceLabel(choice) {
    if (choice && typeof choice === "object") return choice.speak || choice.label || "";
    return String(choice ?? "");
  }

  function gateQuestionsFor(lesson) {
    const gate = lesson?.gate || {};
    if (Array.isArray(gate.questions) && gate.questions.length) return gate.questions;
    if (gate.promptVi && Array.isArray(gate.choices)) {
      return [
        {
          promptVi: gate.promptVi,
          choices: gate.choices,
          correctIndex: gate.correctIndex ?? 0,
          correctSpeak: gate.correctSpeak,
          hideLabels: gate.hideLabels,
          sameShape: gate.sameShape
        }
      ];
    }
    return [];
  }

  function startGate() {
    if (!state.lesson) return;
    const lesson = state.lesson;
    const questions = gateQuestionsFor(lesson);
    if (!questions.length) {
      $("#gate-feedback").textContent = "Chạm quay lại rồi thử lại nhé!";
      return;
    }
    const story = applyStageTheme(lesson);
    state.gateSession = {
      questions,
      index: 0,
      firstTryStars: 0,
      missedCurrent: false,
      usedFriendHelp: false,
      correctSpeak: ""
    };
    show("gate");
    hideLessonNpc();
    const gateTitle = $("#gate-title");
    if (gateTitle) {
      gateTitle.textContent = story?.friend
        ? `Cứu ${story.friend.name}!`
        : "Đố vui cứu bạn!";
    }
    NPC.renderCompanion(npcRegionAlias(state.topic), "#gate-npc");
    renderGateQuestion();
  }

  function updateFriendHelpRow(show) {
    const row = $("#friend-help-row");
    if (!row) return;
    const canHelp =
      show &&
      FRIENDS &&
      FRIENDS.list().length > 0 &&
      state.gateSession &&
      !state.gateSession.usedFriendHelp;
    row.hidden = !canHelp;
  }

  function askFriendHelp() {
    const session = state.gateSession;
    const lesson = state.lesson;
    if (!session || !lesson || session.usedFriendHelp) return;
    const helper = FRIENDS.pickHintFriend(lesson.id);
    if (!helper) {
      NPC.say(helperForTopic(state.topic), "Chưa có bạn để nhờ. Bé thử lại nhé!", {
        force: true,
        rate: 0.95
      });
      return;
    }
    session.usedFriendHelp = true;
    updateFriendHelpRow(false);
    const field = $("#gate-choices");
    const right = field?.querySelector('[data-correct="1"]');
    right?.classList.add("hint-pulse");
    const hintLabel = right?.dataset.speak || session.correctSpeak || "đáp án đúng";
    const line = FRIENDS.hintLine(helper, hintLabel);
    $("#gate-feedback").textContent = `${helper.emoji} ${helper.name} đang giúp bé!`;
    SFX.correct();
    NPC.say(helperForTopic(state.topic), line, { force: true, rate: 0.95 });
  }

  function renderGateQuestion() {
    const session = state.gateSession;
    const lesson = state.lesson;
    if (!session || !lesson) return;
    const q = session.questions[session.index];
    if (!q) {
      finishGate();
      return;
    }

    setStageDots(1 + session.index, 1 + session.questions.length);
    session.missedCurrent = false;
    session.usedFriendHelp = false;

    const promptText = q.promptVi || "Bé chọn bóng đúng màu nào!";
    const promptEl = $("#gate-prompt");
    if (promptEl) {
      promptEl.textContent = promptText;
      promptEl.classList.remove("sr-only");
      promptEl.classList.add("visible-prompt");
    }
    $("#gate-feedback").textContent = "";
    updateFriendHelpRow(false);

    NPC.say(helperForTopic(state.topic), promptText, {
      force: true,
      rate: 0.95,
      focus: true,
      audioKey: lessonAudioKey(lesson, "gate")
    });

    const field = $("#gate-choices");
    field.innerHTML = "";
    const hideLabels = Boolean(q.hideLabels || q.sameShape || lesson.gate?.hideLabels);
    const rawChoices = (q.choices || []).map((c, i) => ({ choice: c, orig: i }));
    shuffleInPlace(rawChoices);

    const correctSpeak =
      q.correctSpeak ||
      choiceLabel(q.choices?.[q.correctIndex ?? 0]) ||
      "";
    session.correctSpeak = correctSpeak;

    const correctIdx = q.correctIndex ?? 0;
    rawChoices.forEach(({ choice, orig }) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice gate-choice";
      const label = choiceLabel(choice);
      const color = choice && typeof choice === "object" ? choice.color : "";
      const emoji =
        (choice && typeof choice === "object" && choice.emoji) ||
        emojiForChoice(lesson, label) ||
        "⚪";
      const speakMatch =
        Boolean(q.correctSpeak) &&
        (choice?.speak === q.correctSpeak || label === q.correctSpeak);
      const isCorrect = q.correctSpeak ? speakMatch : orig === correctIdx;

      btn.dataset.correct = isCorrect ? "1" : "0";
      btn.dataset.speak = label;

      if (hideLabels) {
        btn.classList.add("color-swatch");
        btn.setAttribute("aria-label", label || "lựa chọn");
        if (color) {
          btn.innerHTML = `<span class="swatch-ball" style="background-color:${color};--swatch:${color}"></span><span class="swatch-fallback" aria-hidden="true">${emoji}</span>`;
        } else {
          btn.innerHTML = `<span class="swatch-fallback" aria-hidden="true">${emoji}</span>`;
        }
      } else {
        btn.innerHTML = `<span class="choice-emoji">${emoji}</span><span>${label}</span>`;
      }

      btn.addEventListener("click", () => onGatePick(btn, field, correctSpeak));
      field.appendChild(btn);
    });
  }

  function onGatePick(btn, field, correctSpeak) {
    const session = state.gateSession;
    if (!session || btn.disabled) return;
    const ok = btn.dataset.correct === "1";
    const label = btn.dataset.speak || correctSpeak;
    const story = FRIENDS?.storyForLesson?.(state.lesson);

    if (ok) {
      if (!session.missedCurrent) session.firstTryStars += 1;
      field.querySelectorAll("button").forEach((b) => {
        b.disabled = true;
      });
      updateFriendHelpRow(false);
      $("#gate-feedback").textContent = story?.friend
        ? `Đúng rồi! Sắp cứu được ${story.friend.name}!`
        : "Đúng rồi! Giỏi lắm!";
      SFX.correct();
      const correctKey = lessonAudioKey(state.lesson, "correct");
      const correctLine = "Đúng rồi! Cảm ơn Bạn Gấu!";
      NPC.say(helperForTopic(state.topic), correctLine, {
        rate: 1.0,
        force: true,
        audioKey: correctKey
      });
      setTimeout(() => {
        session.index += 1;
        if (session.index >= session.questions.length) finishGate();
        else renderGateQuestion();
      }, 850);
      return;
    }

    session.missedCurrent = true;
    SFX.retry();
    btn.classList.add("wrong");
    setTimeout(() => btn.classList.remove("wrong"), 350);

    const retryKey = lessonAudioKey(state.lesson, "retry");
    const retryLine = "Chưa đúng. Thử lại giúp mình nhé!";
    const hasFriends = FRIENDS && FRIENDS.list().length > 0;
    if (hasFriends && !session.usedFriendHelp) {
      $("#gate-feedback").textContent = "Chưa đúng. Bé có thể nhờ bạn đã cứu giúp!";
      updateFriendHelpRow(true);
      NPC.say(helperForTopic(state.topic), retryLine, {
        rate: 0.95,
        force: true,
        audioKey: retryKey
      });
      return;
    }

    $("#gate-feedback").textContent = "Thử lại cùng Đom Đóm nhé!";
    NPC.say(helperForTopic(state.topic), retryLine, {
      rate: 0.95,
      force: true,
      audioKey: retryKey
    });
    setTimeout(() => {
      const right = field.querySelector('[data-correct="1"]');
      right?.classList.add("hint-pulse");
      const hintLabel = right?.dataset.speak || correctSpeak || "đúng";
      NPC.say(helperForTopic(state.topic), `Bóng ${hintLabel} ở đây nè, bé chạm thử nhé!`, {
        force: true,
        rate: 0.95
      });
    }, 650);
  }

  function finishGate() {
    const session = state.gateSession;
    const lesson = state.lesson;
    if (!lesson) return;
    const qLen = Math.max(1, session?.questions?.length || 1);
    const first = session?.firstTryStars || 0;
    const ratio = first / qLen;
    // Luôn ≥1★ khi qua cửa; đúng hết lần đầu → 3★
    const earned = ratio >= 1 ? 3 : ratio >= 0.5 ? 2 : 1;
    const prev = lessonStars(lesson.id);
    state.stars[lesson.id] = Math.max(prev, earned);
    const friend = FRIENDS?.friendForLesson?.(lesson);
    if (friend) FRIENDS.rescue(friend);
    giveReward(earned);
  }

  function openFriends(from) {
    state.shopReturn = from || "topics";
    renderFriends();
    show("friends");
    const n = FRIENDS?.list?.().length || 0;
    NPC.say(
      "be-gau",
      n
        ? `Bé đã cứu ${n} bạn rồi! Giỏi lắm!`
        : "Chưa có bạn nào. Qua cửa để giải cứu bạn nhé!",
      { force: true, rate: 0.95 }
    );
  }

  function renderFriends() {
    const list = $("#friends-list");
    const count = $("#friends-count");
    const prompt = $("#friends-prompt");
    const friends = FRIENDS?.list?.() || [];
    if (count) count.textContent = `💛 ${friends.length}`;
    if (prompt) {
      prompt.textContent = friends.length
        ? "Chạm bạn để nghe tên nhé!"
        : "Chưa có bạn. Qua cửa giúp bạn về nhà nhé!";
    }
    if (!list) return;
    list.innerHTML = "";
    if (!friends.length) {
      list.innerHTML = `<p class="friends-empty">Hãy cứu Bạn Vàng, Bạn Đỏ… rồi quay lại đây!</p>`;
      return;
    }
    friends.forEach((f) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "friend-card";
      btn.style.setProperty("--friend-tint", f.tint || "#ffc857");
      btn.innerHTML = `
        <span class="friend-emoji">${f.emoji}</span>
        <span class="friend-name">${f.name}</span>
      `;
      btn.addEventListener("click", () => {
        unlockAudio();
        NPC.say("be-gau", `${f.name} đây! Bạn của bé!`, { force: true, rate: 0.95 });
      });
      list.appendChild(btn);
    });
  }

  function emojiForChoice(lesson, choice) {
    const label = choiceLabel(choice);
    if (lesson.topicId === "so") {
      const n = lesson.id.replace("so-", "");
      if (label === n) return lesson.emoji;
      const other = topicLessons("so").find((l) => l.id === `so-${label}`);
      return other?.emoji || "🔢";
    }
    if (lesson.topicId === "chu") {
      const hit = topicLessons("chu").find(
        (l) => l.title === `Chữ ${label}` || l.id.endsWith(String(label).toLowerCase())
      );
      if (lesson.title === `Chữ ${label}`) return lesson.emoji;
      return hit?.emoji || "🔤";
    }
    if (
      lesson.title === label ||
      lesson.title.endsWith(label) ||
      lesson.title.includes(label) ||
      lesson.speakText === label
    ) {
      return lesson.emoji;
    }
    const hit = topicLessons(lesson.topicId).find(
      (l) => l.title === label || l.title.endsWith(label) || l.title.includes(label)
    );
    return hit?.emoji || "🎈";
  }

  function giveReward(earnedStars = lessonStars(state.lesson?.id)) {
    const lesson = state.lesson;
    const story = FRIENDS?.storyForLesson?.(lesson);
    const friend = story?.friend;
    const first = !state.cleared.includes(lesson.id);
    const eco = DATA.economy || {};
    const gained = first ? eco.firstClearXu ?? 5 : eco.replayXu ?? 2;
    if (first) state.cleared.push(lesson.id);
    state.xu += gained;
    save();
    updateXuBadges();
    applyStageTheme(lesson, { held: false });
    updateCaptiveVisual("reward", friend, false);
    $("#reward-xu").textContent = String(gained);
    $("#reward-total").textContent = String(state.xu);
    const starText = `${Math.min(3, earnedStars)} sao`;
    const title = $("#reward-title");
    if (title) {
      title.textContent = friend ? `${friend.name} được giải cứu!` : "Giỏi quá!";
    }
    $("#reward-text").textContent = friend
      ? `${story?.winLine || `${friend.name} về với bé!`} ${starText}. +${gained} xu.`
      : first
        ? `Bé chơi xong ${lesson.title} — ${starText}!`
        : `Chơi lại ${lesson.title}. ${starText}.`;
    const starEl = $("#reward-stars");
    if (starEl) starEl.innerHTML = starProgressHtml(earnedStars);
    SFX.win();
    show("reward");
    const speakWin = friend
      ? story?.winLine || "Cảm ơn Bạn Gấu! Mình về rồi!"
      : `Giỏi quá! Bé được ${starText}!`;
    TTS.speak(speakWin, {
      rate: 1.0,
      force: true,
      audioKey: lessonAudioKey(lesson, "win")
    });
  }

  function nextLesson() {
    const list = topicLessons(state.topic.id);
    const idx = list.findIndex((l) => l.order === state.lesson.order);
    const next = list[idx + 1];
    if (next && isLessonUnlocked(state.topic.id, next, idx + 1)) {
      startExplore(next);
      return;
    }
    renderLessons();
    show("lessons");
    showLessonPopNpc(state.topic, "Giỏi lắm! Bé chọn chỗ chơi khác nhé!");
  }

  function renderShopCollection() {
    const row = $("#owned-tip");
    const countEl = $("#shop-owned-count");
    if (countEl) countEl.textContent = String(state.owned.length);
    if (!row) return;
    row.innerHTML = "";
    if (!state.owned.length) {
      const tip = document.createElement("p");
      tip.className = "shop-owned-empty";
      tip.textContent = "Chưa có quà — qua cửa lấy xu rồi đổi nhé!";
      row.appendChild(tip);
      return;
    }
    state.owned.forEach((id) => {
      const item = DATA.shop.find((s) => s.id === id);
      if (!item) return;
      const chip = document.createElement("span");
      chip.className = "shop-owned-chip";
      chip.textContent = item.emoji;
      chip.title = item.name;
      chip.setAttribute("aria-label", item.name);
      row.appendChild(chip);
    });
  }

  function renderShop() {
    updateXuBadges();
    renderShopCollection();
    const list = $("#shop-list");
    if (!list) return;
    list.innerHTML = "";
    DATA.shop.forEach((item) => {
      const owned = state.owned.includes(item.id);
      const canBuy = !owned && state.xu >= item.cost;
      const shortXu = !owned && state.xu < item.cost;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "shop-item" +
        (owned ? " is-owned" : canBuy ? " is-buy" : " is-short");
      btn.setAttribute(
        "aria-label",
        owned
          ? `${item.name}, đã có`
          : canBuy
            ? `${item.name}, đổi ${item.cost} xu`
            : `${item.name}, cần ${item.cost} xu`
      );
      btn.innerHTML = `
        ${owned ? '<span class="shop-item-badge" aria-hidden="true">✓</span>' : ""}
        <span class="shop-item-emoji" aria-hidden="true">${item.emoji}</span>
        <p class="shop-item-name">${item.name}</p>
        <span class="shop-item-price" aria-hidden="true">🪙 ${item.cost}</span>
        <span class="shop-item-cta">${owned ? "Đã có" : canBuy ? "Đổi ngay" : "Chưa đủ xu"}</span>
      `;
      btn.addEventListener("click", () => {
        unlockAudio();
        if (owned) {
          TTS.speak(`Bé đã có ${item.name} rồi!`, { rate: 1.0, force: true });
          return;
        }
        if (shortXu) {
          SFX.retry();
          TTS.speak(`Chưa đủ xu. Cần ${item.cost} xu. Qua cửa để lấy thêm nhé!`, {
            force: true
          });
          return;
        }
        if (shopBuying || state.owned.includes(item.id) || state.xu < item.cost) return;
        shopBuying = true;
        state.xu -= item.cost;
        state.owned.push(item.id);
        save();
        SFX.win();
        btn.classList.add("pop");
        showShopToast(item.emoji, `Yay! Đổi ${item.name}!`);
        TTS.speak(`Yay! Bé đổi được ${item.name}!`, { rate: 1.0, force: true });
        renderShop();
        setTimeout(() => {
          shopBuying = false;
        }, 600);
      });
      list.appendChild(btn);
    });
  }

  function openShop(from) {
    state.shopReturn = from || "topics";
    renderShop();
    show("shop");
    NPC.say("soc", "Đổi thưởng đây! Dùng xu giúp bạn đổi quà vui!", { force: true });
  }

  // Intro
  const intros = [
    "Bạn Gấu ơi, cứu mình với!",
    "Mỗi bài là giúp một bạn nhỏ!",
    "Chọn đúng là giúp bạn về nhà!"
  ];
  let introIndex = 0;
  const introEl = $("#intro-line");
  setInterval(() => {
    introIndex = (introIndex + 1) % intros.length;
    introEl.textContent = intros[introIndex];
  }, 4000);

  // Parent — hỏi số bằng chữ (13–19) để trẻ 5–6 tuổi khó đoán hơn phép cộng nhỏ
  let gateAnswer = 0;
  let parentGateFails = 0;
  function openParentGate(opts = {}) {
    TTS.stop();
    if (opts.resetFails !== false) parentGateFails = 0;
    const nums = Object.keys(NUMBER_WORDS).map(Number);
    gateAnswer = nums[Math.floor(Math.random() * nums.length)];
    $("#gate-q").textContent = NUMBER_WORDS[gateAnswer];
    $("#gate-a").value = "";
    if (opts.clearErr !== false) {
      const err = $("#gate-err");
      if (err && opts.resetFails !== false) err.textContent = "";
    }
    $("#parent-gate").showModal();
  }

  // Bindings
  $("#btn-play").addEventListener("click", () => {
    unlockAudio();
    resetPlaySession();
    renderTopics();
    show("topics");
    speakMapWelcome();
    checkPlayBreak();
  });
  $("#btn-map-pop")?.addEventListener("click", () => {
    unlockAudio();
    speakMapWelcome();
  });
  $("#btn-lesson-pop")?.addEventListener("click", () => {
    if (!state.topic) return;
    unlockAudio();
    const speakName = state.topic.speakName || state.topic.mapName || state.topic.title;
    showLessonPopNpc(state.topic, `${speakName}! Bé chọn một bạn nhé!`);
  });
  $("#btn-parent-map")?.addEventListener("click", () => {
    unlockAudio();
    openParentGate();
  });
  $("#btn-shop-speak")?.addEventListener("click", () => {
    unlockAudio();
    TTS.speak("Đây là đổi thưởng. Bé dùng xu gấu để đổi lấy quà!", { force: true });
  });
  $("#btn-shop-home").addEventListener("click", () => {
    unlockAudio();
    openShop("home");
  });
  $("#btn-topics-home").addEventListener("click", () => {
    TTS.stop();
    show("home");
    updateXuBadges();
  });
  $("#btn-lessons-back")?.addEventListener("click", () => {
    TTS.stop();
    hideLessonNpc();
    renderTopics();
    show("topics");
    speakMapWelcome();
  });
  $("#btn-explore-back").addEventListener("click", () => {
    TTS.stop();
    NPC.hideCompanion();
    renderLessons();
    show("lessons");
    if (state.topic) {
      showLessonPopNpc(
        state.topic,
        `${state.topic.speakName || state.topic.title}! Bé chọn một bạn nhé!`
      );
    }
  });
  $("#btn-explore-hear").addEventListener("click", hearExplore);
  $("#explore-hero").addEventListener("click", hearExplore);
  $("#btn-to-gate").addEventListener("click", () => {
    unlockAudio();
    startGate();
  });
  $("#btn-gate-back").addEventListener("click", () => {
    TTS.stop();
    startExplore(state.lesson);
  });
  $("#btn-reward-next").addEventListener("click", nextLesson);
  $("#btn-reward-shop").addEventListener("click", () => openShop("reward"));
  $("#btn-reward-friends")?.addEventListener("click", () => openFriends("reward"));
  $("#btn-reward-topics").addEventListener("click", () => {
    renderTopics();
    show("topics");
  });
  $("#btn-friends-map")?.addEventListener("click", () => {
    unlockAudio();
    openFriends("topics");
  });
  $("#btn-friends-back")?.addEventListener("click", () => {
    TTS.stop();
    if (state.shopReturn === "reward") {
      show("reward");
      return;
    }
    if (state.shopReturn === "lessons" && state.topic) {
      renderLessons();
      show("lessons");
      return;
    }
    renderTopics();
    show("topics");
  });
  $("#btn-friend-help")?.addEventListener("click", () => {
    unlockAudio();
    askFriendHelp();
  });
  $("#btn-shop-back").addEventListener("click", () => {
    if (state.shopReturn === "home") {
      show("home");
      updateXuBadges();
      return;
    }
    if (state.shopReturn === "reward") {
      show("reward");
      return;
    }
    renderTopics();
    show("topics");
  });

  function openParentSettings() {
    updateXuBadges();
    const on = TTS.isEnabled();
    const tog = $("#btn-sound-toggle");
    if (tog) tog.textContent = on ? "🔊 Âm thanh: Bật" : "🔇 Âm thanh: Tắt";
    const playLimitSel = $("#parent-play-limit");
    if (playLimitSel) playLimitSel.value = String(getPlayLimitMin() || 0);
    window.BeGauParentAudio?.open?.();
    show("parent");
  }

  $("#btn-parent").addEventListener("click", openParentGate);
  $("#parent-gate").addEventListener("close", () => {
    if ($("#parent-gate").returnValue !== "ok") return;
    if (Number($("#gate-a").value) === gateAnswer) {
      parentGateFails = 0;
      openParentSettings();
      return;
    }
    parentGateFails += 1;
    const err = $("#gate-err");
    if (err) {
      err.textContent =
        parentGateFails >= 3
          ? "Chưa đúng. Hỏi bố mẹ giúp nhé!"
          : "Chưa đúng. Gõ đúng số bằng chữ số nhé!";
    }
    setTimeout(() => {
      if (!screens.parent?.classList.contains("active")) {
        openParentGate({ resetFails: false, clearErr: false });
      }
    }, 80);
  });
  $("#btn-parent-back")?.addEventListener("click", () => {
    window.BeGauVoicePack?.stopPlay?.();
    if (window.BeGauVoicePack?.isRecording?.()) {
      window.BeGauVoicePack.stopRecord(false);
    }
    show("home");
    updateXuBadges();
    refreshHomeVoiceWarn();
  });
  $("#btn-reset")?.addEventListener("click", () => {
    state.cleared = [];
    state.xu = 0;
    state.owned = [];
    state.stars = {};
    FRIENDS?.clearAll?.();
    save();
    updateXuBadges();
    show("home");
  });
  $("#btn-sound-toggle")?.addEventListener("click", () => {
    unlockAudio();
    TTS.setEnabled(!TTS.isEnabled());
    $("#btn-sound-toggle").textContent = TTS.isEnabled()
      ? "🔊 Âm thanh: Bật"
      : "🔇 Âm thanh: Tắt";
  });
  $("#btn-test-tts")?.addEventListener("click", () => {
    unlockAudio();
    TTS.speak("Xin chào! Mỗi màn một bài học. Cùng khám phá nhé!", { force: true });
    window.BeGauParentAudio?.refreshVoiceHealth?.();
  });
  const playLimitSel = $("#parent-play-limit");
  if (playLimitSel) {
    playLimitSel.value = String(getPlayLimitMin() || 0);
    playLimitSel.addEventListener("change", () => {
      setPlayLimitMin(playLimitSel.value);
      resetPlaySession();
    });
  }
  window.BeGauParentAudio?.bind?.();

  ensureMapMounted();
  requestPersistentStorage();

  document.querySelectorAll("[data-speak=intro]").forEach((btn) => {
    btn.addEventListener("click", () => {
      unlockAudio();
      TTS.speak(introEl.textContent, { force: true });
    });
  });

  document.body.addEventListener("pointerdown", () => unlockAudio(), { once: true });

  // TTS voice list load async trên WebView
  if (window.speechSynthesis) {
    window.speechSynthesis.addEventListener?.("voiceschanged", () => {
      refreshHomeVoiceWarn();
      window.BeGauParentAudio?.refreshVoiceHealth?.();
    });
  }
  setTimeout(refreshHomeVoiceWarn, 800);
  setInterval(checkPlayBreak, 30000);

  updateXuBadges();
})();
