# Hội đồng Kiểm duyệt Nội dung Bài học

**Mục đích:** duyệt **đúng kiến thức · rõ nhận diện · phù hợp 2–5 tuổi** trước khi đưa vào build.  
**Khác Hội đồng Kiểm thử:** tổ này duyệt *dữ liệu & minh họa*; Hội đồng KT xác nhận *app chạy đúng trên bản build*.

**Căn cứ:** `docs/quy-che-hoi-dong-kiem-thu.md` (Điều 6 che chữ, Điều 8 từng bài) · `docs/to-hop-chuyen-gia.md`

---

## 1. Thành phần (6 ghế)

| Mã | Ghế | Phạm vi duyệt |
|----|-----|----------------|
| `ND-LEAD` | Trưởng ban Nội dung | Điều phối · ký bảng duyệt · khóa phiên bản data |
| `ND-PEDA` | Sư phạm mầm non | Mục tiêu học, ví dụ VN, không dạy sai |
| `ND-VIS` | Minh họa / nhận diện | Emoji/SVG/ảnh có đúng màu–hình–khái niệm khi **che chữ** |
| `ND-CURR` | Chương trình | 1 màn = 1 bài; đủ gate; không gộp bài |
| `ND-VOICE` | Lời thoại TTS | Câu ngắn, khớp bài, không đáng sợ |
| `ND-SAFE` | An toàn nội dung | Không sợ, không thiên kiến, không PII |

---

## 2. Nguồn dữ liệu (một nguồn sự thật)

| Loại | File khóa | Ghi chú |
|------|-----------|---------|
| Toàn kho bài | `content/curriculum/lessons.json` | Sinh `js/lessons-data.js` |
| Explore 8 bài màu | `content/curriculum/color-explore-canonical.json` | **Không** sửa explore màu trực tiếp trong `lessons.json` |
| Đồng bộ màu | `node scripts/sync-color-explore.js` | Ghi đè exploreItems màu từ canonical |
| Audit nhanh | `node scripts/audit-content-council.js` | Chặn P0 nội dung |

Mọi patch script (`fix-score-uplift`, `patch-rescue-*`) **không được** ghi đè `exploreItems` của `topicId=mau` trừ khi gọi sync từ canonical.

---

## 3. Quy trình duyệt một bài

1. Đọc `lesson.id` trong `lessons.json` (+ canonical nếu bài màu).  
2. **Che chữ:** chỉ nhìn emoji/img + nghe TTS — biết phải chọn gì?  
3. Kiểm gate: `promptVi`, ≥2 choices, `correctIndex` / `correctSpeak` đúng.  
4. Kiểm explore: mỗi món khớp màu/khái niệm bài; không trùng nhãn.  
5. Chấm 0–3 · ghi Findings P0/P1/P2.  
6. Trưởng ban ký **Đạt / Đạt có điều kiện / Không đạt**.

**Không suy mẫu:** duyệt từng bài (Điều 8). Hang Chữ 29 bài = 29 phiếu.

---

## 4. Thang & mức lỗi nội dung

`0` thiếu · `1` yếu · `2` đạt · `3` tốt cho trẻ 2–5

| Mức | Ví dụ nội dung |
|-----|----------------|
| **1** | Dạy sai (P/phở); minh họa sai màu; gate trống |
| **2** | Prompt mơ hồ; explore trùng; ví dụ yếu khi che chữ |
| **3–4** | Thẩm mỹ emoji; wording dài |

---

## 5. Cách gọi trong Cursor

> “Mở **Hội đồng Kiểm duyệt Nội dung** theo `docs/eval/hoi-dong-kiem-duyet-noi-dung.md` — duyệt chủ đề [mau|…] trên data hiện tại. Không dùng báo cáo KT cũ nếu `lessons.json` đã đổi.”

Rule: `.cursor/rules/be-gau-content-council.mdc`

---

## 6. Liên kết

| Tổ chức | File |
|---------|------|
| Tổ hợp Chuyên gia (thiết kế) | `docs/to-hop-chuyen-gia.md` |
| Hội đồng Kiểm thử (build) | `docs/eval/hoi-dong-chuyen-gia-kt.md` |
| Phiên duyệt gần nhất | `docs/eval/phien-duyet-noi-dung-2026-10-05.md` |
| **Thẩm định 11 chủ đề** | `docs/eval/chuyen-gia-giao-duc-tham-dinh.md` · `docs/eval/bao-cao-tham-dinh-11-chu-de-2026-10-05.md` |
| Audit toàn kho | `node scripts/tham-dinh-toan-kho.js` → `docs/eval/tham-dinh-findings.json` |

---

*Phiên bản hội đồng nội dung: 1.1 · 2026-10-05*
