# EVAL-GAME — Bé Gấu Giải Cứu Tri Thức

**Vai trò:** `EVAL-GAME`  
**Ngày đánh giá:** 2026-10-05  
**Phạm vi đã đọc:** `js/app.js`, `js/data.js`, `js/npc.js`, `docs/game-design-mini.md`, `content/games/levels.json` (+ đối chiếu `css/styles.css` cho `.hint-pulse`)  
**Thang điểm:** `0` thiếu · `1` yếu · `2` đạt · `3` tốt cho trẻ 2–5  
**Runtime thực tế:** level lấy từ `BeGauData.levels` trong `js/data.js` (không fetch `levels.json`).

**Tiêu chí / game:** win mềm · hint 8s · độ khó tăng dần · 1 ngón tay · giáo dục rõ · NPC hỗ trợ  

---

## 1. Bảng điểm tổng hợp

| Game | Win mềm | Hint 8s | Độ khó ↑ | 1 ngón | Giáo dục | NPC | **TB** |
|------|--------:|--------:|---------:|-------:|---------:|----:|-----:|
| `color-tap` | 3 | 3 | 3 | 3 | 3 | 3 | **3.0** |
| `shape-fit` | 3 | 1 | 2 | 3 | 3 | 3 | **2.5** |
| `count-together` | 3 | 1 | 2 | 3 | 2 | 3 | **2.3** |
| `letter-pick` | 3 | 1 | 3 | 3 | 2 | 3 | **2.5** |
| `friend-match` | 3 | 1 | 2 | 3 | 2 | 2 | **2.2** |

**Điểm TB cả 5 game:** **2.5 / 3**  
**Game yếu nhất:** `friend-match` (Vườn Bạn Bè) — **2.2 / 3**

---

## 2. Chi tiết từng game

### 2.1 `color-tap` — Rừng Màu Sắc · TB **3.0**

| Tiêu chí | Điểm | Căn cứ (code / data) |
|----------|-----:|----------------------|
| Win mềm | **3** | `softWrong` + khen; không lives/countdown; tiến độ đúng giữ nguyên. Chạm đủ `targetCount` → `advanceOrWin`. |
| Hint 8s | **3** | `scheduleHint(..., 8000)` + selector đúng màu; CSS `.choice.hint-pulse` có animation — **duy nhất game có hint nhìn thấy rõ**. |
| Độ khó ↑ | **3** | L1: 2 màu / count 3 → L2: 3 màu → L3: 4 màu / count 4 (`data.js`). Khớp tinh thần design. |
| 1 ngón tay | **3** | Chỉ tap `.choice`. |
| Giáo dục rõ | **3** | Prompt + khen gọi tên màu; sai → Đom Đóm nhắc màu đích (`NPC.say("dom-dom", …)`). |
| NPC hỗ trợ | **3** | Helper `dom-dom`; `enter` / `teach` / `hint` / `correct` / `retry` + tip khi sai. |

**Ghi chú:** Cùng một nút màu đúng có thể chạm lặp đến đủ `targetCount` — win rất mềm (ổn 2–3 tuổi), ít ép “tìm lại giữa nhiễu”.

---

### 2.2 `shape-fit` — Đồi Hình Khối · TB **2.5**

| Tiêu chí | Điểm | Căn cứ |
|----------|-----:|--------|
| Win mềm | **3** | Sai chỉ shake/`softWrong`; mảnh đã `filled` giữ; không reset màn. |
| Hint 8s | **1** | Có timer 8s → class `hint-pulse` trên `.shape-piece`, nhưng **CSS chỉ định nghĩa `.choice.hint-pulse`** → không nhấp nháy. Hint không chuyển sang lỗ đúng sau khi chọn hình; design muốn lỗ/viền đích. |
| Độ khó ↑ | **2** | 2 hình → 3 hình (+tam giác). Chỉ 2 level; design `preferInput: drag` ở L2 chưa có — chỉ tap-tap. |
| 1 ngón tay | **3** | Tap hình rồi tap lỗ. |
| Giáo dục rõ | **3** | Nhãn Tròn/Vuông/Tam giác; feedback gọi tên hình khi đúng. |
| NPC hỗ trợ | **3** | Helper `be-gau`; tip cạnh/hình trong `HELP_LINES["doi-hinh-khoi"]`. |

---

### 2.3 `count-together` — Suối Đếm Số · TB **2.3**

| Tiêu chí | Điểm | Căn cứ |
|----------|-----:|--------|
| Win mềm | **3** | Sai số → `softWrong`; đã tap quả giữ; không phạt. |
| Hint 8s | **1** | L1 hint `.count-item:not(.tapped)` (ý đúng) nhưng **không có CSS pulse**. L2 `scheduleHint(".num-btn")` → **mọi thẻ số** cùng class — không chỉ số đúng. |
| Độ khó ↑ | **2** | Runtime: đếm 3 (2 lựa chọn, bắt buộc tap) → đếm 5 (3 lựa chọn, bỏ qua tap). `levels.json` thiết kế L2 = **7** vật / 4 thẻ — **chưa đồng bộ** `data.js`. |
| 1 ngón tay | **3** | Tap quả + tap số. |
| Giáo dục rõ | **2** | TTS đếm “một… hai…” khi tap — tốt. L2 `requireTapEach: false` cho chọn số ngay → dễ bỏ pha đếm (design cho 4–5 nhưng scaffolding đếm tuần tự chưa có). |
| NPC hỗ trợ | **3** | Helper `soc`; tip “đếm chậm từng cái”. |

---

### 2.4 `letter-pick` — Hang Chữ Cái · TB **2.5**

| Tiêu chí | Điểm | Căn cứ |
|----------|-----:|--------|
| Win mềm | **3** | Sai chỉ thử lại round; không reset cả màn; `advanceOrWin` sau đủ rounds. |
| Hint 8s | **1** | Selector đúng `.letter-btn[data-correct="1"]` nhưng **không có CSS `.letter-btn.hint-pulse`**. |
| Độ khó ↑ | **3** | L1: 2 round / 2 chữ → L2: 3 round / 3 chữ (M–N, C–O…). |
| 1 ngón tay | **3** | Tap thẻ chữ. |
| Giáo dục rõ | **2** | Mục tiêu chữ cái đầu rõ; **nhưng** `setPrompt` ghép sẵn `Chữ ${round.correct}` → lộ đáp án trước khi chọn (dạy thụ động, yếu khám phá). Chạm tranh nghe lại từ — tốt. |
| NPC hỗ trợ | **3** | Helper `be-gau`; teach + tip âm đầu; chạm tranh → `NPC.say` từ + chữ. |

---

### 2.5 `friend-match` — Vườn Bạn Bè · TB **2.2** ⚠️ yếu nhất

| Tiêu chí | Điểm | Căn cứ |
|----------|-----:|--------|
| Win mềm | **3** | Sai `softWrong`; cặp `done` giữ; không lives. |
| Hint 8s | **1** | `scheduleHint(".match-item:not(.done)")` → **toàn bộ** thẻ chưa xong (trái + phải). Không hint đích đúng sau khi chọn bạn. Không CSS pulse. |
| Độ khó ↑ | **2** | 2 cặp → 3 cặp (+cảm xúc). `levels.json` có `extraTargets` nhiễu ở L2 — **chưa có trong `data.js`**. Không drag. |
| 1 ngón tay | **3** | Tap-tap. |
| Giáo dục rõ | **2** | Cún–nhà / cá–bể rõ. L2 trộn cảm xúc nhưng khen chỉ “Bạn tốt quá!” — không nhắc lại cặp vừa học. |
| NPC hỗ trợ | **2** | Helper `dom-dom` + tip vùng ổn; sau sai không gợi ý cặp cụ thể (khác `color-tap` nhắc màu đích). |

---

## 3. Findings (P0 / P1 / P2)

### P0 — Hint nhìn thấy hầu như chỉ hoạt động ở `color-tap`
- **Chỗ:** `css/styles.css` chỉ có `.choice.hint-pulse`; `app.js` vẫn gắn `hint-pulse` cho shape / count / letter / match.
- **Vì sao:** Spec + `levels.json` `hintAfterMs: 8000` yêu cầu gợi ý **nhìn thấy** (nhấp nháy / phóng to đích). 4/5 game chỉ còn TTS chung “Chạm vào đây nhé”.
- **Sửa:** Thêm rule chung `.hint-pulse` (hoặc từng loại nút) + animation pulse/outline.

### P0 — `friend-match` & `count-together` L2 hint sai đích
- **Chỗ:** `runFriendMatch` → mọi `.match-item:not(.done)`; `runCountTogether` L2 → mọi `.num-btn`.
- **Vì sao:** Scaffolding toddler phải chỉ **một** mục tiêu đúng; pulse cả bàn làm nhiễu.
- **Sửa:** Sau khi chọn “from” → hint `to` đúng; với số → hint nút `n === level.count`.

### P1 — Runtime `data.js` lệch `levels.json`
- **Chỗ:** `count-together` L2: data = 5/3 lựa chọn vs JSON = 7/4; `friend-match` thiếu `extraTargets`; `color-tap` L3 `targetCount` 4 vs JSON 5; `letter-pick` L2 round Ong: 3 vs 4 chữ.
- **Vì sao:** Design/`ageBand` 4–5 không vào app; độ khó ↑ yếu hơn tài liệu.
- **Sửa:** Đồng bộ `BeGauData.levels` với JSON (hoặc load JSON).

### P1 — `letter-pick` lộ đáp án trong prompt
- **Chỗ:** `runLetterPick` → `` `${level.promptVi} ${round.wordVi}. Chữ ${round.correct}.` ``
- **Vì sao:** Trẻ không cần nhận diện — chỉ chạm chữ đã nghe. Spec: gợi ý âm/chữ sau scaffolding 8s, không spoil ngay.
- **Sửa:** Prompt = tranh + từ; sau 8s (hoặc chạm loa lần 2) mới nói “Chữ …”.

### P1 — Hint không gắn lại sau tương tác / không theo bước 2-tap
- **Chỗ:** `scheduleHint` gọi 1 lần đầu level; `shape-fit` / `friend-match` sau khi chọn mảnh/bạn không đổi selector sang slot/`to` đúng.
- **Vì sao:** Design 2 pha (chọn → đích) cần hint theo pha.
- **Sửa:** `clearHint` + `scheduleHint` lại mỗi lần đổi `selected` / sau `softWrong`.

### P2 — Chưa có kéo-thả dù design ghi `drag-or-tap-tap`
- **Chỗ:** `shape-fit`, `friend-match` chỉ click.
- **Vì sao:** Tap-tap đạt cho 2–3 tuổi; L2 `preferInput: "drag"` trong JSON chưa làm.
- **Sửa:** Giữ tap-tap làm fallback; thêm drag đơn giản cho 4–5 khi ổn định hint.

### P2 — Không enforce `maxDurationMs: 90000`
- **Chỗ:** `levels.json` defaults có `maxDurationMs` / `countdown: false`; app không đọc field này (ổn vì không countdown), cũng không soft-nudge sau 90s.
- **Vì sao:** Spec “≤90s” là mục tiêu thiết kế level, không bắt buộc timer — chấp nhận được nếu level ngắn. Theo dõi playtest.

---

## 4. Điểm mạnh chung (đã thấy trong code)

- **Win mềm thống nhất:** `softWrong` + không lives/countdown; cặp/hình đúng giữ lại.
- **Một ngón tay** mọi game (tap hoặc tap-tap).
- **Hint timer 8s** có trong `scheduleHint` — đúng `hintAfterMs` thiết kế.
- **NPC theo vùng** (`REGION_HELPER` + `HELP_LINES`): enter / teach / hint / correct / retry / win.
- **Không fail-state nặng**; luôn quay map / chơi lại.

---

## 5. Đề xuất nâng cấp (ưu tiên)

1. **CSS `.hint-pulse` dùng chung** cho mọi nút chơi (P0) — ưu tiên ship.
2. **`friend-match`:** hint đúng cột đích theo cặp đã chọn; NPC nhắc tên cặp khi sai; thêm 1 ô nhiễu L2 như JSON (P0/P1).
3. **`count-together`:** hint chỉ thẻ số đúng; đồng bộ L2 = 7; highlight đếm tuần tự (P0/P1).
4. **`letter-pick`:** bỏ lộ chữ trong prompt; để hint 8s / nút loa dạy chữ (P1).
5. **`shape-fit`:** sau chọn hình → pulse lỗ khớp; mờ lỗ sai ~30% như design (P1).

---

## 6. Tóm tắt trả về

| | |
|--|--|
| **Game yếu nhất** | **`friend-match`** (TB **2.2**) |
| **Vì sao** | Hint pulse sai đích + không có CSS; feedback/NPC ít dạy lại cặp; L2 thiếu nhiễu & scaffolding cảm xúc so với design |
| **5 đề xuất** | (1) CSS hint chung · (2) friend-match hint/NPC/cặp · (3) count hint + L2=7 · (4) letter không spoil · (5) shape hint lỗ đúng |

**Kết luận:** Cơ chế win mềm và 1 ngón tay **đạt tốt** trên cả 5 game. Scaffolding 8s **chỉ thực sự tốt ở `color-tap`**. Trước khi ship tablet: sửa **P0 hint visual + selector đích** — bắt đầu từ `friend-match` và `count-together`.
