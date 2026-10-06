# Ảnh AI theo mô hình mục Quả — 2026-10-05

## Mô hình (1 chủ thể × 6 màu)

| Chủ đề | Thư mục ảnh | Trạng thái |
|--------|-------------|------------|
| Trái cây | `assets/explore/trai-cay/` | ✅ 48 ảnh + data |
| Hình khối | `assets/explore/hinh-khoi/` | ✅ 42 ảnh + data |
| Số | `assets/explore/ai/so-*.jpg` | ✅ map + explore glyph |
| Chữ Latin | SVG chữ + `assets/explore/ai/chu-*.jpg` | ✅ rebuild A–Z + mapImg |
| Động vật | `assets/explore/dong-vat/` | ✅ 72 ảnh + data |
| Đồ vật | `assets/explore/do-vat/` | ✅ 72 ảnh + data |
| Phương tiện | `assets/explore/phuong-tien/` | ✅ 36 ảnh + data |

## Lệnh

```bash
node scripts/list-missing-ai-colors.js    # còn thiếu bao nhiêu file
node scripts/copy-cursor-ai-colors.js   # copy từ Cursor assets → explore
node scripts/apply-ai-topic-colors.js hinh   # gắn data 1 chủ đề
npm run sync:ai-colors                  # sau khi đủ ảnh: all + chu + số
npm run audit:lessons
npm run apk
```

## Ghi chú sư phạm

- **Hình:** mỗi bài = 1 khối hình (tròn, vuông…) × 6 màu — không còn bóng/đồng hồ lẫn trong explore chính.
- **Số:** giữ `Số N` + lưới `N cá` / `N sao` (khác quả nhưng cùng chuẩn ảnh AI trên map).
- **Chữ:** chữ lớn SVG + từ minh họa AI + nút nghe; bản đồ dùng ảnh từ (không emoji keycap).
