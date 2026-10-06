# Ánh xạ 8 vai trò Hội đồng Kiểm thử ↔ Cursor / EVAL

Quy chế: `docs/quy-che-hoi-dong-kiem-thu.md`  
Thành lập & cách gọi: `docs/eval/hoi-dong-chuyen-gia-kt.md`  
Phiên gần nhất: `docs/eval/phien-kt-all-maps-2026-10-05.md`  
Audit data: `node scripts/audit-council-data.js`

| Vai trò quy chế | Agent / mã trong repo | Tài liệu / công cụ |
|-----------------|----------------------|---------------------|
| Trưởng ban Kiểm thử | Điều phối · ký `release-gate-checklist.md` | `docs/eval/bao-cao-tong-hop.md` |
| Kiểm thử Chức năng | `QA` + `EVAL-GAME` | Luồng trong `js/app.js` · smoke APK |
| Kiểm thử Dữ liệu | `CURR` + script đối chiếu | `content/curriculum/lessons.json` |
| GV Mầm non | `EVAL-PEDA` | `docs/eval/eval-peda.md` |
| Tâm lý trẻ em | Buổi Vòng 4 (người thật) | Phiếu quan sát Điều 19 (mẫu dưới) |
| Hình ảnh & Âm thanh | `EVAL-VIS` + `EVAL-AUDIO` | `docs/eval/eval-vis.md`, `eval-audio.md` |
| Thiết bị & Hiệu năng | `QA` (ma trận thiết bị) | Vòng 5 checklist |
| An toàn & Bảo mật | `EVAL-SAFE` | `docs/an-toan-tre-em.md`, `eval-qa-safe.md` |

## Gọi agent khi kiểm thử

Ví dụ prompt trong Cursor:

- *“Với tư cách **Kiểm thử Dữ liệu**, đối chiếu 8 bài `topicId=mau` với `lessons.json`.”*
- *“Với tư cách **QA** + quy chế Vòng 2, kiểm regression GATE chấm đúng/sai.”*
- *“Với tư cách **EVAL-SAFE**, thử trẻ có vượt cổng phụ huynh không.”*

**Lưu ý Điều 3:** Người **vừa sửa code** nên nhờ người/vai trò **khác** chạy checklist hoặc dùng báo cáo EVAL độc lập trước khi ký phát hành.

---

## Phiếu quan sát trẻ (Điều 19) — tóm tắt

**Mã trẻ:** T_–__ · **Tuổi:** 3 / 4 / 5 · **Ngày:** ___ · **Bài:** ___

| Chỉ số | Ghi nhận |
|--------|----------|
| Tự hoàn thành (có/không) | |
| Thời gian (giây) | |
| Chạm vô ích (lần) | |
| Cần người lớn (lần) | |
| Cảm xúc | vui / bình thường / bối rối / buồn / **sợ** |

Nếu **sợ** → mở báo cáo lỗi **Mức 2** ngay (`bug-report-template.md`).
