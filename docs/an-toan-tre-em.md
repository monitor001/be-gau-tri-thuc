# An toàn trẻ em — Bé Gấu Giải Cứu Tri Thức

Checklist `SAFE` cho nội dung, tương tác và privacy. App dành cho trẻ **dưới 5 tuổi**; phụ huynh xem tiến độ, trẻ **không** cần tài khoản.

## Nguyên tắc vàng

1. Không chat / không giao tiếp với người lạ trong app.
2. Không quảng cáo trong luồng chơi của trẻ.
3. Không thu thập PII của trẻ (tên thật, ảnh, vị trí, liên hệ…).
4. Không nội dung đáng sợ, bạo lực, hay áp lực thất bại.
5. Mọi lối ra ngoài app (nếu có) phải qua parent gate.

---

## 1. An toàn nội dung

| Hạng mục | Bắt buộc | Ghi chú |
|----------|----------|---------|
| Không máu, vũ khí, đe dọa | Có | “Giải cứu” = tìm / ghép / giúp đỡ |
| Không kẻ thù đáng sợ / jump scare | Có | NPC dịu dàng, thất bại = thử lại |
| Không countdown áp lực / trừ mạng | Có | Phù hợp toddler |
| Ngôn ngữ tiếng Việt ấm, ngắn | Có | Không chửi tục, không miệt thị |
| Hình ảnh phù hợp 2–5 tuổi | Có | Không gợi dục, không nội dung người lớn |
| Không UGC từ trẻ đăng công khai | Có | Không feed cộng đồng |
| Không link / QR trong màn chơi trẻ | Có | Mọi link ngoài → parent gate |

### Checklist nội dung (trước khi merge copy / art)

- [ ] Màn chơi không có cảnh đánh đấm, máu, quái vật đáng sợ
- [ ] Lời thoại không làm trẻ thấy “bé hỏng rồi” khi sai
- [ ] Win screen chỉ khen / khích lệ, không so sánh xếp hạng
- [ ] Asset âm thanh không tiếng la hét / buzzer nặng
- [ ] Tên vùng & nhân vật nhất quán với `docs/hanh-trinh-be-gau.md`

---

## 2. An toàn tương tác & sản phẩm

| Hạng mục | Bắt buộc | Ghi chú |
|----------|----------|---------|
| Không chat in-app | Có | Không phòng chat, không DM, không voice chat |
| Không ads trong play | Có | Banner / interstitial / rewarded ads **cấm** trên Home–Map–Game–Win |
| Không mua trong luồng trẻ | Có | IAP (nếu sau này có) chỉ sau parent gate |
| Không đăng nhập mạng xã hội cho trẻ | Có | Trẻ chơi ngay, không OAuth |
| Parent gate cho khu người lớn | Có | Xem `docs/ux-toddler.md` §5 |
| Không thông báo đẩy dụ trẻ mở app liên tục | Khuyến nghị | Nếu có push: chỉ phụ huynh opt-in |
| Không deep link mở thẳng web ngoài từ game | Có | |

### Checklist tương tác

- [ ] Không widget chat / comment / “kết bạn”
- [ ] Không SDK quảng cáo gắn vào build chơi trẻ
- [ ] Không nút “Chia sẻ lên mạng” trên màn trẻ (hoặc ẩn sau gate)
- [ ] Nút phụ huynh có gate phép tính / chọn số đơn giản
- [ ] Thoát game về Map/Home không dẫn ra store / web

---

## 3. Privacy & dữ liệu

| Dữ liệu | Thu thập? | Ghi chú |
|---------|-----------|---------|
| Tên thật / họ tên trẻ | **Không** | Có thể dùng “bé” hoặc nickname local tùy chọn, không bắt buộc |
| Ảnh / camera / micro ghi âm đám mây | **Không** | TTS/local only nếu dùng micro |
| Email / SĐT trẻ | **Không** | |
| Vị trí GPS | **Không** | |
| Danh bạ | **Không** | |
| Tiến độ sao / vùng đã chơi | Local trên máy | Không cần tài khoản; nếu sync sau này → chỉ tài khoản phụ huynh + minh bạch |
| Analytics nhận diện cá nhân trẻ | **Không** | Tránh IDFA/GA4 gắn profile trẻ; nếu đo lường: aggregate, không PII |
| Crash log kỹ thuật | Chỉ kỹ thuật | Không kèm tên/nội dung chat (không có chat) |

### Checklist privacy

- [ ] Không form thu thập PII trên luồng trẻ
- [ ] Không yêu cầu tạo tài khoản để chơi
- [ ] Tiến độ mặc định lưu local (`localStorage` / tương đương)
- [ ] Không upload ảnh trẻ lên server
- [ ] Chính sách quyền riêng tư (cho phụ huynh) nêu rõ: không bán dữ liệu trẻ
- [ ] SDK bên thứ ba được rà soát: không ads, không tracker trẻ em

---

## 4. Tuân thủ định hướng (tham chiếu)

App hướng tới tinh thần bảo vệ trẻ em số (COPPA / tương đương khu vực):

- Dịch vụ dành cho trẻ: tối thiểu hóa dữ liệu.
- Phụ huynh kiểm soát phần cài đặt & liên kết ngoài.
- Không quảng cáo hành vi nhắm mục tiêu trẻ.

*(Không thay thế tư vấn pháp lý; dùng làm checklist sản phẩm.)*

---

## 5. Năm mục an toàn quan trọng nhất (tóm tắt ship)

1. **Không chat / không giao tiếp ngoài** trong app trẻ.
2. **Không quảng cáo** trên Home, Map, Mini-game, Win.
3. **Không thu thập PII** của trẻ; không bắt buộc tài khoản.
4. **Nội dung dịu**: không bạo lực, không sợ hãi, sai = thử lại cùng bé Gấu.
5. **Parent gate** cho mọi khu người lớn và mọi lối ra ngoài app.

---

## 6. Quy trình review `SAFE`

Khi thêm màn / SDK / màn hình mới:

1. `UX` kiểm tra nút, flow, âm thanh.
2. `SAFE` chạy checklist mục 1–3 ở trên.
3. Nếu có mạng / SDK / lưu cloud → ghi rõ trong PR: dữ liệu gì, vì sao, ai đọc được.
4. Không ship nếu thiếu parent gate ở lối ra ngoài hoặc còn ads trong play.
