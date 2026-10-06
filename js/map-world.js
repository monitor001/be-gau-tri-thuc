/**
 * Bản đồ phiêu lưu: giấy cổ + đảo + đường.
 * - World: 11 vùng
 * - Topic: các màn trong vùng (cũng dạng đảo)
 */
(() => {
  /** Gói trong ~6–90% để trẻ thấy gần đủ đường; vẫn vuốt nhẹ được */
  const ISLANDS = {
    mau: { x: 6, y: 28, emoji: "🌈" },
    hinh: { x: 16, y: 58, emoji: "🔺" },
    so: { x: 26, y: 30, emoji: "🐟" },
    chu: { x: 36, y: 62, emoji: "🅰️✨" },
    "dong-vat": { x: 46, y: 28, emoji: "🐰" },
    "trai-cay": { x: 56, y: 58, emoji: "🍎" },
    "do-vat": { x: 64, y: 32, emoji: "⚽" },
    "cam-xuc": { x: 72, y: 64, emoji: "😊" },
    "phuong-tien": { x: 80, y: 36, emoji: "🚌" },
    "nhay-mua": { x: 86, y: 58, emoji: "💃" },
    "hoa-si": { x: 90, y: 30, emoji: "🎨" }
  };

  const PATH_ORDER = [
    "mau",
    "hinh",
    "so",
    "chu",
    "dong-vat",
    "trai-cay",
    "do-vat",
    "cam-xuc",
    "phuong-tien",
    "nhay-mua",
    "hoa-si"
  ];

  /** Nền parchment theo chủ đề */
  const TOPIC_BG = {
    mau: "assets/map/ban-do-rung-mau.jpg",
    hinh: "assets/map/ban-do-doi-hinh.jpg",
    so: "assets/map/ban-do-suoi-so.jpg",
    chu: "assets/map/ban-do-hang-chu.jpg",
    "dong-vat": "assets/map/ban-do-vuon-ban.jpg",
    "trai-cay": "assets/map/ban-do-vuon-qua.jpg",
    "do-vat": "assets/map/ban-do-nha-do.jpg",
    "cam-xuc": "assets/map/ban-do-trai-tim.jpg",
    "phuong-tien": "assets/map/ban-do-ben-xe.jpg",
    "nhay-mua": "assets/map/ban-do-san-nhay.jpg",
    "hoa-si": "assets/map/ban-do-hoa-si.jpg"
  };

  let viewport = null;
  let board = null;
  let routeSvg = null;
  let bgEl = null;
  let resizeObs = null;
  let lastPoints = [];

  function assetUrl(relativePath) {
    if (!relativePath) return "";
    const clean = String(relativePath).replace(/^\//, "");
    if (window.Capacitor?.convertFileSrc) {
      return window.Capacitor.convertFileSrc(clean);
    }
    return clean;
  }

  /** Ưu tiên ảnh AI số (so-N.jpg) / friend — tránh emoji keycap xám trên Android */
  function lessonMapArt(lesson) {
    if (!lesson) return null;
    if (lesson.mapImg) return lesson.mapImg;
    if (lesson.friend?.img) return lesson.friend.img;
    if (lesson.topicId === "so") return `assets/explore/ai/${lesson.id}.jpg`;
    if (lesson.topicId === "chu") {
      const letter = (lesson.title || "").replace(/^Chữ\s+/i, "").trim();
      const word = `assets/explore/ai/${lesson.id}.jpg`;
      const svg = `assets/explore/chu/chu-${letter.toLowerCase()}.svg`;
      if (lesson.friend?.img) return lesson.friend.img;
      return word;
    }
    const aiFolders = {
      hinh: "hinh-khoi",
      "trai-cay": "trai-cay",
      "dong-vat": "dong-vat",
      "do-vat": "do-vat",
      "phuong-tien": "phuong-tien"
    };
    const folder = aiFolders[lesson.topicId];
    if (folder && lesson.friend?.img) return lesson.friend.img;
    const exploreHero = (lesson.exploreItems || []).find(
      (it) => it.img && !it.count && !it.colorId
    );
    if (exploreHero?.img) return exploreHero.img;
    const anyImg = (lesson.exploreItems || []).find((it) => it.img);
    return anyImg?.img || null;
  }

  function islandArtHtml(lesson) {
    const img = lessonMapArt(lesson);
    if (img) {
      return `<img class="adv-island-img" src="${assetUrl(img)}" alt="" loading="lazy" />`;
    }
    return lesson.emoji || "⭐";
  }

  function mount(root) {
    viewport = root.querySelector(".adventure-viewport") || root.querySelector("#map-viewport") || root;
    board = root.querySelector(".adv-board") || root.querySelector("#map-nodes") || root.querySelector("#lesson-nodes");
    routeSvg = root.querySelector(".map-route-svg") || root.querySelector("#map-route-svg") || root.querySelector("#lesson-route-svg");
    bgEl = root.querySelector(".adventure-bg") || root.querySelector(".map-world-bg");
    if (!board) return;
    if (resizeObs) resizeObs.disconnect();
    resizeObs = new ResizeObserver(() => redrawRoute());
    resizeObs.observe(board);
  }

  function mountLessons(root) {
    mount(root);
  }

  function setBackground(url, tint) {
    if (!bgEl) return;
    bgEl.style.backgroundImage = `url("${url}")`;
    if (tint) bgEl.style.setProperty("--topic-tint", tint);
  }

  function lessonSpots(count) {
    const spots = [];
    const n = Math.max(1, count);
    for (let i = 0; i < n; i += 1) {
      const t = n <= 1 ? 0.5 : i / (n - 1);
      const wave = Math.sin(i * 1.15) * 18;
      spots.push({
        x: 7 + t * 86,
        y: Math.min(72, Math.max(24, 48 + wave + (i % 2 === 0 ? -10 : 10)))
      });
    }
    return spots;
  }

  function pctToPx(xPct, yPct) {
    const w = board.clientWidth || 1;
    const h = board.clientHeight || 1;
    return { x: (xPct / 100) * w, y: (yPct / 100) * h };
  }

  function buildPathD(points) {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i += 1) {
      const a = points[i - 1];
      const b = points[i];
      const cx = (a.x + b.x) / 2;
      d += ` Q ${cx} ${a.y} ${b.x} ${b.y}`;
    }
    return d;
  }

  function redrawRoute() {
    if (!routeSvg || !board || lastPoints.length < 2) return;
    const px = lastPoints.map((p) => pctToPx(p.x, p.y));
    const w = board.clientWidth || 100;
    const h = board.clientHeight || 100;
    const d = buildPathD(px);
    routeSvg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    routeSvg.innerHTML = `
      <defs>
        <linearGradient id="advPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#8b5a2b"/>
          <stop offset="50%" stop-color="#c68642"/>
          <stop offset="100%" stop-color="#8b5a2b"/>
        </linearGradient>
      </defs>
      <path class="adv-route-line" d="${d}" fill="none"/>
    `;
    px.forEach((p, i) => {
      if (i === 0) return;
      const prev = px[i - 1];
      const mx = (prev.x + p.x) / 2;
      const my = (prev.y + p.y) / 2;
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", String(mx));
      c.setAttribute("cy", String(my));
      c.setAttribute("r", "7");
      c.setAttribute("class", "adv-checkpoint");
      routeSvg.appendChild(c);
    });
  }

  function sparkleAt(node) {
    const burst = document.createElement("span");
    burst.className = "map-select-sparkle";
    burst.setAttribute("aria-hidden", "true");
    node.appendChild(burst);
    setTimeout(() => burst.remove(), 700);
  }

  function sizeBoardForCount(count) {
    if (!board || !viewport) return;
    // World 11 đảo: vừa rộng vừa gói; Hang Chữ nhiều màn → rộng hơn
    const wide = count > 12;
    const minW = wide ? `${Math.max(120, count * 12)}%` : count >= 10 ? "118%" : "108%";
    board.style.minWidth = minW;
    if (bgEl) bgEl.style.minWidth = minW;
    if (routeSvg) routeSvg.style.minWidth = minW;
  }

  function ensureScrollHint(show) {
    if (!viewport) return;
    let hint = viewport.querySelector(".map-scroll-hint");
    if (!show) {
      hint?.remove();
      return;
    }
    if (!hint) {
      hint = document.createElement("div");
      hint.className = "map-scroll-hint";
      hint.setAttribute("aria-hidden", "true");
      hint.textContent = "Vuốt →";
      viewport.appendChild(hint);
    }
    const hide = () => {
      hint?.classList.add("is-fading");
      setTimeout(() => hint?.remove(), 600);
      viewport.removeEventListener("scroll", hide);
    };
    viewport.addEventListener("scroll", hide, { passive: true });
    setTimeout(hide, 4500);
  }

  function renderWorld(ctx) {
    if (!board) return;
    const { topics, currentIndex, starFill, onSelect } = ctx;
    const byId = Object.fromEntries(topics.map((t) => [t.id, t]));
    const ordered = PATH_ORDER.map((id) => byId[id]).filter(Boolean);

    setBackground("assets/map/ban-do-phieu-luu.jpg");
    sizeBoardForCount(ordered.length);
    board.className = "adv-board map-nodes-layer";
    board.innerHTML = "";
    lastPoints = ordered.map((t) => ISLANDS[t.id] || { x: 50, y: 50 });

    ordered.forEach((topic, index) => {
      const spot = ISLANDS[topic.id] || { x: 50, y: 50 };
      const lessons = ctx.lessonsForTopic?.(topic.id) || [];
      const done = lessons.filter((l) => ctx.isCleared?.(l.id)).length;
      const complete = lessons.length > 0 && done === lessons.length;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "adv-island" +
        (index === currentIndex ? " is-current" : "") +
        (complete ? " is-complete" : "");
      btn.style.left = `${spot.x}%`;
      btn.style.top = `${spot.y}%`;
      btn.style.setProperty("--island-color", topic.color || "#5fad56");
      btn.setAttribute("aria-label", topic.mapName || topic.title);
      btn.innerHTML = `
        <span class="adv-island-ring" aria-hidden="true"></span>
        <span class="adv-island-art" aria-hidden="true">${topic.emojiBig || topic.emoji || spot.emoji}</span>
        <span class="adv-island-label">${topic.shortName || topic.title}</span>
        ${ctx.starHtml?.(starFill(topic.id)) || ""}
      `;
      btn.addEventListener("click", () => {
        board.querySelectorAll(".adv-island").forEach((el) => el.classList.remove("is-lit"));
        btn.classList.add("is-lit", "is-selecting");
        sparkleAt(btn);
        setTimeout(() => {
          btn.classList.remove("is-selecting");
          onSelect(topic, btn);
        }, 260);
      });
      board.appendChild(btn);
    });

    redrawRoute();
    ensureScrollHint(ordered.length > 6);
    requestAnimationFrame(() => {
      board.querySelector(".adv-island.is-current")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    });
  }

  function renderTopic(ctx) {
    if (!board) return;
    const { topic, lessons, currentIndex, starHtml, isUnlocked, isCleared, lessonStars, onSelect } =
      ctx;
    const bg = TOPIC_BG[topic.id] || "assets/map/ban-do-phieu-luu.jpg";
    setBackground(bg, topic.color);
    sizeBoardForCount(lessons.length);

    board.className = "adv-board map-nodes-layer lesson-adv-board";
    board.innerHTML = "";
    const spots = lessonSpots(lessons.length);
    lastPoints = spots;

    lessons.forEach((lesson, index) => {
      const spot = spots[index];
      const cleared = isCleared(lesson.id);
      const earned = lessonStars?.(lesson.id) ?? 0;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "adv-island lesson-island" +
        (index === currentIndex ? " is-current" : "") +
        (cleared ? " is-complete" : "");
      btn.style.left = `${spot.x}%`;
      btn.style.top = `${spot.y}%`;
      btn.style.setProperty("--island-color", topic.color || "#5fad56");
      btn.setAttribute("aria-label", lesson.title);
      btn.innerHTML = `
        <span class="adv-island-ring" aria-hidden="true"></span>
        <span class="adv-island-num">${index + 1}</span>
        <span class="adv-island-art${lessonMapArt(lesson) ? " has-img" : ""}" aria-hidden="true">${islandArtHtml(lesson)}</span>
        <span class="adv-island-label">${lesson.title}</span>
        ${starHtml?.(earned) || ""}
      `;
      btn.addEventListener("click", () => {
        btn.classList.add("is-lit", "is-selecting");
        sparkleAt(btn);
        setTimeout(() => {
          btn.classList.remove("is-selecting");
          onSelect(lesson, btn);
        }, 220);
      });
      board.appendChild(btn);
    });

    redrawRoute();
    requestAnimationFrame(() => {
      (
        board.querySelector(".adv-island.is-current") ||
        board.querySelector(".adv-island:not(.is-locked)")
      )?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    });
  }

  window.BeGauMapWorld = {
    mount,
    mountLessons,
    renderWorld,
    renderTopic,
    spotForTopic: (topic) => ISLANDS[topic?.id] || { x: 50, y: 50 },
    TOPIC_BG
  };
})();
