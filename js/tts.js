/**
 * AUDIO agent — TTS tiếng Việt giọng tự nhiên cho trẻ dưới 5 tuổi.
 * Ưu tiên giọng neural/online native; fallback Web Speech API (vi-VN).
 * Nhịp gần nói chuyện thật (rate ~0.95), không kéo chậm kiểu robot.
 */
(function () {
  const STORAGE_KEY = "be-gau-tts-enabled";
  const META = {
    lang: "vi-VN",
    defaultRate: 0.98,
    defaultPitch: 1.18,
    hintRate: 0.95,
    praiseRate: 1.02
  };

  const scripts = Object.create(null);
  const FALLBACK_ENTRIES = [
    { id: "home.intro.1", text: "Ồ! Các bạn nhỏ đang cần giúp!", rate: 0.98 },
    { id: "home.intro.2", text: "Bạn Gấu ơi, cứu mình với!", rate: 0.98 },
    { id: "home.intro.3", text: "Đom Đóm và Sóc Nhí cùng đi giúp bạn!", rate: 0.98 },
    { id: "home.intro.4", text: "Nắm tay nhau, đi giúp bạn nào!", rate: 0.98 },
    { id: "map.welcome", text: "Bản đồ đây! Chọn chỗ để giúp bạn nào!", rate: 0.98 },
    { id: "region.enter.rung-mau-sac", text: "Rừng Màu! Có bạn đang chờ Bạn Gấu giúp!", rate: 0.98 },
    { id: "region.enter.doi-hinh-khoi", text: "Đồi Hình! Cứu bạn hình khối nào!", rate: 0.98 },
    { id: "region.enter.suoi-dem-so", text: "Suối Số! Cùng đếm giúp bạn nào!", rate: 0.98 },
    { id: "region.enter.hang-chu-cai", text: "Hang Chữ! Cứu bạn chữ cái nào!", rate: 0.98 },
    { id: "region.enter.vuon-ban-be", text: "Vườn Bạn! Chào các bạn cần giúp!", rate: 0.98 },
    { id: "feedback.correct", text: "Đúng rồi! Cảm ơn Bạn Gấu!", rate: 1.02 },
    { id: "feedback.retry", text: "Thử lại giúp mình nhé!", rate: 0.98 },
    { id: "feedback.hint", text: "Chạm vào đây giúp mình với!", rate: 0.95 },
    { id: "feedback.win", text: "Yay! Bạn về với Bạn Gấu rồi!", rate: 1.02 },
    { id: "ending.1", text: "Các bạn vui quá — cảm ơn Bạn Gấu!", rate: 0.98 },
    { id: "ending.2", text: "Giúp nhau vui hơn đánh nhau nhiều!", rate: 0.98 },
    { id: "ending.3", text: "Cảm ơn Bạn Gấu. Mai mình giúp tiếp nhé!", rate: 0.98 }
  ];
  FALLBACK_ENTRIES.forEach((e) => {
    scripts[e.id] = e;
  });

  let unlocked = false;
  let enabled = localStorage.getItem(STORAGE_KEY) !== "0";
  let viVoice = null;
  let nativeVoiceIndex = -1;
  let voicesReady = false;
  let lastUtterance = { text: "", rate: META.defaultRate, audioKey: "" };
  let speaking = false;
  let queue = Promise.resolve();
  let queueToken = 0;

  if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
    });
  }

  function isNative() {
    return Boolean(window.Capacitor?.isNativePlatform?.());
  }

  function nativeTts() {
    if (window.__BeGauNativeTts) return window.__BeGauNativeTts;
    const Cap = window.Capacitor;
    if (Cap?.registerPlugin) {
      try {
        window.__BeGauNativeTts = Cap.registerPlugin("TextToSpeech");
        return window.__BeGauNativeTts;
      } catch (_) {
        /* fall through */
      }
    }
    return Cap?.Plugins?.TextToSpeech || null;
  }

  function webSupported() {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  /** Ưu tiên giọng neural / online / nữ tiếng Việt — nghe tự nhiên hơn giọng compact */
  function scoreVoice(name, lang) {
    const n = String(name || "");
    const l = String(lang || "");
    let score = 0;
    if (/^vi(-|_|$)/i.test(l) || /vietnam/i.test(n) || /vietnam/i.test(l)) score += 120;
    else if (/vi/i.test(l)) score += 60;
    else return -1000;

    if (/neural|natural|wavenet|studio|premium|enhanced|online|network|google|samsung|microsoft|huawei|oppo|vivo/i.test(n)) {
      score += 50;
    }
    if (/child|kid|girl|tre|bé|junior|soft/i.test(n)) score += 40;
    if (/female|nữ|linh|my|hoài|mai|lan|huyền|ngọc|thảo/i.test(n)) score += 25;
    if (/local|compact|legacy|legacy|espeak|pico/i.test(n)) score -= 35;
    if (/male|nam(?![a-z])/i.test(n)) score -= 8;
    return score;
  }

  function pickVoice() {
    if (!webSupported()) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    let best = null;
    let bestScore = -Infinity;
    voices.forEach((v) => {
      const s = scoreVoice(v.name, v.lang);
      if (s > bestScore) {
        bestScore = s;
        best = v;
      }
    });
    viVoice = bestScore > 0 ? best : null;
    return viVoice;
  }

  async function pickNativeVoice() {
    const plugin = nativeTts();
    if (!plugin?.getSupportedVoices) return -1;
    try {
      const res = await plugin.getSupportedVoices();
      const voices = res?.voices || [];
      let best = -1;
      let bestScore = -Infinity;
      voices.forEach((v, i) => {
        const s = scoreVoice(v.name || v.voiceURI || "", v.lang || "");
        if (s > bestScore) {
          bestScore = s;
          best = i;
        }
      });
      nativeVoiceIndex = bestScore > 0 ? best : -1;
      voicesReady = true;
      return nativeVoiceIndex;
    } catch (_) {
      nativeVoiceIndex = -1;
      return -1;
    }
  }

  if (webSupported()) {
    pickVoice();
    window.speechSynthesis.onvoiceschanged = () => pickVoice();
  }
  if (typeof window !== "undefined") {
    setTimeout(() => {
      pickNativeVoice();
    }, 400);
  }

  function unlock() {
    unlocked = true;
    if (!enabled) return;
    if (!voicesReady) pickNativeVoice();
    if (webSupported()) {
      try {
        window.speechSynthesis.cancel();
        const warm = new SpeechSynthesisUtterance(" ");
        warm.volume = 0;
        warm.lang = META.lang;
        const voice = viVoice || pickVoice();
        if (voice) warm.voice = voice;
        window.speechSynthesis.speak(warm);
        window.speechSynthesis.cancel();
      } catch (_) {
        /* ignore */
      }
    }
  }

  function setEnabled(value) {
    enabled = Boolean(value);
    localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
    if (!enabled) stop();
  }

  function isEnabled() {
    return enabled;
  }

  async function stop() {
    speaking = false;
    window.BeGauVoicePack?.stopPlay?.();
    const plugin = nativeTts();
    if (plugin?.stop) {
      try {
        await plugin.stop();
      } catch (_) {
        /* ignore */
      }
    }
    if (webSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch (_) {
        /* ignore */
      }
    }
  }

  async function speakNative(text, rate, pitch) {
    const plugin = nativeTts();
    if (!plugin?.speak) return false;
    if (nativeVoiceIndex < 0) await pickNativeVoice();
    try {
      const opts = {
        text,
        lang: META.lang,
        rate: Math.min(1.2, Math.max(0.5, rate)),
        pitch: Math.min(2, Math.max(0.5, pitch)),
        volume: 1.0,
        category: "ambient"
      };
      if (nativeVoiceIndex >= 0) opts.voice = nativeVoiceIndex;
      await plugin.speak(opts);
      return true;
    } catch (_) {
      return false;
    }
  }

  function speakWeb(text, rate, pitch) {
    if (!webSupported()) return false;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = META.lang;
      u.rate = Math.min(1.2, Math.max(0.7, rate));
      u.pitch = pitch;
      u.volume = 1;
      const voice = viVoice || pickVoice();
      if (voice) u.voice = voice;
      u.onend = () => {
        speaking = false;
      };
      u.onerror = () => {
        speaking = false;
      };
      window.speechSynthesis.speak(u);
      return true;
    } catch (_) {
      return false;
    }
  }

  function estimateMs(text, rate) {
    return Math.min(7000, Math.max(900, String(text).length * (95 / (rate || META.defaultRate))));
  }

  function speakWebAsync(text, rate, pitch) {
    return new Promise((resolve) => {
      if (!webSupported()) {
        resolve(false);
        return;
      }
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = META.lang;
        u.rate = Math.min(1.2, Math.max(0.7, rate));
        u.pitch = pitch;
        u.volume = 1;
        const voice = viVoice || pickVoice();
        if (voice) u.voice = voice;
        let settled = false;
        const done = () => {
          if (settled) return;
          settled = true;
          speaking = false;
          resolve(true);
        };
        u.onend = done;
        u.onerror = done;
        window.speechSynthesis.speak(u);
        setTimeout(done, estimateMs(text, rate) + 300);
      } catch (_) {
        resolve(false);
      }
    });
  }

  async function speakCustom(audioKey) {
    const pack = window.BeGauVoicePack;
    if (!pack || !audioKey || !pack.has(audioKey)) return false;
    try {
      speaking = true;
      const ok = await pack.play(audioKey);
      speaking = false;
      return ok;
    } catch (_) {
      speaking = false;
      return false;
    }
  }

  async function speakNow(text, options = {}) {
    const clean = String(text || "")
      .replace(/\s+/g, " ")
      .trim();
    if (!clean) return;

    const rate = options.rate ?? META.defaultRate;
    const pitch = options.pitch ?? META.defaultPitch;
    const audioKey = options.audioKey || "";
    lastUtterance = { text: clean, rate, audioKey };

    if (!enabled) return;
    if (!unlocked && !options.force) return;

    await stop();
    window.BeGauVoicePack?.stopPlay?.();

    if (audioKey) {
      const custom = await speakCustom(audioKey);
      if (custom) return;
    }

    speaking = true;

    if (isNative()) {
      const ok = await speakNative(clean, rate, pitch);
      speaking = false;
      if (ok) {
        await new Promise((r) => setTimeout(r, Math.min(800, estimateMs(clean, rate) * 0.12)));
        return;
      }
    }
    await speakWebAsync(clean, rate, pitch);
  }

  async function speak(text, options = {}) {
    queueToken += 1;
    queue = Promise.resolve();
    return speakNow(text, options);
  }

  function speakSequential(text, options = {}) {
    const my = ++queueToken;
    queue = queue.then(async () => {
      if (my !== queueToken) return;
      await speakNow(text, { ...options, force: options.force ?? true });
    });
    return queue;
  }

  function speakId(id, options = {}) {
    const entry = scripts[id];
    if (!entry) return;
    return speak(entry.text, { rate: entry.rate ?? META.defaultRate, ...options });
  }

  function speakPrompt(text) {
    return speak(text, { rate: META.defaultRate });
  }

  function speakPraise(text) {
    return speak(text, { rate: META.praiseRate });
  }

  function speakHint(text) {
    return speak(text || scripts["feedback.hint"].text, { rate: META.hintRate });
  }

  function speakRetry(text) {
    return speak(text || scripts["feedback.retry"].text, { rate: META.defaultRate });
  }

  function repeatLast() {
    if (!lastUtterance.text) return;
    unlock();
    return speak(lastUtterance.text, {
      rate: lastUtterance.rate,
      force: true,
      audioKey: lastUtterance.audioKey
    });
  }

  function hasVietnameseVoice() {
    if (isNative()) {
      // Native TTS có thể có engine nhưng chưa có gói ngôn ngữ vi — check danh sách voice
      if (nativeVoiceIndex >= 0) return true;
      if (webSupported() && pickVoice()) return true;
      // Có plugin nhưng chưa chắc có vi: trả true tạm để không chặn; checkVoiceHealth chi tiết hơn
      return Boolean(nativeTts());
    }
    return Boolean(pickVoice());
  }

  /**
   * Kiểm tra sức khỏe giọng vi-VN cho phụ huynh.
   * @returns {{ ok: boolean, mode: string, message: string, voiceName: string }}
   */
  function checkVoiceHealth() {
    const name = viVoice?.name || (nativeVoiceIndex >= 0 ? `native#${nativeVoiceIndex}` : "");
    if (isNative()) {
      if (nativeVoiceIndex >= 0 || pickVoice()) {
        return {
          ok: true,
          mode: "native",
          voiceName: name,
          message: "Máy có TTS. Nên ghi âm giọng bố mẹ để trẻ nghe quen hơn."
        };
      }
      return {
        ok: false,
        mode: "native-missing",
        voiceName: "",
        message:
          "Máy có thể thiếu giọng tiếng Việt. Vào Cài đặt máy → Ngôn ngữ & nhập liệu → Chuyển văn bản thành giọng nói → tải tiếng Việt. Hoặc dùng tab Ghi âm lời đọc."
      };
    }
    if (pickVoice()) {
      return {
        ok: true,
        mode: "web",
        voiceName: viVoice?.name || "",
        message: "Trình duyệt có giọng vi-VN."
      };
    }
    return {
      ok: false,
      mode: "web-missing",
      voiceName: "",
      message:
        "Không tìm thấy giọng tiếng Việt. Trẻ 2–3 tuổi cần nghe lời — hãy cài giọng vi-VN trên máy hoặc ghi âm trong Cài đặt người lớn."
    };
  }

  function speakIdSequential(id, options = {}) {
    const entry = scripts[id];
    if (!entry) return Promise.resolve();
    return speakSequential(entry.text, { rate: entry.rate ?? META.defaultRate, ...options });
  }

  window.BeGauTTS = {
    META,
    unlock,
    setEnabled,
    isEnabled,
    stop,
    speak,
    speakSequential,
    speakId,
    speakIdSequential,
    speakPrompt,
    speakPraise,
    speakHint,
    speakRetry,
    repeatLast,
    hasVietnameseVoice,
    checkVoiceHealth,
    pickNativeVoice,
    supported: () => Boolean(nativeTts()) || webSupported(),
    getLast: () => lastUtterance,
    isSpeaking: () => speaking,
    getVoiceName: () => viVoice?.name || (nativeVoiceIndex >= 0 ? `native#${nativeVoiceIndex}` : "")
  };
})();
