# EVAL-AUDIO — Bé Gấu Giải Cứu Tri Thức

**Ngày đánh giá (cập nhật):** 2026-10-05 — vòng sau NPC  
**Phạm vi đã đọc:** `js/tts.js`, `js/sfx.js`, `js/npc.js`, `js/app.js`, `index.html`, `content/audio/tts-script.json`, `css/styles.css` (`.btn.speak`, `.npc-*`)  
**Thang điểm:** `0` thiếu · `1` yếu · `2` đạt · `3` tốt cho trẻ 2–5  
**Điểm TB:** **2.3 / 3**

---

## 1. Bảng điểm

| # | Tiêu chí | Điểm | Căn cứ (code) |
|---|----------|------|----------------|
| 1 | `vi-VN` + rate chậm | **3** | `BeGauTTS.META`: `lang: vi-VN`, `defaultRate: 0.8`, `defaultPitch: 1.1`; hint `0.75`, khen `0.88`. NPC có pitch/rate riêng (Đom Đóm `1.2`/`0.82`, Sóc `1.15`/`0.8`) — vẫn trong khoảng ấm. `pickVoice()` ưu tiên `vi*`. |
| 2 | Mọi hướng dẫn có TTS | **2** | Map / vào vùng / prompt / hint·retry·correct / win / ending đều có TTS (qua `NPC.say` hoặc `TTS`). **Home intro vẫn không auto-speak** (chỉ nút `data-speak="intro"`). `tts-script.json` **vẫn không được load** — runtime dùng `FALLBACK_ENTRIES` trong `tts.js`. |
| 3 | Nút nghe lại | **2** | Loa Home / Map / Game / Win / Ending (`data-speak`). Game: `lastPrompt`. Win chỉ `feedback.win`; Ending chỉ `ending.2`. NPC thêm `#btn-npc-repeat` + chạm avatar. Size `.btn.speak` **56×56**; `.npc-speak-btn` **48×48** — dưới khuyến nghị toddler 64–80. |
| 4 | Không chồng lời / unlock | **1** | `speak()` vẫn `stop()`/`cancel` trước mỗi câu (không 2 utterance cùng lúc). Unlock `pointerdown` once. **Nhưng** chuỗi `setTimeout` cứng dày hơn sau NPC: `startRegion` 2200→`playLevel`; `NPC.win` 2200→catchphrase **đụng** `app.js` praise 2400; win dialogue 4200; ending 2800/5600; qua màn 1100. Cắt ngang / mất câu. Không `visibilitychange` → cancel khi nền. |
| 5 | SFX dịu + tắt tiếng được | **3** | `sfx.js`: sine/triangle, gain ~0.04–0.08, không countdown/sợ. Toggle phụ huynh tắt TTS + SFX; `setEnabled(false)` → `stop()`. |
| 6 | NPC hình + TTS đồng thời | **2** | `npc.js` `say()`: bubble + `is-speaking` + `TTS.speak` cùng lúc — đạt trên **Map** (`showMapCompanions`) và **Game** (`enter`/`teach`/`hint`/`correct`/`retry`). **Win/Ending:** `NPC.hideCompanion()` rồi mới `NPC.win` / `NPC.say` → chỉ còn TTS, **mất hình**. Animation `is-speaking` ước lượng `length * 120` ms, **không** gắn `onend` TTS. |

**Điểm TB = (3 + 2 + 2 + 1 + 3 + 2) / 6 = 2.3**

---

## 2. Findings còn hiệu lực

### P1 — Chuỗi TTS / NPC theo `setTimeout` dễ cắt / chồng nhịp
- **Chỗ:** `app.js` `startRegion` (2200 → `playLevel`/`NPC.teach`); `advanceOrWin` (1100 / 2400 / 4200); ending (2800 / 5600); `npc.js` `win` (2200 → catchphrase).
- **Vì sao:** Catchphrase NPC (~2200) và praise app (~2400) gần như đè nhau; enter vùng bị cắt bởi prompt level. Spec: một câu xong mới câu sau (`onend`).
- **Sửa:** Queue TTS/NPC chờ `onend` (Promise wrap); khi đổi màn `cancel` + xóa queue; gộp win chain thành 1 hàng đợi (win → catchphrase → praise → dialogue).

### P1 — Home intro không tự đọc sau unlock
- **Chỗ:** `app.js` xoay `#intro-line` bằng `setInterval`; TTS intro chỉ khi chạm `data-speak="intro"`.
- **Vì sao:** Rule AUDIO: lời chào / intro bắt buộc có giọng; trẻ 2–5 ít tự tìm nút loa.
- **Sửa:** Sau unlock (hoặc sau lần chạm đầu trên Home): nói tuần tự `home.intro.1…4` / dòng đang hiện, nghỉ ngắn theo `onend`.

### P1 — `tts-script.json` không gắn runtime
- **Chỗ:** Không `fetch`/`import` JSON; `tts.js` hardcode `FALLBACK_ENTRIES`. JSON `feedback.correct` / `hint` / `win` rate `0.8` trong khi code dùng `0.88` / `0.75` / `0.88`.
- **Vì sao:** VOICE sửa JSON không vào app; lệch meta rate.
- **Sửa:** Load JSON lúc boot (fallback khi offline); đồng bộ rate theo bảng VOICE; (tuỳ chọn) map id NPC lines vào script.

### P1 — Win / Ending mất hình NPC khi đang TTS
- **Chỗ:** `advanceOrWin` gọi `NPC.hideCompanion()` rồi `NPC.win` / `NPC.say`; ending chỉ `NPC.say` trên màn không có `#npc-companion` / strip.
- **Vì sao:** Tiêu chí hình+TTS đồng thời đạt ở Game/Map nhưng **gãy** đúng lúc khen / kết thúc — trẻ không thấy ai đang nói.
- **Sửa:** Giữ / hiện lại companion (hoặc strip mini) trên Win & Ending; sync `is-speaking` theo utterance thật.

### P2 — Loa Win/Ending thiếu chuỗi; target loa nhỏ; visual không theo `onend`
- **Chỗ:** `bindSpeakButtons`: win → chỉ `feedback.win`; ending → chỉ `ending.2`. `.btn.speak` 56px; `.npc-speak-btn` 48px. `npc.js` tắt `is-speaking` bằng timer ước lượng.
- **Vì sao:** Replay không khớp lời đang nghe; target dưới 64–80; miệng/outline có thể còn sáng sau khi TTS đã `cancel`.
- **Sửa:** Replay đủ chuỗi màn; tăng nút ≥64–72px; `onend`/`onerror` tắt `is-speaking`; (tuỳ chọn) chạm `#game-prompt` / bubble để nghe lại.

---

## 3. Đã cải thiện so với vòng trước (không còn là finding riêng)

- Feedback / prompt trong game đi qua **NPC** (`setFeedback` → `hint`/`retry`/`correct`; `setPrompt` → `teach`) thay vì chỉ `TTS.speak*` thuần.
- Map có strip NPC chạm để nghe dẫn đường; vào vùng có `NPC.enter` (bubble + avatar + TTS).
- Pitch/rate theo nhân vật giúp phân biệt giọng nhẹ.

---

## 4. Điểm mạnh

- Pipeline TTS rõ + mute một chỗ cho TTS/SFX.
- Unlock Android: `pointerdown` once + warm utterance.
- SFX ngắn, êm; parent tip thiếu giọng Việt + “Nghe thử”.
- NPC API (`say` / `enter` / `teach` / …) thiết kế đúng hướng hình+TTS cùng lúc trên màn chơi.

---

## 5. Đề xuất nâng cấp (theo thứ tự)

1. **Queue theo `onend`** cho enter→prompt, win chain, ending — hết cắt lời (P1).
2. **Giữ NPC trên Win/Ending** khi đang nói (P1).
3. **Auto intro** sau unlock trên Home (P1).
4. **Load `tts-script.json`** + đồng bộ rate (P1).
5. **Replay đầy đủ** + tăng size loa + `is-speaking` theo `onend` (P2).
6. **`visibilitychange` → `TTS.stop()`** khi app nền.

---

## 6. Tóm tắt trả về

| | |
|--|--|
| **Điểm TB** | **2.3 / 3** |
| **5 findings còn mở** | (1) P1 chồng/cắt lời `setTimeout` (+ NPC.win vs praise) · (2) P1 home intro không auto TTS · (3) P1 JSON script không load · (4) P1 Win/Ending mất hình khi TTS · (5) P2 loa/replay/target + visual không theo `onend` |

**Kết luận:** Sau NPC, Game/Map đạt hình+TTS đồng thời (tiêu chí mới = 2). Điểm TB **2.3** (hạ nhẹ vì tiêu chí “không chồng lời” xuống **1** — chuỗi timer dày hơn). Ưu tiên queue `onend` + giữ NPC trên Win/Ending trước khi ship tablet.
