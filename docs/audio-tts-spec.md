# Âm thanh & TTS — Bé Gấu Giải Cứu Tri Thức

Đặc tả kiến trúc âm thanh cho trẻ **2–5 tuổi**. Agent: `AUDIO` (kiến trúc), `VOICE` (kịch bản), `SFX` (âm hiệu), `PEDA` (duyệt nhịp/độ dài).

Nguồn script đọc sẵn: [`content/audio/tts-script.json`](../content/audio/tts-script.json).

---

## 1. Mục tiêu

- Trẻ **không chỉ nhìn hình** — mọi hướng dẫn, lời khen, gợi ý quan trọng phải có **giọng tiếng Việt**.
- TTS là kênh chính; chữ trên UI chỉ hỗ trợ phụ huynh.
- Âm thanh ấm, chậm, không áp lực, không đáng sợ.

---

## 2. Engine: Web Speech API

| Tham số | Giá trị | Ghi chú |
|---------|---------|---------|
| API | `window.speechSynthesis` + `SpeechSynthesisUtterance` | Có sẵn trên Chrome / Android WebView (Capacitor) |
| `lang` | **`vi-VN`** | Bắt buộc khi có giọng Việt |
| `rate` | **0.75–0.85** (mặc định **0.8**) | Chậm hơn người lớn; dễ nghe với toddler |
| `pitch` | **1.05–1.15** (mặc định **1.1**) | Ấm, thân thiện — không quá cao kiểu robot |
| `volume` | `0–1` (mặc định `1`) | Tôn trọng mute phụ huynh |

### Chọn giọng

1. `speechSynthesis.getVoices()` — chờ sự kiện `voiceschanged` (Android thường trả về trễ).
2. Ưu tiên voice có `lang` bắt đầu bằng `vi` (ví dụ `vi-VN`, `vi_VN`).
3. Nếu có nhiều giọng Việt: ưu tiên giọng nữ / “natural” nếu tên voice gợi ý được.
4. Gán `utterance.voice` + luôn set `utterance.lang = 'vi-VN'`.

### Pseudo-API module (gợi ý)

```js
// js/audio/tts.js (triển khai sau — không nằm trong scope file này)
speak(id | text, { rate?, priority?, cancel? })
speakScript(id)          // lookup tts-script.json
replay()                 // đọc lại câu hiện tại / prompt màn
cancel()                 // speechSynthesis.cancel()
setEnabled(bool)         // phụ huynh bật/tắt
unlock()                 // gọi sau gesture đầu
```

---

## 3. Unlock sau gesture đầu (bắt buộc trên Android)

Trình duyệt / WebView **chặn** audio & TTS cho đến khi có tương tác người dùng.

| Bước | Hành vi |
|------|---------|
| Lần chạm / tap đầu trên app | Gọi `unlock()`: thử `speechSynthesis.speak` câu rỗng hoặc rất ngắn rồi `cancel`, hoặc phát SFX silent/ngắn |
| Cờ `audioUnlocked = true` | Chỉ sau unlock mới auto-play intro / prompt |
| Trước unlock | Không auto TTS; có thể hiện nút loa lớn “Nghe bé Gấu” |

**Home CTA “Chơi nào!”** là điểm unlock lý tưởng (vừa gesture vừa vào map).

---

## 4. Hàng đợi & cancel

Không chồng nhiều câu TTS cùng lúc.

### Quy tắc

1. Trước mỗi câu mới quan trọng: `speechSynthesis.cancel()`.
2. **Một utterance** đang nói tại một thời điểm.
3. Priority:
   - `critical` — feedback đúng / thử lại / thắng → cancel ngay, nói liền.
   - `high` — prompt màn chơi, hướng dẫn → cancel câu thấp hơn.
   - `normal` — intro, chào vùng, map welcome → có thể xếp hàng ngắn nếu đang nói `normal` khác (hoặc cancel nếu chuyển màn).
4. Khi **đổi màn hình** (Home → Map → Game → Win): luôn `cancel()` rồi nói câu của màn mới.
5. Intro nhiều câu (home 4 câu): nói tuần tự — chờ `onend` câu trước rồi mới câu sau; nếu trẻ chạm nút khác giữa chừng → `cancel` + theo intent mới.

### Hàng đợi tối giản

```
queue: []  // chỉ dùng cho chuỗi intro/ending cùng priority normal
current: utterance | null

speak(item):
  if muted → return
  if !unlocked → stash "pendingReplay" hoặc chờ nút loa
  if item.priority === 'critical' | 'high' OR cancel=true:
    cancel(); queue = []; speakNow(item)
  else:
    queue.push(item); drainIfIdle()
```

---

## 5. Nút nghe lại (loa)

- Mọi màn có prompt / lời thoại: nút loa **≥ 56×56 px** (khuyến nghị lớn hơn cho toddler).
- Chạm loa hoặc chạm vùng prompt → `replay()` câu TTS hiện tại (`promptVi` hoặc script id đang gắn màn).
- Replay luôn `cancel` rồi nói lại từ đầu (không tua giữa câu).
- Icon rõ (loa); không phụ thuộc chữ.

---

## 6. Bật / tắt tiếng

| Điều khiển | Ai dùng | Lưu trữ |
|------------|---------|---------|
| TTS / giọng đọc | Phụ huynh (góc Người lớn) | `localStorage` key gợi ý: `begau.ttsEnabled` |
| SFX | Phụ huynh | `begau.sfxEnabled` |
| Nhạc nền (nếu có) | Phụ huynh | `begau.musicEnabled` — **volume thấp**, không át TTS |

Khi `ttsEnabled === false`:

- Không gọi `speak`.
- Vẫn hiện chữ prompt (phụ huynh đọc được).
- Nút loa có thể báo hiệu tắt (không spam toast).

Trẻ **không** cần tài khoản; không thu thập PII liên quan audio.

---

## 7. Fallback khi không có giọng Việt

Thứ tự xử lý:

1. Tìm voice `vi*`. Nếu có → dùng + `lang: vi-VN`.
2. Không có voice Việt nhưng API vẫn speak được:
   - Vẫn set `lang: 'vi-VN'` — một số engine hệ thống vẫn đọc được tiếng Việt qua default voice.
   - Theo dõi chất lượng; nếu phát hiện lỗi / im lặng → coi như thiếu giọng.
3. **Không** mặc định sang TTS tiếng Anh đọc phiên âm Việt.
4. UI fallback:
   - Giữ nguyên chữ lớn + icon.
   - Phụ huynh: gợi ý ngắn trong Góc Người lớn — “Cài gói ngôn ngữ Tiếng Việt (TTS) trên máy để bé nghe giọng đọc.”
5. SFX vẫn hoạt động độc lập (Web Audio / HTMLAudio) khi TTS thiếu.

---

## 8. Ghi chú Android TTS (Capacitor / WebView)

| Vấn đề | Hướng xử lý |
|--------|-------------|
| `getVoices()` rỗng lúc đầu | Lắng nghe `voiceschanged`; retry sau unlock |
| Cần gói ngôn ngữ Việt | Cài “Text-to-speech” / giọng Tiếng Việt trong Cài đặt hệ thống (Google TTS phổ biến) |
| Autoplay bị chặn | Bắt buộc unlock sau tap đầu (mục 3) |
| `cancel` / `pause` không ổn định trên vài máy | Prefer `cancel` + utterance mới; tránh phụ thuộc `pause`/`resume` |
| App vào nền | `cancel()` trong `visibilitychange` / Capacitor `appStateChange` |
| Rate quá nhanh trên vài ROM | Clamp rate 0.75–0.85; cho phép phụ huynh chỉnh sau nếu cần |
| WebView vs Chrome | Test trên APK thật; không chỉ desktop |

---

## 9. Nội dung bắt buộc có giọng đọc

1. Lời chào / home intro  
2. Map welcome + tên vùng khi vào  
3. Hướng dẫn mỗi màn (`promptVi`)  
4. Feedback: đúng / thử lại / gợi ý  
5. Màn thắng & ending hành trình  

Script tĩnh nằm trong `content/audio/tts-script.json`. Prompt theo level lấy từ data game (`promptVi`) — cùng pipeline `speak()`.

---

## 10. Chuẩn câu VOICE (tóm tắt)

- ≤ **12–15 từ** / câu; 1 ý / câu.
- Từ dễ, không thuật ngữ kỹ thuật.
- Rate mặc định **0.8**; pitch **1.1**.
- Feedback luôn khích lệ — không mắng, không countdown “tick”.

---

## 11. Cấm

- Nhạc nền át lời hướng dẫn.
- Countdown âm thanh gây áp lực.
- Âm đáng sợ / ồn đột ngột.
- Chồng nhiều TTS cùng lúc.
- TTS tiếng Anh mặc định khi máy có (hoặc có thể cài) `vi-VN`.
- Thu thập giọng nói trẻ / gửi audio lên server (không cần cho MVP).

---

## 12. Checklist triển khai

- [ ] Module TTS dùng Web Speech API, `vi-VN`, rate 0.8, pitch 1.1  
- [ ] Unlock sau gesture đầu  
- [ ] Cancel khi đổi màn / feedback mới  
- [ ] Nút loa nghe lại trên Home, Map, Game, Win  
- [ ] Toggle phụ huynh + persist local  
- [ ] Fallback UI khi thiếu giọng Việt  
- [ ] Load & map id từ `tts-script.json`  
- [ ] Test APK Android + máy có/không gói TTS Việt  
