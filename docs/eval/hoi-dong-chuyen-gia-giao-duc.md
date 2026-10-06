# Hội đồng Chuyên gia Giáo dục — Cổng bắt buộc nội dung

**Mục đích:** mọi thay đổi **bài học / minh họa / lời dạy / explore / gate** phải được **Hội đồng Chuyên gia Giáo dục** kiểm duyệt trước khi gắn vào app hoặc gen AI hàng loạt.  
**Trọng tâm:** chương trình **chủ yếu là ảnh** → ghế **HDGD-VIS** quyết định chính; phải **mở file ảnh** (che chữ), không chỉ audit máy.  
**Cấm:** agent/tác vụ đơn lẻ sửa `lessons.json`, canonical, ảnh explore “cho xong” mà không qua ghế sư phạm — dễ lệch tuổi, filler, hình sai kiến thức.

**Áp dụng cho:** 107 bài · 11 chủ đề · Bé Gấu (2–5 tuổi).

---

## 1. Thành phần (ký đủ trước khi Đạt)

| Mã | Ghế | Quyền quyết |
|----|-----|-------------|
| **HDGD-LEAD** | Chủ tịch hội đồng | Khóa phiên · ưu tiên P0 |
| **HDGD-PEDA** | Sư phạm mầm non | Trẻ 2–5 có hiểu không? 1 ý/bài · không sợ |
| **HDGD-CURR** | Chương trình | 1 màn = 1 bài · mô hình explore đúng chủ đề |
| **HDGD-VIS** | Nhận diện **ảnh** (ghế chính) | Mở từng file explore/friend/map · che chữ · nhãn↔pixel · cấm suy mẫu |
| **HDGD-VOICE** | Lời thoại TTS | Câu ngắn · vi-VN · khớp hình |
| **HDGD-SAFE** | An toàn | Không filler vô nghĩa · không nội dung đáng sợ |

**Không thay thế:** Hội đồng Kiểm thử (build/APK) · Tổ hợp Chuyên gia (thiết kế).  
**Phải chạy cùng:** Hội đồng Thẩm định Từng Bài (`audit-lesson-by-lesson.js`) sau khi sửa.

---

## 2. Cấm tác vụ đơn lẻ (P0 quy trình)

| Việc | Không được làm một mình | Phải có |
|------|-------------------------|---------|
| Gen AI ảnh hàng loạt | Agent gen rồi gắn thẳng | Brief PEDA+VIS đã duyệt prompt/mô hình |
| `rebuild-*` / `apply-ai-*` đổi explore | Script chạy “cho đủ ảnh” | Kết luận hội đồng: Đạt / Đạt ĐK |
| Đổi teach/gate/label | Sửa theo cảm tính | PEDA chấm tuổi 2–5 |
| Filler (Ôm bé, Bảng màu trùng, Nhạc vui…) | Copy shared ảnh | CURR: mỗi ô dạy đúng khái niệm bài |
| Ship APK sau đổi nội dung | Build ngay | Audit từng bài M1=0 + biên bản hội đồng |

---

## 3. Quy trình bắt buộc (4 bước)

```
① ĐỀ XUẤT     → ghi brief: chủ đề · mục tiêu tuổi · mô hình explore · rủi ro
② HỘI ĐỒNG    → PEDA + VIS + CURR (+ SAFE) · Kết luận: Đạt / Đạt ĐK / Chưa đạt
③ THỰC THI    → gen/sửa data/asset đúng brief đã duyệt
④ KHÓA        → npm run audit:lessons (M1=0) · ghi biên bản · mới được npm run apk
```

### Brief tối thiểu (trước gen/sửa)

1. `topicId` / danh sách `lesson.id`  
2. Mục tiêu 1 câu cho trẻ 2–5 (PEDA)  
3. Mô hình explore (vd. 1 chủ thể × 6 màu · 1 cảm xúc · 1 động tác)  
4. Cấm gì (filler, emoji lệch, ảnh 1 màu giả nhiều màu)  
5. Tiêu chí “che chữ đạt”

### Biên bản tối thiểu (sau duyệt)

- Ngày · chủ đề · số bài  
- Điểm PEDA / VIS / CURR / SAFE (0–3)  
- Findings P0/P1/P2  
- Kết luận + điều kiện (nếu Đạt ĐK)  
- File: `docs/eval/bien-ban-hdgd-YYYY-MM-DD.md`

---

## 4. Tiêu chí tuổi 2–5 (PEDA — bắt buộc đạt ≥2)

| Có | Không |
|----|-------|
| 1 khái niệm / 1 màn | Gộp nhiều ý / filler lạc đề |
| Hình + TTS đủ để hiểu (che chữ) | Chỉ dựa chữ trên nút |
| Từ gần gũi (vui, tô đỏ, vỗ tay) | Thuật ngữ / tên dài trừu tượng |
| Feedback ấm · luôn thử lại được | Sợ · countdown · trừ mạng |
| Explore khớp nhãn | Ảnh shared dán mọi bài |

---

## 5. Cách gọi trong Cursor

> “Mở **Hội đồng Chuyên gia Giáo dục** theo `docs/eval/hoi-dong-chuyen-gia-giao-duc.md` — duyệt [chủ đề|bài] trước khi gen/sửa.”

> “Không chạy rebuild/gen AI nội dung cho đến khi hội đồng **Đạt** / **Đạt có điều kiện**.”

Rule luôn bật: `.cursor/rules/be-gau-hoi-dong-giao-duc.mdc`  
Thẩm định sâu: `docs/eval/chuyen-gia-giao-duc-tham-dinh.md` · từng bài: `docs/eval/hoi-dong-tham-dinh-tung-bai.md`

---

## 6. Checklist máy trước khi tuyên bố “đã kiểm duyệt”

```bash
npm run audit:lessons          # M1 phải = 0
node scripts/audit-content-council.js
node scripts/tham-dinh-toan-kho.js   # nếu có
```

Exit ≠ 0 → **Chưa đạt** · không ship APK nội dung mới.

---

*Phiên bản 1.0 · 2026-10-05 · Thành lập để chặn sửa nội dung đơn lẻ lệch sư phạm*
