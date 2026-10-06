# Phiên Kiểm duyệt Nội dung — 2026-10-05

**Hội đồng:** Kiểm duyệt Nội dung Bài học (`docs/eval/hoi-dong-kiem-duyet-noi-dung.md`)  
**Nguồn đã đọc:** `lessons.json` mtime **2026-10-05T06:54:51Z** · canonical màu **v3**  
**Stamp:** `contentCouncil.colorExploreVersion = 3`  
**Lưu ý:** Báo cáo Hội đồng Kiểm thử (KT-008…020) có thể dựa trên **bản cũ** — bảng dưới đối chiếu **data hiện tại**.

---

## 1. Điểm danh ghế

| Ghế | Có mặt | Việc |
|-----|--------|------|
| ND-LEAD | ✅ | Điều phối · khóa canonical v3 |
| ND-PEDA | ✅ | Kiến thức / ví dụ VN |
| ND-VIS | ✅ | Minh họa explore (che chữ) |
| ND-CURR | ✅ | 110 bài · gate · 1 màn=1 bài |
| ND-VOICE | ✅ | teach/speak/story |
| ND-SAFE | ✅ | Không sợ / không dạy sai |

---

## 2. Coverage data hiện tại

| Hạng mục | Kết quả |
|----------|---------|
| Topics / lessons | **11 / 110** |
| `friend` + `story` | 110/110 |
| `exploreItems` | 110/110 |
| Gate hợp lệ | 110/110 (audit 0 Mức 1–2 sau sync) |
| Explore màu | Khóa tại `color-explore-canonical.json` v3 |

---

## 3. Đối chiếu nhận xét KT (có thể lỗi thời)

| Mã KT | Nội dung KT nêu | Trên data/code **hiện tại** | Kết luận hội đồng ND |
|-------|-----------------|----------------------------|----------------------|
| **KT-008** | Vịt con = vịt trời không vàng | **Đúng trên bản trước sync.** Đã thay bằng SVG `assets/explore/vit-con-vang.svg` + canonical | **Đóng (nội dung)** — cần KT xác nhận trên APK mới |
| **KT-009** | Chanh regress, mất xoài chín | **Đúng trên bản trước sync** (do script uplift ghi 🍋). Đã khôi phục **🥭 Quả xoài chín** trong canonical v3 | **Đóng (nội dung)** + đã khóa nguồn |
| **KT-015** | Nút 🎁 không nhãn / shop không parent gate | Lỗi **UI/SAFE**, không phải data bài | Chuyển Hội đồng KT / SAFE — ND không đóng |
| **KT-010** | Nút vùng lệch đảo nền | Lỗi **map/GFX layout** | Chuyển Tổ hợp GFX + KT |
| **KT-011** | Mất câu hướng dẫn / Sóc / loa | Lỗi **UI map** (`map-prompt` đang `sr-only`) | Chuyển UX + KT |
| **KT-012** | “Chạm Đom Đóm để nghe” | Còn trong `npc.js` bubble | **Còn (VOICE/UX)** — đề xuất bỏ / đổi thành lời prompt thật |
| **KT-013** | Màn khóa mờ, bong bóng đè màn 8 | UI lesson map | Chuyển UX/KT |
| **KT-014** | Chấm tiến độ / sao không khớp | Gate HTML có `.stage-dots` **không** `id="stage-dots"` → JS không cập nhật | Chuyển GAME/KT |
| **KT-016** | Nhờ bạn giúp dài / thiếu TTS tự động | Logic `app.js` | Chuyển GAME/VOICE |
| **KT-017** | 🌫️ lỗi glyph | Asset/font | Chuyển GFX — đề xuất SVG sương |
| **KT-018–020** | Lặp chữ, tràn vòng, font | UI | Chuyển GFX/UX/KT |
| **chu-p / phở** | (phiên trước) | Hiện: *pin* / 🔋 | **Đã đóng** trên data |
| **Oval** | (phiên trước) | Hiện: Hình Bầu dục | **Đã đóng** trên data |
| **pt teach copy** | (phiên trước) | Teach riêng từng phương tiện | **Đã đóng** trên data |

---

## 4. Findings nội dung (phiên này — sau sync v3)

### Mức 1
*Không còn trên `lessons.json` sau sync canonical v3.*

### Mức 2 (còn / theo dõi)

| Mã | Bài / khu | Mô tả |
|----|-----------|-------|
| **ND-001** | Nhiều bài ngoài màu | Explore chỉ 1–2 món (động vật, quả…) — đủ nhận diện khái niệm nhưng scaffolding mỏng hơn Rừng Màu |
| **ND-002** | `npc.js` | Bubble cố định “Chạm … để nghe nhé!” (trùng KT-012) — không nằm trong JSON bài |
| **ND-003** | Hang Chữ 29 | Chưa chia pack tuổi — rủi ro overload (thiết kế CURR, không chặn từng bài) |

### Mức 3
- Emoji số `3️⃣` phụ thuộc font thiết bị  
- Một số bài `hoa-si` vẫn là hoạt động âm nhạc trong chủ đề họa sĩ (thiết kế CURR)

---

## 5. Bảng điểm nội dung (0–3) — trên data đã sync

| Ghế | Điểm | Ghi chú |
|-----|:----:|---------|
| ND-PEDA | **3** | P0 kiến thức màu/chữ đã xử lý trên data |
| ND-VIS | **2–3** | Vịt vàng dùng SVG; cần xem trên máy thật |
| ND-CURR | **2** | 110 bài ổn; Hang Chữ dày; explore ngoài màu còn mỏng |
| ND-VOICE | **2** | Story/teach ổn; còn bubble NPC thừa |
| ND-SAFE | **3** | Không thấy nội dung đáng sợ trong JSON |

**Trung bình ND ≈ 2.6 / 3** — **Đạt có điều kiện** (điều kiện: build APK mới + KT xác nhận KT-008/009 trên máy).

---

## 6. Quyết định

### Nội dung data: **ĐẠT CÓ ĐIỀU KIỆN**

Đã làm trong phiên:

1. Thành lập hội đồng + rule Cursor  
2. Khóa explore màu tại `color-explore-canonical.json` **v3**  
3. Sync → `lessons.json` / `lessons-data.js`  
4. SVG vịt con vàng; khôi phục xoài chín; bỏ chanh / vịt trời  
5. Guard: `fix-score-uplift.js` không còn ghi đè explore màu  

**Chưa đủ để ship app** cho đến khi Hội đồng Kiểm thử xác nhận trên APK (UI map, sao, 🎁, TTS).

---

## 7. Lệnh vận hành

```bash
node scripts/sync-color-explore.js   # sau khi sửa canonical
node scripts/audit-content-council.js
npm run apk                          # bàn giao KT
```

---

*Trưởng ban Nội dung — phiên 2026-10-05. Báo cáo KT cũ không thay thế audit mtime hiện tại.*
