# Báo cáo Thẩm định — 11 chủ đề / 110 bài

**Ban:** Chuyên gia Giáo dục Thẩm định (`docs/eval/chuyen-gia-giao-duc-tham-dinh.md`)  
**Ngày:** 2026-10-05  
**Nguồn:** `content/curriculum/lessons.json` · canonical màu **v3**  
**Công cụ:** `audit-content-council.js` · `tham-dinh-toan-kho.js` · `tham-dinh-findings.json`

---

## 1. Tóm tắt điều hành

| Hạng mục | Kết quả |
|----------|---------|
| Số bài / chủ đề | **110 / 11** — khớp `lessonCount` |
| Gate + friend + story | **110/110** |
| exploreItems | **110/110** |
| File minh họa `img` | **1/110** (`vit-con-vang.svg`) — tồn tại trên disk |
| Nền map 11 vùng | **Đủ** `assets/map/ban-do-*.jpg` |
| **P0 / Mức 1 (data)** | **0** |
| **Kết luận data** | **Đạt có điều kiện** — nâng VIS (emoji/SVG) cho Hang Chữ + hoa mai |

**Điều kiện phát hành:** build web/APK mới (sync asset) + KT xác nhận trên máy; roadmap SVG cho bài chữ yếu che chữ.

---

## 2. Bảng điểm theo chủ đề (0–3)

Tiêu chí: **TD-PEDA** · **TD-VIS** (che chữ) · **TD-CURR**

| Chủ đề | Bài | PEDA | VIS | CURR | TB | Ghi chú nhanh |
|--------|-----|:----:|:---:|:----:|:---:|---------------|
| Rừng Màu Sắc | 8 | 3 | 2 | 3 | **2.7** | Khóa canonical; hoa mai/xoài emoji |
| Đồi Hình Khối | 7 | 3 | 2 | 3 | **2.7** | Emoji hình ổn; 3 explore/bài |
| Suối Đếm Số | 10 | 3 | 2 | 3 | **2.7** | Số + cá + sao |
| **Hang Chữ Sáng** | 29 | 2 | 2 | 2 | **2.0** | Nhiều emoji gợi ý yếu khi che chữ |
| Vườn Bạn Bè | 12 | 3 | 2 | 3 | **2.7** | Tiếng kêu + gate tên con |
| Vườn Trái Cây | 8 | 3 | 2 | 3 | **2.7** | Quả quen VN |
| Nhà Đồ Vật | 12 | 3 | 2 | 3 | **2.7** | Đồ gia đình |
| Góc Cảm Xúc | 6 | 3 | 2 | 3 | **2.7** | Mặt cảm xúc rõ |
| Bến Phương Tiện | 6 | 3 | 2 | 3 | **2.7** | teach riêng từng xe |
| Sân Nhảy Múa | 6 | 3 | 2 | 3 | **2.7** | Vận động lớn |
| Góc Họa Sĩ | 6 | 3 | 2 | 3 | **2.7** | Tô màu / thao tác |

**Trung bình toàn kho ≈ 2,6 / 3** — VIS **2** cho hầu hết chủ đề vì **chỉ dùng emoji hệ thống** (3–6 món/bài), chưa pack SVG như Rừng Màu.

---

## 3. Findings

### P0 / Mức 1 — chặn ship (data)

*Không còn trên `lessons.json` sau phiên trước (P/phở, Oval, khóa explore màu, thiếu gate…).*

### P1 / Mức 2 — nên sửa trước scale

| Mã | Chủ đề | Mô tả | Hướng xử lý |
|----|--------|-------|-------------|
| **TD-001** | `chu` (29 bài) | Explore chỉ **2 món** (chữ + 👂 nghe) — scaffolding mỏng hơn màu | Thêm 1 món **hình gợi ý** (SVG chữ to / vật quen: A=quả, B=bóng…) |
| **TD-002** | `chu` | **10/29** bài emoji gợi ý yếu che chữ (vd. Ă🍚, Â☕, Đ💡, E👶, Ê🛏️, I📄, Ô🚗, Ơ😮, Q🪭, Ư🪞) | SVG **chữ cái lớn** + TTS; emoji làm phụ |
| **TD-003** | `mau` | **Hoa mai** 🌼 = cúc trắng | SVG `hoa-mai-vang.svg` (giống vịt vàng) |
| **TD-004** | Toàn app | Chủ đề ngoài màu **chưa có** audit file `img` tự động ngoài vịt | Mở rộng pack `assets/explore/` theo chủ đề |

### P2 / Mức 3–4

| Mã | Bài | Ghi chú |
|----|-----|---------|
| TD-P2-01 | `mau-vang` | Xoài 🥭 — đúng quả, ít “vàng thuần” |
| TD-P2-02 | `dv-vit` | 🦆 chấp nhận bài động vật; có thể dùng `vit-con-vang.svg` |
| TD-P2-03 | `chu` | 29 bài — chưa chia **pack 2–3 tuổi / 4–5 tuổi** (CURR) |
| TD-P2-04 | UI | Map / bubble NPC / stage-dots — **Hội đồng KT**, không phải JSON bài |

---

## 4. Thẩm định chi tiết từng vùng

### Rừng Màu Sắc (`mau`) — 8 bài

- **PEDA:** Mỗi bài một màu; gate bóng màu `hideLabels` — che chữ vẫn chọn được.
- **VIS:** Explore **6 món**, canonical v3; vịt = **SVG vàng** (không 🦆).
- **CURR:** 1 màn = 1 màu — đạt.
- **Còn:** hoa mai, xoài (xem P1).

### Đồi Hình Khối (`hinh`) — 7 bài

- Hình tròn/vuông/tam giác/chữ nhật/bầu dục/ngôi sao/trái tim — tên **Việt hóa**.
- Explore 3 món (hình + gợi ý) — đủ cho 2–4 tuổi.
- Gate: nhận diện hình — ổn trên data.

### Suối Đếm Số (`so`) — 10 bài

- Mỗi bài một số 1–10; explore: số + cá + sao.
- Emoji số `3️⃣` phụ thuộc font — theo dõi trên máy thật (P2).

### Hang Chữ Sáng (`chu`) — 29 bài

- **Điểm thấp nhất toàn kho (2,0)** — không phải sai kiến thức, mà **nhận diện hình yếu**.
- Mỗi bài: emoji chủ đề + 2 explore (nhãn chữ + nghe).
- **10 bài** emoji yếu (script `CHU_WEAK_EMOJI`): ab, ac, dd, e, ec, i, om, ox, q, uw.
- **19 bài** emoji ổn hơn (B🐮, C🐟, P🔋, T🍎, …) — vẫn nên có SVG chữ khi scale.
- **Đề xuất TD-PEDA:** pack **5–10 chữ** cho 3 tuổi; mở dần 29 chữ cho 4–5 tuổi (cấu hình map, không khóa bài).

### Vườn Bạn Bè · Trái Cây · Nhà Đồ (`dong-vat`, `trai-cay`, `do-vat`)

- 3 explore/bài — emoji **khớp tên** (mèo, táo, bóng…).
- Gate dạng “Đâu là con X?” — rõ với TTS.
- **VIS=2:** chưa có SVG tùy chỉnh; emoji đa số ổn cho toddler.

### Góc Cảm Xúc · Bến Xe · Sân Nhảy · Họa Sĩ

- Khái niệm một màn một ý — đạt CURR.
- Cảm xúc: emoji mặt trùng tên bài.
- Phương tiện: đã tách teachText (không còn copy “Xe chạy vui” hàng loạt).
- Họa sĩ: hoạt động tô/màu — phù hợp vùn chơi, không nhầm lẫn kiến thức.

---

## 5. Hình ảnh & asset (TD-VIS)

| Loại | Số lượng | Trạng thái |
|------|----------|------------|
| Nền map chủ đề | 11 JPG | ✅ |
| Tile world map | 11 JPG | ✅ |
| NPC | 3 SVG + JPG | ✅ |
| Explore SVG | 1 (`vit-con-vang.svg`) | ✅ web/www/Android sau sync |
| Explore emoji | ~400+ món | ⚠️ phụ thuộc font/thiết bị |

**Lưu ý build:** APK cũ thiếu SVG → icon vỡ (đã xử lý bằng `cap sync` + fallback emoji trong `app.js`).

---

## 6. Quyết định thẩm định

| Hạng mục | Trạng thái |
|----------|------------|
| **Nội dung & kiến thức (JSON)** | **ĐẠT** |
| **Minh họa toàn kho** | **ĐẠT CÓ ĐIỀU KIỆN** — ưu tiên Hang Chữ + hoa mai |
| **App / UI / build** | Chuyển **Hội đồng Kiểm thử** |

### Việc tiếp theo (đề xuất ưu tiên)

1. **Pack SVG Hang Chữ** — 10 chữ hay dùng trước (A, B, C, D, E, O, P, …).  
2. **`hoa-mai-vang.svg`** + canonical màu v4.  
3. **`enrich-explore-thin.js`** mở rộng cho `dong-vat` / `trai-cay` (4 món thay vì 3) nếu muốn VIS=3.  
4. Chạy lại `node scripts/tham-dinh-toan-kho.js` sau mỗi đợt asset.

---

## 7. Cách gọi lại phiên

> “Mở **Chuyên gia Giáo dục Thẩm định** — chủ đề `chu` / toàn kho.”

Rule Cursor: `.cursor/rules/be-gau-tham-dinh-giao-duc.mdc`

---

*Ký phiên: TD-LEAD · TD-PEDA · TD-VIS · TD-CURR · TD-VOICE (thẩm định trên data, chưa thay thế KT E2E)*
