/**
 * Gói giọng phụ huynh — ghi âm thay TTS theo khóa ổn định (IndexedDB).
 * SAFE: chỉ lưu trên máy, không tải lên mạng.
 * Mỗi clip lưu kèm hash lời thoại → phát hiện lệch khi đổi script.
 */
(function () {
  const DB_NAME = "be-gau-voice-pack-v1";
  const STORE = "clips";
  const META_KEY = "be-gau-voice-meta-v1";

  let dbPromise = null;
  let playAudio = null;
  let playUrl = null;
  let mediaRecorder = null;
  let mediaStream = null;
  let recordChunks = [];
  let recordingKey = null;

  function hashText(text) {
    const s = String(text || "")
      .replace(/\s+/g, " ")
      .trim();
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(16);
  }

  function openDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: "key" });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbPromise;
  }

  function loadMeta() {
    try {
      return JSON.parse(localStorage.getItem(META_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveMeta(meta) {
    localStorage.setItem(META_KEY, JSON.stringify(meta));
  }

  function markHas(key, text, bytes) {
    const clean = String(text || "");
    const meta = loadMeta();
    meta[key] = {
      text: clean.slice(0, 200),
      textHash: hashText(clean),
      bytes: Number(bytes) || 0,
      at: Date.now()
    };
    saveMeta(meta);
  }

  function unmark(key) {
    const meta = loadMeta();
    delete meta[key];
    saveMeta(meta);
  }

  function has(key) {
    return Boolean(loadMeta()[key]);
  }

  function listKeys() {
    return Object.keys(loadMeta());
  }

  /** true nếu đã ghi nhưng lời thoại hiện tại khác hash đã lưu */
  function needsRerecord(key, currentText) {
    const row = loadMeta()[key];
    if (!row) return false;
    if (!row.textHash) return true;
    return row.textHash !== hashText(currentText);
  }

  function estimateBytes() {
    const meta = loadMeta();
    return Object.values(meta).reduce((a, r) => a + (Number(r.bytes) || 0), 0);
  }

  async function put(key, blob, text) {
    const db = await openDb();
    const clean = String(text || "");
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put({
        key,
        blob,
        mime: blob.type || "audio/webm",
        text: clean,
        textHash: hashText(clean),
        at: Date.now()
      });
      tx.oncomplete = () => {
        markHas(key, clean, blob.size || 0);
        resolve(true);
      };
      tx.onerror = () => reject(tx.error);
    });
  }

  async function get(key) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  async function remove(key) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).delete(key);
      tx.oncomplete = () => {
        unmark(key);
        resolve(true);
      };
      tx.onerror = () => reject(tx.error);
    });
  }

  function stopPlay() {
    if (playAudio) {
      try {
        playAudio.pause();
        playAudio.src = "";
      } catch (_) {
        /* ignore */
      }
      playAudio = null;
    }
    if (playUrl) {
      URL.revokeObjectURL(playUrl);
      playUrl = null;
    }
  }

  async function play(key) {
    if (!key || !has(key)) return false;
    const row = await get(key);
    if (!row?.blob) {
      unmark(key);
      return false;
    }
    stopPlay();
    playUrl = URL.createObjectURL(row.blob);
    playAudio = new Audio(playUrl);
    playAudio.playsInline = true;
    return new Promise((resolve) => {
      const done = (ok) => {
        stopPlay();
        resolve(ok);
      };
      playAudio.onended = () => done(true);
      playAudio.onerror = () => done(false);
      playAudio.play().catch(() => done(false));
    });
  }

  function pickMime() {
    const types = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/mp4",
      "audio/ogg;codecs=opus"
    ];
    for (const t of types) {
      if (window.MediaRecorder?.isTypeSupported?.(t)) return t;
    }
    return "";
  }

  function nativeMicPlugin() {
    const Cap = window.Capacitor;
    if (!Cap?.isNativePlatform?.()) return null;
    try {
      if (Cap.registerPlugin) return Cap.registerPlugin("MicPermission");
    } catch (_) {
      /* ignore */
    }
    return Cap.Plugins?.MicPermission || null;
  }

  async function ensureMicPermission() {
    const plugin = nativeMicPlugin();
    if (plugin?.request) {
      try {
        const res = await plugin.request();
        if (res && res.granted === false) {
          throw new Error(
            "Chưa cho phép Micro. Bấm «Mở Cài đặt máy» để bật quyền Micro."
          );
        }
      } catch (err) {
        if (String(err?.message || "").includes("Micro")) throw err;
      }
    }
    return true;
  }

  async function openAppSettings() {
    const plugin = nativeMicPlugin();
    if (plugin?.openSettings) {
      try {
        await plugin.openSettings();
        return true;
      } catch (_) {
        /* fall through */
      }
    }
    return false;
  }

  async function startRecord(key) {
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      throw new Error("Máy này chưa hỗ trợ ghi âm.");
    }
    await stopRecord(false);
    stopPlay();
    await ensureMicPermission();
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true
        }
      });
    } catch (err) {
      const name = err?.name || "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        throw new Error(
          "Chưa cho phép Micro. Bấm «Cho phép micro» hoặc «Mở Cài đặt máy»."
        );
      }
      if (name === "NotFoundError") {
        throw new Error("Không tìm thấy micro trên máy này.");
      }
      throw new Error(err?.message || "Không mở được micro.");
    }
    const mime = pickMime();
    recordChunks = [];
    recordingKey = key;
    mediaRecorder = mime
      ? new MediaRecorder(mediaStream, { mimeType: mime })
      : new MediaRecorder(mediaStream);
    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) recordChunks.push(e.data);
    };
    mediaRecorder.start();
    return true;
  }

  function isRecording() {
    return Boolean(mediaRecorder && mediaRecorder.state === "recording");
  }

  function currentRecordingKey() {
    return recordingKey;
  }

  async function stopRecord(saveBlob = true) {
    if (!mediaRecorder) {
      if (mediaStream) {
        mediaStream.getTracks().forEach((t) => t.stop());
        mediaStream = null;
      }
      return null;
    }
    const rec = mediaRecorder;
    const key = recordingKey;
    const chunks = recordChunks;
    mediaRecorder = null;
    recordingKey = null;

    const blob = await new Promise((resolve) => {
      rec.onstop = () => {
        const type = rec.mimeType || "audio/webm";
        resolve(new Blob(chunks, { type }));
      };
      try {
        rec.stop();
      } catch (_) {
        resolve(null);
      }
    });

    if (mediaStream) {
      mediaStream.getTracks().forEach((t) => t.stop());
      mediaStream = null;
    }

    if (!saveBlob || !blob || blob.size < 200 || !key) return null;
    return { key, blob };
  }

  /** App xuống nền / mất focus → hủy phiên ghi đang mở (không lưu dở) */
  async function abortRecording(reason) {
    if (!isRecording()) return false;
    await stopRecord(false);
    return reason || "aborted";
  }

  if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && isRecording()) {
        abortRecording("hidden");
        window.dispatchEvent(
          new CustomEvent("begau-voice-abort", { detail: { reason: "hidden" } })
        );
      }
    });
  }

  async function clearAll() {
    const keys = listKeys();
    for (const k of keys) await remove(k);
    localStorage.removeItem(META_KEY);
  }

  function slotsForLesson(lesson) {
    if (!lesson) return [];
    const story = lesson.story || {};
    const introText =
      window.BeGauFriends?.introForLessonId?.(lesson.id) ||
      story.intro ||
      lesson.speakText ||
      "";
    const gatePrompt =
      (Array.isArray(lesson.gate?.questions) && lesson.gate.questions[0]?.promptVi) ||
      lesson.gate?.promptVi ||
      story.gateLine ||
      "";
    return [
      {
        key: `lesson:${lesson.id}:intro`,
        label: "Nhờ giúp / chào",
        text: introText,
        priority: 1
      },
      {
        key: `lesson:${lesson.id}:explore`,
        label: "Khám phá",
        text: story.exploreLine || "",
        priority: 2
      },
      {
        key: `lesson:${lesson.id}:gate`,
        label: "Câu hỏi",
        text: gatePrompt,
        priority: 1
      },
      {
        key: `lesson:${lesson.id}:win`,
        label: "Thắng",
        text: story.winLine || "",
        priority: 2
      },
      {
        key: `lesson:${lesson.id}:correct`,
        label: "Feedback đúng (ưu tiên)",
        text: "Đúng rồi! Cảm ơn Bạn Gấu!",
        priority: 0
      },
      {
        key: `lesson:${lesson.id}:retry`,
        label: "Feedback thử lại (ưu tiên)",
        text: "Chưa đúng. Thử lại giúp mình nhé!",
        priority: 0
      }
    ].filter((s) => s.text);
  }

  window.BeGauVoicePack = {
    has,
    listKeys,
    get,
    put,
    remove,
    play,
    stopPlay,
    startRecord,
    stopRecord,
    abortRecording,
    isRecording,
    currentRecordingKey,
    clearAll,
    slotsForLesson,
    loadMeta,
    ensureMicPermission,
    openAppSettings,
    hashText,
    needsRerecord,
    estimateBytes
  };
})();
