# Biên bản Hội đồng Chuyên gia Giáo dục

**Ngày:** 2026-10-05  
**Phiên:** Khóa quy trình — cấm tác vụ nội dung đơn lẻ · rà kho sau gen AI × màu + làm sạch cảm xúc/họa sĩ/nhảy  
**Chủ tịch:** HDGD-LEAD

---

## 1. Phạm vi phiên

| Hạng mục | Nội dung |
|----------|----------|
| Kho | 107 bài / 11 chủ đề |
| Gen AI × màu | Hình · Động vật · Đồ vật · Phương tiện · Quả (mô hình 1 chủ thể × 6 màu) |
| Làm sạch filler | Cảm xúc · Họa sĩ · Nhảy múa (1 hành động/cảm xúc rõ) |
| Máy | `audit:lessons` M1=0 (sau sync) |

---

## 2. Điểm ghế (toàn kho — khung)

| Ghế | Điểm (0–3) | Ghi chú |
|-----|------------|---------|
| HDGD-PEDA | **2** | Màu/hình/số/quả/đối tượng rõ hơn; cảm xúc–họa sĩ–nhảy đã bỏ filler. Cần quan sát trẻ thật trên APK |
| HDGD-CURR | **2** | 1 màn=1 bài ổn; Hang Chữ Latin A–Z; số còn đếm `count` |
| HDGD-VIS | **2** | Ảnh AI × màu đã đủ file máy; vẫn bắt buộc **che chữ từng bài** trên thiết bị (không suy mẫu) |
| HDGD-VOICE | **2** | TTS vi-VN ~0.95; nút nghe có mặt |
| HDGD-SAFE | **3** | Không ads/PII; filler “Ôm bé / Bảng màu trùng” đã gỡ khỏi cam-xuc/hoa-si/nhay |

**Trung bình khung:** ~2.2 → **Đạt có điều kiện**

---

## 3. Findings

### P0 (đã xử lý trong phiên gần)
- Explore cảm xúc dán “Ôm bé” mọi bài → rebuild rõ 1 cảm xúc  
- Họa sĩ: “Bảng màu/Cọ” trùng ảnh + gate “Nghe sáo” lệch → rebuild 1 hành động  
- Chuối/oval SVG lệch hình → AI quả × màu  
- Map số emoji xám → `mapImg` AI số  

### P1 (điều kiện tiếp)
- Duyệt **che chữ** trên tablet từng chủ đề (không chỉ audit máy)  
- Nhảy/họa sĩ: ưu tiên TTS + làm theo; không dựa chữ trên nút cho trẻ 2–3  
- Ảnh AI động vật/đồ/xe × màu: kiểm mẫu mắt (màu có đọc được không)

### P2
- Đồng bộ giọng/minh họa giữa chủ đề (thẩm mỹ)

---

## 4. Quy chế khóa (bắt buộc từ phiên này)

1. **Không** gen/rebuild nội dung đơn lẻ ngoài hội đồng.  
2. Brief PEDA → duyệt → thực thi → `npm run audit:lessons` → mới APK.  
3. Tài liệu: `docs/eval/hoi-dong-chuyen-gia-giao-duc.md` · rule `.cursor/rules/be-gau-hoi-dong-giao-duc.mdc` (alwaysApply).

---

## 5. Kết luận

**Đạt có điều kiện** phát hành nội dung hiện tại trên debug APK, với điều kiện:

1. Phụ huynh/QA mở **che chữ** 1 bài/chủ đề trên thiết bị  
2. Mọi đợt gen/sửa tiếp theo phải mở lại Hội đồng trước khi chạy script  

**Ký:** HDGD-LEAD · HDGD-PEDA · HDGD-CURR · HDGD-VIS · HDGD-SAFE  

*Biên bản 2026-10-05*
