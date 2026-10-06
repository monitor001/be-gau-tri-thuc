# Trạng thái triển khai — Bé Gấu Giải Cứu Tri Thức

**Cập nhật:** 2026-10-06  
**Kho bài:** 107 màn · 11 chủ đề  
**APK debug:** `dist-apk/BeGau-TriThuc-v1.0-debug.apk`  
**AAB release (Play):** `dist-aab/BeGau-TriThuc-v1.0.0-1-release.aab` · `npm run release:aab`

---

## 1. Đã triển khai

### 1.1. Nội dung & hội đồng ảnh (HDGD-VIS)

| Hạng mục | Trạng thái | Ghi chú / file |
|----------|------------|----------------|
| Quy chế HDGD — ảnh là chính | ✅ | `.cursor/rules/be-gau-hoi-dong-giao-duc.mdc` · `docs/eval/hoi-dong-chuyen-gia-giao-duc.md` |
| Báo cáo VIS từng chủ đề | ✅ | `docs/eval/bao-cao-hdgd-danh-gia-anh-2026-10-05.md` |
| P0 hình tròn / vuông = nhân vật | ✅ đã khóa | Explore → SVG hình học |
| Khóa toàn Đồi Hình (7 hình × 6 màu) | ✅ | `scripts/generate-hinh-geometry-svgs.js` · `bind-hinh-geometry-svg.js` |
| Audit từng bài M1=0 | ✅ | `npm run audit:lessons` → **Đạt máy · VIS Đạt có điều kiện** (cấm kết luận Đạt chỉ vì exit 0) |
| Mẫu VIS do-vat / phương tiện | ✅ Đạt (mắt) | Ghế, giường, bàn chải, trực thăng, tàu |

### 1.2. Lời thoại & TTS

| Hạng mục | Trạng thái | Ghi chú |
|----------|------------|---------|
| Intro nhờ giúp + **biến thể** (5 câu) | ✅ | `js/friends.js` · `scripts/rewrite-story-help-voice.js` · stamp `friend-plea-v2-variants` |
| Gate / win giọng trẻ | ✅ | Không còn «Cô Sương đố vui» trong data; audit `VOICE-COSUONG` |
| Phát hiện thiếu giọng vi-VN | ✅ | `TTS.checkVoiceHealth` · banner home + tab NL |
| Chạm Đom Đóm → đọc lại câu hỏi | ✅ | `focusLine` + `audioKey` |
| Feedback đúng/sai có slot ghi âm | ✅ | `lesson:…:correct` / `retry` (ưu tiên ghi trước) |

### 1.3. UI đổi thưởng

| Hạng mục | Trạng thái | Ghi chú |
|----------|------------|---------|
| Màn **Đổi thưởng** | ✅ | Ví xu · bộ sưu tập · lưới quà |
| Chống bấm đôi trừ xu 2 lần | ✅ | Khóa `shopBuying` ngắn |

### 1.4. Cài đặt người lớn + ghi âm

| Hạng mục | Trạng thái | Ghi chú |
|----------|------------|---------|
| Parent gate **bắt buộc** (số bằng chữ 13–19) | ✅ | `#parent-gate` |
| Ghi âm + hash lời · badge **Cần ghi lại** | ✅ | `voice-pack.js` · `parent-audio.js` |
| Từ chối micro → **Mở Cài đặt máy** | ✅ | `MicPermissionPlugin.openSettings` |
| App xuống nền khi đang ghi → hủy phiên | ✅ | `visibilitychange` + sự kiện `begau-voice-abort` |
| Hiển thị dung lượng đã ghi | ✅ | Tab Ghi âm |
| Giới hạn thời gian chơi (PH đặt) | ✅ | 15 / 30 / 45 phút · dialog nhắc nghỉ |
| `navigator.storage.persist()` | ✅ | Gọi khi khởi động app |

### 1.5. Hạ tầng build

| Hạng mục | Trạng thái |
|----------|------------|
| `npm run build:web` → `www/` | ✅ |
| `npm run apk` → debug APK | ✅ |
| Capacitor TTS / Splash / StatusBar | ✅ |

---

## 2. Checklist QA thiết bị (chặn đưa người khác test)

**Không còn “việc còn lại” chung chung.** Dùng phiếu Đạt/Không đạt:

→ **`docs/eval/qa-thiet-bi-checklist.md`**

Tối thiểu mỗi phiên: **1 tablet yếu + 1 máy Android mới**, ghi Android version, người test, ngày, có/không giọng vi-VN.

| Hạng mục mẫu | Kết quả mong đợi (rút) |
|--------------|-------------------------|
| Đom Đóm ở gate | Chỉ câu hỏi · ≤ 8s |
| Thiếu vi-VN | Không im lặng · có hướng dẫn PH |
| Đổi ngay ×3 nhanh | Chỉ trừ xu 1 lần / món |
| Từ chối micro | Có nút mở Cài đặt |
| Hash lệch | Badge «Cần ghi lại» |

**Trạng thái phiên QA:** 🔲 Chưa có biên bản Đạt trên 2 máy.

---

## 3. Còn dang dở — owner & hạn chót

### 3.1. P1 nội dung & ảnh (VIS)

| # | Việc | Ưu tiên | Owner | Hạn gợi ý |
|---|------|---------|-------|-----------|
| 1 | QA UI đếm số `so-2`…`so-10` trên tablet | P1 | EVAL-VIS + QA | Trước mở tester |
| 2 | Mở mắt chữ F / J / Q / W / Z | P1 | HDGD-VIS | +1 tuần |
| 3 | CURR: `hs-go-trong` trong Họa sĩ | P1 | CURR | +1 tuần |
| 4 | Động vật màu “phi tự nhiên” nếu ship rộng | P2 | HDGD-VIS | Khi mở rộng |

### 3.2. Sản phẩm / Play Store

| # | Việc | Owner | Hạn gợi ý | Ghi chú |
|---|------|-------|-----------|---------|
| 1 | **Families Policy + privacy URL + Data safety** | SAFE + Dev | Trước nộp store | `docs/phat-hanh-play-families.md` |
| 2 | Keystore + AAB release + targetSdk + minify | Dev | Trước nộp store | Không chỉ APK debug |
| 3 | Biên bản Hội đồng KT E2E (sau TTS/UI/micro) | QA | Sau QA mục 2 Đạt | `docs/quy-che-hoi-dong-kiem-thu.md` |
| 4 | Ghi âm phủ rộng (map/shop) nếu cần | AUDIO | Tuỳ | Ưu tiên feedback trước — đã có slot |
| 5 | iOS / quyền micro iOS | Dev | Sau Android store | Chưa có target |
| 6 | Smoke E2E Playwright trên `www/` | QA/Dev | Song song KT | Xem mục 3.4 |
| 7 | PEDA xác nhận giọng «cứu với» không gây sợ 2–3 tuổi | PEDA+VOICE | Trước ship rộng | Đã có biến thể mềm hơn |

### 3.3. Nợ quy trình hội đồng

| # | Việc | Owner |
|---|------|-------|
| 1 | Toàn kho ảnh **Đạt máy · VIS Đạt có điều kiện** đến khi xong P1 mắt trên máy | HDGD-VIS |
| 2 | Cấm kết luận Đạt chỉ vì `audit:lessons` exit 0 | Mọi người |
| 3 | Cập nhật `docs/eval/bao-cao-hdgd-tung-chu-de-*.md` nếu đổi lớn | HDGD |

### 3.4. Smoke test tự động (đề xuất)

`audit:lessons` chỉ kiểm data. Thêm Playwright (chưa bắt buộc ship): mở `www/`, vào 1 bài, qua cửa giả lập, đổi 1 quà — hỗ trợ biên bản Hội đồng KT.

---

## 4. File / lệnh quan trọng

```text
npm run audit:lessons
npm run build:web
npm run apk
node scripts/rewrite-story-help-voice.js
```

| Nhóm | Đường dẫn |
|------|-----------|
| QA thiết bị | `docs/eval/qa-thiet-bi-checklist.md` |
| Play / Families | `docs/phat-hanh-play-families.md` |
| Catalog chương trình | `docs/chuong-trinh-chi-tiet.md` |
| TTS / ghi âm | `js/tts.js` · `js/voice-pack.js` · `js/parent-audio.js` |

---

## 5. Kết luận ngắn

| Nhóm | Mức |
|------|-----|
| **Đã triển khai** | 107 bài · SVG hình · lời nhờ giúp biến thể · shop khóa đôi · NL + hash ghi âm + Settings micro · thiếu vi-VN UX · giới hạn chơi · persist storage |
| **Chặn tester ngoài** | Checklist QA 2 máy chưa Đạt |
| **Chặn Play Store** | Families / privacy / AAB / keystore — xem `phat-hanh-play-families.md` |
| **VIS** | Đạt máy · **Đạt có điều kiện** mắt |

*Cập nhật mỗi khi đóng mốc (QA Đạt / release / đổi mô hình ghi âm).*
