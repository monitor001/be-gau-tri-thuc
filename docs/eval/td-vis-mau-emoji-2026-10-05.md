# TD-VIS — Phán quyết emoji màu (che chữ)

**Ngày:** 2026-10-05 · **Ghế:** TD-PEDA + TD-VIS  
**Bằng chứng:** ảnh chụp màn Màu Vàng / Xanh dương / Tím trên máy Windows

---

## Phán quyết chuyên gia

> **Đúng: còn nhiều lỗi không đúng nội dung nhận diện.**  
> Không phải lỗi “teachText sai chữ”, mà **minh họa emoji hệ thống lệch màu** → trẻ **che chữ** học sai.

| Mức | Ý nghĩa |
|-----|---------|
| **P0 / Mức 1** | Hình **không cùng màu** bài học (hồng thay tím; xanh lá thay xanh dương; trắng thay vàng) |
| **P0** | Glyph **vỡ / ô đen** (🫐) — trẻ không thấy quả gì |

---

## Findings từ ảnh (trước sửa)

| Mã | Bài | Nhãn | Hiện trên máy | Kết luận TD-VIS |
|----|-----|------|---------------|-----------------|
| **TD-M1-01** | `mau-vang` | Hoa mai | 🌼 cúc **trắng** | **P0** — bài vàng mà hoa trắng |
| **TD-M1-02** | `mau-vang` | Quả xoài chín | 🥭 đỏ-cam / xanh | **P0** — không vàng rõ |
| **TD-M1-03** | `mau-xanh-duong` | Việt quất | 🫐 → **ô đen** | **P0** — thiếu glyph |
| **TD-M1-04** | `mau-xanh-duong` | Xe xanh | 🚙 **xanh lá** | **P0** — lẫn xanh dương/lá |
| **TD-M1-05** | `mau-tim` | Áo tím | 👚 **hồng** | **P0** — sai màu hoàn toàn |

---

## Đã khóa (canonical **v4**)

| Món | File SVG |
|-----|----------|
| Hoa mai | `assets/explore/hoa-mai-vang.svg` |
| Xoài vàng | `assets/explore/xoai-vang.svg` |
| Việt quất | `assets/explore/viet-quat-xanh.svg` |
| Xe xanh dương | `assets/explore/xe-xanh-duong.svg` (+ nhãn **Xe xanh dương**) |
| Áo tím | `assets/explore/ao-tim.svg` |

Sync: `node scripts/sync-color-explore.js` · stamp `colorExploreVersion: 4`  
Audit chặn regress: thiếu `img` cho 5 món trên → Mức 1.

---

## Kết luận ghế

| Ghế | Trước ảnh | Sau SVG v4 |
|-----|-----------|------------|
| TD-PEDA | **Không đạt** nhận diện màu | **Đạt có điều kiện** (cần refresh / APK mới) |
| TD-VIS | **1/3** (emoji lệ thuộc font) | **2–3/3** với 5 SVG khóa |
| TD-CURR | Canonical v3 còn lỗ hổng | **v4** khóa |

**Nguyên tắc thẩm định mới:** với bài **màu**, mọi món mà emoji hay lệch màu trên Windows/Android **bắt buộc SVG** — không chỉ vịt con.
