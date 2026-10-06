# Kiểm duyệt hình AI — Rừng Màu (canonical v7)

**Ngày:** 2026-10-05  
**Ghế:** TD-PEDA · TD-VIS · ND-LEAD  
**Pipeline:** AI gen JPG → `assets/explore/mau/` → `color-explore-canonical.json` v7

---

## 1. Trả lời kiến thức: Quả chuối có đúng không?

| Đối tượng | Kết luận |
|-----------|----------|
| **Khái niệm** chuối = đồ vật màu vàng | **Đúng** (chuẩn mầm đa số VN) |
| **Bạn Vàng** dùng chuối | **Đúng** — biểu tượng vàng quen thuộc |
| SVG cũ (oval giống xoài) | **Không đạt** nhận diện |
| Ảnh AI mới `mau-vang-qua-chuoi.jpg` | **Đạt** — chuối cong rõ, màu vàng |

---

## 2. Vì sao ảnh trước lỗi?

1. Emoji hệ thống lệch màu (xoài cam, hoa mai trắng, áo hồng…).  
2. SVG tự sinh fallback = **vòng màu + chữ** (ảnh xanh lá user chụp).  
3. Không qua **TD-VIS che chữ** trước khi ship.

---

## 3. Đã làm (v7)

- Gen **48/48** ảnh AI cho 8 bài màu.  
- Gắn `img: assets/explore/mau/*.jpg`.  
- Captive “Bạn …” dùng **ảnh explore đầu** (không emoji lệch).  
- Audit: thiếu file / thiếu img bài màu = **Mức 1**.

---

## 4. Checklist TD-VIS (che chữ)

| Bài | PEDA | VIS | Ghi chú |
|-----|:----:|:---:|---------|
| mau-do | 3 | 3 | Táo/dâu/xe cứu hỏa rõ |
| mau-vang | 3 | 3 | Chuối cong · xoài · hoa mai vàng · vịt vàng |
| mau-xanh-duong | 3 | 3 | Xe **xanh dương** · việt quất có hạt |
| mau-xanh-la | 3 | 2–3 | Ếch/lá/dưa rõ; cây có thân nâu (chấp nhận) |
| mau-cam | 3 | 3 | Cam/cà rốt/cáo |
| mau-tim | 3 | 3 | Áo **tím** (không hồng) |
| mau-hong | 3 | 3 | Heo/hoa/áo hồng |
| mau-nau | 3 | 3 | Gấu/sô-cô-la |

**Kết luận Rừng Màu:** **Đạt có điều kiện** — hard refresh / APK mới bắt buộc.

---

## 5. Chủ đề ngoài màu

Hang Chữ / động vật / quả… vẫn emoji hoặc SVG chữ — **chưa** pack AI đầy đủ. Ưu tiên tiếp: Hang Chữ (SVG chữ đã có) → động vật AI.

---

## 6. Lệnh tái áp dụng

```bash
node scripts/apply-ai-color-images.js
node scripts/audit-content-council.js
npm run build:web
npx cap sync android
```
