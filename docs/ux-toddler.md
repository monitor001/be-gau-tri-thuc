# UX Toddler — Bé Gấu Giải Cứu Tri Thức

Hướng dẫn UX cho trẻ **2–5 tuổi**. Ưu tiên: một ngón tay, ít chữ, nút lớn, feedback ấm, không áp lực thời gian.

## 1. Flow màn hình (5 bước)

```
Home → Chọn vùng (Map) → Mini-game → Khen thưởng → Về Map
```

| Bước | Màn hình | Mục tiêu trẻ | Hành động chính |
|------|----------|--------------|-----------------|
| 1 | **Home** | Gặp bé Gấu, bắt đầu chơi | Nút lớn “Chơi nào!” |
| 2 | **Chọn vùng (Map)** | Chọn 1 trong 5 vùng tri thức | Chạm icon vùng (có thể khóa mềm bằng sao trước) |
| 3 | **Mini-game** | Hoàn thành thử thách nhẹ ≤ 60–90 giây | Tap / kéo-thả / chọn 2–4 lựa chọn |
| 4 | **Khen thưởng** | Nhận sao / sticker, nghe lời khen | Nút “Tiếp tục” hoặc tự về sau ~3 giây |
| 5 | **Về Map** | Thấy tiến độ sao trên map, chọn vùng khác | Chạm vùng mới hoặc về Home |

### Chi tiết từng bước

**Home**
- Hero: bé Gấu + tên app ngắn.
- 1 CTA chính: chơi.
- 1 lối phụ nhỏ (góc): khu phụ huynh (có parent gate).
- Không menu phức tạp, không danh sách dài.

**Chọn vùng (Map)**
- 5 vùng theo hành trình: Rừng Màu → Đồi Hình → Suối Số → Hang Chữ → Vườn Bạn Bè.
- Mỗi vùng = 1 icon lớn + tên ngắn (có thể đọc bằng TTS khi chạm).
- Vùng chưa mở: xám nhẹ + bé Gấu nói “Chơi vùng này trước nhé” — không khóa cứng gây thất vọng nếu PEDA cho phép chơi tự do.
- Hiển thị sao đã cứu (0–1 hoặc 0–3 tùy thiết kế GAME).

**Mini-game**
- Prompt bằng lời nói / icon trước; chữ chỉ hỗ trợ phụ huynh.
- Sai → rung nhẹ + “Thử lại cùng bé Gấu!” — không trừ mạng, không countdown.
- Đúng → âm vui + highlight đúng ngay.
- Nút thoát về Map luôn có, kích thước đủ lớn, góc cố định.

**Khen thưởng (Win)**
- Sao / sticker lớn ở giữa, lời khen 1 câu.
- Không bảng xếp hạng, không so sánh với trẻ khác.
- CTA: “Chơi tiếp” (về Map) hoặc “Chơi lại”.

**Về Map**
- Cập nhật sao vùng vừa chơi.
- Bé Gấu gợi ý vùng tiếp theo (không bắt buộc).

---

## 2. Kích thước nút & vùng chạm

Trẻ dưới 5 tuổi cần target lớn hơn chuẩn mobile thông thường.

| Thành phần | Kích thước tối thiểu | Ghi chú |
|------------|----------------------|---------|
| Nút CTA chính (Chơi, Tiếp tục) | **≥ 72×72 px** (khuyến nghị ≥ 88 px cạnh) | Cạnh dưới hoặc giữa màn hình |
| Icon chọn vùng / lựa chọn game | **≥ 80×80 px** | Khoảng cách giữa các target ≥ 16 px |
| Nút phụ (Thoát, Âm thanh) | **≥ 56×56 px** | Góc cố định, không chồng nội dung |
| Parent gate (ô số) | **≥ 64×64 px** mỗi ô | Chỉ trên màn phụ huynh |

- Hit area ≥ kích thước nhìn thấy (padding trong suốt nếu cần).
- Không dùng gesture phức tạp (pinch, swipe dài, double-tap bắt buộc).
- Hỗ trợ portrait ưu tiên; landscape giữ nút không bị cắt bởi notch/home indicator.

---

## 3. Màu & tương phản

### Hướng visual
- Nền có không khí (gradient nhẹ / họa tiết rừng–đồi–suối), không flat một màu lạnh.
- Tránh tím–indigo mặc định AI; ưu tiên xanh lá ấm, vàng nắng, cam mềm, nâu gấu dễ thương.
- Text trên nền: tương phản rõ (mục tiêu gần WCAG AA cho chữ phụ huynh; với trẻ ưu tiên icon + màu khối lớn).

### Token gợi ý (CSS variables)

```css
:root {
  --bg-sky: #FFF6E8;
  --bg-forest: #E8F5D8;
  --brand-bear: #C47A3A;
  --accent-sun: #F5B942;
  --accent-leaf: #5BAE6A;
  --accent-berry: #E86A5C;
  --ink: #2C2416;
  --ink-soft: #5C4E3A;
  --safe-ok: #3D9B5F;
  --safe-retry: #E8A317;
  --disabled: #B8B0A4;
}
```

### Quy tắc contrast
- Lựa chọn đúng / sai không chỉ dựa vào màu: thêm icon ✓ / lắc nhẹ + âm thanh.
- Nút chính vs nền: độ tương phản cao; trạng thái disabled vẫn phân biệt được nhưng không hấp dẫn bằng CTA.
- Không nhấp nháy nhanh (< 3 lần/giây); animation vui, chậm, lặp dịu.

---

## 4. Âm thanh

| Sự kiện | Âm thanh | Ghi chú |
|---------|----------|---------|
| Chạm nút | Click mềm ngắn | ≤ 150 ms |
| Đúng | Chuông / “Yay” vui | Không quá to |
| Thử lại | “Hmm” nhẹ | Không tiếng “sai” nặng / buzzer sợ |
| Thắng màn | Nhạc ngắn 1–2 giây + lời khen TTS | Có thể tắt |
| Nhạc nền | Loop êm, volume thấp | Mặc định **tắt** hoặc rất nhỏ; phụ huynh bật |

- Nút loa luôn trên Home / Map / Game (icon rõ: loa bật / tắt).
- TTS tiếng Việt câu ngắn; đồng bộ với `content/ui/copy-vi.json`.
- Không autoplay nhạc ồn khi vào app lần đầu (an toàn tai + UX phụ huynh).

---

## 5. Hỗ trợ phụ huynh (parent gate đơn giản)

### Mục tiêu
- Trẻ không vào nhầm khu cài đặt / tiến độ chi tiết / liên kết ngoài.
- Không yêu cầu tài khoản trẻ; không mật khẩu phức tạp.

### Gate đề xuất
1. Chạm icon nhỏ “Người lớn” (góc Home).
2. Hỏi phép tính đơn giản kiểu **3 + 2 = ?** hoặc chọn số trong 3 ô (chỉ người lớn đọc được nhanh).
3. Đúng → vào màn Phụ huynh: tiến độ sao 5 vùng, bật/tắt nhạc, bật/tắt TTS, xem gợi ý chơi cùng con.
4. Sai / hủy → về Home, không thông báo “sai” đáng sợ.

### Nội dung màn Phụ huynh (tối giản)
- Tiến độ theo vùng (sao đã cứu).
- Công tắc âm thanh / nhạc nền.
- 1 đoạn hướng dẫn ngắn: chơi cùng con 5–10 phút/ngày.
- **Không** form email bắt buộc, không chat, không mạng xã hội.

---

## 6. Checklist UX nhanh trước khi ship màn mới

- [ ] Chơi được bằng một ngón tay trên tablet ~10"
- [ ] Màn chơi ≤ 90 giây đến win
- [ ] Sai chỉ là thử lại; luôn có đường thắng
- [ ] Chữ trên UI trẻ ≤ 1 dòng ngắn; ưu tiên icon + giọng nói
- [ ] Nút thoát / loa không che vùng chơi
- [ ] Parent gate chặn khu người lớn
- [ ] Không countdown áp lực, không trừ mạng
