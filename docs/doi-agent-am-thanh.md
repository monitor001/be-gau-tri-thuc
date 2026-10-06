# Đội agent giáo dục — Âm thanh & TTS

Bổ sung cho tổ hợp chính trong `AGENTS.md`. Mục tiêu: trẻ dưới 5 tuổi **nghe** hướng dẫn, không chỉ nhìn hình.

## Thành viên đội AUDIO

| Agent | Cursor / Task | Deliverable |
|-------|---------------|-------------|
| **AUDIO** | Kiến trúc TTS/SFX | `docs/audio-tts-spec.md`, `js/tts.js`, `js/sfx.js` |
| **VOICE** | Kịch bản nhịp tự nhiên | `docs/voice-nhip-cham.md`, `content/audio/tts-script.json` |
| **SFX** | Âm hiệu dịu | `js/sfx.js` (đúng / thử lại / sao) |
| **PEDA** | Duyệt tốc độ & độ dài câu | rate ~0.92–1.0 (AI đã chậm sẵn) |
| **UX** | Nút 🔊 nghe lại trên mọi màn | `index.html` |
| **SAFE** | Không ads âm thanh, tắt tiếng được | Góc phụ huynh |

## Chuẩn vận hành

1. `lang = vi-VN`, rate mặc định **0.95** (không ép 0.8 với giọng neural/AI), pitch **1.1**
2. Unlock audio sau gesture đầu (Android)
3. `cancel` trước câu mới — không chồng lời
4. Nút 🔊 nghe lại; phụ huynh bật/tắt + nghe thử
5. Native: `@capacitor-community/text-to-speech` · Fallback: Web Speech API

## Cách gọi trong Cursor

- “Với tư cách `AUDIO` + `VOICE`, viết thoại hướng dẫn màn đếm số…”
- “Với tư cách `PEDA`, duyệt rate các câu feedback…”
- “Với tư cách `SFX`, thêm âm khi sao về nhà…”
