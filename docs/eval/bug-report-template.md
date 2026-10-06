# Mẫu báo cáo lỗi (Điều 20)

Sao chép một khối dưới đây cho mỗi lỗi. Đính kèm **video có âm thanh** (bắt buộc cho lỗi Mức 1–2 liên quan TTS/UI hướng dẫn).

---

## RM-___ · Mức ___

| Trường | Nội dung |
|--------|----------|
| **Trạng thái** | Mới / Đã xác nhận / Đang sửa / Chờ kiểm tra lại / Đã đóng |
| **Vai trò phát hiện** | (vd. Kiểm thử Dữ liệu / Chức năng / …) |
| **Người phát hiện** | |
| **Ngày** | |

### Vị trí

- **Màn hình:** (Home / Bản đồ / Vùng / Màn / Khám phá / Cửa / Thưởng / Cửa hàng / Phụ huynh)
- **Chủ đề:** (vd. Rừng Màu Sắc)
- **Bài học:** (vd. `mau-vang` — Màu Vàng)
- **Bước trong bài:** (Khám phá / Câu hỏi 1–3 / …)

### Môi trường

- **Thiết bị:**
- **OS / phiên bản app:**
- **Mạng:** (ổn định / yếu / offline)
- **Hướng màn hình:** ngang / dọc

### Tái hiện

1. 
2. 
3. 

### Kết quả

- **Mong đợi:**
- **Thực tế:**

### Bằng chứng

- [ ] Ảnh màn hình
- [ ] **Video + âm thanh** (bắt buộc nếu liên quan giọng đọc / hướng dẫn)
- [ ] Log / localStorage (nếu tiến độ/sao)

### Hồi quy

- [ ] Đã kiểm lại sau bản sửa · APK/build: ___
- **Người đóng lỗi:** (chỉ người phát hiện hoặc Trưởng ban)

### Ghi chú hội đồng

---

## Quy ước mã lỗi (gợi ý)

| Tiền tố | Vùng |
|---------|------|
| `RM` | Rừng Màu / chủ đề `mau` |
| `MAP` | Bản đồ tri thức |
| `NPC` | Nhân vật đồng hành |
| `TTS` | Giọng đọc / SFX |
| `GATE` | Cửa / chấm điểm |
| `STAR` | Sao / tiến độ |
| `SAFE` | An toàn / phụ huynh |
| `PERF` | Hiệu năng / tải ảnh |

Số thứ tự tăng dần trong từng tiền tố (vd. `RM-014`).
