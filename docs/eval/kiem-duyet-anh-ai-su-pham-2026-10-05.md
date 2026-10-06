# Kiểm duyệt ảnh AI — sư phạm · 2026-10-05

**Ghế:** TD-VIS + TB-MATCH + TB-PEDA (Hội đồng Thẩm định Từng Bài)  
**Phạm vi:** ảnh AI đang dùng trong explore / friend · che chữ · đúng khái niệm tuổi 2–5

---

## 1. Findings đã sửa

| Mức | Bài / asset | Lỗi | Xử lý |
|-----|-------------|-----|--------|
| P0 | `cx-gian-nhe` | Ảnh **vịt giận** — không phải mặt cảm xúc | Tạo lại mặt vàng “hơi giận” |
| P0 | `cx-met` | Ảnh **chim/gà** ngáp | Tạo lại mặt vàng mệt |
| P0 | `cx-ngac-nhien` | Mặt **trẻ thật** lệch bộ emoji | Tạo lại mặt vàng ngạc nhiên |
| P1 | `cx-yeu-thuong` | Chó+thỏ ôm (lệch bộ mặt cảm xúc) | Tạo lại mặt vàng + tim |
| P0 | `dong-vat` / `do-vat` / `phuong-tien` | 1 JPG AI × 6 màu (recolor CSS) → **màu sai** (vd. mèo cam gắn nhãn vàng) | **228 SVG tint** (vòng màu + emoji / shape quả) |
| P1 | `chu-w` | Wifi trừu tượng — trẻ 2–5 khó nhận | Đổi **Watermelon** + ảnh dưa hấu |
| P1 | `chu-f` | Lồng quạt AI méo | Tạo lại quạt rõ |
| P1 | `chu-j` | Hộp nước ép rối | Tạo lại ly nước cam rõ |
| P1 | `mau-xanh-duong-viet-quat` | Việt quất quá cyan | Tạo lại xanh dương đậm |
| P1 | `mau-vang-hoa-mai` | Hoa 5 cánh generic | Tạo lại **hoa mai** cành vàng |
| P2 | `mau-xanh-duong-quan-jean` | 5 nút thắt lưng sai | Tạo lại quần jean 1 nút |

---

## 2. Giữ (đạt sau duyệt mắt)

- Màu vàng: xoài, vịt con, chuối — đúng vàng  
- Áo tím / áo hồng — đúng màu bài  
- Xe xanh dương — đúng xanh  
- Số `so-2` — số 2 + đúng 2 cá  
- Hình tam giác — rõ 3 cạnh  
- Trái cây explore — đã dùng tint SVG (không phụ thuộc AI màu)

---

## 3. Quy tắc sau phiên này

1. Explore **cùng chủ thể × màu** → **bắt buộc** `assets/explore/tint/{lessonId}-{colorId}.svg` (`npm run tint`).  
2. Cảm xúc → **mặt vàng emoji**, không động vật thay thế.  
3. Chữ Latin minh họa → vật **nhận diện ngay** (không icon trừu tượng).  
4. Trước khi nói Đạt: `npm run audit:lessons` exit 0.

---

## 4. Kết luận máy

`npm run audit:lessons` → **107/107 Đạt** · M1=0 (sau gắn tint + ảnh mới).

*Hard refresh trình duyệt / build APK lại để thấy asset mới.*
