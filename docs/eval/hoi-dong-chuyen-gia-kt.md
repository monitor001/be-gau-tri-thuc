# Hội đồng Chuyên gia Kiểm thử — Bé Gấu

**Căn cứ:** `docs/quy-che-hoi-dong-kiem-thu.md`  
**Ngày thành lập phiên bản vận hành:** 2026-10-05  
**Phạm vi app:** *Bé Gấu — Bản đồ tri thức* (3–5 tuổi; kho hiện tại **11 chủ đề / 110 màn**)

> **Phân biệt:** lỗi kiến thức/minh họa trong JSON → **Hội đồng Kiểm duyệt Nội dung** (`docs/eval/hoi-dong-kiem-duyet-noi-dung.md`).  
> Trước khi kết luận Mức 1 nội dung, chạy lại audit trên `lessons.json` hiện tại — báo cáo cũ có thể lỗi thời.

---

## 1. Quyết định thành lập

Thành lập **Hội đồng Kiểm thử** độc lập với nhóm viết code/nội dung (Điều 3), gồm **8 vai trò** (Điều 4). Khi nhóm nhỏ, một người có thể kiêm nhiều vai **trừ** tự duyệt phần mình vừa tạo.

| # | Vai trò | Mã agent Cursor | Trách nhiệm chính |
|---|---------|-----------------|-------------------|
| 1 | Trưởng ban Kiểm thử | `LEAD-KT` | Điều phối 5 vòng · ký `release-gate-checklist.md` · phủ quyết ship |
| 2 | Kiểm thử Chức năng | `QA` + `EVAL-GAME` | Luồng màn · chấm điểm · sao/xu · mở khóa |
| 3 | Kiểm thử Dữ liệu Nội dung | `CURR` + script | Đối chiếu 100% `lessons.json` |
| 4 | Giáo viên Mầm non | `EVAL-PEDA` | Kiến thức đúng · văn hóa Việt · 1 màn = 1 bài |
| 5 | Tâm lý Trẻ em | `PSY` (Vòng 4 người thật) | Buổi thử trẻ · phiếu Điều 19 |
| 6 | Hình ảnh & Âm thanh | `EVAL-VIS` + `EVAL-AUDIO` | Target · contrast · TTS vi-VN · nghe lại |
| 7 | Thiết bị & Hiệu năng | `QA-DEVICE` | ≥3 máy · offline · phone nhỏ |
| 8 | An toàn & Bảo mật | `EVAL-SAFE` | Parent gate · PII · link ngoài · ads |

Ánh xạ chi tiết: `docs/eval/vai-tro-8-kiem-thu.md`.

---

## 2. Cách gọi hội đồng trong Cursor

Khi cần kiểm thử phiên bản, nhắc rõ:

> “Mở **Hội đồng Kiểm thử** theo `docs/eval/hoi-dong-chuyen-gia-kt.md` — chạy Vòng 1–3, lập báo cáo theo mẫu, **không tự ship** nếu còn Mức 1.”

Hoặc gọi từng ghế:

- *Với tư cách `EVAL-PEDA` + Dữ liệu, đối chiếu 100% bài…*
- *Với tư cách `QA` + `EVAL-GAME`, regression gate đúng/sai…*
- *Với tư cách `EVAL-SAFE`, thử cổng phụ huynh…*
- *Với tư cách `EVAL-VIS` + `EVAL-AUDIO`, che chữ + bật loa…*

**Quy tắc Điều 3:** agent vừa sửa code **không** tự ký phát hành; cần báo cáo EVAL độc lập hoặc ghế khác xác nhận.

---

## 3. Năm vòng bắt buộc (Điều 11)

| Vòng | Tên | Ai chủ trì | Đầu ra |
|------|-----|------------|--------|
| 1 | Nhanh (~30 phút) | QA | Checklist Vòng 1 |
| 2 | Chức năng | QA + EVAL-GAME | Flow + chấm + lưu |
| 3 | Nội dung & sư phạm | CURR + EVAL-PEDA | 100% bài / findings |
| 4 | Trẻ thật | PSY | ≥10 trẻ · ≥80% tự xong |
| 5 | Hồi quy & thiết bị | QA-DEVICE | ≥3 máy · đóng lỗi cũ |

Không sang vòng sau khi còn **Mức 1**. Không phát hành khi còn **Mức 1 hoặc Mức 2** (Điều 22).

---

## 4. Tài liệu vận hành

| Tài liệu | Đường dẫn |
|----------|-----------|
| Quy chế | `docs/quy-che-hoi-dong-kiem-thu.md` |
| Checklist ship | `docs/eval/release-gate-checklist.md` |
| Mẫu bug | `docs/eval/bug-report-template.md` |
| Phiên KT gần nhất | `docs/eval/phien-kt-all-maps-2026-10-05.md` |
| Script audit data | `scripts/audit-council-data.js` |

---

## 5. Quyền phủ quyết (Điều 23)

Có thể dừng phát hành trong lĩnh vực mình:

1. **Trưởng ban Kiểm thử**
2. **Giáo viên Mầm non** (`EVAL-PEDA`)
3. **An toàn & Bảo mật** (`EVAL-SAFE`)

Hủy phủ quyết chỉ khi **đã sửa + kiểm tra lại**.

---

## 6. Nhóm thử trẻ (Điều 5)

Duy trì mục tiêu **10–15 trẻ** (3 / 4 / 5 tuổi, Bắc + Nam), có phụ huynh/GV đi kèm. Thay một phần nhóm mỗi quý.

---

*Trưởng ban Kiểm thử ký thành lập phiên vận hành này khi chấp nhận báo cáo phiên đầu tiên.*
