# Mini-game — Bé Gấu Giải Cứu Tri thức

Thiết kế nhẹ cho trẻ **2–5 tuổi**. Mỗi vùng một mini-game. Một ngón tay. Màn ≤ **90 giây**. Không countdown áp lực, không trừ mạng. Sai = thử lại cùng bé Gấu. “Chiến đấu” = giúp / tìm / ghép.

## Quy tắc chung

| Khía cạnh | Quy ước |
|-----------|---------|
| Input | Tap hoặc kéo-thả đơn giản (không multi-touch, không reflex nhanh) |
| Lựa chọn | 2–4 đáp án hiển thị cùng lúc |
| Win | Hoàn thành đủ bước đúng trong màn → nhận ngôi sao vùng |
| Fail nhẹ | Rung nhẹ / “Hmm, thử lại nhé!” — không mất tiến độ đã đúng |
| Scaffolding | Sau **~8 giây** không tương tác đúng: gợi ý (nhấp nháy / phóng to mục tiêu / bé Gấu chỉ) |
| Thoát | Nút nhà lớn; luôn có thể quay lại chơi tiếp |

---

## 1. `color-tap` — Rừng Màu Sắc

**Mục tiêu học:** Nhận biết và chọn đúng màu cơ bản (đỏ, vàng, xanh dương, xanh lá…).

**Mục tiêu chơi:** Bé Gấu hỏi một màu; trẻ chạm quả bóng / lá / ngôi sao đúng màu để “đưa về balo”.

**Input:** Tap mục tiêu màu.

**Win condition:** Đủ `targetCount` lần chạm đúng trong màn (thường 3–5). Mỗi lần đúng → vật bay vào balo + lời khen ngắn.

**Scaffolding (sau 8s):** Mục tiêu đúng nhấp nháy nhẹ; các màu nhiễu mờ đi ~30%; bé Gấu nói lại tên màu.

**Biến thể tuổi**

| | 2–3 tuổi | 4–5 tuổi |
|---|----------|----------|
| Số màu trên màn | 2 | 3–4 |
| Palette | Đỏ / vàng (tương phản mạnh) | Thêm xanh dương, xanh lá, cam |
| Nhiễu | Không hoặc 1 màu khác rõ | 1–2 màu gần hơn (xanh dương vs xanh lá) |
| Số lần đúng cần | 3 | 4–5 |

---

## 2. `shape-fit` — Đồi Hình Khối

**Mục tiêu học:** Phân biệt hình tròn, vuông, tam giác (sau thêm chữ nhật).

**Mục tiêu chơi:** Kéo mảnh hình vào lỗ / khung khớp để vá đường lên đồi cho bé Gấu.

**Input:** Kéo-thả một ngón (hoặc tap hình rồi tap lỗ — fallback nếu kéo khó).

**Win condition:** Ghép đúng đủ `slots` trong màn (thường 2–3 lỗ). Hình đúng “khít” + sao nhỏ.

**Scaffolding (sau 8s):** Lỗ đúng rung/nhấp viền; hình đúng phóng to nhẹ; các lỗ sai mờ.

**Biến thể tuổi**

| | 2–3 tuổi | 4–5 tuổi |
|---|----------|----------|
| Số lỗ | 1–2 | 2–3 |
| Hình | Tròn + vuông | + tam giác (+ chữ nhật nhẹ) |
| Xoay hình | Không xoay | Có thể xoay 0°/ cố định (không bắt xoay tinh) |
| Fallback | Ưu tiên tap-tap | Kéo-thả chính |

---

## 3. `count-together` — Suối Đếm Số

**Mục tiêu học:** Đếm 1–5 (rồi tới 10); khớp số lượng với chữ số.

**Mục tiêu chơi:** Đếm quả / sỏi / cá cùng bé Gấu — chạm từng vật **hoặc** chọn thẻ số đúng.

**Input:**
1. Phase đếm: tap lần lượt từng vật (highlight tuần tự).
2. Phase chọn: tap thẻ số khớp tổng.

**Win condition:** Chọn đúng số sau khi đã đếm (hoặc đếm đủ rồi xác nhận bằng thẻ số). Không giới hạn thời gian từng phase.

**Scaffolding (sau 8s):** Vật chưa đếm nhấp nháy theo thứ tự; thẻ số đúng phóng to; bé Gấu đếm to “một… hai…”.

**Biến thể tuổi**

| | 2–3 tuổi | 4–5 tuổi |
|---|----------|----------|
| Phạm vi | 1–3 (rồi 1–5) | 1–7 (rồi 1–10) |
| Thẻ số | 2 lựa chọn | 3–4 lựa chọn |
| Phase đếm | Bắt buộc tap từng quả | Có thể bỏ qua nếu chọn số đúng ngay |
| Layout | Hàng ngang rõ | Có thể nhóm 2 hàng |

---

## 4. `letter-pick` — Hang Chữ Cái

**Mục tiêu học:** Nhận diện chữ cái đầu quen thuộc (A, B, C… và vài chữ tiếng Việt đơn giản nếu có asset).

**Mục tiêu chơi:** Nhìn tranh (ví dụ quả táo) → chọn chữ cái đầu đúng để “thắp đèn hang”.

**Input:** Tap một trong 2–4 thẻ chữ cái.

**Win condition:** Đủ `rounds` câu đúng liên tiếp trong màn (sai → câu đó thử lại, không reset cả màn).

**Scaffolding (sau 8s):** Chữ đúng nhấp nháy; phát âm tên chữ / từ mẫu; tranh phóng to vùng gợi ý.

**Biến thể tuổi**

| | 2–3 tuổi | 4–5 tuổi |
|---|----------|----------|
| Lựa chọn | 2 chữ rất khác hình | 3–4 chữ, có thể gần nhau (B/D) |
| Bộ chữ | A, B, C + tranh rõ | Thêm M, N, O… |
| Gợi ý âm | Luôn đọc to từ | Đọc từ khi scaffolding |
| Hoa/thường | Chỉ chữ hoa | Chủ yếu chữ hoa |

---

## 5. `friend-match` — Vườn Bạn Bè

**Mục tiêu học:** Ghép động vật với nhà / bạn; nhận biết cảm xúc vui–buồn đơn giản.

**Mục tiêu chơi:** Kéo (hoặc tap-tap) bạn nhỏ về đúng nhà / ghép mặt cảm xúc với tình huống ấm.

**Input:** Kéo thẻ bạn → ô đích, hoặc tap bạn rồi tap nhà.

**Win condition:** Ghép đúng đủ cặp trong màn (thường 2–3 cặp). Mỗi cặp đúng → ôm nhau / nhà sáng đèn.

**Scaffolding (sau 8s):** Đích đúng nhấp nháy; thẻ còn lại mờ nhẹ; bé Gấu gợi ý “Bạn thỏ về nhà cà rốt nhé!”.

**Biến thể tuổi**

| | 2–3 tuổi | 4–5 tuổi |
|---|----------|----------|
| Số cặp | 2 | 3 |
| Chủ đề | Động vật → nhà rõ (chó–cũi, cá–bể) | + cảm xúc (vui/buồn) hoặc bạn–đồ chơi |
| Nhiễu | Không ô thừa | 1 ô nhiễu không dùng |
| Input | Tap-tap ưu tiên | Kéo-thả chính |

---

## Mapping vùng → game

| Vùng | Game id | Cơ chế |
|------|---------|--------|
| Rừng Màu Sắc | `color-tap` | Tap màu |
| Đồi Hình Khối | `shape-fit` | Kéo/tap khớp hình |
| Suối Đếm Số | `count-together` | Đếm + chọn số |
| Hang Chữ Cái | `letter-pick` | Chọn chữ cái đầu |
| Vườn Bạn Bè | `friend-match` | Ghép cặp |

## Ghi chú prototype

- Dữ liệu level mẫu: `content/games/levels.json`.
- Asset có thể placeholder (`assetId`); UI dùng màu/emoji/SVG tạm.
- Mỗi level có `ageBand`: `"2-3"` hoặc `"4-5"` để lọc độ khó.
- `hintAfterMs`: mặc định `8000`.
- Không field countdown / lives / score phạt.
