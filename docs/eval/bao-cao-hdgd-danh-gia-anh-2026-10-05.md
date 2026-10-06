# Báo cáo HDGD-VIS — Đánh giá ẢNH từng chủ đề

**Ngày:** 2026-10-05 (phiên 2 — tiếp tục mở ảnh P1)  
**Ghế chính:** HDGD-VIS (chương trình chủ yếu là ảnh · che chữ)  
**Phối hợp:** HDGD-PEDA · HDGD-CURR · HDGD-SAFE  
**Phương pháp:** Mở file ảnh thật (không tin đường dẫn) · che chữ · khớp nhãn/màu/hình/số lượng  
**Máy:** `audit:lessons` 107/107 M1=0 — **không đủ** để Đạt VIS

---

## Nguyên tắc đánh giá ảnh (bắt buộc)

| Pass | Fail (P0) |
|------|-----------|
| Che chữ vẫn biết khái niệm | Ảnh là vật/nhân vật khác khái niệm |
| Màu đọc được đúng nhãn | Nhãn “vàng” mà quả/đồ đỏ |
| Số lượng đếm được = N | “3” kèm ≠3 vật đếm chính |
| Hình học = hình thuần | “Hình tròn/vuông” = gấu / mèo / mặt |

---

## Bảng điểm VIS-ảnh theo chủ đề

| Chủ đề | Mẫu đã mở (phiên 2) | VIS | Kết luận ảnh |
|--------|---------------------|-----|--------------|
| `mau` | (phiên 1) táo đỏ, mai vàng | 3 | **Đạt** |
| `hinh` | oval×6 · rect×6 · star×6 · heart×6 · square×6 · triangle×6 · circle SVG | **3** | **Đạt** (khóa SVG toàn bộ hình học) |
| `so` | so-3 | 2 | **Đạt ĐK** (count UI trên tablet) |
| `chu` | chu-a | 2 | **Đạt ĐK** |
| `dong-vat` | mèo / hổ | 2 | **Đạt ĐK** |
| `trai-cay` | chuối / táo | 3 | **Đạt** |
| `do-vat` | ghế đỏ/vàng · giường đỏ · bàn chải xanh/vàng | 3 | **Đạt** |
| `cam-xuc` | buồn | 3 | **Đạt** |
| `phuong-tien` | trực thăng vàng/đỏ · tàu vàng/đỏ · xe buýt | 3 | **Đạt** |
| `nhay-mua` | giơ tay · xoay tròn · vỗ tay | 2 | **Đạt ĐK** |
| `hoa-si` | vẽ tròn · bảng màu · tô đỏ · trống · sao · **cọ SVG mới** | 2 | **Đạt ĐK** |

---

## Chi tiết phiên 2 (ảnh)

### Đồi Hình (`hinh`) — P0 mới → đã khóa

| File JPG | VIS mắt | Xử lý |
|----------|---------|-------|
| `hinh-square-vang.jpg` | **P0** mặt **mèo** trong vuông | → SVG vuông thuần |
| `hinh-square-xanh-la.jpg` | **P0** mặt **gấu** | → SVG vuông thuần |
| `hinh-square-do/cam/tim/xanh-duong.jpg` | Vuông thuần OK | Vẫn khóa SVG đồng bộ |
| `hinh-oval-*.jpg` (6) | Bầu dục/trứng đúng màu | Khóa SVG |
| `hinh-rect-*.jpg` (6) | Chữ nhật ngang; vàng JPG hơi gần vuông | Khóa SVG chữ nhật rõ (80×32) |
| `hinh-star-*.jpg` · `hinh-heart-*.jpg` · `hinh-triangle-*.jpg` | Hình thuần đúng | Khóa SVG |

**Khóa quy trình:** `node scripts/generate-hinh-geometry-svgs.js` + `node scripts/bind-hinh-geometry-svg.js`  
→ mọi explore/friend/map Đồi Hình dùng `hinh-{shape}-{color}.svg`, `source: geometry-svg-vis`.

### Đồ vật (`do-vat`) — VIS 3
- `dvat-ghe-do.jpg` / `dvat-ghe-vang.jpg`: ghế gỗ rõ, đúng màu.  
- `dvat-giuong-do.jpg`: giường đỏ nhận được (trang trí sao/mây nhẹ — P2).  
- `dvat-ban-chai-*.jpg`: bàn chải rõ dù có mặt kawaii.

### Phương tiện (`phuong-tien`) — VIS 3
- `pt-truc-thang-vang/do.jpg`: trực thăng (rotor + skid) nhận được.  
- `pt-tau-lua-vang/do.jpg`: đầu máy tàu hơi nước rõ.  
- Kawaii mặt OK với 2–5 nếu silhouette đúng.

### Nhảy (`nhay-mua`) — VIS 2 · Đạt ĐK
- `nm-gio-tay-cao.jpg`: hai trẻ giơ tay — cử chỉ đúng.  
- `nm-xoay-tron.jpg`: bé gái + vòng xoay — hiểu “xoay”.  
- **P1:** Một số ảnh trang trí nhiều — vẫn đạt che chữ.

### Họa sĩ (`hoa-si`) — VIS 2 · Đạt ĐK
- `hs-ve-vong-tron.jpg`: bút chì + vòng đang vẽ — đạt.  
- `hs-nghe-sao.jpg`: bảng màu — đạt bài Bảng màu.  
- `hs-to-do.jpg`: cọ + vệt đỏ — đạt tô đỏ.  
- `hs-go-trong.jpg`: trống rõ — **P1 CURR:** trống thuộc âm nhạc, nằm trong topic họa sĩ (không sai ảnh).  
- **P0/P1 đã sửa:** ô explore “Cọ vẽ” trùng palette → `assets/explore/ai/hs-co-ve.svg` (cọ riêng).

---

## Danh sách P0 / P1 ảnh

### P0 đã xử lý
1. `hinh-circle-*` JPG gấu Teddy → SVG tròn (phiên 1)  
2. `hinh-square-vang.jpg` mèo · `hinh-square-xanh-la.jpg` gấu → **toàn bộ hình học SVG** (phiên 2)  
3. Explore “Cọ vẽ” trùng bảng màu → `hs-co-ve.svg`

### P1 còn lại (không chặn ảnh chủ đề hình/đồ/xe)
1. UI count `so-2`…`so-10` trên tablet (không chỉ hero JPG)  
2. Chữ F/J/Q/W/Z — mở ảnh từng chữ khi QA tuổi 2–3  
3. CURR: xem lại `hs-go-trong` có nên thuộc họa sĩ hay tách nhạc  

---

## Quyết định HDGD-VIS

1. **Đồi Hình = Đạt** sau khóa SVG 7 hình × 6 màu.  
2. **do-vat / phuong-tien** nâng **Đạt** (mẫu P1 đã mở mắt).  
3. Toàn kho ảnh vẫn **Đạt có điều kiện** vì còn count UI + mẫu chữ khó.  
4. Cấm suy mẫu JPG AI cho hình học — chỉ SVG `geometry-svg-vis`.

**Ký:** HDGD-VIS · HDGD-LEAD · HDGD-PEDA · HDGD-CURR  

*Script:* `scripts/generate-hinh-geometry-svgs.js` · `scripts/bind-hinh-geometry-svg.js`  
*Liên quan:* `docs/eval/bao-cao-hdgd-tung-chu-de-2026-10-05.md`
