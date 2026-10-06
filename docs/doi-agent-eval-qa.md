# Đội agent đánh giá & kiểm thử (EVAL / QA)

Đội **chấm điểm → findings → nâng cấp** cho app Bé Gấu (trẻ dưới 5 tuổi).

**Quy chế Hội đồng Kiểm thử (3–5 tuổi):** `docs/quy-che-hoi-dong-kiem-thu.md` · checklist phát hành `docs/eval/release-gate-checklist.md` · mẫu lỗi `docs/eval/bug-report-template.md` · 8 vai trò `docs/eval/vai-tro-8-kiem-thu.md`.

## Thành viên

| Mã | Phạm vi | Output |
|----|---------|--------|
| `EVAL-PEDA` | Giáo dục, scaffolding, feedback | `docs/eval/eval-peda.md` |
| `EVAL-VIS` | Nhận diện hình, target chạm | `docs/eval/eval-vis.md` |
| `EVAL-AUDIO` | TTS/SFX, NPC nói | `docs/eval/eval-audio.md` |
| `EVAL-GAME` | 5 mini-game | `docs/eval/eval-game.md` |
| `EVAL-SAFE` + `QA` | An toàn + E2E | `docs/eval/eval-qa-safe.md` |

Báo cáo tổng: `docs/eval/bao-cao-tong-hop.md`

## Thang điểm

`0` thiếu · `1` yếu · `2` đạt · `3` tốt cho trẻ 2–5

## Quy trình

1. Đọc code/content (không bịa).
2. Chấm tiêu chí + P0/P1/P2.
3. Agent chính sửa P0→P1.
4. Build APK + smoke lại.
