# Hội đồng Thẩm định Từng Bài Học

**Mục đích:** chặn ship khi **từng bài** còn lệch kiến thức / hình — không duyệt “theo chủ đề mẫu”.  
**Lý do thành lập:** nhiều vòng thẩm định trước vẫn sót (táo vàng hiện đỏ; “2 cá” hiện 1 cá; giỏ quả không liên quan…).

**Phân biệt**

| Tổ chức | Phạm vi |
|---------|---------|
| Hội đồng Kiểm duyệt Nội dung | Data + canonical |
| Chuyên gia Giáo dục (theo chủ đề) | Điểm theo vùng |
| **Hội đồng Thẩm định Từng Bài** (file này) | **1 phiếu / 1 `lesson.id`** · che chữ · máy + mắt |
| Hội đồng Kiểm thử | Build/APK E2E |

---

## 1. Thành phần (bắt buộc ký đủ)

| Mã | Ghế | Việc trên **mỗi** bài |
|----|-----|------------------------|
| `TB-LEAD` | Trưởng ban | Không cho “suy mẫu”; khóa danh sách Đạt |
| `TB-PEDA` | Sư phạm | Mục tiêu 1 ý; từ/hình khớp khái niệm |
| `TB-VIS` | Nhận diện | **Che chữ + tắt TTS** — biết phải làm gì? |
| `TB-MATCH` | Khớp nhãn↔hình | Nhãn nói “vàng/2 cá” thì hình **phải** vàng / **đúng 2** |
| `TB-GATE` | Cửa đố | promptVi rõ; đáp án đúng kiến thức |
| `TB-SAFE` | An toàn | Không sợ; không filler vô nghĩa |

---

## 2. Mô hình nội dung (bắt buộc)

| Loại bài | Explore đúng | Explore sai (chặn) |
|----------|--------------|---------------------|
| **Màu** (`mau`) | Nhiều **vật khác** cùng **1 màu** · mỗi món có `img` đúng màu | Emoji lệch màu; thiếu `img` |
| **Đối tượng** (`trai-cay`,`do-vat`,`dong-vat`,`phuong-tien`) | **1 chủ thể** × nhiều màu · hình **tô đúng màu** (SVG tint hoặc recolor) | Giỏ quả, Chạm nào, Trong nhà; táo vàng mà quả đỏ |
| **Số** (`so`) | Glyph số + `count:N` cá/sao hiện **N** hình | 1 ảnh cá gắn nhãn “2 cá” |
| **Chữ** (`chu`) | Chỉ Latin A–Z · SVG chữ + từ đúng âm | Ă Â Đ Ê Ô Ơ Ư |
| **Hình / Cảm xúc / Nhảy / Họa sĩ** | 1 khái niệm · hình khớp | Copy-paste teach sai |

---

## 3. Phiếu duyệt 1 bài (checklist)

In phiếu: `lesson.id` · `title` · ngày · ghế ký.

```
[ ] TB-PEDA  Mục tiêu rõ (1 khái niệm)
[ ] TB-VIS   Che chữ: biết chọn gì chỉ bằng hình
[ ] TB-MATCH Nhãn ↔ hình ↔ TTS cùng một sự thật
[ ] TB-GATE  Gate ≥2 lựa chọn · đáp án đúng
[ ] TB-SAFE  Không filler / không đáng sợ
→ Kết luận: ĐẠT / ĐẠT CÓ ĐIỀU KIỆN / KHÔNG ĐẠT
```

**Không ĐẠT** nếu bất kỳ mục MATCH/PEDA fail (P0).

---

## 4. Công cụ máy (bắt buộc trước ký)

```bash
node scripts/audit-lesson-by-lesson.js
```

- Output: `docs/eval/phieu-tung-bai.json` + console P0/P1  
- Exit code `1` nếu còn **Mức 1** → **cấm** nói “đã thẩm định xong”

Chạy thêm: `node scripts/audit-content-council.js`

---

## 5. Cách gọi trong Cursor

> “Mở **Hội đồng Thẩm định Từng Bài** — duyệt toàn kho / bài `tc-tao` / chủ đề `so`.”

Rule: `.cursor/rules/be-gau-tham-dinh-tung-bai.mdc`

Agent **phải**: chạy audit máy → liệt kê P0 theo `lesson.id` → sửa P0 → chạy lại → mới báo Đạt.

---

## 6. Lỗi đã học (không được regress)

| Mã | Hiện tượng | Quy tắc máy |
|----|------------|-------------|
| REG-01 | Táo vàng hiện đỏ / mèo vàng vẫn cam | Mọi bài cùng-chủ-thể×màu → `img` = `tint/{id}-{colorId}.svg` (`npm run tint`) |
| REG-02 | “2 cá” hiện 1 cá | `so-*` item nhãn `/\\d+\\s*cá/` → bắt buộc `count` = số đó, **không** `img` đơn |
| REG-03 | Giỏ quả / Giòn filler | Cấm nhãn explore trong tập BANNED_FILLER |
| REG-04 | Chữ Ă Â Đ… | `chu` title chỉ `[A-Z]` Latin |
| REG-05 | Emoji vịt trời ở màu vàng | canonical + `img` SVG/JPG đúng vàng |
| REG-06 | Cảm xúc = động vật | `cx-*` phải mặt vàng emoji, không vịt/chim thay thế |
| REG-07 | Chữ W = Wifi trừu tượng | Minh họa W = Watermelon (nhận diện ngay) |

---

*Phiên bản 1.0 · 2026-10-05 · Thành lập sau nhiều vòng vẫn sót lỗi nhận diện*
