# Tổ hợp Chuyên gia — Bé Gấu Giải Cứu Tri Thức

**Mục đích:** một bàn liên ngành cùng **thiết kế · phân tích · kiểm thử nội dung** trước khi Hội đồng Kiểm thử ký phát hành.

**Phân biệt vai trò tổ chức**

| Tổ chức | Việc chính | Tài liệu |
|---------|------------|----------|
| **Tổ hợp Chuyên gia** (file này) | Nên dạy gì · chơi thế nào · trông/nghe ra sao | `docs/to-hop-chuyen-gia.md` |
| **Hội đồng Kiểm duyệt Nội dung** | Duyệt đúng kiến thức & minh họa trên `lessons.json` | `docs/eval/hoi-dong-kiem-duyet-noi-dung.md` |
| **Hội đồng Kiểm thử** | App có làm đúng như vậy không (trên build) | `docs/eval/hoi-dong-chuyen-gia-kt.md` · quy chế `docs/quy-che-hoi-dong-kiem-thu.md` |

Ba tổ **không tự duyệt phần mình vừa tạo** (Điều 3 quy chế). Luồng: Tổ hợp thiết kế → **Kiểm duyệt nội dung** khóa data → Hội đồng KT xác nhận trên build.

---

## 1. Thành phần (12 ghế chuyên môn)

| Mã | Lĩnh vực | Nhiệm vụ chính | Tiêu chí vàng (toddler 2–5) |
|----|----------|----------------|----------------------------|
| `PEDA` | Sư phạm mầm non | Mục tiêu học, scaffolding, feedback khích lệ | 1 ý / câu; luôn thắng được |
| `CURR` | Chương trình học | Kho bài theo 5 vùng + mở rộng; 1 màn = 1 bài | Bám `lessons.json` / danh sách màn |
| `STORY` | Kể chuyện / thế giới | Bé Gấu, Cô Sương, bạn bị giữ nhẹ — không bạo lực | Chiến đấu = cứu / tìm / ghép |
| `GAME` | Thiết kế mini-game | Tap, kéo, match 2–4 lựa chọn | ≤90s; không countdown; 1 ngón |
| `UX` | UX trẻ nhỏ | Nút lớn, ít chữ, luồng ngắn | Target cảm ứng lớn; che chữ vẫn hiểu |
| `GFX` / `EVAL-VIS` | Đồ họa & nhận diện | Icon, màu, nền map, captive mist | Tương phản rõ; không đáng sợ |
| `AUDIO` | Kiến trúc âm thanh | TTS + SFX + unlock | `vi-VN`, không chồng lời |
| `VOICE` | Kịch bản giọng đọc | Câu ngắn, nhịp tự nhiên | rate ~0.95 (AI đã chậm sẵn); ≤12–15 từ |
| `SFX` | Âm hiệu | Đúng / thử lại / sao | Dịu, không tick áp lực |
| `SAFE` | An toàn trẻ em | Parent gate, privacy, nội dung | Không ads/PII/link ngoài trong chơi |
| `EVAL-*` | Đánh giá chuyên biệt | Chấm 0–3 + P0/P1/P2 | `docs/doi-agent-eval-qa.md` |
| `QA` | Kiểm thử E2E | Flow + regression | Checklist phát hành |

Chi tiết âm thanh: `docs/doi-agent-am-thanh.md`.  
Chi tiết EVAL: `docs/doi-agent-eval-qa.md`.

---

## 2. Quy trình hội nghị liên ngành

Khi phân tích / kiểm thử **một chủ đề hoặc một bản build**:

```
① CURR lập bảng bài cần duyệt
② PEDA + STORY duyệt mục tiêu & lời thoại
③ GAME + UX duyệt cơ chế & target
④ GFX + AUDIO/VOICE duyệt hình & giọng
⑤ SAFE rà an toàn
⑥ EVAL-* chấm điểm độc lập (không sửa code trong lúc chấm)
⑦ QA tổng hợp → bàn giao Hội đồng Kiểm thử (Vòng 1–5)
```

**Output bắt buộc mỗi hội nghị**

1. Bảng điểm theo ghế (0–3)  
2. Findings P0 / P1 / P2 (map Mức 1–4 nếu sang Hội đồng KT)  
3. Đề xuất nâng cấp cụ thể (nội dung / UI / TTS / level)  
4. Chỉ dựa code/file đã đọc — không bịa hành vi app  

Mẫu báo cáo: `docs/eval/hoi-nghi-lien-nganh-template.md`  
Phiên gần nhất: `docs/eval/hoi-nghi-lien-nganh-2026-10-05.md`

---

## 3. Cách gọi trong Cursor

### Gọi cả tổ hợp

> “Mở **Tổ hợp Chuyên gia** theo `docs/to-hop-chuyen-gia.md` — phân tích chủ đề [X] / bản [Y]. Chạy song song PEDA, GAME, GFX, AUDIO, SAFE rồi tổng hợp.”

### Gọi cặp ghế

| Nhu cầu | Prompt gợi ý |
|---------|----------------|
| Thiết kế màn mới | `PEDA` + `GAME` + `CURR` |
| Cutscene / lời thoại | `STORY` + `VOICE` |
| Map / icon / captive | `GFX` + `UX` + `STORY` |
| TTS / nghe lại | `AUDIO` + `VOICE` + `PEDA` |
| Review an toàn | `SAFE` + `UX` |
| Chấm trước ship | `EVAL-*` + `QA` → Hội đồng KT |

### Chạy song song (khuyến nghị)

Dùng nhiều agent `generalPurpose` / Task, mỗi agent gắn **một mã ghế**, cùng nguồn `content/curriculum/lessons.json` + `js/app.js` / CSS liên quan. Trưởng phiên (agent chính) **không** tự chấm phần mình vừa sửa.

---

## 4. Thang điểm chung

`0` thiếu · `1` yếu · `2` đạt · `3` tốt cho trẻ 2–5

Findings:

- **P0 ≈ Mức 1** — sai kiến thức, chấm sai, đáng sợ, màn trống, an toàn/dữ liệu  
- **P1 ≈ Mức 2** — trẻ bối rối, không tự xong, TTS/hướng dẫn thiếu  
- **P2 ≈ Mức 3–4** — thẩm mỹ, sao/UI nhỏ  

---

## 5. Liên kết vận hành

| Việc | Lệnh / file |
|------|-------------|
| Audit data nhanh | `node scripts/audit-council-data.js` |
| Checklist ship | `docs/eval/release-gate-checklist.md` |
| Rule Cursor | `.cursor/rules/be-gau-to-hop-chuyen-gia.mdc` |
| Hội đồng KT | `docs/eval/hoi-dong-chuyen-gia-kt.md` |

---

*Phiên bản tổ hợp: 1.0 · 2026-10-05*
