# Danh sách màn khám phá — 1 màn = 1 bài học

> **Bản đầy đủ (từng bài: story, gate, explore, audio slots):**  
> [`docs/chuong-trinh-chi-tiet.md`](./chuong-trinh-chi-tiet.md) — sinh bằng `node scripts/export-curriculum-md.js`

## Luồng mỗi màn

```
Chọn chủ đề → Chọn màn → Khám phá cùng trợ lý (nhìn + nghe + chạm)
    → Qua cửa (1 câu hỏi nhận diện) → +Xu Gấu → (tuỳ chọn) Cửa hàng thưởng
```

**Không** gộp 3 bài trong 1 vùng. Mỗi khái niệm = 1 màn riêng.

## Trợ lý đồng hành

| Chủ đề | Trợ lý chính |
|--------|----------------|
| Số, Hình | Sóc Bản Đồ / bé Gấu |
| Màu, Cảm xúc | Đom Đóm Lấp |
| Chữ, Đồ vật, Trái cây… | bé Gấu |

---

## Chủ đề & số màn

| # | Chủ đề | ID | Số màn | Ghi chú |
|---|--------|-----|--------|---------|
| 1 | Rừng Màu | `mau` | **8** | Đỏ…nâu |
| 2 | Đồi Hình | `hinh` | **7** | Tròn, vuông, tam giác… |
| 3 | Suối Số | `so` | **10** | Mỗi số 1–10 = 1 màn |
| 4 | Hang Chữ Latin | `chu` | **26** | Chỉ chữ Latin A–Z (không Ă Â Đ Ê Ô Ơ Ư) |
| 5 | Vườn Bạn | `dong-vat` | **12** | Mỗi con = 1 màn |
| 6 | Vườn Quả | `trai-cay` | **8** | |
| 7 | Nhà Đồ | `do-vat` | **12** | Đồ quen thuộc |
| 8 | Trái Tim | `cam-xuc` | **6** | |
| 9 | Bến Xe | `phuong-tien` | **6** | |
| 10 | Sân Nhảy | `nhay-mua` | **6** | |
| 11 | Họa Sĩ | `hoa-si` | **6** | |
| | **Tổng** | | **107 màn** | Khớp `lessons.json` (Hang Chữ Latin 26) |

---

## Chi tiết từng màn

### 1. Số (`so`) — 10 màn

| Màn | ID | Bài học |
|-----|-----|---------|
| 1 | `so-1` | Số 1 — Một |
| 2 | `so-2` | Số 2 — Hai |
| 3 | `so-3` | Số 3 — Ba |
| 4 | `so-4` | Số 4 — Bốn |
| 5 | `so-5` | Số 5 — Năm |
| 6 | `so-6` | Số 6 — Sáu |
| 7 | `so-7` | Số 7 — Bảy |
| 8 | `so-8` | Số 8 — Tám |
| 9 | `so-9` | Số 9 — Chín |
| 10 | `so-10` | Số 10 — Mười |

### 2. Chữ Latin (`chu`) — 26 màn

A B C D E F G H I J K L M N O P Q R S T U V W X Y Z  
(Chỉ chữ Latin — không Ă Â Đ Ê Ô Ơ Ư. Mỗi chữ = 1 màn `chu-a` … `chu-z`)

### 3. Màu (`mau`) — 8 màn

Đỏ, Vàng, Xanh dương, Xanh lá, Cam, Tím, Hồng, Nâu

### 4. Hình (`hinh`) — 7 màn

Tròn, Vuông, Tam giác, Chữ nhật, Sao, Tim, Oval

### 5. Động vật (`dong-vat`) — 12 màn

Mèo, Chó, Gà, Bò, Heo, Vịt, Thỏ, Cá, Chim, Hổ, Voi, Khỉ

### 6. Đồ vật (`do-vat`) — 12 màn

Bóng, Sách, Cốc, Thìa, Mũ, Giày, Xe hơi, Xe đạp, Túi, Ghế, Giường, Bàn chải

### 7. Trái cây (`trai-cay`) — 8 màn

Táo, Chuối, Cam, Xoài, Dưa hấu, Nho, Dâu, Dừa

### 8. Cảm xúc (`cam-xuc`) — 6 màn

Vui, Buồn, Ngạc nhiên, Yêu thương, Giận (nhẹ), Mệt

### 9. Phương tiện (`phuong-tien`) — 6 màn

Xe buýt, Máy bay, Tàu lửa, Thuyền, Xe máy, Trực thăng

---

## Xu Gấu & Cửa hàng

| Hành động | Xu |
|-----------|-----|
| Qua cửa lần đầu | +5 Xu Gấu |
| Ôn lại màn đã qua | +1 Xu Gấu |
| Sticker / mũ / bóng trong shop | 10–30 Xu |

Mở khóa màn: trong mỗi chủ đề, màn sau mở khi qua cửa màn trước (tuần tự dịu dàng).
