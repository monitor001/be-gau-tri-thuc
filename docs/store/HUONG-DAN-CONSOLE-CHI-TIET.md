# Hướng dẫn chi tiết — Hoàn tất thiết lập Play Console (Bé Gấu Tri Thức)

Màn hình bạn đang mở: **Dashboard → Hoàn tất bước thiết lập ứng dụng**.  
Làm lần lượt từng mục có dấu mũi tên `>` cho đến khi tất cả chuyển sang **Đã hoàn tất** (màu xanh).

**Package:** `com.begau.trithuc`  
**Tên hiển thị:** Bé Gấu Tri Thức  
**AAB đã build:** `dist-aab/BeGau-TriThuc-v1.0.0-1-release.aab`

---

## Trước khi làm checklist (5 phút)

### A. Host chính sách quyền riêng tư (bắt buộc có URL https)

Play **không** nhận file trên máy — cần link mở được bằng trình duyệt.

1. Mở file trong project: `docs/store/privacy-policy.html`
2. Email liên hệ đã đặt: **nguyenthanhvc@gmail.com** (trong `docs/privacy-policy.html`)
3. Đã host trên GitHub Pages (hoặc tự host lại nếu cần):

| Cách | Việc làm |
|------|----------|
| **GitHub Pages** (miễn phí) | Đẩy repo (hoặc repo riêng chỉ chứa privacy) → Settings → Pages → publish folder chứa `docs/store` → URL kiểu `https://<user>.github.io/<repo>/privacy-policy.html` |
| **Google Sites** | Tạo site → dán nội dung chính sách → Publish → copy link |
| **Website riêng** | Upload `privacy-policy.html` lên hosting → copy URL |

4. Mở URL trên điện thoại (không đăng nhập) — phải thấy trang tiếng Việt đầy đủ.

**URL chính thức (GitHub Pages):**

`https://monitor001.github.io/be-gau-tri-thuc/privacy-policy.html`

Ghi lại URL này — dùng ở bước 1 bên dưới.

### B. Chuẩn bị AAB

Nếu chưa có file AAB:

```powershell
npm run release:aab
```

Sao lưu keystore: `android/release/be-gau-upload.jks` + `PLAY-SIGNING-SECRET.txt`.

---

## Mục 1 — Cài đặt chính sách quyền riêng tư

**Menu:** Chính sách về ứng dụng (App content) → **Chính sách quyền riêng tư**

| Câu hỏi | Trả lời |
|---------|---------|
| URL chính sách | Dán URL https đã host (mục A) |
| Có chính sách không? | **Có** |

→ **Lưu**. Dấu tích xanh khi URL hợp lệ (Play có thể kiểm tra mở được).

---

## Mục 2 — Thông tin đăng nhập (App access)

**Menu:** App content → **Thông tin đăng nhập / App access**

| Câu hỏi | Trả lời đúng với Bé Gấu |
|---------|-------------------------|
| Tất cả chức năng có truy cập được không cần đăng nhập đặc biệt? | **Có** — chọn kiểu *All functionality is available without special access* / Không cần thông tin đăng nhập |
| Có phần chỉ dành cho người lớn? | Có **parent gate** (câu hỏi số bằng chữ), nhưng reviewer **không cần tài khoản**. Ghi chú thêm (nếu có ô Instructions): |

**Nội dung gợi ý dán vào Instructions (nếu bắt buộc ghi chú):**

```text
App không có tài khoản đăng nhập.
Trẻ chơi tự do từ nút "Khám phá nào!".
Màn "Người lớn" / Cài đặt: trả lời câu hỏi gõ số (ví dụ "mười bảy" → nhập 17).
Ghi âm micro chỉ trong Cài đặt người lớn.
```

→ **Lưu**.

---

## Mục 3 — Quảng cáo (Ads)

**Menu:** App content → **Quảng cáo**

| Câu hỏi | Trả lời |
|---------|---------|
| App có chứa có quảng cáo không? | **Không** (No, my app does not contain ads) |

→ **Lưu**.

---

## Mục 4 — Mức phân loại nội dung (Content rating)

**Menu:** App content → **Mức phân loại nội dung** → Bắt đầu bảng câu hỏi IARC

1. Email liên hệ: **nguyenthanhvc@gmail.com**  
2. **Category:** chọn **Education** / Giáo dục (hoặc Utility nếu không thấy Education — ưu tiên Education)  
3. Trả lời bảng câu hỏi — với Bé Gấu dùng khung sau:

| Chủ đề câu hỏi | Chọn |
|----------------|------|
| Bạo lực / máu / vũ khí | **Không** |
| Ngôn ngữ tục tĩu | **Không** |
| Nội dung tình dục | **Không** |
| Ma túy / rượu | **Không** |
| Mua hàng trong app (IAP) | **Không** (xu chỉ trong app, không mua bằng tiền thật) |
| Chia sẻ vị trí / tìm bạn | **Không** |
| Chat người lạ / UGC không kiểm duyệt | **Không** |
| Quảng cáo | **Không** |

4. Gửi → nhận xếp hạng (thường **PEGI 3** / **Everyone** / tương đương).  
5. Áp dụng xếp hạng cho app → **Lưu**.

---

## Mục 5 — Đối tượng mục tiêu (Target audience) ⚠️ quan trọng

**Menu:** App content → **Đối tượng mục tiêu và nội dung**

Vì app cho trẻ **dưới 5 tuổi**, bạn **phải** khai nhóm dưới 13 — sẽ mở thêm **Families Policy**.

| Bước | Chọn |
|------|------|
| Độ tuổi mục tiêu | Chọn nhóm có **Ages 5 and under** / dưới 5 (và có thể thêm 6–8 nếu muốn; **không** chọn chỉ 18+ ) |
| App có dành chủ yếu cho trẻ em không? | **Có** / Designed for children / Families |
| Appeal to children | **Yes** — primary audience includes children |

Tiếp theo thường hiện **Families**:

| Mục Families | Gợi ý |
|--------------|--------|
| App thuộc chương trình Designed for Families? | Có / muốn xuất hiện trong mục trẻ em → **Yes** nếu đủ điều kiện |
| Quảng cáo | Không ads |
| SDK / thu thập dữ liệu | Không analytics chưa chứng nhận Families; hiện chỉ Capacitor + TTS |
| Parent gate cho khu vực người lớn | **Có** (đã có trong app) |

Đọc kỹ từng câu — sai khai tuổi (vd. chỉ 18+) là **lệch** với app thật và có thể bị từ chối.

→ **Lưu** / Gửi.

---

## Mục 6 — An toàn dữ liệu (Data safety)

**Menu:** App content → **An toàn dữ liệu**

Làm theo wizard. Trả lời **khớp code thật**:

### 6.1. Thu thập / chia sẻ

| Câu | Trả lời |
|-----|---------|
| App có thu thập hoặc chia sẻ dữ liệu người dùng không? | **Có thu thập** (vì có ghi âm khi PH dùng) — nhưng **không chia sẻ** với bên thứ ba |
| Dữ liệu có được mã hóa khi truyền không? | Không upload lên server → có thể chọn N/A / không truyền; nếu bắt buộc: ghi âm **chỉ trên thiết bị** |
| Người dùng có thể yêu cầu xóa không? | **Có** — xóa trong app / xóa dữ liệu hệ thống |

### 6.2. Loại dữ liệu — khai đúng

**Có — Audio / Ghi âm / Voice hoặc sound recordings**

| Trường | Giá trị |
|--------|---------|
| Thu thập? | **Có** |
| Chia sẻ? | **Không** |
| Bắt buộc hay tùy chọn? | **Tùy chọn** (PH không ghi thì app vẫn chơi bằng TTS) |
| Mục đích | App functionality (phát lại lời đọc thay TTS) |
| Xử lý tạm thời? | Không — lưu đến khi PH xóa |
| Thu thập trước khi đăng nhập? | Không có đăng nhập |

**Không khai** (trừ khi sau này bạn thêm):

- Tên, email, số điện thoại trẻ  
- Vị trí, danh bạ, ảnh thư viện  
- ID quảng cáo, analytics, crash cloud  
- Tài chính, sức khỏe  

**Xu / tiến độ / sao:** thường xếp **App activity** hoặc **Other user-generated content** / **App interactions** — nếu hỏi:

| Trường | Giá trị |
|--------|---------|
| Thu thập? | Có (lưu local) |
| Chia sẻ? | Không |
| Mục đích | App functionality |
| On-device only? | Có — không gửi lên server của bạn |

Nếu wizard hỏi rõ “Is this data processed ephemerally?” với tiến độ → **No** (lưu lâu dài trên máy).

### 6.3. Security practices

| Câu | Trả lời |
|-----|---------|
| Data encrypted in transit | Không gửi lên mạng của bạn → chọn theo hướng dẫn “không áp dụng” nếu có; **không** nói sai là có server |
| Users can request deletion | **Yes** |

→ **Gửi** / **Xuất bản** phần Data safety.

---

## Mục 7 — Ứng dụng của chính phủ

**Menu:** App content → **Ứng dụng của chính phủ**

| Câu | Trả lời |
|-----|---------|
| Đây có phải app chính thức của cơ quan chính phủ? | **Không** |

→ **Lưu**.

---

## Mục 8 — Tính năng tài chính

**Menu:** App content → **Tính năng tài chính**

| Câu | Trả lời |
|-----|---------|
| App có dịch vụ ngân hàng, ví, đầu tư, vay, crypto…? | **Không** |
| Xu trong game? | Chỉ điểm thưởng ảo, **không** mua bằng tiền thật → vẫn chọn **Không** tính năng tài chính |

→ **Lưu**.

---

## Mục 9 — Sức khỏe

**Menu:** App content → **Sức khỏe**

| Câu | Trả lời |
|-----|---------|
| App có tính năng sức khỏe / y tế / fitness theo dõi sức khỏe? | **Không** |
| Giáo dục nhận biết cảm xúc nhẹ? | Vẫn **Không** coi là Health app theo nghĩa Google (không đo nhịp tim, không tư vấn y tế) |

→ **Lưu**.

---

## Sau khi 9 mục nội dung xong

Quay lại **Dashboard**. Phần “Hãy cho chúng tôi biết nội dung ứng dụng” sẽ xanh.  
Còn các việc khác trên danh sách việc cần làm:

### 10. Trang thông tin cửa hàng (Store listing) — bắt buộc

**Menu:** Hiện diện trên Cửa hàng → **Trang thông tin chính trên cửa hàng**

| Trường | Nội dung gợi ý |
|--------|----------------|
| Tên app | Bé Gấu Tri Thức (≤ 30 ký tự) |
| Mô tả ngắn | Học chơi nhận biết màu, hình, số, chữ — dành cho trẻ dưới 5 tuổi. Không quảng cáo trong lúc chơi. |
| Mô tả đầy đủ | Xem khối mẫu cuối file này |
| Icon 512×512 | Xuất từ `ic_launcher` / thiết kế riêng |
| Ảnh chụp màn hình | Ít nhất **2** ảnh điện thoại hoặc tablet (chụp từ máy thật / emulator) |
| Danh mục | Giáo dục |
| Email liên hệ | Email thật |
| Chính sách | Cùng URL privacy |

### 11. Chọn quốc gia / giá

**Menu:** Hiện diện → Quốc gia và khu vực → chọn VN (+ nước khác nếu muốn) · Miễn phí.

### 12. Tải AAB lên

**Menu:** Phát hành → **Thử nghiệm** → **Thử nghiệm nội bộ** (khuyên dùng trước) hoặc **Thử nghiệm khép kín**

1. Tạo bản phát hành mới  
2. Upload `dist-aab/BeGau-TriThuc-v1.0.0-1-release.aab`  
3. Ghi chú phát hành (vd. “Bản 1.0.0 — 107 bài học”)  
4. Lưu → Gửi để xem xét (Review)

**Lần đầu** thường phải qua **Internal testing** trước khi Production.

### 13. Tài khoản thử nghiệm

Thêm email Gmail của bạn (và người test) vào danh sách tester → mở link opt-in → cài từ Play (không phải APK debug).

---

## Bảng tra cứu nhanh (in / để cạnh màn hình)

| # | Mục Console | Đáp án ngắn |
|---|-------------|-------------|
| 1 | Privacy policy | URL https đã host |
| 2 | App access | Không login; ghi chú parent gate |
| 3 | Ads | Không |
| 4 | Content rating | Education · không bạo lực · không IAP tiền |
| 5 | Target audience | Trẻ dưới 5 / dưới 13 · Families |
| 6 | Data safety | Audio tùy chọn, on-device, không chia sẻ |
| 7 | Government | Không |
| 8 | Financial | Không |
| 9 | Health | Không |

---

## Mẫu mô tả đầy đủ (Store listing)

```text
Bé Gấu Tri Thức là ứng dụng học qua chơi dành cho trẻ dưới 5 tuổi.

Bé cùng Bạn Gấu khám phá 11 chủ đề: màu sắc, hình khối, số, chữ cái, động vật, đồ vật… Mỗi màn là một bài học ngắn: nhìn hình, nghe lời tiếng Việt, chọn đáp án đúng để “giúp bạn nhỏ về nhà”.

Đặc điểm:
• 107 bài học · một ngón tay · không đếm ngược gây áp lực
• Giọng đọc tiếng Việt (TTS); phụ huynh có thể ghi âm lời đọc thay TTS
• Xu Gấu và đổi thưởng vui — không mua hàng trong ứng dụng
• Góc Người lớn có câu hỏi bảo vệ; giới hạn thời gian chơi tùy chọn
• Không tài khoản trẻ · không quảng cáo trong lúc chơi

Lưu ý: ghi âm chỉ dùng khi phụ huynh vào Cài đặt và chỉ lưu trên máy.
```

---

## Nếu bị chặn / lỗi thường gặp

| Lỗi | Cách xử lý |
|-----|------------|
| Privacy URL không hợp lệ | Phải https, mở công khai, không yêu cầu đăng nhập |
| Families / Designed for Families thiếu | Quay lại Target audience, hoàn tất mọi câu phụ |
| Data safety lệch quyền RECORD_AUDIO | Phải khai Audio + giải thích on-device |
| AAB chưa ký / sai key | Dùng lại `npm run release:aab` với cùng keystore |
| Reviewer không vào được | Mục App access: ghi rõ không cần login + cách mở Người lớn |

---

*File liên quan: `privacy-policy.html` · `HUONG-DAN-NOP-PLAY.md` · `docs/phat-hanh-play-families.md`*
