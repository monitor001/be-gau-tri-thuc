# Báo cáo sửa lỗi KT + chuyển map phiêu lưu

**Phiên bản:** map giấy cổ + đảo nối đường  
**APK:** `dist-apk/BeGau-TriThuc-v1.0-debug.apk`

## Đã sửa theo danh sách hội đồng

| Mã | Mức | Cách xử lý |
|----|-----|------------|
| **KT-001** | 1 | Bản đồ dùng **cột flex**: `header` + `guide-row` + `map-content` (scroll). Chrome không absolute đè đảo. Bỏ Sóc walker nổi trên map (tránh cắt đầu). |
| **KT-002** | 1 | **Rừng Màu = màn `screen-lessons` riêng**, nền đặc. Chỉ **1** NPC + **1** bong bóng + **1** nút loa trong hàng hướng dẫn. Không lớp phủ trong suốt trên bản đồ. |
| **KT-003** | 1 | `Vịt con` đổi emoji `🦆` (mỏ dẹt); giữ `🐥` cho Gà con — hai hình khác nhau. |
| **KT-004** | 2 | Hiển thị tách **★ sao** và **🪙 xu**. Sao vùng = trung bình màn đã chơi (không chia cho cả 8 bài trống). Migrate `be-gau-stars-v2` → `v3` nếu còn. |
| **KT-005** | 2 | Màn vùng nền đặc — không lộ bản đồ phía sau. |
| **KT-006** | 3 | Viền speaking NPC: bỏ outline cam vuông → `box-shadow` vàng mềm. |
| **KT-007** | 3 | Đảo tròn trên giấy cổ; thẻ màn lưới đều; bỏ ô Họa Sĩ rộng gấp đôi. |

## Chuyển Hội đồng Chuyên gia (Điều 24)

1. **Map:** Đã chuyển về **giấy cổ + đảo + đường đứt** (cảm giác phiêu lưu), toddler-safe (không sọ / vũ khí).
2. **Vườn Quả vs Rừng Màu:** Icon vùng đổi `🧺🌳` (giỏ + cây) thay vì táo/chuối/cam trùng màu. Cần chốt nội dung bài có trùng mục tiêu màu không.
3. **Số đảo / thứ tự lộ trình:** 11 đảo trên một đường — có thể rút gọn nhóm sau nếu quá đông với trẻ 3 tuổi.

## Kiểm thử còn lại (thiết bị)

- [ ] Phone nhỏ + tai thỏ: không che đảo đầu tiên  
- [ ] Rừng Màu: chỉ 1 bong bóng, thẻ màn đủ đọc khi che chữ  
- [ ] Sao cũ còn sau cài APK mới (cùng thiết bị)  
- [ ] Quay màn hình + loa theo Điều 7  
