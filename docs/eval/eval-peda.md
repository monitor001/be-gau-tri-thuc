# EVAL-PEDA — Bé Gấu Giải Cứu Tri Thức

**Ngày đánh giá:** 2026-10-05  
**Vai trò:** `EVAL-PEDA`  
**Phạm vi đã đọc:** `docs/peda-muc-tieu-hoc.md`, `js/data.js`, `js/app.js`, `js/npc.js`, `content/curriculum/items.json`, `content/curriculum/regions.json`, `content/games/levels.json`  
**Thang điểm:** `0` thiếu · `1` yếu · `2` đạt · `3` tốt cho trẻ 2–5  
**Điểm TB:** **1.6 / 3**

---

## 1. Bảng điểm

| # | Tiêu chí | Điểm | Căn cứ (code / content) |
|---|----------|------|-------------------------|
| 1 | Khớp độ tuổi 2–3 vs 4–5 | **1** | `levels.json` có `ageBand` và số lựa chọn gần đúng bảng PEDA, nhưng **runtime chỉ đọc `BeGauData.levels` trong `js/data.js`** — không chọn tuổi, không lọc level. Mọi trẻ chơi tuần tự cùng path (màu 2→3→4 lựa chọn; chữ 2→3; đếm 3 rồi 5). Thiếu mục tiêu 4–5: màu tím/hồng/nâu (có trong `items.json` nhưng không vào game), hình chữ nhật/sao/tim + hỏi số cạnh, so sánh nhiều/ít hoặc dãy số thiếu, hành động chia sẻ/giúp. `regions.json.recommendedAge` không dùng. |
| 2 | Feedback cụ thể / nhận diện | **2** | Đúng màu/hình/số/chữ: `Đúng rồi! Đây là màu…` / `Hình…` / `Số…` / `Chữ…` (`app.js`). Sai màu có reteach `Tìm màu ${label} nhé!`. **Yếu:** `friend-match` khen chung “Bạn tốt quá!”; `softWrong` luôn “Thử lại cùng bạn đồng hành nhé!”; màn win lấy `praises[]` chung (“Bé giỏi quá!”) — không neo kỹ năng vừa cứu. |
| 3 | Scaffolding / hint / NPC dạy | **2** | `npc.js`: enter/tip/hint/correct/retry/teach + chạm avatar nghe lại. Idle 8s → `hint-pulse` + “Chạm vào đây nhé” (`scheduleHint`). Color sai → nhắc màu đích. **Thiếu so với PEDA §2/§4:** không đếm sai liên tiếp → không auto-scaffold sau 2 lần (bớt lựa chọn / highlight mạnh hơn); không giảm độ khó sau ≥3 lần; `maxDurationMs: 90000` trong `levels.json` **không enforce** trong `app.js`. |
| 4 | Learning outcomes đo được | **1** | `peda-muc-tieu-hoc.md` §5 định nghĩa 3 outcomes/vùng (≥2/3 lần không tính gợi ý mạnh). App chỉ lưu `be-gau-stars-v1` (sao vùng) + panel phụ huynh “x/5 sao” — **không log** thử đúng/sai, không tách lần có hint, không skill theo `regions.json.skills`. Thêm: `letter-pick` **đọc sẵn đáp án** trong prompt (`Chữ ${round.correct}`) → không đo được nhận diện chữ thật. |
| 5 | Độ dài câu / session | **2** | Prompt/NPC phần lớn ≤ ~12 từ, rate chậm qua TTS/NPC. Mỗi vùng 2–3 màn rồi sao; fail mềm, không countdown. **Thiếu:** nhắc nghỉ session 5–8′ (2–3) / 8–12′ (4–5); không khóa tạm / sticker nghỉ; không giới hạn thời lượng màn theo `defaults.maxDurationMs`. |

**Điểm TB = (1 + 2 + 2 + 1 + 2) / 5 = 1.6**

---

## 2. Findings (ưu tiên)

### P0 — Chữ cái đầu “Táo” → đáp án `A` sai ngữ âm/chính tả tiếng Việt
- **Chỗ:** `js/data.js` `letter-pick` round 1; `content/games/levels.json` `letter-pick-01` r1 (`wordVi: "Táo"`, `correct`/`correctLetter: "A"`). Curriculum gợi ý chữ A là “áo” (`items.json` `letter-a`).
- **Vì sao:** Từ **Táo** bắt đầu bằng **T**, không phải A. Trẻ 2–5 học âm đầu sẽ bị dạy sai. Đây là lỗi nhận diện cốt lõi Hang Chữ Cái.
- **Sửa:** Đổi tranh/từ thành **Áo** (hoặc giữ Táo và `correct: "T"`). Đồng bộ `data.js` + `levels.json` + TTS script nếu có.

### P0 — `letter-pick` spoiler đáp án trong prompt trước khi chọn
- **Chỗ:** `js/app.js` `runLetterPick` → `setPrompt(\`${level.promptVi} ${round.wordVi}. Chữ ${round.correct}.\`)`; chạm tranh còn đọc lại “Bắt đầu bằng chữ X”.
- **Vì sao:** Trẻ có thể chạm chữ vừa nghe mà không cần nhận diện. Outcomes PEDA Hang Chữ Cái (≤2 lần thử, nghe âm → chọn chữ) **không đo được**.
- **Sửa:** Prompt chỉ hỏi (“Chữ đầu của táo?”) + TTS tên từ; **không** nói sẵn chữ đúng. Sau khi đúng mới khen “Đúng rồi! Chữ A!”. Giữ spoiler chỉ sau ≥2 lần sai (scaffold).

### P0 — Không có đường chơi theo tuổi 2–3 / 4–5
- **Chỗ:** Không UI/state `ageBand`; `playLevel` luôn lấy toàn bộ `D.levels[gameId]` theo thứ tự. `levels.json.ageBand` và `regions.json.recommendedAge` bị bỏ qua.
- **Vì sao:** PEDA bắt buộc scaffold số lựa chọn & phạm vi nội dung theo tuổi. Trẻ 2–3 bị đẩy sang 3–4 lựa chọn và level “4–5” trong cùng vùng; trẻ 4–5 thiếu mục tiêu nâng (màu mới, cạnh hình, nhiều/ít, chia sẻ).
- **Sửa:** Parent gate hoặc onboarding chọn **2–3 / 4–5** → filter level theo `ageBand`; 2–3 chỉ 2 lựa chọn; 4–5 mở palette/kỹ năng mở rộng.

### P1 — Learning outcomes không được log / không hiện cho phụ huynh
- **Chỗ:** Storage chỉ `stars[]`; `#parent-progress` = số sao vùng.
- **Vì sao:** Checklist PEDA yêu cầu log 3 outcomes/vùng (đúng ≥2/3 không tính auto-gợi ý mạnh). Phụ huynh không biết bé nhận diện màu/hình/số/chữ thế nào — chỉ biết “đã mở sao”.
- **Sửa:** Log `{ regionId, skillId, attempts, correctUnaided, hinted }` mỗi bước; panel phụ huynh hiện checklist đạt/chưa theo `peda-muc-tieu-hoc.md` §5.

### P1 — Thiếu auto-scaffold sau sai liên tiếp
- **Chỗ:** `softWrong` không tăng `wrongStreak`; không bớt choice / không `hint-pulse` ngay sau lần 2.
- **Vì sao:** PEDA §2: sau 2 lần sai → gợi ý rõ hơn; §4: ≥3 lần → bớt lựa chọn. Hiện chỉ chờ idle 8s hoặc reteach màu (một game).
- **Sửa:** Đếm sai liên tiếp; lần 2 pulse đáp án; lần 3 ẩn 1 distractor (giữ win mềm).

### P1 — Nội dung 4–5 thiếu so với mục tiêu vùng
- **Chỗ:** Game thực tế vs `peda-muc-tieu-hoc.md` + `items.json` (tím/hồng/nâu, chữ nhật/sao, số 6–10 so sánh, cảm xúc/hành động thân thiện).
- **Vì sao:** Curriculum catalog đủ item nhưng mini-game chưa cover outcomes 4–5 (ghép màu đôi, hỏi số cạnh, nhiều hơn/ít hơn, chia sẻ/giúp).
- **Sửa:** Thêm 1 level/vùng cho band 4–5: màu cam+tím; hình “cái nào 3 cạnh?”; đếm so sánh 2 nhóm; friend-match “chia sẻ bánh / giúp bạn”.

### P1 — Không quản lý độ dài session / nghỉ
- **Chỗ:** Không timer session; `levels.json` `maxDurationMs` không đọc; không nhắc nghỉ ~10′.
- **Vì sao:** PEDA §3: session 5–8′ (2–3) / 8–12′ (4–5); quá tải cần đề xuất nghỉ.
- **Sửa:** Đồng hồ session (ẩn với trẻ); sau ngưỡng → sticker “Nghỉ một chút với bé Gấu”; phụ huynh chỉnh phút nghỉ.

### P2 — Feedback Vườn Bạn Bè / win chưa neo nhận diện
- **Chỗ:** `setFeedback("Bạn tốt quá!")`; `D.praises` generic.
- **Vì sao:** PEDA yêu cầu khen hành động cụ thể (“Cún về nhà cún rồi!” / “Bạn buồn được ôm!”).
- **Sửa:** Template theo pair (`${from} → ${to}`); win theo `region.skills`.

### P2 — Hai nguồn level lệch nhau (`data.js` vs `levels.json`)
- **Chỗ:** Runtime = `data.js`; design = `levels.json` (đếm 7 vs 5; letter 4 choices vs 3; có `distractCount`/`nearColors` không implement).
- **Vì sao:** PEDA/GAME sửa JSON sẽ không vào app → đánh giá và ship lệch.
- **Sửa:** Load `content/games/levels.json` (fallback `data.js`) hoặc generate một nguồn sự thật.

### P2 — Level màu `color-tap-02` gắn `ageBand: "2-3"` nhưng 3 lựa chọn
- **Chỗ:** `levels.json` + `data.js` level 2 màu.
- **Vì sao:** PEDA: 2–3 tuổi tối đa 2 lựa chọn.
- **Sửa:** Giữ 2 choice cho 2–3; chuyển 3 choice sang band 4–5 hoặc “2–3 nâng nhẹ” sau khi đã scaffold.

---

## 3. Điểm mạnh (đã thấy trong code — không bịa)

- Năm vùng khớp hành trình CURR; fail mềm, không mạng/countdown.
- Feedback đúng ở màu/hình/số/chữ **có tên khái niệm** — đúng hướng nhận diện.
- NPC đồng hành theo vùng (enter/tip/hint) + dạy lại khi sai màu.
- Idle hint 8s + pulse đáp án — scaffolding cơ bản có thật.
- Prompt tiếng Việt ngắn; cấu trúc 1–3 màn/vùng rồi sao phù hợp toddler.

---

## 4. Đề xuất nâng cấp (theo thứ tự)

1. **Sửa P0 chữ cái:** Táo→T hoặc Áo→A; bỏ spoiler chữ đúng khỏi prompt (chỉ scaffold sau sai).
2. **Chọn tuổi 2–3 / 4–5** → filter `ageBand`; enforce max 2 choice (2–3).
3. **Log outcomes** theo §5 PEDA + hiện ở panel phụ huynh (không chỉ sao).
4. **wrongStreak scaffold** (pulse → bớt distractor) trên mọi game.
5. **Bổ sung level 4–5** thiếu: màu mới, cạnh hình, nhiều/ít, hành động thân thiện.
6. **Nhắc nghỉ session** + đọc `maxDurationMs` (hoặc bỏ field nếu chưa dùng).
7. **Một nguồn level** (`levels.json` → runtime) + feedback cụ thể friend-match/win.

---

## 5. Tóm tắt trả về

| | |
|--|--|
| **Điểm TB** | **1.6 / 3** |
| **Top 5 findings** | (1) P0 “Táo”→A sai chữ cái đầu · (2) P0 prompt letter spoiler đáp án · (3) P0 không tách path 2–3 vs 4–5 · (4) P1 không log learning outcomes · (5) P1 thiếu scaffold sau sai liên tiếp |

**Kết luận:** Nền sư phạm MVP **đúng hướng** (nhận diện có tên, NPC dạy, fail mềm, câu ngắn) nhưng **chưa đủ để ship theo chuẩn PEDA**: lỗi chữ cái đầu, spoiler đo lường, và thiếu tách tuổi + outcome đo được. Ưu tiên **ba P0** trước khi mở rộng nội dung.
