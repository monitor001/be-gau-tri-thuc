# EVAL — QA + SAFE — Bé Gấu Giải Cứu Tri Thức

**Vai trò:** `QA` + `EVAL-SAFE`  
**Ngày:** 2026-10-05  
**Phương pháp:** Đánh giá tĩnh theo code/file đã đọc (không chạy tay trên thiết bị trong phiên này).  
**Phạm vi đã đọc:** `js/app.js`, `js/npc.js`, `js/tts.js`, `js/data.js`, `js/sfx.js`, `index.html`, `docs/an-toan-tre-em.md`, `android/app/src/main/AndroidManifest.xml`, `README.md`, `package.json` (không có SDK ads/analytics).

**Thang điểm SAFE:** `0` thiếu · `1` yếu · `2` đạt · `3` tốt cho trẻ 2–5  

**Tóm tắt E2E:** **Pass 12 · Fail 0 · Unknown 3**  
**P0:** **không có**

---

## 1. Checklist E2E (Home → Map(+NPC) → 5 games → Win → Ending → parent gate → reset → TTS toggle → NPC tap)

| # | Bước | Kết quả | Bằng chứng file |
|---|------|---------|-----------------|
| 1 | Home → Map | **Pass** | `index.html` `#btn-play`, `#screen-home` / `#screen-map`. `js/app.js` `btn-play` → `renderMap()` + `show("map")` + `NPC.showMapCompanions()` + TTS Sóc. |
| 2 | Map hiện NPC strip + chạm nghe | **Pass** | `index.html` `#npc-map-strip`. `js/npc.js` `showMapCompanions()` render 3 avatar; click → `say(...)`. Tip UI: `index.html` `.npc-tip`. |
| 3 | Mở khóa tuần tự 5 vùng | **Pass** | `js/data.js` 5 `regions` (5 `starId`). `js/app.js` `isUnlocked`: vùng 0 luôn mở; vùng sau cần sao vùng trước. |
| 4 | Game 1 — Rừng Màu (`color-tap`) | **Pass** | `data.js` `levels["color-tap"]` (3 level). `app.js` `runners["color-tap"]` → `runColorTap`; sai → `softWrong` (thử lại). |
| 5 | Game 2 — Đồi Hình (`shape-fit`) | **Pass** | `data.js` `shape-fit`. `app.js` `runShapeFit` (chạm hình → chạm lỗ). |
| 6 | Game 3 — Suối Số (`count-together`) | **Pass** | `data.js` `count-together`. `app.js` `runCountTogether`. |
| 7 | Game 4 — Hang Chữ (`letter-pick`) | **Pass** | `data.js` `letter-pick`. `app.js` `runLetterPick`. |
| 8 | Game 5 — Vườn Bạn (`friend-match`) | **Pass** | `data.js` `friend-match`. `app.js` `runFriendMatch`. |
| 9 | Win sau khi xong vùng | **Pass** | `app.js` `advanceOrWin`: lưu `starId` vào `localStorage` (`be-gau-stars-v1`), `show("win")`, `NPC.win`, SFX win. `index.html` `#screen-win`. |
| 10 | Ending khi đủ 5 sao | **Pass** | `app.js` `#btn-win-map`: nếu `starCount() >= 5` → `show("ending")` + chuỗi TTS ending. `data.js` `ending[]`. `index.html` `#screen-ending`. |
| 11 | Parent gate → góc phụ huynh | **Pass** | `index.html` `#btn-parent`, `#parent-gate`, `#parent-panel`. `app.js` `openParentGate` (phép cộng ngẫu nhiên); chỉ mở panel khi `returnValue === "ok"` **và** đáp án đúng. |
| 12 | Reset tiến độ | **Pass** | `app.js` `#btn-reset`: `state.stars = []` + `saveStars()` + cập nhật badge. Parent chỉ trên Home; lần vào Map sau gọi lại `renderMap()` → khóa lại đúng. |
| 13 | TTS toggle (bật/tắt) | **Pass** | `app.js` `#btn-sound-toggle` → `TTS.setEnabled`. `tts.js` lưu `be-gau-tts-enabled`; tắt → `stop()`. `sfx.js` tôn trọng `BeGauTTS.isEnabled()`. |
| 14 | NPC tap trong game (avatar / nghe lại) | **Pass** | `npc.js` `renderCompanion`: click avatar → `help()`; `#btn-npc-repeat` → `say` lại. `app.js` `NPC.enter` / `teach` / feedback qua NPC. |
| 15 | TTS `vi-VN` thực sự nghe được trên máy | **Unknown** | Code sẵn (`tts.js` `lang: vi-VN`, rate ~0.8); chưa chạy thiết bị/APK trong phiên đánh giá này. Phụ thuộc gói TTS Việt trên máy. |
| 16 | E2E đầy đủ trên APK Android | **Unknown** | `README.md` có APK debug; `AndroidManifest.xml` có `INTERNET`. Chưa cài/chạy tay flow Home→Ending trên máy. |
| 17 | Unlock audio sau gesture đầu (Android) | **Unknown** | Có code: `app.js` `pointerdown` once + `TTS.unlock` / `SFX.unlock`; chưa xác nhận hành vi trên WebView thật. |

### Tổng E2E

| Pass | Fail | Unknown |
|------|------|---------|
| **12** | **0** | **3** |

*(Hàng 1–14 = Pass; 15–17 = Unknown. Không Fail cấu trúc flow.)*

---

## 2. Bảng điểm SAFE

| # | Tiêu chí | Điểm | Căn cứ |
|---|----------|------|--------|
| 1 | Nội dung an toàn (không bạo lực / không đáng sợ) | **3** | “Giải cứu” = tìm/ghép/đếm/ghép bạn (`data.js`, 5 mini-game). Sai = `softWrong` / “Thử lại cùng bạn đồng hành”; không trừ mạng, không countdown áp lực (chỉ hint sau 8s). Ending: “Tri thức không cần đánh nhau…”. SFX sine/triangle nhẹ (`sfx.js`). |
| 2 | Privacy (không PII trẻ; dữ liệu tối thiểu) | **2** | Chỉ `localStorage`: sao + cờ TTS. Không form tên/email/SĐT/ảnh. Manifest **không** CAMERA/LOCATION/RECORD_AUDIO/CONTACTS. **Trừ điểm:** `index.html` load Google Fonts (mạng bên thứ ba); Manifest `INTERNET` + `allowBackup="true"`; chưa có chính sách riêng tư trong UI phụ huynh (`docs/an-toan-tre-em.md` khuyến nghị). |
| 3 | Không ads trong luồng trẻ | **3** | Không SDK ads/analytics trong `package.json` / JS play. Không banner/interstitial trên Home–Map–Game–Win–Ending (`index.html` + `app.js`). |
| 4 | Parent gate | **2** | Gate phép cộng trước `#parent-panel` (reset, TTS toggle, nghe thử). Không chat / không nút “ra ngoài” trên màn trẻ. **Chưa đạt 3:** gate đơn giản (tổng 4–10); sai đáp án đóng dialog im lặng; không có lộ trình ngoài cần gate khác ngoài khu người lớn. |
| 5 | Không sợ / fail mềm | **3** | Không jump scare, không kẻ thù đáng sợ. Intro “Đừng sợ nhé” mang tính trấn an. Hint pulse khích lệ; win/ending khen. |

**Điểm TB SAFE = (3 + 2 + 3 + 2 + 3) / 5 = 2.6 / 3**

---

## 3. Findings

### P0 — Phải sửa trước khi ship

*Không có P0 từ đánh giá tĩnh này.*  
(Không ads, không thu PII, có parent gate cho khu người lớn, nội dung dịu, flow E2E cấu trúc đủ.)

### P1

1. **Google Fonts mạng ngoài trên mọi màn (kể cả luồng trẻ)**  
   - **Chỗ:** `index.html` preconnect + stylesheet `fonts.googleapis.com` / `fonts.gstatic.com`.  
   - **Vì sao:** Mỗi lần mở app có thể gửi request tới bên thứ ba (IP thiết bị) — lệch checklist privacy / tối thiểu hóa dữ liệu trong `docs/an-toan-tre-em.md`.  
   - **Sửa:** Self-host Fredoka/Nunito trong `css/` hoặc `assets/fonts/`; bỏ preconnect Google.

2. **Thiếu chính sách riêng tư / giải thích dữ liệu trong góc phụ huynh**  
   - **Chỗ:** `#parent-panel` chỉ tiến độ + TTS + reset.  
   - **Vì sao:** Checklist SAFE yêu cầu minh bạch với phụ huynh (không bán dữ liệu trẻ; chỉ local).  
   - **Sửa:** Đoạn ngắn trong panel: “Chỉ lưu sao & cài âm thanh trên máy. Không tài khoản, không quảng cáo.” + link chính sách (sau gate, nếu có trang).

3. **`INTERNET` + `allowBackup="true"` chưa ghi rõ phạm vi**  
   - **Chỗ:** `AndroidManifest.xml`.  
   - **Vì sao:** Backup có thể đưa `localStorage` sao ra ngoài máy; INTERNET nên chỉ còn nếu thực sự cần (TTS native / font local thì có thể hạn chế).  
   - **Sửa:** Đánh giá tắt backup hoặc `fullBackupContent` loại trừ WebView data; font local → giảm phụ thuộc mạng; ghi chú trong README phụ huynh.

### P2

1. **Parent gate: sai đáp án → đóng im lặng**  
   - **Chỗ:** `app.js` listener `close` trên `#parent-gate`.  
   - **Sửa:** Giữ dialog / báo “Thử lại” khi sai; không đóng khi đáp án sai.

2. **Dup avatar khi helper = bé Gấu**  
   - **Chỗ:** `npc.js` `renderCompanion` luôn vẽ bé Gấu + helper; vùng `doi-hinh-khoi` / `hang-chu-cai` helper cũng `be-gau` → hai nút giống nhau.  
   - **Sửa:** Nếu helper === `be-gau`, chỉ hiện một avatar (hoặc đổi helper vùng đó).

3. **Chưa xác nhận runtime TTS/APK**  
   - Hàng E2E 15–17 = Unknown → cần QA tay trên máy có gói `vi-VN` trước ship store.

---

## 4. Đề xuất nâng cấp (ưu tiên)

1. Self-host fonts — hết mạng Google trên cold start (P1).  
2. Copy privacy ngắn trong `#parent-panel` (P1).  
3. Rà `allowBackup` / nhu cầu `INTERNET` trên bản release (P1).  
4. Cải thiện UX gate khi sai đáp án (P2).  
5. QA tay: Home→5 sao→Ending→gate→reset→toggle TTS→chạm NPC (Map + Game) trên APK; ghi Pass/Fail thật cho 3 mục Unknown.

---

## 5. Điểm mạnh

- Flow màn hình đầy đủ, một ngón tay, luôn thắng được / thử lại mềm.  
- Không ads, không chat, không OAuth, không form PII.  
- Parent gate tách khu người lớn (tiến độ, reset, âm thanh).  
- NPC + TTS gắn vào Map/Game; unlock audio sau gesture đầu đã có trong code.  
- Tài liệu `docs/an-toan-tre-em.md` khớp định hướng sản phẩm.

---

## 6. Kết luận ship (SAFE + QA)

| Hạng mục | Trạng thái |
|----------|------------|
| E2E cấu trúc (code) | **Đạt** (12 Pass, 0 Fail) |
| E2E thiết bị | **Chưa** (3 Unknown) |
| SAFE tổng | **2.6 / 3** — đạt để nội bộ / thử; trước store nên xử lý P1 fonts + privacy copy |
| **P0** | **Không có** |
