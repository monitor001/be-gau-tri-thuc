# EVAL-VIS — Bé Gấu Giải Cứu Tri Thức

**Ngày đánh giá:** 2026-10-05  
**Vai trò:** `EVAL-VIS`  
**Phạm vi đã đọc:** `index.html`, `css/styles.css`, `js/app.js`, `js/data.js`, `js/npc.js`  
**Thang điểm:** `0` thiếu · `1` yếu · `2` đạt · `3` tốt cho trẻ 2–5  
**Điểm TB:** **1.8 / 3**

---

## 1. Bảng điểm

| # | Tiêu chí | Điểm | Căn cứ (code) |
|---|----------|------|----------------|
| 1 | Kích thước target chạm | **2** | Play chính ổn: `.choice` ≤140px / ≥42vw, `.num-btn` 88px, `.letter-btn` 96px, `.shape-*` 100px, `.region-card` min-height 88px, `.count-item` 72px. **Dưới chuẩn toddler 64–80dp:** `.btn.icon` 52×52, `.btn.speak` 56×56, `.npc-speak-btn` 48×48. |
| 2 | Tương phản màu | **2** | Ink `#2a2a2a` trên cream, CTA coral + chữ trắng, nền gradient trời–đồng rõ. **Yếu:** `.choice` luôn `color: white` trên vàng `#f1c40f` (tương phản thấp); feedback `--leaf` trên nền meadow dễ lẫn; cam `#e67e22` gần đỏ `#e74c3c`. |
| 3 | Icon / emoji rõ cho trẻ | **2** | Letter/count/friend có emoji lớn (🍎⚽🐱, `letter-picture` 3.5rem). Shape CSS (tròn/vuông/tam giác) + màu khác nhau — tốt. **Yếu:** color-tap chỉ ô màu + chữ “Đỏ/Vàng”, không object; vùng map 🔢🔤 trừu tượng; Đom Đóm dùng ✨ thay vì hình đom đóm. |
| 4 | Ít chữ trên UI trẻ | **1** | Game chồng chữ: `#game-prompt` + `#npc-bubble` (NPC prepend tên) + `#game-feedback` + tip/label. Home tagline kỹ thuật (“TTS tiếng Việt…”). Map: tiêu đề + status + `npc-tip`. Shape gắn thêm chữ “Tròn/Vuông…”. Trẻ 2–3 bị overload đọc. |
| 5 | Phân biệt lựa chọn (màu gần, hình) | **2** | Level 1 màu đỏ/vàng tách rõ; shape multimodal (hình+màu); số/chữ kích thước lớn. **Yếu:** color level 3 gộp xanh dương/xanh lá + đỏ/cam — cùng hình chữ nhật, chỉ khác hue + label; không object neo nhận diện. |

**Điểm TB = (2 + 2 + 2 + 1 + 2) / 5 = 1.8**

---

## 2. Findings (ưu tiên)

### P0 — Color-tap: lựa chọn gần màu + không neo object
- **Chỗ:** `data.js` level 3 `color-tap` (blue/green/red/orange); `app.js` `runColorTap` chỉ `btn.style.background` + `labelVi`; `styles.css` `.choice` cùng kích thước/hình.
- **Vì sao:** Trẻ 2–5 hay nhầm “xanh” và đỏ–cam khi không có quả/lá/sao minh họa; prompt nói “quả bóng / lá / ngôi sao” nhưng UI không hiện object → nhận diện màu không đo được đúng.
- **Sửa CSS/UI:**
  - Mỗi choice: emoji/object lớn phía trên chữ (🔴🟡🔵🟢🟠 hoặc 🍎🍃⭐).
  - Level gần hue: thêm viền dày khác nhau hoặc pattern nhẹ (chấm/sọc) — không chỉ hue.
  - Text trên nền vàng: `color: var(--ink)` hoặc `filter` nền đậm hơn `#e6b800`.

```css
.choice {
  color: var(--ink);
  text-shadow: none;
  gap: 0.35rem;
}
.choice .choice-emoji { font-size: 2.6rem; line-height: 1; }
.choice[data-color="yellow"] { background: #f0c400; }
.choice[data-color="blue"] { box-shadow: 0 8px 0 #1f6fa8; }
.choice[data-color="green"] { box-shadow: 0 8px 0 #1e7a45; }
```

### P0 — Chồng chữ prompt + bubble NPC trên màn chơi
- **Chỗ:** `index.html` `#game-prompt` + `#npc-companion` bubble; `npc.js` `say()` ghi `bé Gấu: …` vào bubble; `app.js` `setPrompt` → `NPC.teach` đồng bộ cùng nội dung.
- **Vì sao:** EVAL-VIS ưu tiên ít chữ; cùng một ý hiện 2–3 lần → trẻ bỏ qua hình chơi, phụ thuộc đọc.
- **Sửa UI:**
  - Màn game: **ẩn** `#game-prompt` khi có NPC bubble (hoặc ngược lại) — một dòng text + nút 🔊.
  - Bubble chỉ hiện câu ngắn ≤8–10 từ; bỏ prefix `"bé Gấu: "` trên UI trẻ (giữ trong TTS nếu cần).
  - `#game-feedback` chỉ icon/emoji + 2–4 từ (“Giỏi!” / “Thử lại!”).

```css
#screen-game .prompt { display: none; } /* khi npc-companion visible */
.npc-bubble { font-size: 1.05rem; max-width: 18rem; }
.feedback { font-size: 1.25rem; min-height: 2rem; }
```

### P1 — Nút loa / back / home dưới 64–80dp
- **Chỗ:** `.btn.speak` 56px; `.btn.icon` 52px; `.npc-speak-btn` 48px (`styles.css`).
- **Vì sao:** Target toddler khuyến nghị ≥64–80dp; nút nghe lại là lối thoát khi không đọc được chữ.
- **Sửa CSS:**

```css
.btn.speak { width: 72px; height: 72px; border-radius: 22px; font-size: 1.7rem; }
.btn.icon { width: 72px; height: 72px; border-radius: 20px; font-size: 1.6rem; }
.btn.speak.npc-speak-btn { width: 64px; height: 64px; }
.topbar { grid-template-columns: 72px 1fr auto; }
```

### P1 — Icon vùng map / NPC Đom Đóm chưa “đọc hình” được
- **Chỗ:** `data.js` emoji `🔢` `🔤`; `npc.js` Đom Đóm `✨`.
- **Vì sao:** Ký hiệu chữ/số trừu tượng; ✨ không = đom đóm → trẻ không gắn vùng với nội dung học.
- **Sửa data/UI:** `suoi-dem-so` → `3️⃣` hoặc `🔢`→`💎`/`🍎`; `hang-chu-cai` → `🅰️`/`📖`; Đom Đóm → `🪲` hoặc sprite CSS vàng phát sáng (đã có `.firefly` trên home — tái dùng).

### P2 — Shape/match còn phụ thuộc chữ; màu vàng chữ trắng
- **Chỗ:** `runShapeFit` gắn label “Tròn/Vuông/Tam giác”; `.choice { color: white }` trên mọi hue; `.match-item` min-height 72 nhưng chữ+emoji cùng dòng nhỏ.
- **Vì sao:** Scaffolding chữ OK cho 4–5 tuổi, nhưng 2–3 tuổi nên ưu tiên hình; vàng+trắng kém đọc.
- **Sửa:** Shape: ẩn label dưới 3 tuổi / chỉ TTS tên hình; match: `font-size: 1.5rem` + emoji `2rem` stacked; vàng dùng chữ tối.

---

## 3. Đề xuất nâng cấp cụ thể (CSS / UI)

| Ưu tiên | Thay đổi | File |
|---------|----------|------|
| P0 | Object emoji trên mỗi `.choice`; tách xanh dương/lá bằng viền/pattern | `app.js` `runColorTap`, `styles.css`, `data.js` |
| P0 | Một kênh chữ trên game (prompt **hoặc** bubble) | `index.html` / `styles.css` / `npc.js` |
| P1 | Speak & icon ≥ 72×72; npc-speak ≥ 64×64 | `styles.css` |
| P1 | Đổi emoji vùng + Đom Đóm rõ nghĩa | `data.js`, `npc.js` |
| P2 | `.choice[data-color="yellow"]` chữ tối; tăng emoji letter/match | `styles.css` |
| P2 | Giảm tagline home còn “Nhìn · Nghe · Chơi!” (bỏ “TTS…”) | `index.html` |
| P2 | `count-item` ≥ 80px khi có emoji để dễ chạm | `styles.css` |

### Snippet gợi ý color choice (JS)

```js
btn.innerHTML = `<span class="choice-emoji" aria-hidden="true">${emojiFor(choice.color)}</span>
<span class="choice-label">${choice.labelVi}</span>`;
```

### Checklist nhận diện trước ship
- [ ] Mọi lựa chọn màu có object/emoji, không chỉ swatch
- [ ] Không hai màu “gần họ” cạnh nhau nếu chưa có neo khác (hình/pattern)
- [ ] Target chạm chính & loa ≥ 64px (khuyến nghị 72+)
- [ ] Màn game ≤ 1 khối chữ hướng dẫn hiển thị cùng lúc
- [ ] Emoji vùng/NPC đọc được nghĩa không cần chữ

---

## 4. Tóm tắt nhanh

| | |
|--|--|
| **Điểm TB** | **1.8 / 3** |
| **Ship?** | Chưa — cần xử lý **P0** (color neo object + giảm chồng chữ) trước khi coi nhận diện đạt toddler |
| **Điểm mạnh** | Target play chính lớn; shape multimodal; letter-picture emoji to; region-card 88px |
| **Điểm yếu** | Color-tap trừu tượng + hue gần; text overload game; nút loa/back nhỏ |
