# Trạng thái đáp ứng quy chế (snapshot kỹ thuật)

**Mục đích:** Ghi nhận trung thực những gì **đã kiểm từ code/build**, chưa thay cho **Vòng 4 (trẻ thật)** và **100% đối chiếu bài**.

**APK tham chiếu:** `dist-apk/BeGau-TriThuc-v1.0-debug.apk` (cập nhật khi có build mới)

---

## Đã có trong sản phẩm (hỗ trợ kiểm thử)

| Hạng mục | Ghi chú |
|----------|---------|
| Bản đồ thống nhất | `js/map-world.js` · nền `assets/map/ban-do-tri-thuc.jpg` |
| 3 câu / bài màu (gate) | `content/curriculum/lessons.json` |
| TTS vi-VN, tự đọc câu hỏi gate | `js/app.js`, `js/tts.js` |
| Cổng phụ huynh (phép tính) | `index.html` dialog |
| Lưu tiến độ local | `be-gau-cleared-v2`, `be-gau-stars-v3` |
| NPC SVG alpha | `assets/npc/*.svg` |

---

## Chưa đủ điều kiện phát hành theo Điều 22 (cần hội đồng làm tiếp)

| Điều kiện | Trạng thái |
|-----------|------------|
| 100% bài đối chiếu `lessons.json` | **Chưa** — cần Vòng 3 có log từng `lesson.id` |
| ≥ 80% trẻ tự hoàn thành | **Chưa** — cần Vòng 4 + phiếu quan sát |
| 5 vòng trên ≥ 3 thiết bị | **Chưa** — cần điền `release-gate-checklist.md` |
| Quay màn hình + âm thanh mọi lỗi M1–M2 | **Quy trình** — dùng `bug-report-template.md` |

---

## Lỗi hội đồng trước — hướng hồi quy (Vòng 5)

| Mã gợi ý | Mức | Trạng thái kỹ thuật gần nhất |
|----------|-----|------------------------------|
| RM-014 | 1 | Đã sửa hero explore + 8 bài màu — **cần QA xác nhận lại trên thiết bị** |
| GATE-001 | 1 | Chấm theo `data-correct` sau shuffle — **cần thử đúng/sai/sai nhiều lần** |
| NPC-001 | 2 | SVG + một walker Sóc — **cần rà toàn app** |
| MAP-001 | 3 | Bản đồ mới — **cần thử vuốt/chọn hiệu ứng** |

*Chỉ **Đóng** lỗi khi người phát hiện hoặc Trưởng ban ký trên báo cáo.*

---

## Việc tiếp theo đề xuất cho Trưởng ban

1. Gán mã lỗi mở vào `docs/eval/` (file theo sprint).
2. Chạy Vòng 1–2 trên 3 thiết bị · điền checklist.
3. Lập lịch Vòng 4 với phụ huynh (10–15 trẻ).
4. Không ký phát hành công khai cho đến khi checklist đủ.
