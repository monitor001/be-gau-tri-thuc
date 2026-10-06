# Biên bản Hội đồng Chuyên gia Giáo dục — Duyệt từng chủ đề

**Ngày:** 2026-10-05 · **Phiên:** Duyệt chi tiết 11 chủ đề trước khi sửa tiếp  
**Căn cứ:** `docs/eval/hoi-dong-chuyen-gia-giao-duc.md`  
**Máy:** `audit:lessons` **107/107 Đạt · M1=0** · `audit-content-council` **0 finding**  
**Lưu ý máy:** Audit máy **không thay** duyệt mắt che chữ — phiên này đã đối chiếu data + mẫu ảnh.

**Ghế:** HDGD-LEAD · HDGD-PEDA · HDGD-CURR · HDGD-VIS · HDGD-VOICE · HDGD-SAFE

**Thang điểm:** `0` thiếu · `1` yếu · `2` đạt · `3` tốt cho trẻ 2–5

---

## Tổng hợp 11 chủ đề

| # | Chủ đề | Bài | PEDA | VIS | CURR | VOICE | SAFE | Avg | Kết luận |
|---|--------|-----|------|-----|------|-------|------|-----|----------|
| 1 | Rừng Màu Sắc (`mau`) | 8 | 2 | 3 | 3 | 2 | 3 | 2.6 | **Đạt có ĐK** |
| 2 | Đồi Hình Khối (`hinh`) | 7 | 2 | **0** | 2 | 2 | 3 | 1.8 | **Chưa đạt** |
| 3 | Suối Đếm Số (`so`) | 10 | 3 | 2 | 3 | 2 | 3 | 2.6 | **Đạt có ĐK** |
| 4 | Hang Chữ Latin (`chu`) | 26 | 2 | 2 | 2 | 2 | 3 | 2.2 | **Đạt có ĐK** |
| 5 | Vườn Bạn Bè (`dong-vat`) | 12 | 2 | 2 | 3 | 2 | 3 | 2.4 | **Đạt có ĐK** |
| 6 | Vườn Trái Cây (`trai-cay`) | 8 | 3 | 3 | 3 | 2 | 3 | 2.8 | **Đạt** |
| 7 | Nhà Đồ Vật (`do-vat`) | 12 | 2 | 2 | 3 | 2 | 3 | 2.4 | **Đạt có ĐK** |
| 8 | Góc Cảm Xúc (`cam-xuc`) | 6 | 3 | 2 | 3 | 3 | 3 | 2.8 | **Đạt** |
| 9 | Bến Phương Tiện (`phuong-tien`) | 6 | 2 | 2 | 3 | 2 | 3 | 2.4 | **Đạt có ĐK** |
| 10 | Sân Nhảy Múa (`nhay-mua`) | 6 | 3 | 2 | 3 | 3 | 3 | 2.8 | **Đạt** |
| 11 | Góc Họa Sĩ (`hoa-si`) | 6 | 2 | 2 | 2 | 2 | 2 | 2.0 | **Đạt có ĐK** |

**Kết luận toàn kho:** **Chưa đạt phát hành nội dung** cho đến khi sửa **P0 Đồi Hình** (ảnh hình tròn).  
Các chủ đề khác: Đạt / Đạt có điều kiện theo bảng trên.

---

## 1. Rừng Màu Sắc (`mau`) — 8 bài

**Mô hình:** 1 màu × nhiều vật khác nhau · ảnh AI `assets/explore/mau/`  
**Mẫu bài:** `mau-do`, `mau-cam`, `mau-vang`, `mau-nau`

| Ghế | Điểm | Nhận xét |
|-----|------|----------|
| PEDA | 2 | Trẻ hiểu “nhiều thứ cùng màu”. `teachText` còn dài (lẫn lời cứu bạn + liệt kê) — nên ≤1–2 câu ngắn |
| VIS | 3 | Explore dùng JPG AI đúng màu (vd. hoa mai vàng, xoài vàng đã gen lại). Gate bóng màu `hideLabels` tốt cho 2–5 |
| CURR | 3 | 1 màu / màn · 6 explore · scaffolding rõ |
| VOICE | 2 | TTS có; câu teach dài hơi mệt trẻ nhỏ |
| SAFE | 3 | Không sợ · không filler |

**Findings**
- **P1:** Rút `teachText` còn 1 ý (vd. “Nhiều thứ màu đỏ. Bé nhìn nào!”).  
- **P2:** Script `tham-dinh-toan-kho` còn finding cũ dựa emoji — bỏ qua nếu đã có `img` AI.

**Kết luận chủ đề:** **Đạt có điều kiện** (rút gọn teach).  
**Được sửa tiếp?** Có — chỉ rút teach/TTS, không đổi mô hình.

---

## 2. Đồi Hình Khối (`hinh`) — 7 bài — ⛔ P0

**Mô hình data:** 1 hình × 6 màu · `assets/explore/hinh-khoi/`  
**Mẫu:** `hinh-circle`, `hinh-rect`, `hinh-oval`

| Ghế | Điểm | Nhận xét |
|-----|------|----------|
| PEDA | 2 | Ý “hình tròn nhiều màu” đúng tuổi — **nhưng hình sai thì trẻ học sai** |
| VIS | **0** | **P0:** `hinh-circle-*.jpg` (đỏ/vàng…) hiện **gấu Teddy**, không phải hình tròn. Vuông / tam giác / sao / tim — mẫu mắt **đúng hình** |
| CURR | 2 | Data nhãn đúng; asset tròn hỏng → CURR bị kéo xuống |
| VOICE | 2 | Lời khớp nhãn; không khớp ảnh tròn |
| SAFE | 3 | Không sợ |

**Findings**
- **P0 / Mức 1:** Toàn bộ explore **Hình Tròn** (6 màu) phải gen lại = **hình tròn phẳng đúng màu**, không nhân vật.  
- **P1:** Duyệt mắt nốt `hinh-oval-*`, `hinh-rect-*` từng file trước khi Đạt hẳn.  
- **P2:** Gate 2–3 lựa chọn chữ — cần TTS mạnh cho 2–3 tuổi.

**Kết luận chủ đề:** **Chưa đạt** — **cấm suy mẫu** từ vuông/sao sang tròn.  
**Được sửa?** Chỉ sau brief VIS: “circle = hình học thuần, không face/gấu”.

---

## 3. Suối Đếm Số (`so`) — 10 bài

**Mô hình:** Glyph AI `so-N.jpg` + `count:N` cá/sao · map dùng ảnh AI (không emoji xám)

| Ghế | Điểm | Nhận xét |
|-----|------|----------|
| PEDA | 3 | Đếm cụ thể N cá/sao — trẻ 2–5 hiểu khi thấy đủ số lượng |
| VIS | 2 | Glyph AI rõ; lưới count phụ thuộc UI — cần xác nhận trên tablet mỗi N |
| CURR | 3 | 1 số / màn · explore khớp |
| VOICE | 2 | Teach ngắn ổn |
| SAFE | 3 | Không áp lực thời gian |

**Findings**
- **P1:** Che chữ trên máy: bài `so-2`…`so-5` (cá) và `so-6`…`so-10` (sao) — đếm đủ chưa.  
- **P2:** Gate chữ “1/2” — TTS bắt buộc.

**Kết luận:** **Đạt có điều kiện** (xác nhận lưới count trên thiết bị).

---

## 4. Hang Chữ Latin (`chu`) — 26 bài

**Mô hình:** SVG chữ lớn + AI từ minh họa + Nghe · chỉ A–Z

| Ghế | Điểm | Nhận xét |
|-----|------|----------|
| PEDA | 2 | A–Z ổn với 4–5 tuổi; **F/J/W/Z + từ Anh** (Fan, Juice, Watermelon, Zebra) khó với 2–3 tuổi — cần TTS + hình rất rõ |
| VIS | 2 | Có SVG chữ (che chữ vẫn nhận được chữ). Từ AI: Fan/Juice đã gen lại; W=dưa hấu rõ hơn Wifi |
| CURR | 2 | 1 chữ / màn · đúng Latin. Finding máy cũ về ĂÂĐ… **lỗi thời** (đã bỏ) |
| VOICE | 2 | “X bắt đầu bằng…” ổn |
| SAFE | 3 | OK |

**Findings**
- **P1:** Với 2–3 tuổi: ưu tiên A–M trước; F/J/W/Z coi là mở rộng.  
- **P1:** `chu-q` quạt — hình phải cực rõ (đã có AI quạt).  
- **P2:** Cập nhật script `tham-dinh-toan-kho` bỏ id `chu-ab`… đã xóa.

**Kết luận:** **Đạt có điều kiện** (phân tầng tuổi / TTS mạnh chữ khó).

---

## 5. Vườn Bạn Bè (`dong-vat`) — 12 bài

**Mô hình:** 1 con × 6 màu AI `dong-vat/`

| Ghế | Điểm | Nhận xét |
|-----|------|----------|
| PEDA | 2 | Nhận diện con vật + chơi màu — OK. Màu “không tự nhiên” (mèo xanh) là **cố ý** chơi màu, cần TTS “mèo màu xanh” |
| VIS | 2 | Mẫu `dv-meo-vang` đúng mèo vàng. Cần duyệt mắt hổ/voi/khỉ × màu lạ |
| CURR | 3 | Đồng nhất với quả/đồ |
| VOICE | 2 | Teach ngắn |
| SAFE | 3 | Hổ “không đáng sợ” — giữ face dễ thương |

**Findings**
- **P1:** Duyệt mẫu `dv-ho-*`, `dv-voi-*` che chữ.  
- **P2:** Emoji friend có thể lệch — ưu tiên `friend.img` AI.

**Kết luận:** **Đạt có điều kiện**.

---

## 6. Vườn Trái Cây (`trai-cay`) — 8 bài

**Mô hình:** 1 quả × 6 màu AI `trai-cay/` (đã sửa chuối oval)

| Ghế | Điểm | Nhận xét |
|-----|------|----------|
| PEDA | 3 | 1 quả / màn · màu khác nhau — rõ với 2–5 |
| VIS | 3 | `tc-chuoi-vang` đúng chuối cong vàng; táo/xoài AI theo màu |
| CURR | 3 | Chuẩn mô hình hội đồng |
| VOICE | 2 | OK |
| SAFE | 3 | OK |

**Findings**
- **P2:** Một số màu “quả xanh dương” mang tính chơi — giữ speak “Táo màu xanh dương”.

**Kết luận:** **Đạt** (ưu tiên mẫu cho chủ đề khác).

---

## 7. Nhà Đồ Vật (`do-vat`) — 12 bài

**Mô hình:** 1 đồ × 6 màu AI `do-vat/`

| Ghế | Điểm | Nhận xét |
|-----|------|----------|
| PEDA | 2 | Bóng, sách, cốc… gần gũi. “Xe hơi” trùng miền phương tiện — chấp nhận nếu gate rõ |
| VIS | 2 | File đủ máy; cần mắt mẫu ghế/giường/bàn chải × màu |
| CURR | 3 | Đồng nhất |
| VOICE | 2 | OK |
| SAFE | 3 | OK |

**Findings**
- **P1:** Che chữ 3 bài: `dvat-bong`, `dvat-ghe`, `dvat-ban-chai`.  
- **P2:** Phân biệt Nhà Đồ vs Bến Xe (xe hơi nằm đồ vật).

**Kết luận:** **Đạt có điều kiện**.

---

## 8. Góc Cảm Xúc (`cam-xuc`) — 6 bài

**Mô hình:** 1 cảm xúc · mặt vàng · đã bỏ filler “Ôm bé”

| Ghế | Điểm | Nhận xét |
|-----|------|----------|
| PEDA | 3 | Vui/Buồn/Ngạc nhiên/Yêu/Giận nhẹ/Mệt — trẻ hiểu qua mặt |
| VIS | 2 | Explore 1–2 ô trùng ảnh (mặt + dấu hiệu) — chấp nhận nếu TTS khác ý |
| CURR | 3 | 1 cảm xúc / màn |
| VOICE | 3 | Câu rất ngắn |
| SAFE | 3 | Giận nhẹ không đáng sợ |

**Findings**
- **P2:** Có thể gen riêng ảnh “nước mắt close-up” / “ngáp” để không trùng 100% ô 1–2.

**Kết luận:** **Đạt**.

---

## 9. Bến Phương Tiện (`phuong-tien`) — 6 bài

**Mô hình:** 1 phương tiện × 6 màu AI

| Ghế | Điểm | Nhận xét |
|-----|------|----------|
| PEDA | 2 | Xe buýt, máy bay… quen. “Trực thăng” hơi khó từ — dựa hình + TTS |
| VIS | 2 | File đủ; duyệt mắt silhouettes |
| CURR | 3 | OK |
| VOICE | 2 | Nói chậm tên dài |
| SAFE | 3 | OK |

**Findings**
- **P1:** TTS nhấn `Trực thăng` tách âm.  
- **P1:** Che chữ `pt-truc-thang`, `pt-tau-lua`.

**Kết luận:** **Đạt có điều kiện**.

---

## 10. Sân Nhảy Múa (`nhay-mua`) — 6 bài

**Mô hình:** 1 động tác · bỏ filler nhạc/Bé Gấu

| Ghế | Điểm | Nhận xét |
|-----|------|----------|
| PEDA | 3 | Vỗ tay / giơ tay / nhảy — trẻ **làm theo** · phù hợp 2–5 |
| VIS | 2 | Ảnh AI động tác; ô “Hai tay” có thể trùng ảnh — TTS phân biệt |
| CURR | 3 | 1 động tác / màn |
| VOICE | 3 | “Bé vỗ tay nào!” — chuẩn |
| SAFE | 3 | Không ép vận động mạnh |

**Findings**
- **P1:** Gate chữ yếu nếu tắt tiếng — luôn bật TTS + phụ huynh làm mẫu lần đầu.

**Kết luận:** **Đạt**.

---

## 11. Góc Họa Sĩ (`hoa-si`) — 6 bài

**Mô hình:** 1 việc (tô đỏ / vẽ tròn / gõ trống / bảng màu / dán sao)

| Ghế | Điểm | Nhận xét |
|-----|------|----------|
| PEDA | 2 | Tô đỏ / vẽ tròn / dán sao rõ. **Gõ trống** hơi lệch “họa sĩ” nhưng vẫn nghệ thuật–âm thanh |
| VIS | 2 | `hs-nghe-sao` = bảng màu rõ. Bài `Bảng màu` còn ô “Cọ vẽ” — tránh ảnh trùng 100% |
| CURR | 2 | Snapshot máy: **filler label “Bảng màu/Cọ”** trên 1 bài — chấp nhận nếu đúng chủ đề bảng màu; không dán sang bài tô |
| VOICE | 2 | OK |
| SAFE | 2 | Gate chữ “Tô đỏ/Tô vàng” cần TTS |

**Findings**
- **P1:** Gen ảnh **cọ riêng** cho ô Cọ (không dùng chung palette).  
- **P2:** Đổi id `hs-nghe-sao` → slug `hs-bang-mau` (kỹ thuật, không chặn PEDA).

**Kết luận:** **Đạt có điều kiện**.

---

## Findings ưu tiên toàn hội đồng

| Mức | Chủ đề | Việc | Ai làm |
|-----|--------|------|--------|
| **P0** | `hinh` | Gen lại **6 ảnh hình tròn** (không gấu) · gắn lại · audit | VIS + thực thi sau duyệt brief |
| **P1** | `mau` | Rút teachText ngắn | PEDA + VOICE |
| **P1** | `so` | Xác nhận lưới count trên tablet | VIS + QA |
| **P1** | `chu` | Phân tầng tuổi; TTS chữ F/J/Q/W/Z | PEDA |
| **P1** | `dong-vat` / `do-vat` / `phuong-tien` | Che chữ 2–3 bài/chủ đề trên máy | VIS |
| **P1** | `hoa-si` | Ảnh cọ tách riêng | VIS |
| **P2** | Scripts | Làm sạch finding chữ Việt cũ trong `tham-dinh-toan-kho` | CURR/tooling |

---

## Quyết định phiên

1. **Không sửa lan man** các chủ đề Đạt / Đạt ĐK cho đến khi **P0 Hình Tròn** xong.  
2. Brief được duyệt để sửa tiếp (chỉ P0):  
   > “`hinh-circle-{do,vang,xanh-duong,xanh-la,cam,tim}.jpg` = hình tròn phẳng đặc đúng màu, nền tròn pastel, **không** mặt / gấu / nhân vật.”  
3. Sau P0: chạy `apply-ai-topic-colors.js hinh` · `npm run audit:lessons` · cập nhật biên bản phụ.  
4. Toàn kho **chỉ Đạt phát hành** khi `hinh` chuyển Đạt / Đạt ĐK và đã che chữ ≥1 bài/chủ đề trên thiết bị.

**Ký kết phiên:**  
HDGD-LEAD · HDGD-PEDA · HDGD-VIS · HDGD-CURR · HDGD-VOICE · HDGD-SAFE  

*Snapshot máy:* `docs/eval/hdgd-topic-snapshot.json`  
*Phiên bản biên bản:* 2026-10-05 · duyệt từng chủ đề
