# Checklist cổng phát hành (Điều 22 + Vòng 1–5)

**Phiên bản kiểm tra:** _______________  
**APK / build:** _______________  
**Ngày:** _______________  
**Trưởng ban Kiểm thử (ký):** _______________

> Không phát hành nếu còn **Mức 1**. Không phát hành nếu còn **Mức 2** chưa sửa + hồi quy.

---

## Vòng 1 — Kiểm thử nhanh (~30 phút)

| # | Hạng mục | Đạt | Ghi chú |
|---|----------|-----|---------|
| 1.1 | App mở, không crash màn đầu | ☐ | |
| 1.2 | Home → Bản đồ → vào được ≥ 1 vùng | ☐ | |
| 1.3 | Không màn trống (gate, explore, reward) | ☐ | |
| 1.4 | Ảnh nền bản đồ tải được (offline sau cài APK) | ☐ | |
| 1.5 | TTS phát ít nhất 1 câu sau unlock âm thanh | ☐ | |

---

## Vòng 2 — Chức năng

| # | Hạng mục | Đạt | Ghi chú |
|---|----------|-----|---------|
| 2.1 | Luồng: Map → Màn → Khám phá → Cửa → Thưởng → Map | ☐ | |
| 2.2 | Chọn **đúng** → feedback đúng + TTS đúng | ☐ | |
| 2.3 | Chọn **sai** → gợi ý (không coi gợi ý là “sai”) | ☐ | |
| 2.4 | Sao: 3 câu / bài màu (nếu áp dụng) · lưu `localStorage` | ☐ | |
| 2.5 | Mở khóa màn kế tiếp sau hoàn thành | ☐ | |
| 2.6 | Xu Gấu / cửa hàng / reset phụ huynh | ☐ | |
| 2.7 | Cổng phụ huynh: trẻ **không** vào được (thử ≥ 3 trẻ hoặc mô phỏng tap liên tục) | ☐ | |

---

## Vòng 3 — Nội dung & sư phạm (100% bài)

**Nguồn duyệt:** `content/curriculum/lessons.json` · danh sách: `docs/curr-danh-sach-man.md`

| # | Hạng mục | Đạt | Ghi chú |
|---|----------|-----|---------|
| 3.1 | Script đối chiếu / checklist từng `lesson.id` hoàn tất | ☐ | |
| 3.2 | 8 bài màu: hero/khám phá khớp bài (không táo cố định) | ☐ | |
| 3.3 | Ngôn ngữ Việt (chanh, taxi, phương ngữ) đã rà | ☐ | |
| 3.4 | Mỗi bài = 1 mục tiêu học (không gộp bài) | ☐ | |

*Ghi số bài đã đối chiếu:* _____ / _____ (mục tiêu **100%**)

---

## Vòng 4 — Trẻ thật (Chương VI)

| # | Hạng mục | Đạt | Ghi chú |
|---|----------|-----|---------|
| 4.1 | Phiếu đồng ý phụ huynh đủ | ☐ | |
| 4.2 | ≥ 10 trẻ (3/4/5, Bắc/Nam) | ☐ | |
| 4.3 | **≥ 80%** tự hoàn thành bài thử (không chỉ tay) | ☐ | %: ___ |
| 4.4 | Không biểu hiện **sợ hãi** | ☐ | |
| 4.5 | Buổi thử ≤ 15–20 phút/trẻ | ☐ | |
| 4.6 | Bảng quan sát (Điều 19) đã nhập | ☐ | File: ___ |

---

## Vòng 5 — Hồi quy & thiết bị (≥ 3 máy)

| Thiết bị | Vòng 1–2 smoke | Lỗi cũ đã đóng | Offline |
|----------|----------------|----------------|---------|
| Tablet Android giá rẻ | ☐ | ☐ | ☐ |
| Phone Android nhỏ | ☐ | ☐ | ☐ |
| iPad / khác | ☐ | ☐ | ☐ |

**Danh sách lỗi hồi quy bắt buộc** (cập nhật mỗi phát hành):

- [ ] RM-014 (táo Màu Vàng) — đóng
- [ ] GATE chấm đúng bóng vàng — đóng
- [ ] NPC alpha + một hình Đom Đóm — đóng
- [ ] … (thêm từ `docs/eval/` báo cáo gần nhất)

---

## Điều kiện phát hành (tóm tắt Điều 22)

| Điều kiện | Đạt |
|-----------|-----|
| 0 lỗi Mức 1 mở | ☐ |
| 0 lỗi Mức 2 mở | ☐ |
| 100% bài đối chiếu dữ liệu | ☐ |
| ≥ 80% trẻ tự xong bài (Vòng 4) | ☐ |
| Không trẻ sợ · không vượt cổng phụ huynh | ☐ |
| Mọi màn hướng dẫn có TTS hoạt động | ☐ |

### Phủ quyết (Điều 23)

| Vai trò | Phủ quyết? | Lý do |
|---------|------------|-------|
| Trưởng ban Kiểm thử | ☐ Có ☐ Không | |
| Giáo viên Mầm non | ☐ Có ☐ Không | |
| An toàn & Bảo mật | ☐ Có ☐ Không | |

**Quyết định:** ☐ **Đủ điều kiện phát hành** · ☐ **Chưa đủ — tiếp tục sửa**
