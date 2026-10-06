# Checklist QA thiết bị — chặn trước khi đưa người khác test

**Mục đích:** Biến các hạng mục “cần xác nhận trên máy” thành phiếu Đạt / Không đạt đo được.  
**Áp dụng:** APK debug mới nhất trong `dist-apk/`.  
**Quy chế:** `docs/quy-che-hoi-dong-kiem-thu.md` (Mức 1 = chặn ship nội bộ).

---

## 0. Phiên kiểm thử (điền trước khi bắt đầu)

| Trường | Máy A (yếu / cũ) | Máy B (mới) |
|--------|------------------|-------------|
| Tên / model | | |
| Android version | | |
| RAM / dung lượng trống | | |
| APK versionName / ngày file | | |
| Người test | | |
| Ngày giờ | | |
| Có giọng vi-VN sẵn? (Có / Không / Chỉ online) | | |

**Kết luận phiên:** ☐ Đạt đủ để nội bộ test · ☐ Không đạt (liệt kê P0 bên dưới)

---

## 1. Hạng mục bắt buộc (P0 nếu fail)

### 1.1. TTS tiếng Việt

| # | Bước | Kết quả mong đợi | Đạt? |
|---|------|------------------|------|
| T1 | Mở app lần đầu, chạm màn hình, vào 1 bài, nghe intro | Có lời tiếng Việt trong **≤ 3 giây** sau khi TTS bắt đầu (hoặc phát bản ghi NL) | ☐ |
| T2 | Máy **không** có giọng vi-VN | App **không im lặng**: hiện hướng dẫn PH cài giọng / dùng ghi âm; nút loa vẫn phản hồi | ☐ |
| T3 | Chạm Đom Đóm / 🔊 ở màn **đố (gate)** | Chỉ đọc **câu hỏi hiện tại** (vd. “Bóng nào màu đỏ…”); **không** đọc tip dài kiểu “Đỏ như quả táo…”; xong trong **≤ 8 giây** với câu ≤ 15 từ | ☐ |
| T4 | Feedback đúng / sai | Một câu ngắn; không chồng 2–3 câu cùng lúc | ☐ |

### 1.2. Đồi Hình (SVG)

| # | Bước | Kết quả mong đợi | Đạt? |
|---|------|------------------|------|
| H1 | Vào `hinh-circle`, `hinh-square` đủ vài màu | Che chữ: thấy **hình thuần** đúng loại, **không** mặt mèo/gấu | ☐ |
| H2 | Vuông vàng / xanh lá | Không còn nhân vật trong ảnh explore | ☐ |

### 1.3. Đổi thưởng

| # | Bước | Kết quả mong đợi | Đạt? |
|---|------|------------------|------|
| S1 | Mở Đổi thưởng | Thấy ví xu + lưới quà; 3 trạng thái rõ (Đổi ngay / Chưa đủ / Đã có) | ☐ |
| S2 | Đủ xu: chạm **Đổi ngay** 1 lần | Xu giảm đúng 1 lần; toast hiện; món vào bộ sưu tập | ☐ |
| S3 | Bấm liên tục “Đổi ngay” 3 lần nhanh | Chỉ trừ xu **một lần** cho một món | ☐ |

### 1.4. Ghi âm người lớn + micro

| # | Bước | Kết quả mong đợi | Đạt? |
|---|------|------------------|------|
| M1 | Vào Người lớn | Phải qua **parent gate** (không vào thẳng) | ☐ |
| M2 | Tab Ghi âm → **Cho phép micro** → Cho phép | Xin quyền thành công; status báo đã cho phép | ☐ |
| M3 | Chọn **Từ chối** | Có hướng dẫn + nút **Mở Cài đặt máy**; không crash | ☐ |
| M4 | Ghi 1 câu intro → chơi lại bài | Phát **bản ghi**, không TTS câu đó | ☐ |
| M5 | Đang ghi → app xuống nền / cuộc gọi (nếu giả lập được) | Dừng ghi an toàn; không kẹt nút ⏹; có thể ghi lại | ☐ |
| M6 | Đổi lời thoại bài (hoặc giả lập hash lệch) | Slot hiện **Cần ghi lại** | ☐ |

### 1.5. An toàn trẻ

| # | Bước | Kết quả mong đợi | Đạt? |
|---|------|------------------|------|
| A1 | Trẻ thử đoán parent gate 3 lần sai | Không vào được cài đặt / ghi âm | ☐ |
| A2 | Trong luồng chơi trẻ | Không có link ngoài, không chat, không ads | ☐ |

---

## 2. Hạng mục P1 (nên xong trước khi mở rộng tester)

| # | Hạng mục | Kết quả mong đợi | Đạt? |
|---|----------|------------------|------|
| P1-SO | Bài số 2…10: lưới đếm trên UI | Số lượng đếm được = N khi che chữ | ☐ |
| P1-CHU | Chữ F/J/Q/W/Z | Glyph rõ với trẻ 2–3 | ☐ |
| P1-UI | Portrait + landscape đổi thưởng / explore | Không che nút lớn; target chạm ổn | ☐ |
| P1-TIME | Bật giới hạn chơi (nếu có) trong NL | Nhắc nghỉ đúng ngưỡng đã đặt | ☐ |

---

## 3. Bugs ghi nhận phiên này

| ID | Mức | Máy | Mô tả | Video có tiếng? |
|----|-----|-----|-------|-----------------|
| | M1/M2/M3 | | | ☐ |

Dùng mẫu: `docs/eval/bug-report-template.md`.

---

## 4. Chữ ký

| Vai | Tên | Ngày | Kết luận |
|-----|-----|------|----------|
| QA | | | Đạt / Không đạt |
| HDGD-AUDIO (nếu nghe TTS) | | | |
| SAFE (nếu đụng micro/PII) | | | |
