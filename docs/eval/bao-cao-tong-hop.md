# Báo cáo tổng hợp EVAL / QA — vòng 2026-10-05

## Điểm theo đội

| Đội | Điểm TB | Agent |
|-----|---------|-------|
| EVAL-PEDA | **1.6 / 3** | [PEDA](6c70c54c-60a0-4dd0-81c0-032f0bc6209e) |
| EVAL-VIS | **1.8 / 3** | [VIS](432a9096-7f88-453f-81ec-d8f2a01f3592) |
| EVAL-AUDIO | **2.3 / 3** | [AUDIO](ebd42ac6-a2ba-4b6f-afa1-0f0feb118e6c) |
| EVAL-GAME | **2.5 / 3** | [GAME](a5c2d7e1-6d9a-419e-8696-c1dd254f6dec) |
| QA + SAFE | E2E 12P/0F · SAFE **2.6** | [QA](2d7e97f4-cf78-4dd8-a792-44c1b4a5e69b) |

## P0 (sửa trong vòng này)

1. Letter “Táo → A” sai tiếng Việt → đổi từ bắt đầu đúng bằng A  
2. Spoiler chữ đúng trong prompt letter-pick → bỏ  
3. Chưa dùng ageBand 2–3 / 4–5 → thêm chế độ tuổi phụ huynh  
4. Color-tap thiếu object neo + hue gần → thêm emoji object, tách xanh  
5. Chồng chữ prompt/NPC → gộp UI (prompt ẩn khi NPC dạy)  
6. `.hint-pulse` chỉ rõ ở color-tap → CSS chung mọi nút  

## P1 (ưu tiên sửa kèm)

- Scaffold sau 2–3 lần sai  
- TTS queue / giảm chồng timer  
- Home intro auto TTS sau unlock  
- Nút loa ≥ 64px  
- Win giữ NPC nói  
- Count L2 = 7; friend-match hint đúng đích  
- Privacy tip góc phụ huynh; font local fallback  

## Đã patch sau đánh giá

| Finding | Trạng thái |
|---------|------------|
| Táo→A sai | ✅ Đổi **Áo → A** |
| Spoiler chữ prompt | ✅ Bỏ |
| ageBand không dùng | ✅ Chọn 2–3 / 4–5 ở phụ huynh |
| Color thiếu object / hue gần | ✅ Emoji object; L3 không gộp xanh lá |
| Chồng chữ prompt/NPC | ✅ Prompt ẩn, còn bubble NPC |
| hint-pulse chỉ color | ✅ `.hint-pulse` chung |
| Scaffold 2 lần sai | ✅ Pulse + NPC gợi ý |
| TTS chồng timer | ✅ `speakSequential` |
| Home intro TTS | ✅ Khi bấm Chơi nào! |
| Win mất NPC | ✅ `#win-npc-slot` |
| Count L2=7 + friend hint | ✅ |
| Nút ≥64px + privacy tip | ✅ |

## Chi tiết

Xem `eval-peda.md`, `eval-vis.md`, `eval-audio.md`, `eval-game.md`, `eval-qa-safe.md`.
