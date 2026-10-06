/**
 * Cài đặt người lớn — danh sách bài + ghi âm thay lời đọc.
 */
(function () {
  const $ = (sel) => document.querySelector(sel);

  function topics() {
    return window.BeGauLessons?.topics || [];
  }

  function lessonsOf(topicId) {
    return (window.BeGauLessons?.lessons || [])
      .filter((l) => l.topicId === topicId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  function formatBytes(n) {
    const b = Number(n) || 0;
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
    return `${(b / (1024 * 1024)).toFixed(1)} MB`;
  }

  function fillTopicSelect() {
    const sel = $("#parent-topic-filter");
    if (!sel) return;
    sel.innerHTML = "";
    topics()
      .slice()
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .forEach((t) => {
        const opt = document.createElement("option");
        opt.value = t.id;
        opt.textContent = `${t.emoji || ""} ${t.shortName || t.title}`;
        sel.appendChild(opt);
      });
  }

  function updateStorageTip() {
    const el = $("#parent-voice-storage");
    const VP = window.BeGauVoicePack;
    if (!el || !VP) return;
    const keys = VP.listKeys().length;
    const bytes = VP.estimateBytes();
    el.textContent = `Đã ghi ${keys} câu · ~${formatBytes(bytes)} trên máy`;
  }

  function refreshVoiceHealth() {
    const box = $("#parent-voice-health");
    if (!box || !window.BeGauTTS?.checkVoiceHealth) return;
    const h = window.BeGauTTS.checkVoiceHealth();
    box.hidden = false;
    box.classList.toggle("is-warn", !h.ok);
    box.classList.toggle("is-ok", h.ok);
    box.textContent = h.message + (h.voiceName ? ` (${h.voiceName})` : "");
  }

  async function refreshClipState(row, key, text) {
    const badge = row.querySelector(".parent-clip-badge");
    const VP = window.BeGauVoicePack;
    const has = VP?.has(key);
    const stale = has && VP.needsRerecord(key, text);
    row.classList.toggle("has-clip", Boolean(has));
    row.classList.toggle("needs-rerecord", Boolean(stale));
    if (badge) {
      if (stale) badge.textContent = "Cần ghi lại";
      else if (has) badge.textContent = "Đã ghi";
      else badge.textContent = "TTS gốc";
    }
  }

  function setStatus(msg) {
    const el = $("#parent-audio-status");
    if (el) el.textContent = msg || "";
  }

  function resetRecButtons(host) {
    host?.querySelectorAll(".parent-rec.is-recording").forEach((b) => {
      b.classList.remove("is-recording");
      b.textContent = "🎙️";
    });
  }

  async function renderLessonList() {
    const host = $("#parent-lesson-list");
    const sel = $("#parent-topic-filter");
    const VP = window.BeGauVoicePack;
    if (!host || !sel || !VP) return;

    const topicId = sel.value || topics()[0]?.id;
    host.innerHTML = "";
    const list = lessonsOf(topicId);
    if (!list.length) {
      host.innerHTML = `<p class="tip">Chủ đề này chưa có bài.</p>`;
      return;
    }

    for (const lesson of list) {
      const card = document.createElement("article");
      card.className = "parent-lesson-card";
      card.innerHTML = `
        <header class="parent-lesson-head">
          <span class="parent-lesson-emoji">${lesson.emoji || "📘"}</span>
          <div>
            <h4>${lesson.title}</h4>
            <p>${lesson.speakText || ""}</p>
          </div>
        </header>
        <div class="parent-voice-slots"></div>
      `;
      const slotsHost = card.querySelector(".parent-voice-slots");
      const slots = VP.slotsForLesson(lesson).sort((a, b) => (a.priority ?? 9) - (b.priority ?? 9));
      slots.forEach((slot) => {
        const row = document.createElement("div");
        row.className = "parent-voice-row";
        row.dataset.key = slot.key;
        row.innerHTML = `
          <div class="parent-voice-info">
            <strong>${slot.label}</strong>
            <span class="parent-clip-badge">TTS gốc</span>
            <p class="parent-voice-text">${slot.text}</p>
          </div>
          <div class="parent-voice-actions">
            <button type="button" class="btn icon parent-rec" aria-label="Ghi âm" title="Ghi âm">🎙️</button>
            <button type="button" class="btn icon parent-play" aria-label="Nghe" title="Nghe">▶️</button>
            <button type="button" class="btn icon parent-del" aria-label="Xóa ghi âm" title="Xóa">🗑️</button>
          </div>
        `;
        const btnRec = row.querySelector(".parent-rec");
        const btnPlay = row.querySelector(".parent-play");
        const btnDel = row.querySelector(".parent-del");

        btnRec.addEventListener("click", async () => {
          try {
            window.BeGauTTS?.stop?.();
            VP.stopPlay();
            if (VP.isRecording() && VP.currentRecordingKey() === slot.key) {
              btnRec.classList.remove("is-recording");
              btnRec.textContent = "🎙️";
              setStatus("Đang lưu…");
              const result = await VP.stopRecord(true);
              if (result?.blob) {
                await VP.put(result.key, result.blob, slot.text);
                setStatus("Đã lưu giọng ghi âm. App sẽ dùng thay TTS.");
                await refreshClipState(row, slot.key, slot.text);
                const tip = $("#parent-voice-count");
                if (tip) tip.textContent = String(VP.listKeys().length);
                updateStorageTip();
              } else {
                setStatus("Ghi quá ngắn — thử lại nhé.");
              }
              return;
            }
            if (VP.isRecording()) {
              await VP.stopRecord(false);
              resetRecButtons(host);
            }
            await VP.startRecord(slot.key);
            btnRec.classList.add("is-recording");
            btnRec.textContent = "⏹";
            setStatus(`Đang ghi: ${lesson.title} · ${slot.label}. Chạm ⏹ để dừng.`);
          } catch (err) {
            resetRecButtons(host);
            setStatus(err?.message || "Không mở được micro. Cho phép quyền ghi âm nhé.");
          }
        });

        btnPlay.addEventListener("click", async () => {
          window.BeGauTTS?.stop?.();
          if (VP.has(slot.key)) {
            setStatus(
              VP.needsRerecord(slot.key, slot.text)
                ? "Nghe bản cũ (lời đã đổi — nên ghi lại)…"
                : "Nghe bản ghi âm…"
            );
            await VP.play(slot.key);
            setStatus("");
          } else {
            window.BeGauTTS?.unlock?.();
            window.BeGauTTS?.speak?.(slot.text, {
              force: true,
              audioKey: slot.key
            });
            setStatus("Đang nghe TTS gốc (chưa có ghi âm).");
          }
        });

        btnDel.addEventListener("click", async () => {
          if (!VP.has(slot.key)) {
            setStatus("Chưa có ghi âm để xóa.");
            return;
          }
          await VP.remove(slot.key);
          await refreshClipState(row, slot.key, slot.text);
          updateStorageTip();
          const tip = $("#parent-voice-count");
          if (tip) tip.textContent = String(VP.listKeys().length);
          setStatus("Đã xóa ghi âm — quay lại TTS gốc.");
        });

        slotsHost.appendChild(row);
        refreshClipState(row, slot.key, slot.text);
      });
      host.appendChild(card);
    }
    updateStorageTip();
  }

  function bind() {
    fillTopicSelect();
    $("#parent-topic-filter")?.addEventListener("change", () => renderLessonList());
    $("#btn-parent-mic-perm")?.addEventListener("click", async () => {
      setStatus("Đang xin quyền micro…");
      try {
        await window.BeGauVoicePack?.ensureMicPermission?.();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((t) => t.stop());
        setStatus("Đã cho phép micro. Có thể ghi âm các câu bên dưới.");
      } catch (err) {
        setStatus(err?.message || "Chưa được phép dùng micro.");
      }
    });
    $("#btn-parent-open-settings")?.addEventListener("click", async () => {
      const ok = await window.BeGauVoicePack?.openAppSettings?.();
      setStatus(
        ok
          ? "Đã mở Cài đặt máy. Bật quyền Micro cho Bé Gấu rồi quay lại app."
          : "Mở Cài đặt máy → Ứng dụng → Bé Gấu → Quyền → Micro."
      );
    });
    $("#btn-parent-clear-voices")?.addEventListener("click", async () => {
      if (!confirm("Xóa hết giọng ghi âm trên máy này?")) return;
      await window.BeGauVoicePack?.clearAll?.();
      setStatus("Đã xóa toàn bộ ghi âm.");
      updateStorageTip();
      renderLessonList();
    });
    $("#parent-tab-overview-btn")?.addEventListener("click", () => showTab("overview"));
    $("#parent-tab-voices-btn")?.addEventListener("click", () => {
      showTab("voices");
      renderLessonList();
    });
    window.addEventListener("begau-voice-abort", () => {
      resetRecButtons(document);
      setStatus("Ghi âm bị dừng (app xuống nền). Chạm 🎙️ để ghi lại.");
    });
  }

  function showTab(name) {
    document.querySelectorAll(".parent-tab-panel").forEach((p) => {
      p.hidden = p.dataset.tab !== name;
    });
    document.querySelectorAll(".parent-tab-btn").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.tab === name);
    });
  }

  function open() {
    fillTopicSelect();
    showTab("overview");
    setStatus("");
    const count = window.BeGauVoicePack?.listKeys?.()?.length || 0;
    const tip = $("#parent-voice-count");
    if (tip) tip.textContent = String(count);
    updateStorageTip();
    refreshVoiceHealth();
  }

  window.BeGauParentAudio = {
    bind,
    open,
    renderLessonList,
    showTab,
    refreshVoiceHealth,
    updateStorageTip
  };
})();
