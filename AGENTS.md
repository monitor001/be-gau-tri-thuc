# Tổ hợp Subagent Giáo dục — Bé Gấu Giải Cứu Tri Thức

App học chơi cho trẻ **dưới 5 tuổi**. Nhân vật chính: **bé Gấu** (gấu hoạt hình dễ thương). Cốt truyện: hành trình nhẹ nhàng tìm lại và “giải cứu” các mảnh tri thức bị lạc — không bạo lực, không thua cuộc gây sợ.

## Vai trò subagent (dùng khi phát triển app)

| Mã | Tên | Nhiệm vụ |
|----|-----|----------|
| `PEDA` | Sư phạm mầm non | Mục tiêu học, độ tuổi 2–5, scaffolding, feedback tích cực |
| `STORY` | Kể chuyện thế giới | Cốt truyện bé Gấu, chương, NPC, lời thoại ấm áp tiếng Việt |
| `GAME` | Mini-game nhẹ | Cơ chế tap/kéo/match đơn giản, thời gian ngắn, luôn thắng được |
| `UX` | UX trẻ nhỏ | Nút lớn, ít chữ, âm thanh, màu tương phản, an toàn tương tác |
| `CURR` | Chương trình học | Màu, hình, số 1–10, chữ cái cơ bản, động vật, thói quen tốt |
| `SAFE` | An toàn trẻ em | Không quảng cáo lừa, không chat ngoài, không thu thập dữ liệu nhạy cảm |
| `AUDIO` | Kiến trúc âm thanh | TTS + SFX, unlock audio, nút loa, không chồng lời |
| `VOICE` | Kịch bản giọng đọc | Câu ngắn tiếng Việt, nhịp tự nhiên (rate ~0.95), dễ nghe cho trẻ |
| `SFX` | Âm hiệu nhẹ | Chạm đúng / thử lại / sao — dịu, không gây sợ |
| `EVAL-PEDA` | Đánh giá giáo dục | Chấm mục tiêu tuổi, feedback, scaffolding |
| `EVAL-VIS` | Đánh giá nhận diện | Hình/màu/target chạm có rõ với trẻ không |
| `EVAL-AUDIO` | Đánh giá TTS/SFX | Nhịp chậm, nghe lại, không chồng lời |
| `EVAL-GAME` | Đánh giá game | Win mềm, hint, độ khó tăng dần |
| `EVAL-SAFE` | Đánh giá an toàn | Nội dung + privacy trẻ |
| `QA` | Kiểm thử E2E | Flow toàn app, regression trước khi ship |

### Chuẩn âm thanh (bắt buộc)

- Mọi hướng dẫn và feedback quan trọng phải có **TTS `vi-VN`**, rate **~0.95** (giọng AI đã chậm sẵn — không ép 0.8), pitch ~**1.1**.
- Trẻ có thể chạm nút loa để nghe lại.
- Phụ huynh bật/tắt tiếng trong góc Người lớn.

## Quy tắc chung cho mọi agent

1. Nội dung **tiếng Việt** ưu tiên; giọng ấm, ngắn, dễ nghe.
2. “Chiến đấu” = **giúp đỡ / tìm / ghép / tô màu / đếm** — không đánh đấm, không máu, không kẻ thù đáng sợ.
3. Mỗi màn chơi ≤ **60–90 giây**; có thể chơi bằng một ngón tay.
4. Thất bại chỉ là “thử lại cùng bé Gấu”, không trừ mạng, không countdown áp lực.
5. Phụ huynh có thể xem tiến độ; trẻ không cần tài khoản.

## Mô hình nội dung (bắt buộc)

**1 màn = 1 bài học.** Không gộp 3 bài trong một màn.

Luồng: `Chủ đề → Màn → Khám phá cùng trợ lý → Qua cửa → Xu Gấu → Cửa hàng thưởng`.

Kho hiện tại: **107 màn / 11 chủ đề** (Hang Chữ Latin A–Z = 26) — liệt kê đầy đủ: `docs/curr-danh-sach-man.md` · data: `js/lessons-data.js`.

Ví dụ: Số 1–10 = 10 màn; mỗi chữ cái = 1 màn; mỗi màu / hình / con vật / đồ vật = 1 màn.

## Cách gọi tổ hợp trong Cursor

**Hội đồng Chuyên gia Giáo dục (CỔNG BẮT BUỘC nội dung):** `docs/eval/hoi-dong-chuyen-gia-giao-duc.md` · rule `.cursor/rules/be-gau-hoi-dong-giao-duc.mdc` (**alwaysApply**)  
→ Chương trình **chủ yếu là ảnh**: ghế **HDGD-VIS** phải **mở file ảnh** (che chữ). Báo cáo ảnh: `docs/eval/bao-cao-hdgd-danh-gia-anh-2026-10-05.md`  
→ **Cấm** gen AI / rebuild / kết luận Đạt chỉ bằng audit máy. Luồng: Brief PEDA+VIS → Hội đồng Đạt → Thực thi → mở lại ảnh → `npm run audit:lessons` → APK.

**Tổ hợp Chuyên gia (thiết kế + phân tích nội dung):** `docs/to-hop-chuyen-gia.md` · rule `.cursor/rules/be-gau-to-hop-chuyen-gia.mdc`

**Hội đồng Kiểm duyệt Nội dung bài học:** `docs/eval/hoi-dong-kiem-duyet-noi-dung.md` · rule `.cursor/rules/be-gau-content-council.mdc` · canonical màu `content/curriculum/color-explore-canonical.json` · `node scripts/sync-color-explore.js` · `node scripts/audit-content-council.js`

**Chuyên gia Giáo dục Thẩm định (theo chủ đề):** `docs/eval/chuyen-gia-giao-duc-tham-dinh.md` · rule `.cursor/rules/be-gau-tham-dinh-giao-duc.mdc`

**Hội đồng Thẩm định Từng Bài** (1 phiếu / 1 `lesson.id`, chặn “suy mẫu”): `docs/eval/hoi-dong-tham-dinh-tung-bai.md` · rule `.cursor/rules/be-gau-tham-dinh-tung-bai.mdc` · `npm run audit:lessons` → `docs/eval/phieu-tung-bai.md` · tint đúng màu: `npm run tint`

Khi cần thiết kế, phân tích hoặc kiểm thử nội dung đa lĩnh vực, nêu rõ:

- “Mở **Tổ hợp Chuyên gia** — phân tích chủ đề / bản …”
- “Với tư cách `PEDA` + `GAME`, thiết kế màn Rừng Màu Sắc…”
- “Với tư cách `STORY` + `GFX`, duyệt captive / map…”
- “Với tư cách `UX` + `SAFE`, review màn hình chính…”
- “Với tư cách `AUDIO` + `VOICE`, viết hướng dẫn TTS nhịp chậm…”

Chi tiết đội âm thanh: `docs/doi-agent-am-thanh.md` · rule `.cursor/rules/be-gau-audio-tts.mdc`.

NPC đồng hành (hình + TTS cùng lúc): `docs/npc-dong-hanh.md` · `js/npc.js` — bé Gấu, Đom Đóm Lấp, Sóc Bản Đồ.

**Hội đồng Kiểm thử** (xác nhận trên build, tách khỏi Tổ hợp): `docs/doi-agent-eval-qa.md` · quy chế `docs/quy-che-hoi-dong-kiem-thu.md` · thành lập `docs/eval/hoi-dong-chuyen-gia-kt.md` · rule `.cursor/rules/be-gau-eval-qa.mdc` · báo cáo `docs/eval/` · audit `node scripts/audit-council-data.js`.

Hoặc chạy song song nhiều agent với prompt gắn mã ghế ở trên.
