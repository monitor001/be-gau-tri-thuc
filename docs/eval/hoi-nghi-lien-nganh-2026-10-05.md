# Hội nghị Liên ngành — Toàn kho ALL-MAPS

**Ngày:** 2026-10-05  
**Phạm vi:** 11 chủ đề / 110 màn + map phiêu lưu + giải cứu bạn  
**Nguồn:** `lessons.json` · `js/app.js` · `map-world.js` · `friends.js` · `tts.js` · CSS · audit script  
**APK:** `dist-apk/BeGau-TriThuc-v1.0-debug.apk`  
**Trưởng phiên:** Tổ hợp Chuyên gia (`docs/to-hop-chuyen-gia.md`)

Ghế tham dự (song song): **PEDA+CURR** · **GAME+UX** · **GFX+STORY** · **AUDIO+SAFE**  
Ghế Hội đồng KT bổ sung (đã hợp nhất): [EVAL-PEDA](f06b1664-6caa-4e60-a10f-6921505b5456) · [QA/GAME/SAFE](91e6b07c-13b8-4502-8466-367b6c5ab0ea) · [VIS/AUDIO](97ec6d0d-0acd-4817-a82d-f15c27243df4)

---

## 1. Bảng điểm tổng hợp (0–3)

| Ghế | Điểm | Nhận xét ngắn |
|-----|:----:|---------------|
| PEDA | 1 | Sai chữ P/phở; scaffolding 8/110 |
| CURR | 2 | Đủ 11 topic / 1 màn=1 bài; còn copy-paste |
| STORY | 2 | Cô Sương dịu; lệch “đấu trí” / Bạn nhật |
| GAME | 2 | Soft-fail tốt; sao 0★ vẫn thắng gây bối rối |
| UX | 2 | Target đạt; map phải sót; reward 4 CTA |
| GFX | 2 | Mist OK; vài exploreItems màu mơ hồ |
| AUDIO | 2 | vi-VN OK; rate ~0.95 (chuẩn mới — không ép 0.8) |
| SAFE | 2 | Không ads/PII; gate yếu + CDN font |

**Trung bình tổ hợp ≈ 1.9 / 3** — chưa sẵn sàng bàn giao ship.

---

## 2. Findings thống nhất

### P0 / Mức 1

| Mã | Ghế | Mô tả |
|----|-----|-------|
| **LN-001** | PEDA/CURR | `chu-p`: dạy *phở bắt đầu bằng chữ P* — sai (Ph ≠ P) |

### P1 / Mức 2

| Mã | Ghế | Mô tả |
|----|-----|-------|
| **LN-002** | PEDA | 102/110 bài không `exploreItems` — explore trống scaffolding |
| **LN-003** | CURR | `phuong-tien`: teach “Xe chạy vui!” copy-paste |
| **LN-004** | PEDA | Hang Chữ 29 màn đồng dạng — overload trẻ ~3 tuổi |
| **LN-005** | STORY/GFX | `hinh-rect` friend = 「Bạn nhật」 |
| **LN-006** | GAME/UX | Map 11 đảo không gợi ý vuốt → sót nửa phải |
| **LN-007** | GAME | Thắng + rescue với **0★** vẫn được xu |
| **LN-008** | UX | Reward 4 CTA cạnh tranh |
| **LN-009** | CURR/PEDA | `nm-*` / `hs-*` prompt 「Bé chọn đúng nào?」 |
| **LN-010** | AUDIO | ~~rate 0.95 vs 0.8~~ → **Đóng (chấp nhận)**: giọng AI đã chậm, chuẩn mới ~0.95 |
| **LN-011** | SAFE | Parent gate phép nhỏ; Google Fonts CDN |
| **LN-012** | AUDIO/VIS | `#btn-explore-hear` luôn `hidden` — thiếu 🔊 explore rõ |
| **LN-013** | GAME | Chấm gate theo chuỗi label (không dùng `orig` sau shuffle) — rủi ro nếu nhãn trùng |

### P2 / Mức 3–4

- `hinh-oval` dùng từ Anh 「Oval」
- Explore màu: 🍉 / 🌤️ / 🥭 trùng / 🦄…
- Class `.captive-cage`; wording 「bị giữ」 / 「Đừng sợ」 / 「đánh nhau」
- Island Vườn Quả 🧺 yếu khi che chữ
- Nút icon 64px biên toddler; explore item 88px

---

## 3. Đề xuất nâng cấp (ưu tiên Tổ hợp)

| # | Việc | Ghế chủ trì |
|---|------|-------------|
| 1 | Sửa `chu-p` (pin/pa tô; bỏ phở) | PEDA + CURR |
| 2 | Teach riêng từng phương tiện | CURR + VOICE |
| 3 | Prompt rõ `nm-*` / `hs-*` + emoji khi che chữ | PEDA + GAME |
| 4 | `exploreItems` cho hinh → so → chu (3–5 món/bài) | CURR + GFX |
| 5 | Gợi ý vuốt map + thu vị trí đảo phải | UX + GFX |
| 6 | Sao mềm (≥1★ khi clear) + reward 1 CTA chính | GAME + UX |
| 7 | Self-host font; cứng parent gate (TTS giữ ~0.95) | AUDIO + SAFE |
| 8 | Soft copy Cô Sương; sửa Bạn Chữ nhật; Oval→bầu dục | STORY + PEDA |
| 9 | Hang Chữ chia pack 5–7 chữ / nâng ageMin | CURR + PEDA |

---

## 4. Quyết định Tổ hợp

### **CHẶN — chưa sẵn sàng Hội đồng KT ký ship**

Lý do: còn **P0 kiến thức** + cụm P1 scaffolding/map/TTS/an toàn.

Bàn giao Hội đồng Kiểm thử khi:

- [ ] Đóng LN-001 (P0)  
- [ ] Đóng tối thiểu LN-003, LN-005, LN-009 (P1 nội dung rõ)  
- [ ] Smoke Vòng 1–2 trên thiết bị  
- [ ] Lịch Vòng 4 trẻ thật  

---

## 5. Cách gọi lại tổ hợp

> “Mở Tổ hợp Chuyên gia theo `docs/to-hop-chuyen-gia.md` — hội nghị chủ đề [X].”

Rule Cursor: `.cursor/rules/be-gau-to-hop-chuyen-gia.mdc`  
Hội đồng KT song song: `docs/eval/hoi-dong-chuyen-gia-kt.md`

---

*Báo cáo tổng hợp từ 4 cặp ghế song song + `scripts/audit-council-data.js`.*
