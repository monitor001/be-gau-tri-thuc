# Chuyên gia Giáo dục — Thẩm định Nội dung & Hình ảnh

**Vai trò:** lớp **thẩm định** (peer review) trên toàn kho **11 chủ đề / 107 bài**, tách khỏi team thiết kế và khỏi Hội đồng Kiểm thử build.

**Cổng bắt buộc (mới):** mọi gen/sửa nội dung phải qua **Hội đồng Chuyên gia Giáo dục** — `docs/eval/hoi-dong-chuyen-gia-giao-duc.md` · **cấm tác vụ đơn lẻ**.

**Không thay thế:** Hội đồng Kiểm duyệt Nội dung (`docs/eval/hoi-dong-kiem-duyet-noi-dung.md`) — cùng tiêu chí, nhưng ghế này **đi sâu từng chủ đề** và **bắt buộc che chữ + nhìn emoji/img**.

---

## 1. Hồ sơ chuyên gia (5 ghế)

| Mã | Tên | Trọng tâm thẩm định |
|----|-----|---------------------|
| **TD-LEAD** | Trưởng ban Thẩm định | Ký báo cáo · ưu tiên P0→P1 |
| **TD-PEDA** | Sư phạm mầm non | Đúng tuổi 2–5 · 1 ý/câu · không dạy sai |
| **TD-VIS** | Nhận diện hình ảnh | **Che chữ** — emoji/SVG/AI có đủ gợi ý? |
| **TD-CURR** | Chương trình | 1 màn = 1 bài · gate · explore đủ scaffolding |
| **TD-VOICE** | Lời thoại | teach/story/gate khớp hình · không sợ |

---

## 2. Phạm vi theo chủ đề

| ID | Chủ đề | Số bài | Nguồn hình khóa | Ghi chú thẩm định |
|----|--------|--------|-----------------|-------------------|
| `mau` | Rừng Màu Sắc | 8 | `color-explore-canonical.json` **v7** | JPG AI `assets/explore/mau/` — **cấm** emoji lệch màu |
| `hinh` | Đồi Hình Khối | 7 | AI × 6 màu `hinh-khoi/` | 1 hình × nhiều màu |
| `so` | Suối Đếm Số | 10 | AI `so-N.jpg` + `count` | Glyph + lưới cá/sao |
| `chu` | Hang Chữ Latin | 26 | SVG chữ + AI từ | Chỉ A–Z Latin |
| `dong-vat` | Vườn Bạn Bè | 12 | AI × màu `dong-vat/` | 1 con × 6 màu |
| `trai-cay` | Vườn Trái Cây | 8 | AI × màu `trai-cay/` | 1 quả × 6 màu |
| `do-vat` | Nhà Đồ Vật | 12 | AI × màu `do-vat/` | 1 đồ × 6 màu |
| `cam-xuc` | Góc Cảm Xúc | 6 | AI mặt `cx-*.jpg` | 1 cảm xúc · **cấm filler Ôm bé** |
| `phuong-tien` | Bến Phương Tiện | 6 | AI × màu `phuong-tien/` | 1 xe × 6 màu |
| `nhay-mua` | Sân Nhảy Múa | 6 | AI động tác | 1 động tác · cấm filler nhạc |
| `hoa-si` | Góc Họa Sĩ | 6 | AI hành động | 1 việc tô/vẽ · cấm bảng màu trùng |

---

## 3. Quy trình (bắt buộc)

0. **Hội đồng Chuyên gia Giáo dục** duyệt brief (PEDA/VIS/CURR) — xem `hoi-dong-chuyen-gia-giao-duc.md`.
1. `npm run audit:lessons` — chặn Mức 1 từng bài.
2. `node scripts/audit-content-council.js` — chặn P0 data/canonical.
3. `node scripts/tham-dinh-toan-kho.js` — báo cáo 11 chủ đề → `docs/eval/tham-dinh-findings.json` (nếu có).
4. **Từng chủ đề:** ≥1 bài mở app **che chữ** (chỉ hình + TTS).
5. Ghi Findings **P0 / P1 / P2** · chấm **PEDA / VIS / CURR** (0–3).
6. Phân loại: **sửa data** vs **sửa asset** vs **sửa UI/build** (chuyển Hội đồng KT).

**Không suy mẫu:** mỗi `lesson.id` có phiếu khi duyệt phát hành lớn (`hoi-dong-tham-dinh-tung-bai.md`).

---

## 4. Cách gọi trong Cursor

> “Mở **Hội đồng Chuyên gia Giáo dục** — duyệt [chủ đề] trước khi gen/sửa.”

> “Mở **Chuyên gia Giáo dục Thẩm định** theo `docs/eval/chuyen-gia-giao-duc-tham-dinh.md` — rà soát chủ đề [tên|all] trên data hiện tại.”

Rule: `.cursor/rules/be-gau-tham-dinh-giao-duc.mdc` · cổng: `.cursor/rules/be-gau-hoi-dong-giao-duc.mdc`

---

## 5. Báo cáo mới nhất

- **Biên bản hội đồng:** `docs/eval/bien-ban-hdgd-2026-10-05.md`
- **Phiên toàn kho (cũ hơn):** `docs/eval/bao-cao-tham-dinh-11-chu-de-2026-10-05.md`
- **Machine-readable:** `docs/eval/tham-dinh-findings.json` · `docs/eval/phieu-tung-bai.json`

---

*Phiên bản 1.1 · 2026-10-05 · Gắn cổng Hội đồng Chuyên gia Giáo dục*
