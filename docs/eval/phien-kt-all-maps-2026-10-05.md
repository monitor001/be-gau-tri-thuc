# Báo cáo Hội đồng Kiểm thử — Phiên ALL-MAPS

**Mã phiên:** KT-ALL-MAPS-2026-10-05  
**Phiên bản app:** giải cứu bạn toàn map + 11 nền parchment  
**APK:** `dist-apk/BeGau-TriThuc-v1.0-debug.apk`  
**Ngày:** 2026-10-05  
**Căn cứ:** `docs/quy-che-hoi-dong-kiem-thu.md` · `docs/eval/hoi-dong-chuyen-gia-kt.md`

---

## 1. Thành phần phiên họp

| Vai trò | Agent | Trạng thái |
|---------|-------|------------|
| Trưởng ban Kiểm thử | LEAD-KT | Điều phối · tổng hợp |
| Chức năng | QA + EVAL-GAME | Đã báo cáo (code review) |
| Dữ liệu + GV MN | CURR + EVAL-PEDA | Đã báo cáo + `scripts/audit-council-data.js` |
| Hình ảnh & Âm thanh | EVAL-VIS + EVAL-AUDIO | Đã báo cáo |
| An toàn | EVAL-SAFE | Đã báo cáo |
| Tâm lý trẻ / Vòng 4 | PSY | **Chưa** (cần trẻ thật) |
| Thiết bị Vòng 5 | QA-DEVICE | **Chưa** (≥3 máy) |

---

## 2. Bảng điểm (0–3)

| Tiêu chí | Điểm | Ghi chú |
|----------|:----:|---------|
| EVAL-PEDA — mục tiêu tuổi | 2 | Phù hợp 2–5; chữ P / oval lệch |
| EVAL-PEDA — scaffolding | 1 | Chỉ 8/110 bài có `exploreItems` |
| EVAL-PEDA — feedback | 2 | Có story winLine; TTS chung |
| EVAL-GAME — soft win | 3 | Thử lại, không trừ mạng |
| EVAL-GAME — chấm / sao | 2 | Shuffle OK; bài 1 câu → tối đa 1★ |
| EVAL-VIS — target / map | 2 | Đảo ≥72px; nửa phải map dễ sót |
| EVAL-AUDIO — vi-VN / rate | 2–3 | Có vi-VN; rate **~0.95** (chuẩn mới — AI đã chậm sẵn) |
| EVAL-SAFE — gate / link | 1–2 | Gate phép đơn giản; Google Fonts CDN |

---

## 3. Coverage đã xác nhận

| Hạng mục | Kết quả |
|----------|---------|
| Chủ đề / màn | **11 / 110** |
| `friend` + `story` | **110/110** |
| Gate hợp lệ (prompt + ≥2 choices + index) | **110/110** |
| Nền `TOPIC_BG` tồn tại | **11/11** |
| `mau-vang` không táo đỏ | **Đạt** |
| Hang Chữ 29 bài trống gate | **Không** |

---

## 4. Findings

### Mức 1 — Chặn phát hành (P0)

| Mã | Bài / khu vực | Mô tả | Phát hiện |
|----|---------------|-------|-----------|
| **KT-AM-001** | `chu-p` | Dạy *「phở bắt đầu bằng chữ P」* — sai: **phở** bắt đầu bằng **Ph**. Emoji 🍜 củng cố sai. | EVAL-PEDA + audit script |

### Mức 2 — Nghiêm trọng (P1)

| Mã | Khu vực | Mô tả |
|----|---------|-------|
| **KT-AM-002** | `hinh-rect` | `friend.name` = 「Bạn nhật」 (cắt mất 「Chữ」) |
| **KT-AM-003** | `nhay-mua` + `hoa-si` (12 bài) | `promptVi` = 「Bé chọn đúng nào?」 — che chữ thì không biết chọn gì (Điều 6) |
| **KT-AM-004** | `phuong-tien` | 5/6 bài copy teach 「Xe chạy vui!」 (máy bay / thuyền / …) |
| **KT-AM-005** | World map | 5 đảo x≥74% trên board ~154% — trẻ dễ bỏ sót nếu không vuốt |
| **KT-AM-006** | TTS | ~~0.95 vs 0.8~~ → **Đóng (chấp nhận)**: chuẩn mới rate ~0.95 |
| **KT-AM-007** | SAFE | Google Fonts CDN ngoài luồng trẻ; parent gate phép `2–5+2–5` yếu |
| **KT-AM-008** | Scaffolding | 102/110 bài không có `exploreItems` |

### Mức 3–4 (P2)

- `hinh-oval` dùng từ 「Oval」 thay 「bầu dục」
- Sao = số câu đúng lần đầu → bài 1 câu không bao giờ 3★
- Nút nghe lại explore (`#btn-explore-hear`) đang `hidden`
- Doc cũ ghi 97/9 vs data 110/11
- Copy captive 「bị Cô Sương giữ」 — dịu, theo dõi cảm xúc Vòng 4

---

## 5. Checklist cổng phát hành (tóm tắt)

| Vòng | Kết quả |
|------|---------|
| 1 Nhanh | ⚠ Chưa smoke thiết bị thật trong phiên này |
| 2 Chức năng | ✅ Theo code: flow + soft-fail + rescue OK |
| 3 Nội dung | ❌ Còn **Mức 1** (`chu-p`) + nhiều Mức 2 |
| 4 Trẻ thật | ❌ Chưa |
| 5 Thiết bị | ❌ Chưa |

---

## 6. Quyết định

### **KHÔNG PHÁT HÀNH** (Điều 22)

Lý do phủ quyết:

1. **GV Mầm non / Dữ liệu:** còn lỗi kiến thức Mức 1 (`chu-p`)
2. Còn nhiều Mức 2 (prompt mơ hồ, map sót đảo, TTS, parent gate)
3. Chưa Vòng 4 (trẻ thật) và Vòng 5 (≥3 máy)

### Việc ưu tiên trước phiên họp sau

1. Sửa `chu-p` → ví dụ **pin / pa tô / pan** (hoặc tách bài **Ph ~ phở**)
2. Prompt rõ cho `nm-*` / `hs-*` + đảm bảo emoji khi che chữ
3. Teach riêng từng phương tiện; sửa `Bạn Chữ nhật`
4. Gợi ý vuốt map / thu vị trí đảo phải (TTS giữ ~0.95)
5. Self-host font hoặc system stack; cứng parent gate
6. Lịch Vòng 4 + Vòng 5

---

## 7. Lịch họp tiếp

- **Tuần tới:** họp đóng KT-AM-001 → KT-AM-004 (Mức 1–2 nội dung)
- **Trước ship:** họp đủ 5 vòng + ký `release-gate-checklist.md`

---

*Báo cáo tổng hợp bởi Trưởng ban Kiểm thử (điều phối agent). Không thay thế buổi thử trẻ thật.*
