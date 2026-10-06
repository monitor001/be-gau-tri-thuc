/**
 * STORY + AUDIO — NPC đồng hành: hình lớn + TTS + đi trên bản đồ.
 * bé Gấu · Đom Đóm Lấp · Sóc Bản Đồ
 */
(function () {
  const NPCS = {
      "be-gau": {
      id: "be-gau",
      name: "Bé Gấu",
      emoji: "🐻",
      className: "npc-bear",
      img: "assets/npc/be-gau.svg",
      pitch: 1.15,
      rate: 0.98
    },
    "dom-dom": {
      id: "dom-dom",
      name: "Đom Đóm",
      emoji: "✨",
      className: "npc-firefly",
      img: "assets/npc/dom-dom.svg",
      pitch: 1.22,
      rate: 0.99,
      catchphrase: "Lấp lánh đây!"
    },
    "soc": {
      id: "soc",
      name: "Sóc Nhí",
      emoji: "🐿️",
      className: "npc-squirrel",
      img: "assets/npc/soc.svg",
      pitch: 1.2,
      rate: 0.98,
      catchphrase: "Đi giúp bạn nào!"
    }
  };

  const REGION_HELPER = {
    "rung-mau-sac": "dom-dom",
    "doi-hinh-khoi": "be-gau",
    "suoi-dem-so": "soc",
    "hang-chu-cai": "be-gau",
    "vuon-ban-be": "dom-dom"
  };

  const HELP_LINES = {
    "rung-mau-sac": {
      enter: "Bạn Gấu ơi, cứu mình với! Chạm đúng màu nhé!",
      tip: "Nhìn màu với mình nào. Đỏ như táo, vàng như nắng!",
      hint: "Chạm chỗ này giúp mình với!",
      correct: "Đúng rồi! Cảm ơn Bạn Gấu!",
      retry: "Gần rồi. Thử lại giúp mình nhé!"
    },
    "doi-hinh-khoi": {
      enter: "Bạn Gấu ơi, cứu mình với! Ghép hình đúng nhé!",
      tip: "Tròn tròn xoe. Vuông bốn cạnh. Tam giác ba cạnh.",
      hint: "Chạm hình này giúp mình với!",
      correct: "Khớp rồi! Cảm ơn Bạn Gấu!",
      retry: "Chưa khớp. Thử hình khác giúp mình nhé!"
    },
    "suoi-dem-so": {
      enter: "Bạn Gấu ơi, cứu mình với! Đếm chậm nào!",
      tip: "Đếm to với mình: một… hai… ba!",
      hint: "Chạm hết rồi chọn số giúp mình!",
      correct: "Đếm hay quá! Cảm ơn Bạn Gấu!",
      retry: "Đếm lại chậm giúp mình nhé!"
    },
    "hang-chu-cai": {
      enter: "Bạn Gấu ơi, cứu mình với! Chọn chữ đúng nhé!",
      tip: "Nhìn tranh, nói to tên, nghe chữ đầu!",
      hint: "Chữ đúng ở đây, giúp mình với!",
      correct: "Đúng chữ rồi! Cảm ơn Bạn Gấu!",
      retry: "Nghe lại rồi chọn chữ giúp mình nhé!"
    },
    "vuon-ban-be": {
      enter: "Bạn Gấu ơi, cứu mình với! Ghép bạn về nhà!",
      tip: "Ai về nhà ấy? Giúp mình chọn đúng!",
      hint: "Chạm đây giúp mình với!",
      correct: "Bạn về nhà rồi! Cảm ơn Bạn Gấu!",
      retry: "Thử nhà khác giúp mình nhé!"
    }
  };

  let activeHelperId = "dom-dom";
  let lastLine = "";
  /** Câu trẻ cần nghe lại khi chạm NPC (câu hỏi / hướng dẫn màn) — không bị đè bởi tip/feedback */
  let focusLine = "";
  let focusAudioKey = "";
  let lastAudioKey = "";
  let speakingTimer = null;
  const walkerScrollHandlers = new WeakMap();

  function $(sel) {
    return document.querySelector(sel);
  }

  function getHelper(regionId) {
    const id = REGION_HELPER[regionId] || "dom-dom";
    return NPCS[id];
  }

  function portraitHtml(npc, sizeClass) {
    return `
      <img class="npc-portrait ${sizeClass || ""}" src="${npc.img}" alt="${npc.name}"
        draggable="false" loading="eager"
        onerror="this.classList.add('is-broken'); this.nextElementSibling.hidden=false;" />
      <span class="npc-face-fallback" hidden aria-hidden="true">${npc.emoji}</span>
    `;
  }

  function setSpeakingVisual(npcId, on) {
    document.querySelectorAll(".npc-figure, .npc-walker").forEach((el) => {
      const match = el.dataset.npc === npcId;
      el.classList.toggle("is-speaking", on && match);
      el.classList.toggle("is-idle", !(on && match));
    });
    document.querySelectorAll(".npc-companion").forEach((panel) => {
      panel.classList.toggle("npc-talking", on);
    });
  }

  function mountExploreCompanion() {
    const explore = $("#screen-explore");
    const layout = explore?.querySelector(".explore-layout") || explore;
    let panel = $("#npc-companion");
    if (!layout) return panel;
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "npc-companion";
      panel.className = "npc-companion npc-companion-hero";
    }
    if (panel.parentElement !== layout) {
      layout.insertBefore(panel, layout.firstChild);
    }
    return panel;
  }

  /**
   * Một nhân vật dẫn đường lớn + bong bóng lời (tránh 2–3 NPC cùng lúc)
   */
  function renderCompanion(regionId, mountSelector) {
    const panel =
      (mountSelector && document.querySelector(mountSelector)) ||
      mountExploreCompanion() ||
      $("#npc-companion");
    if (!panel) return;

    const helper = getHelper(regionId);
    activeHelperId = helper.id;

    panel.hidden = false;
    panel.classList.add("npc-companion-hero");
    panel.innerHTML = `
      <div class="npc-hero-row" role="group" aria-label="Bạn đồng hành">
        <button type="button" class="npc-figure hero ${helper.className}" data-npc="${helper.id}" aria-label="Nghe ${helper.name}">
          ${portraitHtml(helper, "hero")}
          <span class="npc-name-tag">${helper.name}</span>
        </button>
        <div class="npc-bubble-wrap">
          <p class="npc-bubble">Chạm ${helper.name} để nghe nhé!</p>
          <button type="button" class="btn speak npc-speak-btn" aria-label="Nghe lại">🔊</button>
        </div>
      </div>
    `;

    panel.querySelectorAll(".npc-figure").forEach((btn) => {
      btn.addEventListener("click", () => replay(btn.dataset.npc || activeHelperId, regionId));
    });
    panel.querySelector(".npc-speak-btn")?.addEventListener("click", () => {
      replay(activeHelperId, regionId);
    });
  }

  function hideCompanion() {
    const panel = $("#npc-companion");
    if (panel) {
      panel.hidden = true;
      panel.innerHTML = "";
      panel.classList.remove("npc-companion-hero");
    }
    clearTimeout(speakingTimer);
    setSpeakingVisual(null, false);
    focusLine = "";
    focusAudioKey = "";
  }

  function ensureWalker(hostSelector) {
    const host = document.querySelector(hostSelector);
    if (!host) return null;
    let layer = host.querySelector(".npc-walker-layer");
    if (!layer) {
      layer = document.createElement("div");
      layer.className = "npc-walker-layer";
      layer.setAttribute("aria-hidden", "false");
      host.appendChild(layer);
    }
    return layer;
  }

  /**
   * Nhân vật lớn đi trên bản đồ, đứng cạnh nút hiện tại
   */
  function placeMapWalker(options = {}) {
    const {
      mapSelector = "#map-viewport",
      npcId = "soc",
      targetSelector = ".map-node.is-current",
      speakOnArrive = false,
      line = ""
    } = options;

    const map = document.querySelector(mapSelector);
    const layer = ensureWalker(mapSelector);
    const npc = NPCS[npcId] || NPCS["be-gau"];
    if (!map || !layer) return;

    layer.innerHTML = `
      <button type="button" class="npc-walker ${npc.className}" data-npc="${npc.id}" aria-label="${npc.name} đồng hành">
        ${portraitHtml(npc, "walker")}
        <span class="npc-walker-shadow" aria-hidden="true"></span>
        <span class="npc-name-tag">${npc.name}</span>
      </button>
    `;

    const walker = layer.querySelector(".npc-walker");
    walker?.addEventListener("click", () => {
      const text =
        line ||
        {
          "be-gau": "Chọn một chỗ sáng nhé! Bé Gấu đi cùng bé!",
          "dom-dom": "Lấp lánh đây! Đom Đóm dẫn đường ấm áp!",
          soc: "Bản đồ đây! Sóc Nhí chỉ đường cho bé!"
        }[npc.id];
      say(npc.id, text, { force: true });
    });

    const place = () => {
      const target =
        map.querySelector(targetSelector) ||
        map.querySelector(".map-node:not(.is-locked)") ||
        map.querySelector(".map-node");
      if (!target || !walker) return;

      const mapRect = map.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      const w = walker.offsetWidth || 88;
      // Đứng bên trái thẻ / trên đường — không đè chữ trên thẻ
      const x = t.left - mapRect.left + map.scrollLeft - w * 0.85;
      const y = t.top - mapRect.top + map.scrollTop + t.height * 0.55;

      walker.classList.add("is-walking");
      walker.style.transform = `translate(${Math.max(4, x)}px, ${Math.max(4, y)}px)`;
      setTimeout(() => walker.classList.remove("is-walking"), 700);
    };

    const prev = walkerScrollHandlers.get(map);
    if (prev) map.removeEventListener("scroll", prev);
    walkerScrollHandlers.set(map, place);
    map.addEventListener("scroll", place, { passive: true });
    requestAnimationFrame(() => requestAnimationFrame(place));

    if (speakOnArrive && line) {
      setTimeout(() => say(npc.id, line, { force: true }), 450);
    }
  }

  function clearMapWalker(mapSelector) {
    const map = document.querySelector(mapSelector || "#map-viewport");
    map?.querySelector(".npc-walker-layer")?.remove();
  }

  /** Bản đồ lớn: chỉ 1 Sóc Nhí đứng cạnh vùng hiện tại (không nhân đôi) */
  function showMapCompanions() {
    const slot = $("#npc-map-strip");
    if (slot) {
      slot.innerHTML = "";
      slot.hidden = true;
    }
    placeMapWalker({
      mapSelector: "#map-viewport",
      npcId: "soc",
      targetSelector: ".lego-tile.is-current, .lego-brick.is-current"
    });
  }

  function say(npcId, text, options = {}) {
    const npc = NPCS[npcId] || NPCS["be-gau"];
    const clean = String(text || "").trim();
    if (!clean) return;

    lastLine = clean;
    lastAudioKey = options.audioKey || "";
    if (options.focus) {
      focusLine = clean;
      focusAudioKey = options.audioKey || "";
    }
    if (options.clearFocus) {
      focusLine = "";
      focusAudioKey = "";
    }
    activeHelperId = npc.id;

    const activePanel = document.querySelector(".npc-companion:not([hidden]):not(:empty)");
    const bubble =
      activePanel?.querySelector(".npc-bubble") || document.querySelector(".npc-bubble");
    if (bubble) {
      bubble.textContent = clean;
      bubble.classList.remove("pop");
      void bubble.offsetWidth;
      bubble.classList.add("pop");
    }

    const mapPrompt = $("#map-prompt");
    if (options.syncMapPrompt && mapPrompt) mapPrompt.textContent = clean;

    if (options.syncPrompt && $("#game-prompt")) {
      $("#game-prompt").textContent = clean;
    }
    if (options.syncFeedback && $("#game-feedback")) {
      $("#game-feedback").textContent = clean;
    }

    clearTimeout(speakingTimer);
    setSpeakingVisual(npc.id, true);

    const TTS = window.BeGauTTS;
    if (TTS) {
      TTS.unlock?.();
      TTS.speak(clean, {
        rate: options.rate ?? npc.rate,
        pitch: options.pitch ?? npc.pitch,
        force: options.force,
        audioKey: options.audioKey
      });
    }

    const ms = Math.min(7000, Math.max(1400, clean.length * 90));
    speakingTimer = setTimeout(() => setSpeakingVisual(npc.id, false), ms);
  }

  function linesFor(regionId) {
    return HELP_LINES[regionId] || HELP_LINES["rung-mau-sac"];
  }

  function enter(regionId) {
    renderCompanion(regionId);
    const helper = getHelper(regionId);
    say(helper.id, linesFor(regionId).enter, { force: true });
  }

  function tip(regionId) {
    const helper = getHelper(regionId);
    say(helper.id, linesFor(regionId).tip, { force: true });
  }

  function hint(regionId, extraText) {
    const helper = getHelper(regionId);
    say(helper.id, extraText || linesFor(regionId).hint, {
      rate: 0.92,
      syncFeedback: true
    });
  }

  function correct(regionId, extraText) {
    const helper = getHelper(regionId);
    say(helper.id, extraText || linesFor(regionId).correct, {
      rate: 1.0,
      syncFeedback: true
    });
  }

  function retry(regionId, extraText) {
    const helper = getHelper(regionId);
    say(helper.id, extraText || linesFor(regionId).retry, {
      rate: 0.95,
      syncFeedback: true
    });
  }

  function teach(regionId, text) {
    const helper = getHelper(regionId);
    say(helper.id, text, { rate: 0.95, syncPrompt: true });
  }

  /** Chạm NPC / loa → đọc lại câu hỏi hoặc hướng dẫn màn (không nhảy sang tip dài) */
  function replay(npcId, regionId) {
    const id = npcId || activeHelperId || getHelper(regionId).id;
    const text = (focusLine || lastLine || "").trim();
    const audioKey = focusAudioKey || lastAudioKey || "";
    if (text) {
      say(id, text, { force: true, audioKey });
      return;
    }
    help(regionId, id);
  }

  function setFocusLine(text) {
    focusLine = String(text || "").trim();
  }

  function clearFocusLine() {
    focusLine = "";
  }

  function help(regionId, npcId) {
    const id = npcId || getHelper(regionId).id;
    const text = (focusLine || lastLine || "").trim();
    const audioKey = focusAudioKey || lastAudioKey || "";
    if (text) {
      say(id, text, { force: true, audioKey });
      return;
    }
    if (id === "be-gau" && npcId) {
      say("be-gau", linesFor(regionId).tip, { force: true });
      return;
    }
    tip(regionId);
  }

  function win(regionId, text) {
    const helper = getHelper(regionId);
    say("be-gau", text || "Yay! Ngôi sao về nhà rồi!", { rate: 1.0, force: true });
    if (window.BeGauTTS?.speakSequential && helper.id !== "be-gau") {
      window.BeGauTTS.speakSequential(helper.catchphrase || "Giỏi lắm!", {
        rate: helper.rate,
        pitch: helper.pitch
      });
    }
  }

  window.BeGauNPC = {
    NPCS,
    enter,
    tip,
    hint,
    correct,
    retry,
    teach,
    help,
    replay,
    setFocusLine,
    clearFocusLine,
    win,
    say,
    hideCompanion,
    showMapCompanions,
    mountExploreCompanion,
    renderCompanion,
    placeMapWalker,
    clearMapWalker,
    getHelper,
    linesFor
  };
})();
