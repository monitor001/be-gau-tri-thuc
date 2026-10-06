# VOICE + PEDA — Nhịp chậm TTS (2–5 tuổi)

Tài liệu duyệt lời thoại cho `promptVi`, feedback, intro và màn thắng. Giọng ấm, chậm, dễ nghe — trẻ **nghe trước, đọc sau** (nếu có chữ).

Chuẩn kỹ thuật chung: `lang: vi-VN`, `pitch` ~**1.05–1.15**, mặc định `rate` **0.8**. Chi tiết rate theo loại câu ở mục 2.

---

## 1. Nguyên tắc viết câu TTS

1. **Một ý / một câu** — không nhồi hướng dẫn + khen + bước tiếp theo trong cùng một chuỗi.
2. **Độ dài ≤ 12–15 từ** — ưu tiên **6–10 từ**; 2–3 tuổi càng ngắn càng tốt.
3. **Từ vựng quen** — màu, hình, số, động vật, “bé Gấu”, “chạm”, “kéo”; tránh thuật ngữ (level, combo, matching…).
4. **Ngắt nghỉ rõ** — dùng dấu chấm / câu ngắn thay vì dấu phẩy dài; có thể tách thành 2 câu TTS cách nhau ~0.4–0.6s nếu cần 2 ý.
5. **Hành động cụ thể** — “Chạm quả đỏ” thay vì “Hãy lựa chọn phương án đúng”.
6. **Khen cụ thể + ấm** — “Đúng màu vàng rồi!”; sai = “Gần rồi, thử lại nhé” (không “sai rồi”, không áp lực).
7. **Gọi trẻ nhẹ** — “bé” hoặc cùng bé Gấu; không mệnh lệnh cứng (“Phải làm ngay”).
8. **Đọc lại được** — câu đủ rõ để nút loa lặp nguyên văn; không phụ thuộc ngữ cảnh ẩn.

---

## 2. Bảng rate gợi ý

| Loại thoại | Rate | Ghi chú PEDA |
|------------|------|----------------|
| **Hướng dẫn** (`promptVi`, intro màn) | **0.78–0.82** | Chậm, rõ từng từ; mặc định **0.8** |
| **Khen / đúng** | **0.85–0.9** | Hơi nhanh hơn một chút — vui, không gấp |
| **Gợi ý / thử lại** | **0.75** | Chậm hơn hướng dẫn — trẻ đang cần hỗ trợ |
| Chào / tên vùng (ngắn) | 0.8–0.85 | 1 câu ≤ 8 từ |
| Màn thắng / kết thúc | 0.8–0.85 | Có thể 2 câu ngắn, không paragraph |

**Pitch:** giữ ~**1.1** cho mọi loại; không tăng pitch khi khen (tránh giọng “robot cao”).

**Không chồng TTS:** `cancel` rồi nói câu mới; chờ SFX nhẹ xong mới đọc khen nếu SFX ngắn.

---

## 3. Checklist duyệt thoại trước khi ship

Dùng trước khi merge chuỗi `promptVi` / feedback mới:

- [ ] Tiếng Việt, `vi-VN` — không fallback tiếng Anh.
- [ ] Mỗi câu ≤ **15 từ**; hướng dẫn chính ≤ **12 từ** với 2–3 tuổi.
- [ ] Chỉ **một ý** mỗi lần đọc (hoặc 2 câu tách nghỉ).
- [ ] Rate đúng loại: hướng dẫn **0.78–0.82** / khen **0.85–0.9** / gợi ý **0.75**.
- [ ] Pitch ~**1.05–1.15**; nghe thử trên tablet thật (loa nhỏ).
- [ ] Không thuật ngữ kỹ thuật, không countdown / “nhanh lên” / “game over”.
- [ ] Sai = khích lệ thử lại; không mỉa, không so sánh trẻ khác.
- [ ] Có nút loa / chạm prompt để nghe lại.
- [ ] Nội dung SAFE: không đáng sợ, không PII, không link.
- [ ] Nghe thử cả chuỗi: intro → hướng dẫn → đúng → gợi ý → thắng (không chồng lời).

---

## 4. Ví dụ câu tốt (10)

| # | Loại | Câu | Rate gợi ý |
|---|------|-----|------------|
| 1 | Hướng dẫn | Chạm quả màu đỏ giúp bé Gấu nhé. | 0.8 |
| 2 | Hướng dẫn | Kéo hình tròn vào lỗ tròn. | 0.78 |
| 3 | Hướng dẫn | Đếm xem có mấy quả táo. | 0.8 |
| 4 | Hướng dẫn | Chọn chữ A giống trong tranh. | 0.8 |
| 5 | Khen | Đúng rồi! Màu vàng sáng quá. | 0.88 |
| 6 | Khen | Giỏi lắm, bé đếm đúng rồi. | 0.85 |
| 7 | Gợi ý | Gần rồi. Thử quả bên trái nhé. | 0.75 |
| 8 | Gợi ý | Cùng bé Gấu xem lại một lần. | 0.75 |
| 9 | Chào / vùng | Chào bé! Đây là Rừng Màu Sắc. | 0.82 |
| 10 | Thắng | Yay! Bé đã giúp tri thức về nhà. | 0.85 |

---

## 5. Câu xấu cần tránh (5)

| # | Câu xấu | Vì sao |
|---|---------|--------|
| 1 | Hãy lựa chọn phương án khớp màu sắc tương ứng với yêu cầu của cấp độ hiện tại. | Quá dài, thuật ngữ, nhiều ý. |
| 2 | Sai rồi! Bạn mất một mạng. Nhanh lên còn 3 giây. | Áp lực, đếm ngược, “thua”. |
| 3 | Perfect combo! Matching complete, next level unlocked. | Tiếng Anh / jargon game. |
| 4 | Không đúng đâu, sao kém thế, làm lại đi. | Phủ định nặng, so sánh, mệnh lệnh cứng. |
| 5 | Bây giờ bé cần hoàn thành nhiệm vụ nhận diện hình học cơ bản rồi tiến sang module tiếp theo trong hành trình. | Dài, trừu tượng, từ “module / nhiệm vụ / hình học”. |

**Sửa nhanh kiểu xấu → tốt:** cắt còn 1 hành động cụ thể + 1 lời ấm (xem mục 4).

---

## 6. Tóm tắt 6 nguyên tắc (ship nhanh)

1. Một ý / một câu; ≤ 12–15 từ.
2. Từ quen thuộc đời sống trẻ; không jargon.
3. Hướng dẫn rate **0.78–0.82**; khen **0.85–0.9**; gợi ý **0.75**.
4. Ngắt nghỉ bằng câu ngắn + nghỉ giữa 2 ý.
5. Khen cụ thể; sai = thử lại ấm cùng bé Gấu.
6. Duyệt checklist (độ dài, rate, SAFE, nghe lại trên thiết bị) trước khi ship.
