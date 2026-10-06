# Quy chế thành lập và hoạt động của Hội đồng Kiểm thử

**Áp dụng cho:** ứng dụng giáo dục mầm non *Bé Gấu — Bản đồ tri thức* (trẻ **3–5 tuổi**).

**Liên kết vận hành:** mẫu báo cáo lỗi `docs/eval/bug-report-template.md` · checklist phát hành `docs/eval/release-gate-checklist.md` · vai trò ↔ agent `docs/eval/vai-tro-8-kiem-thu.md` · đội EVAL `docs/doi-agent-eval-qa.md`.

---

## Chương I. Mục đích và phạm vi

### Điều 1. Mục đích

Hội đồng Kiểm thử bảo đảm mọi phiên bản app trước khi đến tay trẻ đều **đúng kiến thức**, **hoạt động ổn định**, **an toàn** và **thực sự dùng được** bởi trẻ chưa biết đọc.

- **Hội đồng Chuyên gia Giáo dục** quyết định *nên dạy gì*.
- **Hội đồng Kiểm thử** xác nhận app *có làm đúng như vậy không*.

### Điều 2. Phạm vi

Hội đồng kiểm thử toàn bộ:

- Màn hình, nội dung bài học, hình ảnh, âm thanh
- Logic chấm điểm, hệ thống sao
- Khu vực phụ huynh và bảo vệ dữ liệu trẻ em

**Mọi phiên bản phát hành**, kể cả bản sửa lỗi nhỏ, đều phải qua hội đồng.

### Điều 3. Tính độc lập

- Thành viên hội đồng **không trực tiếp viết code** hoặc **tạo nội dung** cho phần mình kiểm thử.
- Người làm ra sản phẩm **không được tự duyệt** sản phẩm của mình.

---

## Chương II. Thành phần hội đồng

### Điều 4. Cơ cấu (8 vai trò)

Một người có thể kiêm nhiều vai trò khi nhóm còn nhỏ, **trừ** khi vi phạm Điều 3.

| Vai trò | Trách nhiệm chính | Ví dụ lỗi vai trò này phải bắt được |
|--------|-------------------|-------------------------------------|
| **Trưởng ban Kiểm thử** | Điều phối, lập kế hoạch, ký duyệt phát hành | Phát hành khi còn lỗi nghiêm trọng chưa sửa |
| **Kiểm thử viên Chức năng** | Luồng màn hình, logic chấm điểm, lưu tiến độ | Bé chọn đúng bóng vàng nhưng app báo "Thử lại" |
| **Kiểm thử viên Dữ liệu Nội dung** | Đối chiếu từng bài với bộ dữ liệu được duyệt | Bài Màu Vàng hiển thị quả táo đỏ |
| **Giáo viên Mầm non (sư phạm)** | Kiến thức đúng, phù hợp văn hóa Việt | Gọi chanh vàng là "chanh", taxi vàng, bí ngô Halloween |
| **Chuyên gia Tâm lý Trẻ em** | Thiết kế và giám sát buổi thử với trẻ thật | Trẻ không biết nhìn nhân vật nào vì có 3 nhân vật cùng lúc |
| **Kiểm thử viên Hình ảnh & Âm thanh** | Ảnh, màu, giọng đọc, đồng bộ nhân vật | Nền ô vuông giả trong suốt; Đom Đóm hai hình dạng |
| **Kiểm thử viên Thiết bị & Hiệu năng** | Nhiều máy, mạng yếu, cấu hình thấp | Ảnh không tải → màn câu hỏi trống |
| **Kiểm thử viên An toàn & Bảo mật** | Cổng phụ huynh, dữ liệu, liên kết ngoài | Trẻ vào được phần cài đặt |

### Điều 5. Nhóm thử nghiệm thực tế

Ngoài 8 vai trò, duy trì **10–15 trẻ** (3 / 4 / 5 tuổi, Bắc + Nam), có phụ huynh hoặc giáo viên đi kèm. Thay mới một phần nhóm **mỗi 3 tháng**.

---

## Chương III. Nguyên tắc kiểm thử

### Điều 6. “Đôi mắt trẻ không biết đọc”

Mỗi màn hình kiểm thử **ít nhất một lần** khi **che toàn bộ chữ**. Nếu chỉ nhìn hình + nghe mà không biết phải làm gì → **không đạt**.

### Điều 7. Âm thanh bắt buộc

Mọi buổi kiểm thử **bật loa**. Ảnh chụp màn hình **không đủ**; cần **quay màn hình kèm âm thanh**.

### Điều 8. Kiểm thử từng bài

Không kiểm bài đầu rồi suy ra các bài còn lại. Dữ liệu có thể đúng bài 1, sai bài sau.

### Điều 9. Kiểm thử cả đường sai

Mỗi câu hỏi: chọn **đúng**, **sai**, **sai nhiều lần**, **bấm liên tục**, **không bấm 30 giây**.

### Điều 10. Hồi quy sau sửa

Sau mỗi bản sửa, **kiểm tra lại lỗi cũ** (regression).

---

## Chương IV. Quy trình kiểm thử

### Điều 11. Năm vòng

Không chuyển vòng sau khi vòng trước còn **lỗi Mức 1**.

| Vòng | Tên | Nội dung (tóm tắt) |
|------|-----|-------------------|
| **1** | Kiểm thử nhanh (~30 phút) | Mở app, mọi màn hiển thị, không màn trống |
| **2** | Chức năng | Luồng chơi, chấm điểm, sao, lưu tiến độ, mở khóa |
| **3** | Nội dung & sư phạm | Đối chiếu **100% bài** với `content/curriculum/lessons.json` đã duyệt |
| **4** | Trẻ thật | Theo Chương VI |
| **5** | Hồi quy & thiết bị | Lại danh sách lỗi cũ trên **≥ 3 thiết bị** |

### Điều 12. Thiết bị tối thiểu

- Tablet Android giá rẻ
- Điện thoại Android màn nhỏ
- iPad (nếu có bản iOS)
- Ngang / dọc (nếu app hỗ trợ)
- Mạng yếu hoặc **mất mạng**

---

## Chương V. Phân loại lỗi

### Điều 13. Bốn mức

| Mức | Định nghĩa | Ví dụ | Xử lý |
|-----|------------|-------|--------|
| **1 – Chặn phát hành** | Dạy sai, chấm sai, màn trống, treo, an toàn/dữ liệu | Táo đỏ trong Màu Vàng; màn trống; trẻ vào cài đặt | Dừng phát hành, sửa ngay |
| **2 – Nghiêm trọng** | Trẻ bối rối, không tự xong bài | Không tự đọc câu hỏi; NPC đổi hình; câu không khớp màn | Sửa trước phát hành |
| **3 – Trung bình** | Thẩm mỹ / UX, vẫn chơi được | Nền giả PNG; sao không khớp | Sửa bản kế |
| **4 – Nhẹ** | Tinh chỉnh | Khoảng cách thẻ | Backlog cải tiến |

### Điều 14. Quy tắc nâng mức

- Lỗi **kiến thức**, **an toàn trẻ**, **dữ liệu cá nhân** → mặc định **Mức 1**.
- Lỗi Mức 3 lặp **> 3 màn** → nâng **Mức 2**.

---

## Chương VI. Thử nghiệm với trẻ em

### Điều 15. Đồng ý

Phiếu đồng ý phụ huynh; trẻ **vui vẻ** tham gia — không muốn thì **dừng buổi**.

### Điều 16. Thời lượng

- **3 tuổi:** ≤ 15 phút/buổi  
- **4–5 tuổi:** ≤ 20 phút/buổi  
- Có người quen; nơi quen (nhà / lớp).

### Điều 17. Quan sát, không hướng dẫn

Chỉ hỗ trợ khi bế tắc **> 30 giây** hoặc khó chịu → ghi **lỗi trải nghiệm**.

### Điều 18. Bảo vệ danh tính

Không quay mặt (trừ đồng ý riêng). Mã ẩn danh (vd. `T3-01`). Xóa dữ liệu thử ≤ **6 tháng** sau báo cáo.

### Điều 19. Chỉ số ghi nhận (mỗi bài)

Tự hoàn thành · thời gian · chạm vô ích · lần cần người lớn · cảm xúc (vui / bình thường / bối rối / buồn / sợ). **Sợ** → báo cáo **Mức 2**.

---

## Chương VII. Báo cáo lỗi

### Điều 20. Nội dung báo cáo

Mã lỗi · mức · màn/bài · thiết bị · bước tái hiện · mong đợi · thực tế · **ảnh/video có âm thanh** · người phát hiện.

**Ví dụ:** `RM-014`, Mức 1 — Rừng Màu / Màu Vàng / Khám phá — tablet Android 10". Bước: bản đồ → Rừng Màu → Màu Vàng. Mong đợi: chuối + TTS "Quả chuối màu vàng". Thực tế: táo đỏ, chữ "Táo".

→ Dùng mẫu: `docs/eval/bug-report-template.md`

### Điều 21. Vòng đời lỗi

`Mới` → `Đã xác nhận` → `Đang sửa` → `Chờ kiểm tra lại` → `Đã đóng`

Chỉ **người phát hiện** hoặc **Trưởng ban** được đóng lỗi.

---

## Chương VIII. Tiêu chí phát hành

### Điều 22. Điều kiện bắt buộc

Phát hành khi **đủ**:

1. Không còn lỗi **Mức 1** hoặc **Mức 2**
2. **100%** bài đối chiếu bộ dữ liệu đã duyệt
3. **≥ 80%** trẻ nhóm thử **tự hoàn thành** bài (không hướng dẫn)
4. Không trẻ nào **sợ hãi**
5. **Không trẻ** vượt cổng phụ huynh trong buổi thử
6. Mọi màn có **giọng đọc hoạt động**

→ Checklist: `docs/eval/release-gate-checklist.md`

### Điều 23. Quyền phủ quyết

**Trưởng ban Kiểm thử**, **Giáo viên Mầm non**, **An toàn & Bảo mật** — mỗi người phủ quyết trong lĩnh vực mình. Hủy phủ quyết chỉ khi **đã sửa + kiểm tra lại**, không bằng biểu quyết hay áp lực tiến độ.

---

## Chương IX. Hoạt động định kỳ

### Điều 24. Lịch họp

- **Hàng tuần** (giai đoạn phát triển): rà lỗi mới  
- **Trước phát hành:** họp duyệt chính thức  
- **Hàng quý:** họp chung Hội đồng Chuyên gia Giáo dục (thiết kế: số câu/bài, cách tính sao…)

### Điều 25. Sửa đổi quy chế

Rà soát **6 tháng** hoặc khi thêm vùng học mới. Sửa cần **Trưởng ban Kiểm thử** + **Trưởng nhóm nội dung** (Hội đồng Chuyên gia) thông qua.

---

*Phiên bản quy chế: 1.0 · Ngày ban hành: theo quyết định Trưởng ban Kiểm thử*
