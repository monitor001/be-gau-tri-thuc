/**
 * SFX agent — âm hiệu nhẹ, không gây sợ (Web Audio).
 */
(function () {
  let ctx = null;

  function getCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, duration, type, gainValue) {
    if (window.BeGauTTS && !window.BeGauTTS.isEnabled()) return;
    const ac = getCtx();
    if (!ac) return;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    gain.gain.value = gainValue ?? 0.08;
    osc.connect(gain);
    gain.connect(ac.destination);
    const now = ac.currentTime;
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.start(now);
    osc.stop(now + duration);
  }

  window.BeGauSFX = {
    unlock() {
      getCtx();
    },
    correct() {
      tone(523.25, 0.12, "sine", 0.07);
      setTimeout(() => tone(659.25, 0.16, "sine", 0.07), 90);
    },
    retry() {
      tone(311.13, 0.14, "triangle", 0.05);
    },
    win() {
      tone(523.25, 0.12, "sine", 0.07);
      setTimeout(() => tone(659.25, 0.12, "sine", 0.07), 100);
      setTimeout(() => tone(783.99, 0.22, "sine", 0.08), 200);
    },
    tap() {
      tone(440, 0.06, "sine", 0.04);
    }
  };
})();
