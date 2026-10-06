# Chương trình học — Chi tiết chủ đề & bài học

**Cập nhật:** 2026-10-06  
**Nguồn data:** `content/curriculum/lessons.json` · `js/lessons-data.js`  
**Mô hình:** `one-lesson-one-screen` · **version:** 2  
**Luồng:** topic → lesson-list → explore → gate → reward → shop  
**Tổng:** **107 màn / 11 chủ đề**

> Dùng để theo dõi & phát triển. Đổi bài → cập nhật data → chạy `node scripts/export-curriculum-md.js`.  
> Liên quan: `docs/curr-danh-sach-man.md` (rút gọn) · `docs/trang-thai-trien-khai.md` (tiến độ kỹ thuật)

---

## 0. Quy ước chung

| Khái niệm | Ý nghĩa |
|-----------|---------|
| 1 màn = 1 bài | Không gộp nhiều khái niệm trong một màn |
| Explore | Trẻ chạm nhìn / nghe / chạm ví dụ (thường × màu hoặc × khái niệm) |
| Gate | Câu đố nhận diện (che chữ + TTS) |
| Friend | “Bạn” cần cứu — gắn với bài |
| Story intro | Lời nhờ giúp: *Bạn Gấu ơi, cứu mình với!* |
| Audio slots NL | Phụ huynh ghi âm: `intro` · `explore` · `gate` · `win` |
| Hình học | Đồi Hình dùng SVG thuần (`geometry-svg-vis`) |

### Bảng tổng quan chủ đề

| # | ID | Tên map | Màn | Trợ lý | Màu |
|---|-----|---------|-----|--------|-----|
| 1 | `mau` | Rừng Màu Sắc 🌈🌳 | **8** | `dom-dom` | `#2f9e44` |
| 2 | `hinh` | Đồi Hình Khối 🔺 | **7** | `be-gau` | `#f76707` |
| 3 | `so` | Suối Đếm Số 🐟🐠🐡 | **10** | `soc` | `#3da9fc` |
| 4 | `chu` | Hang Chữ Latin 🅰️✨ | **26** | `be-gau` | `#7c5cff` |
| 5 | `dong-vat` | Vườn Bạn Bè 🐰 | **12** | `dom-dom` | `#fab005` |
| 6 | `trai-cay` | Vườn Trái Cây 🍎🧺 | **8** | `dom-dom` | `#e03131` |
| 7 | `do-vat` | Nhà Đồ Vật ⚽ | **12** | `be-gau` | `#e67700` |
| 8 | `cam-xuc` | Góc Cảm Xúc 😊 | **6** | `dom-dom` | `#f08c00` |
| 9 | `phuong-tien` | Bến Phương Tiện 🚌 | **6** | `soc` | `#1971c2` |
| 10 | `nhay-mua` | Sân Nhảy Múa 💃 | **6** | `dom-dom` | `#e64980` |
| 11 | `hoa-si` | Góc Họa Sĩ 🎨 | **6** | `be-gau` | `#ae3ec9` |
| | | **Tổng** | **107** | | |

---

## 1. Rừng Màu Sắc (`mau`) — 8 màn

| Trường | Giá trị |
|---------|---------|
| shortName | Rừng Màu |
| speakName | Rừng Màu Sắc |
| emoji | 🌈🌳 |
| helper | `dom-dom` |
| color | `#2f9e44` |
| order | 1 |

### Mục tiêu sư phạm

Nhận biết và gọi tên màu cơ bản; ghép màu với đồ vật quen thuộc.

### Danh sách bài (bảng nhanh)

| # | ID | Tiêu đề | Bạn | Ô explore | Gate (prompt) | Xu | Tuổi |
|---|-----|---------|-----|-----------|---------------|-----|------|
| 1 | `mau-do` | 🍎 Màu Đỏ | 🍎 Bạn Đỏ | 6 | — | 5 | 2 |
| 2 | `mau-vang` | 🍌 Màu Vàng | 🍌 Bạn Vàng | 6 | — | 5 | 2 |
| 3 | `mau-xanh-duong` | 🐋 Màu Xanh dương | 🐋 Bạn Xanh dương | 6 | — | 5 | 2 |
| 4 | `mau-xanh-la` | 🐸 Màu Xanh lá | 🐸 Bạn Xanh lá | 6 | — | 5 | 2 |
| 5 | `mau-cam` | 🍊 Màu Cam | 🍊 Bạn Cam | 6 | — | 5 | 2 |
| 6 | `mau-tim` | 🍇 Màu Tím | 🍇 Bạn Tím | 6 | — | 5 | 2 |
| 7 | `mau-hong` | 🐷 Màu Hồng | 🐷 Bạn Hồng | 6 | — | 5 | 2 |
| 8 | `mau-nau` | 🧸 Màu Nâu | 🧸 Bạn Nâu | 6 | — | 5 | 2 |

### Chi tiết từng bài

#### `mau-do` — 🍎 Màu Đỏ

- **speakText:** Màu đỏ
- **teachText:** Bạn Gấu ơi, cứu mình với! Nhiều thứ màu đỏ! Táo, dâu, cà chua… cùng nhìn màu đỏ nào!
- **exploreHint:** Chạm từng món màu đỏ nhé!
- **friend:** `ban-do` · 🍎 Bạn Đỏ · tint `#e03131`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn những món màu đỏ của Bạn Đỏ nào!
- **story.gateLine:** Bóng nào màu đỏ? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Đỏ về rồi!
- **story.theme:** `rescue-red`
- **gate.promptVi:** 
- **gate.questions:** 3 câu
  - Q1: Bóng nào màu đỏ? Bé chạm vào nhé!
  - Q2: Bóng nào màu đỏ? Bé chọn bóng đỏ nhé!
  - Q3: Đâu là bóng màu đỏ?
- **exploreItems (6):**
  - Quả táo — *Quả táo màu đỏ* · `assets/explore/mau/mau-do-qua-tao.jpg` _(ai-gen)_
  - Quả dâu — *Quả dâu màu đỏ* · `assets/explore/mau/mau-do-qua-dau.jpg` _(ai-gen)_
  - Cà chua — *Cà chua màu đỏ* · `assets/explore/mau/mau-do-ca-chua.jpg` _(ai-gen)_
  - Xe cứu hỏa — *Xe cứu hỏa màu đỏ* · `assets/explore/mau/mau-do-xe-cuu-hoa.jpg` _(ai-gen)_
  - Bọ rùa — *Bọ rùa màu đỏ* · `assets/explore/mau/mau-do-bo-rua.jpg` _(ai-gen)_
  - Hoa hồng — *Hoa hồng màu đỏ* · `assets/explore/mau/mau-do-hoa-hong.jpg` _(ai-gen)_
- **Audio slots (Người lớn):** `lesson:mau-do:intro` · `explore` · `gate` · `win`

#### `mau-vang` — 🍌 Màu Vàng

- **speakText:** Màu vàng
- **teachText:** Bạn Gấu ơi, cứu mình với! Nhiều thứ màu vàng! Chuối, hoa mai, vịt con… cùng nhìn màu vàng nào!
- **exploreHint:** Chạm từng món màu vàng nhé!
- **friend:** `ban-vang` · 🍌 Bạn Vàng · tint `#ffd43b`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn những món màu vàng của Bạn Vàng nào!
- **story.gateLine:** Bóng nào màu vàng? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Vàng về rồi!
- **story.theme:** `rescue-yellow`
- **gate.promptVi:** 
- **gate.questions:** 3 câu
  - Q1: Bóng nào màu vàng? Bé chạm vào nhé!
  - Q2: Bóng nào màu vàng? Bé chọn bóng vàng nhé!
  - Q3: Đâu là bóng màu vàng?
- **exploreItems (6):**
  - Quả chuối — *Quả chuối màu vàng* · `assets/explore/mau/mau-vang-qua-chuoi.jpg` _(ai-gen)_
  - Gà con — *Gà con màu vàng* · `assets/explore/mau/mau-vang-ga-con.jpg` _(ai-gen)_
  - Hoa hướng dương — *Hoa hướng dương màu vàng* · `assets/explore/mau/mau-vang-hoa-huong-duong.jpg` _(ai-gen)_
  - Quả xoài chín — *Quả xoài chín màu vàng* · `assets/explore/mau/mau-vang-qua-xoai-chin.jpg` _(ai-gen)_
  - Hoa mai — *Hoa mai màu vàng* · `assets/explore/mau/mau-vang-hoa-mai.jpg` _(ai-gen)_
  - Vịt con — *Vịt con màu vàng* · `assets/explore/mau/mau-vang-vit-con.jpg` _(ai-gen)_
- **Audio slots (Người lớn):** `lesson:mau-vang:intro` · `explore` · `gate` · `win`

#### `mau-xanh-duong` — 🐋 Màu Xanh dương

- **speakText:** Màu xanh dương
- **teachText:** Bạn Gấu ơi, cứu mình với! Nhiều thứ màu xanh dương! Bầu trời, cá voi… cùng nhìn nào!
- **exploreHint:** Chạm từng món màu xanh dương nhé!
- **friend:** `ban-xanh-duong` · 🐋 Bạn Xanh dương · tint `#3da9fc`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn những món màu xanh dương nào!
- **story.gateLine:** Bóng nào màu xanh dương? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Xanh dương về rồi!
- **story.theme:** `rescue-blue`
- **gate.promptVi:** 
- **gate.questions:** 3 câu
  - Q1: Bóng nào màu xanh dương? Bé chạm vào nhé!
  - Q2: Bóng nào màu xanh dương?
  - Q3: Đâu là bóng màu xanh dương?
- **exploreItems (6):**
  - Sóng biển — *Sóng biển màu xanh dương* · `assets/explore/mau/mau-xanh-duong-song-bien.jpg` _(ai-gen)_
  - Cá voi — *Cá voi màu xanh dương* · `assets/explore/mau/mau-xanh-duong-ca-voi.jpg` _(ai-gen)_
  - Việt quất — *Việt quất màu xanh dương* · `assets/explore/mau/mau-xanh-duong-viet-quat.jpg` _(ai-gen)_
  - Quần jean — *Quần jean màu xanh dương* · `assets/explore/mau/mau-xanh-duong-quan-jean.jpg` _(ai-gen)_
  - Quyển sách — *Quyển sách màu xanh dương* · `assets/explore/mau/mau-xanh-duong-quyen-sach.jpg` _(ai-gen)_
  - Xe xanh dương — *Xe màu xanh dương* · `assets/explore/mau/mau-xanh-duong-xe-xanh-duong.jpg` _(ai-gen)_
- **Audio slots (Người lớn):** `lesson:mau-xanh-duong:intro` · `explore` · `gate` · `win`

#### `mau-xanh-la` — 🐸 Màu Xanh lá

- **speakText:** Màu xanh lá
- **teachText:** Bạn Gấu ơi, cứu mình với! Cùng chơi với Bạn Xanh lá nào!
- **exploreHint:** Chạm từng món màu xanh lá nhé!
- **friend:** `ban-xanh-la` · 🐸 Bạn Xanh lá · tint `#2f9e44`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn những món màu xanh lá nào!
- **story.gateLine:** Bóng nào màu xanh lá? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Xanh lá về rồi!
- **story.theme:** `rescue-green`
- **gate.promptVi:** 
- **gate.questions:** 3 câu
  - Q1: Bóng nào màu xanh lá? Bé chạm vào nhé!
  - Q2: Bóng nào màu xanh lá?
  - Q3: Đâu là bóng màu xanh lá?
- **exploreItems (6):**
  - Con ếch — *Con ếch màu xanh lá* · `assets/explore/mau/mau-xanh-la-con-ech.jpg` _(ai-gen)_
  - Lá cây — *Lá cây màu xanh lá* · `assets/explore/mau/mau-xanh-la-la-cay.jpg` _(ai-gen)_
  - Dưa chuột — *Dưa chuột màu xanh lá* · `assets/explore/mau/mau-xanh-la-dua-chuot.jpg` _(ai-gen)_
  - Bông cải — *Bông cải màu xanh lá* · `assets/explore/mau/mau-xanh-la-bong-cai.jpg` _(ai-gen)_
  - Cây xanh — *Cây xanh màu xanh lá* · `assets/explore/mau/mau-xanh-la-cay-xanh.jpg` _(ai-gen)_
  - Rau xanh — *Rau xanh màu xanh lá* · `assets/explore/mau/mau-xanh-la-rau-xanh.jpg` _(ai-gen)_
- **Audio slots (Người lớn):** `lesson:mau-xanh-la:intro` · `explore` · `gate` · `win`

#### `mau-cam` — 🍊 Màu Cam

- **speakText:** Màu cam
- **teachText:** Bạn Gấu ơi, cứu mình với! Nhiều thứ màu cam! Quả cam, cà rốt, cáo… cùng nhìn màu cam nào!
- **exploreHint:** Chạm từng món màu cam nhé!
- **friend:** `ban-cam` · 🍊 Bạn Cam · tint `#f76707`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn những món màu cam nào!
- **story.gateLine:** Bóng nào màu cam? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Cam về rồi!
- **story.theme:** `rescue-orange`
- **gate.promptVi:** 
- **gate.questions:** 3 câu
  - Q1: Bóng nào màu cam? Bé chạm vào nhé!
  - Q2: Bóng nào màu cam?
  - Q3: Đâu là bóng màu cam?
- **exploreItems (6):**
  - Quả cam — *Quả cam màu cam* · `assets/explore/mau/mau-cam-qua-cam.jpg` _(ai-gen)_
  - Cà rốt — *Cà rốt màu cam* · `assets/explore/mau/mau-cam-ca-rot.jpg` _(ai-gen)_
  - Con cáo — *Con cáo màu cam* · `assets/explore/mau/mau-cam-con-cao.jpg` _(ai-gen)_
  - Bóng rổ — *Bóng rổ màu cam* · `assets/explore/mau/mau-cam-bong-ro.jpg` _(ai-gen)_
  - Hình cam — *Hình này màu cam* · `assets/explore/mau/mau-cam-hinh-cam.jpg` _(ai-gen)_
  - Ô vuông cam — *Ô vuông màu cam* · `assets/explore/mau/mau-cam-o-vuong-cam.jpg` _(ai-gen)_
- **Audio slots (Người lớn):** `lesson:mau-cam:intro` · `explore` · `gate` · `win`

#### `mau-tim` — 🍇 Màu Tím

- **speakText:** Màu tím
- **teachText:** Bạn Gấu ơi, cứu mình với! Nhiều thứ màu tím! Nho, cà tím… cùng nhìn màu tím nào!
- **exploreHint:** Chạm từng món màu tím nhé!
- **friend:** `ban-tim` · 🍇 Bạn Tím · tint `#9c36b5`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn những món màu tím nào!
- **story.gateLine:** Bóng nào màu tím? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Tím về rồi!
- **story.theme:** `rescue-purple`
- **gate.promptVi:** 
- **gate.questions:** 3 câu
  - Q1: Bóng nào màu tím? Bé chạm vào nhé!
  - Q2: Bóng nào màu tím?
  - Q3: Đâu là bóng màu tím?
- **exploreItems (6):**
  - Quả nho — *Quả nho màu tím* · `assets/explore/mau/mau-tim-qua-nho.jpg` _(ai-gen)_
  - Cà tím — *Cà tím màu tím* · `assets/explore/mau/mau-tim-ca-tim.jpg` _(ai-gen)_
  - Trái tim tím — *Trái tim màu tím* · `assets/explore/mau/mau-tim-trai-tim-tim.jpg` _(ai-gen)_
  - Bóng tím — *Bóng màu tím* · `assets/explore/mau/mau-tim-bong-tim.jpg` _(ai-gen)_
  - Áo tím — *Áo màu tím* · `assets/explore/mau/mau-tim-ao-tim.jpg` _(ai-gen)_
  - Ô tím — *Cái ô màu tím* · `assets/explore/mau/mau-tim-o-tim.jpg` _(ai-gen)_
- **Audio slots (Người lớn):** `lesson:mau-tim:intro` · `explore` · `gate` · `win`

#### `mau-hong` — 🐷 Màu Hồng

- **speakText:** Màu hồng
- **teachText:** Bạn Gấu ơi, cứu mình với! Nhiều thứ màu hồng! Heo, hoa… cùng nhìn màu hồng nào!
- **exploreHint:** Chạm từng món màu hồng nhé!
- **friend:** `ban-hong` · 🐷 Bạn Hồng · tint `#f06595`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn những món màu hồng nào!
- **story.gateLine:** Bóng nào màu hồng? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Hồng về rồi!
- **story.theme:** `rescue-pink`
- **gate.promptVi:** 
- **gate.questions:** 3 câu
  - Q1: Bóng nào màu hồng? Bé chạm vào nhé!
  - Q2: Bóng nào màu hồng?
  - Q3: Đâu là bóng màu hồng?
- **exploreItems (6):**
  - Con heo — *Con heo màu hồng* · `assets/explore/mau/mau-hong-con-heo.jpg` _(ai-gen)_
  - Bông hoa — *Bông hoa màu hồng* · `assets/explore/mau/mau-hong-bong-hoa.jpg` _(ai-gen)_
  - Chiếc nơ — *Chiếc nơ màu hồng* · `assets/explore/mau/mau-hong-chiec-no.jpg` _(ai-gen)_
  - Trái tim hồng — *Trái tim màu hồng* · `assets/explore/mau/mau-hong-trai-tim-hong.jpg` _(ai-gen)_
  - Bánh vòng — *Bánh vòng màu hồng* · `assets/explore/mau/mau-hong-banh-vong.jpg` _(ai-gen)_
  - Áo hồng — *Áo màu hồng* · `assets/explore/mau/mau-hong-ao-hong.jpg` _(ai-gen)_
- **Audio slots (Người lớn):** `lesson:mau-hong:intro` · `explore` · `gate` · `win`

#### `mau-nau` — 🧸 Màu Nâu

- **speakText:** Màu nâu
- **teachText:** Bạn Gấu ơi, cứu mình với! Nhiều thứ màu nâu! Gấu bông, sô cô la… cùng nhìn màu nâu nào!
- **exploreHint:** Chạm từng món màu nâu nhé!
- **friend:** `ban-nau` · 🧸 Bạn Nâu · tint `#8b5a2b`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn những món màu nâu nào!
- **story.gateLine:** Bóng nào màu nâu? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Nâu về rồi!
- **story.theme:** `rescue-brown`
- **gate.promptVi:** 
- **gate.questions:** 3 câu
  - Q1: Bóng nào màu nâu? Bé chạm vào nhé!
  - Q2: Bóng nào màu nâu?
  - Q3: Đâu là bóng màu nâu?
- **exploreItems (6):**
  - Gấu nâu — *Gấu màu nâu* · `assets/explore/mau/mau-nau-gau-nau.jpg` _(ai-gen)_
  - Sô cô la — *Sô cô la màu nâu* · `assets/explore/mau/mau-nau-so-co-la.jpg` _(ai-gen)_
  - Hộp nâu — *Hộp màu nâu* · `assets/explore/mau/mau-nau-hop-nau.jpg` _(ai-gen)_
  - Khoai tây — *Khoai tây màu nâu* · `assets/explore/mau/mau-nau-khoai-tay.jpg` _(ai-gen)_
  - Bánh quy — *Bánh quy màu nâu* · `assets/explore/mau/mau-nau-banh-quy.jpg` _(ai-gen)_
  - Hạt dẻ — *Hạt dẻ màu nâu* · `assets/explore/mau/mau-nau-hat-de.jpg` _(ai-gen)_
- **Audio slots (Người lớn):** `lesson:mau-nau:intro` · `explore` · `gate` · `win`

---

## 2. Đồi Hình Khối (`hinh`) — 7 màn

| Trường | Giá trị |
|---------|---------|
| shortName | Đồi Hình |
| speakName | Đồi Hình Khối |
| emoji | 🔺 |
| helper | `be-gau` |
| color | `#f76707` |
| order | 2 |

### Mục tiêu sư phạm

Nhận biết hình học phẳng thuần (không nhân vật AI); phân biệt tròn / vuông / tam giác…

### Danh sách bài (bảng nhanh)

| # | ID | Tiêu đề | Bạn | Ô explore | Gate (prompt) | Xu | Tuổi |
|---|-----|---------|-----|-----------|---------------|-----|------|
| 1 | `hinh-circle` | ⭕ Hình Tròn | ⭕ Bạn Tròn | 6 | Đâu là hình Tròn? | 5 | 2 |
| 2 | `hinh-square` | ⬛ Hình Vuông | ⬛ Bạn Vuông | 6 | Đâu là hình Vuông? | 5 | 2 |
| 3 | `hinh-triangle` | 🔺 Hình Tam giác | 🔺 Bạn Tam giác | 6 | Đâu là hình Tam giác? | 5 | 2 |
| 4 | `hinh-rect` | ▬ Hình Chữ nhật | ▬ Bạn Chữ nhật | 6 | Đâu là hình Chữ nhật? | 5 | 3 |
| 5 | `hinh-star` | ⭐ Hình Sao | ⭐ Bạn Sao | 6 | Đâu là hình Sao? | 5 | 3 |
| 6 | `hinh-heart` | ❤️ Hình Tim | ❤️ Bạn Tim | 6 | Đâu là hình Tim? | 5 | 3 |
| 7 | `hinh-oval` | ⬭ Hình Bầu dục | ⬭ Bạn Bầu dục | 6 | Đâu là hình Bầu dục? | 5 | 3 |

### Chi tiết từng bài

#### `hinh-circle` — ⭕ Hình Tròn

- **speakText:** Hình Tròn
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là hình Tròn. Hình Tròn có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng tròn màu khác nhau nhé!
- **friend:** `ban-hinh-circle` · ⭕ Bạn Tròn · tint `#f76707`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Tròn màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là hình Tròn? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Tròn về rồi!
- **story.theme:** `topic-hinh`
- **gate.promptVi:** Đâu là hình Tròn?
- **gate.choices:** Tròn · Vuông *(correctIndex=0)*
- **mapImg:** `assets/explore/hinh-khoi/hinh-circle-cam.svg`
- **exploreItems (6):**
  - `[do]` Hình tròn đỏ — *Tròn màu đỏ* · `assets/explore/hinh-khoi/hinh-circle-do.svg` _(geometry-svg-vis)_
  - `[vang]` Hình tròn vàng — *Tròn màu vàng* · `assets/explore/hinh-khoi/hinh-circle-vang.svg` _(geometry-svg-vis)_
  - `[xanh-duong]` Hình tròn xanh dương — *Tròn màu xanh dương* · `assets/explore/hinh-khoi/hinh-circle-xanh-duong.svg` _(geometry-svg-vis)_
  - `[xanh-la]` Hình tròn xanh lá — *Tròn màu xanh lá* · `assets/explore/hinh-khoi/hinh-circle-xanh-la.svg` _(geometry-svg-vis)_
  - `[cam]` Hình tròn cam — *Tròn màu cam* · `assets/explore/hinh-khoi/hinh-circle-cam.svg` _(geometry-svg-vis)_
  - `[tim]` Hình tròn tím — *Tròn màu tím* · `assets/explore/hinh-khoi/hinh-circle-tim.svg` _(geometry-svg-vis)_
- **Audio slots (Người lớn):** `lesson:hinh-circle:intro` · `explore` · `gate` · `win`

#### `hinh-square` — ⬛ Hình Vuông

- **speakText:** Hình Vuông
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là hình Vuông. Hình Vuông có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng vuông màu khác nhau nhé!
- **friend:** `ban-hinh-square` · ⬛ Bạn Vuông · tint `#1c7ed6`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Vuông màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là hình Vuông? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Vuông về rồi!
- **story.theme:** `topic-hinh`
- **gate.promptVi:** Đâu là hình Vuông?
- **gate.choices:** Vuông · Tròn *(correctIndex=0)*
- **mapImg:** `assets/explore/hinh-khoi/hinh-square-xanh-duong.svg`
- **exploreItems (6):**
  - `[do]` Hình vuông đỏ — *Vuông màu đỏ* · `assets/explore/hinh-khoi/hinh-square-do.svg` _(geometry-svg-vis)_
  - `[vang]` Hình vuông vàng — *Vuông màu vàng* · `assets/explore/hinh-khoi/hinh-square-vang.svg` _(geometry-svg-vis)_
  - `[xanh-duong]` Hình vuông xanh dương — *Vuông màu xanh dương* · `assets/explore/hinh-khoi/hinh-square-xanh-duong.svg` _(geometry-svg-vis)_
  - `[xanh-la]` Hình vuông xanh lá — *Vuông màu xanh lá* · `assets/explore/hinh-khoi/hinh-square-xanh-la.svg` _(geometry-svg-vis)_
  - `[cam]` Hình vuông cam — *Vuông màu cam* · `assets/explore/hinh-khoi/hinh-square-cam.svg` _(geometry-svg-vis)_
  - `[tim]` Hình vuông tím — *Vuông màu tím* · `assets/explore/hinh-khoi/hinh-square-tim.svg` _(geometry-svg-vis)_
- **Audio slots (Người lớn):** `lesson:hinh-square:intro` · `explore` · `gate` · `win`

#### `hinh-triangle` — 🔺 Hình Tam giác

- **speakText:** Hình Tam giác
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là hình Tam giác. Hình Tam giác có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng tam giác màu khác nhau nhé!
- **friend:** `ban-hinh-triangle` · 🔺 Bạn Tam giác · tint `#2f9e44`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Tam giác màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là hình Tam giác? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Tam giác về rồi!
- **story.theme:** `topic-hinh`
- **gate.promptVi:** Đâu là hình Tam giác?
- **gate.choices:** Tam giác · Tròn *(correctIndex=0)*
- **mapImg:** `assets/explore/hinh-khoi/hinh-triangle-xanh-la.svg`
- **exploreItems (6):**
  - `[do]` Hình tam giác đỏ — *Tam giác màu đỏ* · `assets/explore/hinh-khoi/hinh-triangle-do.svg` _(geometry-svg-vis)_
  - `[vang]` Hình tam giác vàng — *Tam giác màu vàng* · `assets/explore/hinh-khoi/hinh-triangle-vang.svg` _(geometry-svg-vis)_
  - `[xanh-duong]` Hình tam giác xanh dương — *Tam giác màu xanh dương* · `assets/explore/hinh-khoi/hinh-triangle-xanh-duong.svg` _(geometry-svg-vis)_
  - `[xanh-la]` Hình tam giác xanh lá — *Tam giác màu xanh lá* · `assets/explore/hinh-khoi/hinh-triangle-xanh-la.svg` _(geometry-svg-vis)_
  - `[cam]` Hình tam giác cam — *Tam giác màu cam* · `assets/explore/hinh-khoi/hinh-triangle-cam.svg` _(geometry-svg-vis)_
  - `[tim]` Hình tam giác tím — *Tam giác màu tím* · `assets/explore/hinh-khoi/hinh-triangle-tim.svg` _(geometry-svg-vis)_
- **Audio slots (Người lớn):** `lesson:hinh-triangle:intro` · `explore` · `gate` · `win`

#### `hinh-rect` — ▬ Hình Chữ nhật

- **speakText:** Hình Chữ nhật
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là hình Chữ nhật. Hình Chữ nhật có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng chữ nhật màu khác nhau nhé!
- **friend:** `ban-hinh-rect` · ▬ Bạn Chữ nhật · tint `#9c36b5`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Chữ nhật màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là hình Chữ nhật? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Chữ nhật về rồi!
- **story.theme:** `topic-hinh`
- **gate.promptVi:** Đâu là hình Chữ nhật?
- **gate.choices:** Chữ nhật · Tròn · Vuông *(correctIndex=0)*
- **mapImg:** `assets/explore/hinh-khoi/hinh-rect-do.svg`
- **exploreItems (6):**
  - `[do]` Hình chữ nhật đỏ — *Chữ nhật màu đỏ* · `assets/explore/hinh-khoi/hinh-rect-do.svg` _(geometry-svg-vis)_
  - `[vang]` Hình chữ nhật vàng — *Chữ nhật màu vàng* · `assets/explore/hinh-khoi/hinh-rect-vang.svg` _(geometry-svg-vis)_
  - `[xanh-duong]` Hình chữ nhật xanh dương — *Chữ nhật màu xanh dương* · `assets/explore/hinh-khoi/hinh-rect-xanh-duong.svg` _(geometry-svg-vis)_
  - `[xanh-la]` Hình chữ nhật xanh lá — *Chữ nhật màu xanh lá* · `assets/explore/hinh-khoi/hinh-rect-xanh-la.svg` _(geometry-svg-vis)_
  - `[cam]` Hình chữ nhật cam — *Chữ nhật màu cam* · `assets/explore/hinh-khoi/hinh-rect-cam.svg` _(geometry-svg-vis)_
  - `[tim]` Hình chữ nhật tím — *Chữ nhật màu tím* · `assets/explore/hinh-khoi/hinh-rect-tim.svg` _(geometry-svg-vis)_
- **Audio slots (Người lớn):** `lesson:hinh-rect:intro` · `explore` · `gate` · `win`

#### `hinh-star` — ⭐ Hình Sao

- **speakText:** Hình Sao
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là hình Sao. Hình Sao có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng sao màu khác nhau nhé!
- **friend:** `ban-hinh-star` · ⭐ Bạn Sao · tint `#ffd43b`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Sao màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là hình Sao? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Sao về rồi!
- **story.theme:** `topic-hinh`
- **gate.promptVi:** Đâu là hình Sao?
- **gate.choices:** Sao · Tròn · Vuông *(correctIndex=0)*
- **mapImg:** `assets/explore/hinh-khoi/hinh-star-vang.svg`
- **exploreItems (6):**
  - `[do]` Hình sao đỏ — *Sao màu đỏ* · `assets/explore/hinh-khoi/hinh-star-do.svg` _(geometry-svg-vis)_
  - `[vang]` Hình sao vàng — *Sao màu vàng* · `assets/explore/hinh-khoi/hinh-star-vang.svg` _(geometry-svg-vis)_
  - `[xanh-duong]` Hình sao xanh dương — *Sao màu xanh dương* · `assets/explore/hinh-khoi/hinh-star-xanh-duong.svg` _(geometry-svg-vis)_
  - `[xanh-la]` Hình sao xanh lá — *Sao màu xanh lá* · `assets/explore/hinh-khoi/hinh-star-xanh-la.svg` _(geometry-svg-vis)_
  - `[cam]` Hình sao cam — *Sao màu cam* · `assets/explore/hinh-khoi/hinh-star-cam.svg` _(geometry-svg-vis)_
  - `[tim]` Hình sao tím — *Sao màu tím* · `assets/explore/hinh-khoi/hinh-star-tim.svg` _(geometry-svg-vis)_
- **Audio slots (Người lớn):** `lesson:hinh-star:intro` · `explore` · `gate` · `win`

#### `hinh-heart` — ❤️ Hình Tim

- **speakText:** Hình Tim
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là hình Tim. Hình Tim có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng tim màu khác nhau nhé!
- **friend:** `ban-hinh-heart` · ❤️ Bạn Tim · tint `#e03131`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Tim màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là hình Tim? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Tim về rồi!
- **story.theme:** `topic-hinh`
- **gate.promptVi:** Đâu là hình Tim?
- **gate.choices:** Tim · Tròn · Vuông *(correctIndex=0)*
- **mapImg:** `assets/explore/hinh-khoi/hinh-heart-do.svg`
- **exploreItems (6):**
  - `[do]` Hình tim đỏ — *Tim màu đỏ* · `assets/explore/hinh-khoi/hinh-heart-do.svg` _(geometry-svg-vis)_
  - `[vang]` Hình tim vàng — *Tim màu vàng* · `assets/explore/hinh-khoi/hinh-heart-vang.svg` _(geometry-svg-vis)_
  - `[xanh-duong]` Hình tim xanh dương — *Tim màu xanh dương* · `assets/explore/hinh-khoi/hinh-heart-xanh-duong.svg` _(geometry-svg-vis)_
  - `[xanh-la]` Hình tim xanh lá — *Tim màu xanh lá* · `assets/explore/hinh-khoi/hinh-heart-xanh-la.svg` _(geometry-svg-vis)_
  - `[cam]` Hình tim cam — *Tim màu cam* · `assets/explore/hinh-khoi/hinh-heart-cam.svg` _(geometry-svg-vis)_
  - `[tim]` Hình tim tím — *Tim màu tím* · `assets/explore/hinh-khoi/hinh-heart-tim.svg` _(geometry-svg-vis)_
- **Audio slots (Người lớn):** `lesson:hinh-heart:intro` · `explore` · `gate` · `win`

#### `hinh-oval` — ⬭ Hình Bầu dục

- **speakText:** Hình Bầu dục
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là hình Bầu dục. Hình Bầu dục có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng bầu dục màu khác nhau nhé!
- **friend:** `ban-hinh-oval` · ⬭ Bạn Bầu dục · tint `#1c7ed6`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Bầu dục màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là hình Bầu dục? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Bầu dục về rồi!
- **story.theme:** `topic-hinh`
- **gate.promptVi:** Đâu là hình Bầu dục?
- **gate.choices:** Bầu dục · Tròn · Vuông *(correctIndex=0)*
- **mapImg:** `assets/explore/hinh-khoi/hinh-oval-vang.svg`
- **exploreItems (6):**
  - `[do]` Hình bầu dục đỏ — *Bầu dục màu đỏ* · `assets/explore/hinh-khoi/hinh-oval-do.svg` _(geometry-svg-vis)_
  - `[vang]` Hình bầu dục vàng — *Bầu dục màu vàng* · `assets/explore/hinh-khoi/hinh-oval-vang.svg` _(geometry-svg-vis)_
  - `[xanh-duong]` Hình bầu dục xanh dương — *Bầu dục màu xanh dương* · `assets/explore/hinh-khoi/hinh-oval-xanh-duong.svg` _(geometry-svg-vis)_
  - `[xanh-la]` Hình bầu dục xanh lá — *Bầu dục màu xanh lá* · `assets/explore/hinh-khoi/hinh-oval-xanh-la.svg` _(geometry-svg-vis)_
  - `[cam]` Hình bầu dục cam — *Bầu dục màu cam* · `assets/explore/hinh-khoi/hinh-oval-cam.svg` _(geometry-svg-vis)_
  - `[tim]` Hình bầu dục tím — *Bầu dục màu tím* · `assets/explore/hinh-khoi/hinh-oval-tim.svg` _(geometry-svg-vis)_
- **Audio slots (Người lớn):** `lesson:hinh-oval:intro` · `explore` · `gate` · `win`

---

## 3. Suối Đếm Số (`so`) — 10 màn

| Trường | Giá trị |
|---------|---------|
| shortName | Suối Số |
| speakName | Suối Đếm Số |
| emoji | 🐟🐠🐡 |
| helper | `soc` |
| color | `#3da9fc` |
| order | 3 |

### Mục tiêu sư phạm

Đếm và nhận diện số 1–10; khớp số lượng với chữ số.

### Danh sách bài (bảng nhanh)

| # | ID | Tiêu đề | Bạn | Ô explore | Gate (prompt) | Xu | Tuổi |
|---|-----|---------|-----|-----------|---------------|-----|------|
| 1 | `so-1` | 1️⃣ Số 1 — Một | 1️⃣ Bạn Số 1 | 3 | Đâu là số 1? | 5 | 2 |
| 2 | `so-2` | 2️⃣ Số 2 — Hai | 2️⃣ Bạn Số 2 | 3 | Đâu là số 2? | 5 | 2 |
| 3 | `so-3` | 3️⃣ Số 3 — Ba | 3️⃣ Bạn Số 3 | 3 | Đâu là số 3? | 5 | 2 |
| 4 | `so-4` | 4️⃣ Số 4 — Bốn | 4️⃣ Bạn Số 4 | 3 | Đâu là số 4? | 5 | 2 |
| 5 | `so-5` | 5️⃣ Số 5 — Năm | 5️⃣ Bạn Số 5 | 3 | Đâu là số 5? | 5 | 2 |
| 6 | `so-6` | 6️⃣ Số 6 — Sáu | 6️⃣ Bạn Số 6 | 3 | Đâu là số 6? | 5 | 3 |
| 7 | `so-7` | 7️⃣ Số 7 — Bảy | 7️⃣ Bạn Số 7 | 3 | Đâu là số 7? | 5 | 3 |
| 8 | `so-8` | 8️⃣ Số 8 — Tám | 8️⃣ Bạn Số 8 | 3 | Đâu là số 8? | 5 | 3 |
| 9 | `so-9` | 9️⃣ Số 9 — Chín | 9️⃣ Bạn Số 9 | 3 | Đâu là số 9? | 5 | 3 |
| 10 | `so-10` | 🔟 Số 10 — Mười | 🔟 Bạn Số 10 | 3 | Đâu là số 10? | 5 | 3 |

### Chi tiết từng bài

#### `so-1` — 1️⃣ Số 1 — Một

- **speakText:** Một
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là số 1. Bé đếm 1 cá, 1 sao nhé!
- **exploreHint:** Chạm và đếm cùng bé nhé!
- **friend:** `ban-so-1` · 1️⃣ Bạn Số 1 · tint `#3da9fc`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Cùng đếm với Bạn Số 1 nào!
- **story.gateLine:** Đâu là số 1? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Số 1 về rồi!
- **story.theme:** `topic-so`
- **gate.promptVi:** Đâu là số 1?
- **gate.choices:** 1 · 2 *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/so-1.jpg`
- **exploreItems (3):**
  - Số 1 — *Đây là số 1* · `assets/explore/ai/so-1.jpg`
  - 1 cá — *Đếm 1 con cá*
  - 1 sao — *1 ngôi sao*
- **Audio slots (Người lớn):** `lesson:so-1:intro` · `explore` · `gate` · `win`

#### `so-2` — 2️⃣ Số 2 — Hai

- **speakText:** Hai
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là số 2. Bé đếm 2 cá, 2 sao nhé!
- **exploreHint:** Chạm và đếm cùng bé nhé!
- **friend:** `ban-so-2` · 2️⃣ Bạn Số 2 · tint `#3da9fc`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Cùng đếm với Bạn Số 2 nào!
- **story.gateLine:** Đâu là số 2? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Số 2 về rồi!
- **story.theme:** `topic-so`
- **gate.promptVi:** Đâu là số 2?
- **gate.choices:** 2 · 1 *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/so-2.jpg`
- **exploreItems (3):**
  - Số 2 — *Đây là số 2* · `assets/explore/ai/so-2.jpg`
  - 2 cá — *Đếm 2 con cá*
  - 2 sao — *2 ngôi sao*
- **Audio slots (Người lớn):** `lesson:so-2:intro` · `explore` · `gate` · `win`

#### `so-3` — 3️⃣ Số 3 — Ba

- **speakText:** Ba
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là số 3. Bé đếm 3 cá, 3 sao nhé!
- **exploreHint:** Chạm và đếm cùng bé nhé!
- **friend:** `ban-so-3` · 3️⃣ Bạn Số 3 · tint `#3da9fc`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Cùng đếm với Bạn Số 3 nào!
- **story.gateLine:** Đâu là số 3? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Số 3 về rồi!
- **story.theme:** `topic-so`
- **gate.promptVi:** Đâu là số 3?
- **gate.choices:** 3 · 2 *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/so-3.jpg`
- **exploreItems (3):**
  - Số 3 — *Đây là số 3* · `assets/explore/ai/so-3.jpg`
  - 3 cá — *Đếm 3 con cá*
  - 3 sao — *3 ngôi sao*
- **Audio slots (Người lớn):** `lesson:so-3:intro` · `explore` · `gate` · `win`

#### `so-4` — 4️⃣ Số 4 — Bốn

- **speakText:** Bốn
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là số 4. Bé đếm 4 cá, 4 sao nhé!
- **exploreHint:** Chạm và đếm cùng bé nhé!
- **friend:** `ban-so-4` · 4️⃣ Bạn Số 4 · tint `#3da9fc`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Cùng đếm với Bạn Số 4 nào!
- **story.gateLine:** Đâu là số 4? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Số 4 về rồi!
- **story.theme:** `topic-so`
- **gate.promptVi:** Đâu là số 4?
- **gate.choices:** 4 · 3 · 5 *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/so-4.jpg`
- **exploreItems (3):**
  - Số 4 — *Đây là số 4* · `assets/explore/ai/so-4.jpg`
  - 4 cá — *Đếm 4 con cá*
  - 4 sao — *4 ngôi sao*
- **Audio slots (Người lớn):** `lesson:so-4:intro` · `explore` · `gate` · `win`

#### `so-5` — 5️⃣ Số 5 — Năm

- **speakText:** Năm
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là số 5. Bé đếm 5 cá, 5 sao nhé!
- **exploreHint:** Chạm và đếm cùng bé nhé!
- **friend:** `ban-so-5` · 5️⃣ Bạn Số 5 · tint `#3da9fc`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Cùng đếm với Bạn Số 5 nào!
- **story.gateLine:** Đâu là số 5? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Số 5 về rồi!
- **story.theme:** `topic-so`
- **gate.promptVi:** Đâu là số 5?
- **gate.choices:** 5 · 4 · 6 *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/so-5.jpg`
- **exploreItems (3):**
  - Số 5 — *Đây là số 5* · `assets/explore/ai/so-5.jpg`
  - 5 cá — *Đếm 5 con cá*
  - 5 sao — *5 ngôi sao*
- **Audio slots (Người lớn):** `lesson:so-5:intro` · `explore` · `gate` · `win`

#### `so-6` — 6️⃣ Số 6 — Sáu

- **speakText:** Sáu
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là số 6. Bé đếm 6 cá, 6 sao nhé!
- **exploreHint:** Chạm và đếm cùng bé nhé!
- **friend:** `ban-so-6` · 6️⃣ Bạn Số 6 · tint `#3da9fc`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Cùng đếm với Bạn Số 6 nào!
- **story.gateLine:** Đâu là số 6? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Số 6 về rồi!
- **story.theme:** `topic-so`
- **gate.promptVi:** Đâu là số 6?
- **gate.choices:** 6 · 5 · 7 *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/so-6.jpg`
- **exploreItems (3):**
  - Số 6 — *Đây là số 6* · `assets/explore/ai/so-6.jpg`
  - 6 cá — *Đếm 6 con cá*
  - 6 sao — *6 ngôi sao*
- **Audio slots (Người lớn):** `lesson:so-6:intro` · `explore` · `gate` · `win`

#### `so-7` — 7️⃣ Số 7 — Bảy

- **speakText:** Bảy
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là số 7. Bé đếm 7 cá, 7 sao nhé!
- **exploreHint:** Chạm và đếm cùng bé nhé!
- **friend:** `ban-so-7` · 7️⃣ Bạn Số 7 · tint `#3da9fc`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Cùng đếm với Bạn Số 7 nào!
- **story.gateLine:** Đâu là số 7? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Số 7 về rồi!
- **story.theme:** `topic-so`
- **gate.promptVi:** Đâu là số 7?
- **gate.choices:** 7 · 6 · 8 *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/so-7.jpg`
- **exploreItems (3):**
  - Số 7 — *Đây là số 7* · `assets/explore/ai/so-7.jpg`
  - 7 cá — *Đếm 7 con cá*
  - 7 sao — *7 ngôi sao*
- **Audio slots (Người lớn):** `lesson:so-7:intro` · `explore` · `gate` · `win`

#### `so-8` — 8️⃣ Số 8 — Tám

- **speakText:** Tám
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là số 8. Bé đếm 8 cá, 8 sao nhé!
- **exploreHint:** Chạm và đếm cùng bé nhé!
- **friend:** `ban-so-8` · 8️⃣ Bạn Số 8 · tint `#3da9fc`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Cùng đếm với Bạn Số 8 nào!
- **story.gateLine:** Đâu là số 8? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Số 8 về rồi!
- **story.theme:** `topic-so`
- **gate.promptVi:** Đâu là số 8?
- **gate.choices:** 8 · 7 · 9 *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/so-8.jpg`
- **exploreItems (3):**
  - Số 8 — *Đây là số 8* · `assets/explore/ai/so-8.jpg`
  - 8 cá — *Đếm 8 con cá*
  - 8 sao — *8 ngôi sao*
- **Audio slots (Người lớn):** `lesson:so-8:intro` · `explore` · `gate` · `win`

#### `so-9` — 9️⃣ Số 9 — Chín

- **speakText:** Chín
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là số 9. Bé đếm 9 cá, 9 sao nhé!
- **exploreHint:** Chạm và đếm cùng bé nhé!
- **friend:** `ban-so-9` · 9️⃣ Bạn Số 9 · tint `#3da9fc`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Cùng đếm với Bạn Số 9 nào!
- **story.gateLine:** Đâu là số 9? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Số 9 về rồi!
- **story.theme:** `topic-so`
- **gate.promptVi:** Đâu là số 9?
- **gate.choices:** 9 · 8 · 10 *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/so-9.jpg`
- **exploreItems (3):**
  - Số 9 — *Đây là số 9* · `assets/explore/ai/so-9.jpg`
  - 9 cá — *Đếm 9 con cá*
  - 9 sao — *9 ngôi sao*
- **Audio slots (Người lớn):** `lesson:so-9:intro` · `explore` · `gate` · `win`

#### `so-10` — 🔟 Số 10 — Mười

- **speakText:** Mười
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là số 10. Bé đếm 10 cá, 10 sao nhé!
- **exploreHint:** Chạm và đếm cùng bé nhé!
- **friend:** `ban-so-10` · 🔟 Bạn Số 10 · tint `#3da9fc`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Cùng đếm với Bạn Số 10 nào!
- **story.gateLine:** Đâu là số 10? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Số 10 về rồi!
- **story.theme:** `topic-so`
- **gate.promptVi:** Đâu là số 10?
- **gate.choices:** 10 · 9 · 1 *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/so-10.jpg`
- **exploreItems (3):**
  - Số 10 — *Đây là số 10* · `assets/explore/ai/so-10.jpg`
  - 10 cá — *Đếm 10 con cá*
  - 10 sao — *10 ngôi sao*
- **Audio slots (Người lớn):** `lesson:so-10:intro` · `explore` · `gate` · `win`

---

## 4. Hang Chữ Latin (`chu`) — 26 màn

| Trường | Giá trị |
|---------|---------|
| shortName | Hang Chữ |
| speakName | Hang Chữ Latin |
| emoji | 🅰️✨ |
| helper | `be-gau` |
| color | `#7c5cff` |
| order | 4 |

### Mục tiêu sư phạm

Nhận diện chữ cái Latin A–Z; gắn với từ / minh họa đơn giản.

### Danh sách bài (bảng nhanh)

| # | ID | Tiêu đề | Bạn | Ô explore | Gate (prompt) | Xu | Tuổi |
|---|-----|---------|-----|-----------|---------------|-----|------|
| 1 | `chu-a` | 👕 Chữ A | 👕 Bạn A | 3 | Đâu là chữ A? | 5 | 2 |
| 2 | `chu-b` | 🐮 Chữ B | 🐮 Bạn B | 3 | Đâu là chữ B? | 5 | 2 |
| 3 | `chu-c` | 🐟 Chữ C | 🐟 Bạn C | 3 | Đâu là chữ C? | 5 | 2 |
| 4 | `chu-d` | 🐐 Chữ D | 🐐 Bạn D | 3 | Đâu là chữ D? | 5 | 2 |
| 5 | `chu-e` | 👶 Chữ E | 👶 Bạn E | 3 | Đâu là chữ E? | 5 | 2 |
| 6 | `chu-f` | 🌀 Chữ F | 🌀 Bạn F | 3 | Đâu là chữ F? | 5 | 2 |
| 7 | `chu-g` | 🐻 Chữ G | 🐻 Bạn G | 3 | Đâu là chữ G? | 5 | 2 |
| 8 | `chu-h` | 🌸 Chữ H | 🌸 Bạn H | 3 | Đâu là chữ H? | 5 | 2 |
| 9 | `chu-i` | 🔤 Chữ I | 🔤 Bạn I | 3 | Đâu là chữ I? | 5 | 2 |
| 10 | `chu-j` | 🧃 Chữ J | 🧃 Bạn J | 3 | Đâu là chữ J? | 5 | 2 |
| 11 | `chu-k` | 🍦 Chữ K | 🍦 Bạn K | 3 | Đâu là chữ K? | 5 | 2 |
| 12 | `chu-l` | 🍃 Chữ L | 🍃 Bạn L | 3 | Đâu là chữ L? | 5 | 2 |
| 13 | `chu-m` | 🐱 Chữ M | 🐱 Bạn M | 3 | Đâu là chữ M? | 5 | 2 |
| 14 | `chu-n` | 👒 Chữ N | 👒 Bạn N | 3 | Đâu là chữ N? | 5 | 2 |
| 15 | `chu-o` | 🐝 Chữ O | 🐝 Bạn O | 3 | Đâu là chữ O? | 5 | 2 |
| 16 | `chu-p` | 🔋 Chữ P | 🔋 Bạn P | 3 | Đâu là chữ P? | 5 | 2 |
| 17 | `chu-q` | 🌀 Chữ Q | 🌀 Bạn Q | 3 | Đâu là chữ Q? | 5 | 2 |
| 18 | `chu-r` | 🐢 Chữ R | 🐢 Bạn R | 3 | Đâu là chữ R? | 5 | 2 |
| 19 | `chu-s` | 📚 Chữ S | 📚 Bạn S | 3 | Đâu là chữ S? | 5 | 2 |
| 20 | `chu-t` | 🍎 Chữ T | 🍎 Bạn T | 3 | Đâu là chữ T? | 5 | 2 |
| 21 | `chu-u` | 🥤 Chữ U | 🥤 Bạn U | 3 | Đâu là chữ U? | 5 | 2 |
| 22 | `chu-v` | 🐘 Chữ V | 🐘 Bạn V | 3 | Đâu là chữ V? | 5 | 2 |
| 23 | `chu-w` | 🍉 Chữ W | 🍉 Bạn W | 3 | Đâu là chữ W? | 5 | 2 |
| 24 | `chu-x` | 🚲 Chữ X | 🚲 Bạn X | 3 | Đâu là chữ X? | 5 | 2 |
| 25 | `chu-y` | 💛 Chữ Y | 💛 Bạn Y | 3 | Đâu là chữ Y? | 5 | 2 |
| 26 | `chu-z` | 🦓 Chữ Z | 🦓 Bạn Z | 3 | Đâu là chữ Z? | 5 | 2 |

### Chi tiết từng bài

#### `chu-a` — 👕 Chữ A

- **speakText:** Chữ A
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ A. Áo bắt đầu bằng chữ A!
- **exploreHint:** Chạm chữ A và nghe nhé!
- **friend:** `ban-chu-a` · 👕 Bạn A · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ A và áo nào!
- **story.gateLine:** Đâu là chữ A? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn A về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ A?
- **gate.choices:** A · B *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-a.jpg`
- **exploreItems (3):**
  - Chữ A — *Đây là chữ A* · `assets/explore/chu/chu-a.svg`
  - Áo — *Áo bắt đầu bằng chữ A* · `assets/explore/ai/chu-a.jpg`
  - Nghe A — *Chữ A* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-a:intro` · `explore` · `gate` · `win`

#### `chu-b` — 🐮 Chữ B

- **speakText:** Chữ B
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ B. Bò bắt đầu bằng chữ B!
- **exploreHint:** Chạm chữ B và nghe nhé!
- **friend:** `ban-chu-b` · 🐮 Bạn B · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ B và bò nào!
- **story.gateLine:** Đâu là chữ B? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn B về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ B?
- **gate.choices:** B · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-b.jpg`
- **exploreItems (3):**
  - Chữ B — *Đây là chữ B* · `assets/explore/chu/chu-b.svg`
  - Bò — *Bò bắt đầu bằng chữ B* · `assets/explore/ai/chu-b.jpg`
  - Nghe B — *Chữ B* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-b:intro` · `explore` · `gate` · `win`

#### `chu-c` — 🐟 Chữ C

- **speakText:** Chữ C
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ C. Cá bắt đầu bằng chữ C!
- **exploreHint:** Chạm chữ C và nghe nhé!
- **friend:** `ban-chu-c` · 🐟 Bạn C · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ C và cá nào!
- **story.gateLine:** Đâu là chữ C? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn C về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ C?
- **gate.choices:** C · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-c.jpg`
- **exploreItems (3):**
  - Chữ C — *Đây là chữ C* · `assets/explore/chu/chu-c.svg`
  - Cá — *Cá bắt đầu bằng chữ C* · `assets/explore/ai/chu-c.jpg`
  - Nghe C — *Chữ C* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-c:intro` · `explore` · `gate` · `win`

#### `chu-d` — 🐐 Chữ D

- **speakText:** Chữ D
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ D. Dê bắt đầu bằng chữ D!
- **exploreHint:** Chạm chữ D và nghe nhé!
- **friend:** `ban-chu-d` · 🐐 Bạn D · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ D và dê nào!
- **story.gateLine:** Đâu là chữ D? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn D về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ D?
- **gate.choices:** D · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-d.jpg`
- **exploreItems (3):**
  - Chữ D — *Đây là chữ D* · `assets/explore/chu/chu-d.svg`
  - Dê — *Dê bắt đầu bằng chữ D* · `assets/explore/ai/chu-d.jpg`
  - Nghe D — *Chữ D* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-d:intro` · `explore` · `gate` · `win`

#### `chu-e` — 👶 Chữ E

- **speakText:** Chữ E
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ E. Em bắt đầu bằng chữ E!
- **exploreHint:** Chạm chữ E và nghe nhé!
- **friend:** `ban-chu-e` · 👶 Bạn E · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ E và em nào!
- **story.gateLine:** Đâu là chữ E? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn E về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ E?
- **gate.choices:** E · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-e.jpg`
- **exploreItems (3):**
  - Chữ E — *Đây là chữ E* · `assets/explore/chu/chu-e.svg`
  - Em — *Em bắt đầu bằng chữ E* · `assets/explore/ai/chu-e.jpg`
  - Nghe E — *Chữ E* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-e:intro` · `explore` · `gate` · `win`

#### `chu-f` — 🌀 Chữ F

- **speakText:** Chữ F
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ F. Fan bắt đầu bằng chữ F!
- **exploreHint:** Chạm chữ F và nghe nhé!
- **friend:** `ban-chu-f` · 🌀 Bạn F · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ F và fan nào!
- **story.gateLine:** Đâu là chữ F? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn F về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ F?
- **gate.choices:** F · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-f.jpg`
- **exploreItems (3):**
  - Chữ F — *Đây là chữ F* · `assets/explore/chu/chu-f.svg`
  - Fan — *Fan bắt đầu bằng chữ F* · `assets/explore/ai/chu-f.jpg`
  - Nghe F — *Chữ F* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-f:intro` · `explore` · `gate` · `win`

#### `chu-g` — 🐻 Chữ G

- **speakText:** Chữ G
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ G. Gấu bắt đầu bằng chữ G!
- **exploreHint:** Chạm chữ G và nghe nhé!
- **friend:** `ban-chu-g` · 🐻 Bạn G · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ G và gấu nào!
- **story.gateLine:** Đâu là chữ G? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn G về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ G?
- **gate.choices:** G · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-g.jpg`
- **exploreItems (3):**
  - Chữ G — *Đây là chữ G* · `assets/explore/chu/chu-g.svg`
  - Gấu — *Gấu bắt đầu bằng chữ G* · `assets/explore/ai/chu-g.jpg`
  - Nghe G — *Chữ G* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-g:intro` · `explore` · `gate` · `win`

#### `chu-h` — 🌸 Chữ H

- **speakText:** Chữ H
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ H. Hoa bắt đầu bằng chữ H!
- **exploreHint:** Chạm chữ H và nghe nhé!
- **friend:** `ban-chu-h` · 🌸 Bạn H · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ H và hoa nào!
- **story.gateLine:** Đâu là chữ H? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn H về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ H?
- **gate.choices:** H · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-h.jpg`
- **exploreItems (3):**
  - Chữ H — *Đây là chữ H* · `assets/explore/chu/chu-h.svg`
  - Hoa — *Hoa bắt đầu bằng chữ H* · `assets/explore/ai/chu-h.jpg`
  - Nghe H — *Chữ H* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-h:intro` · `explore` · `gate` · `win`

#### `chu-i` — 🔤 Chữ I

- **speakText:** Chữ I
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ I. Bé nhìn chữ I tờ nhé!
- **exploreHint:** Chạm chữ I và nghe nhé!
- **friend:** `ban-chu-i` · 🔤 Bạn I · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ I và i tờ nào!
- **story.gateLine:** Đâu là chữ I? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn I về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ I?
- **gate.choices:** I · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-i.jpg`
- **exploreItems (3):**
  - Chữ I — *Đây là chữ I* · `assets/explore/chu/chu-i.svg`
  - I tờ — *Bé nhìn chữ I tờ nhé* · `assets/explore/ai/chu-i.jpg`
  - Nghe I — *Chữ I* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-i:intro` · `explore` · `gate` · `win`

#### `chu-j` — 🧃 Chữ J

- **speakText:** Chữ J
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ J. Juice bắt đầu bằng chữ J!
- **exploreHint:** Chạm chữ J và nghe nhé!
- **friend:** `ban-chu-j` · 🧃 Bạn J · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ J và juice nào!
- **story.gateLine:** Đâu là chữ J? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn J về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ J?
- **gate.choices:** J · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-j.jpg`
- **exploreItems (3):**
  - Chữ J — *Đây là chữ J* · `assets/explore/chu/chu-j.svg`
  - Juice — *Juice bắt đầu bằng chữ J* · `assets/explore/ai/chu-j.jpg`
  - Nghe J — *Chữ J* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-j:intro` · `explore` · `gate` · `win`

#### `chu-k` — 🍦 Chữ K

- **speakText:** Chữ K
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ K. Kem bắt đầu bằng chữ K!
- **exploreHint:** Chạm chữ K và nghe nhé!
- **friend:** `ban-chu-k` · 🍦 Bạn K · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ K và kem nào!
- **story.gateLine:** Đâu là chữ K? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn K về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ K?
- **gate.choices:** K · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-k.jpg`
- **exploreItems (3):**
  - Chữ K — *Đây là chữ K* · `assets/explore/chu/chu-k.svg`
  - Kem — *Kem bắt đầu bằng chữ K* · `assets/explore/ai/chu-k.jpg`
  - Nghe K — *Chữ K* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-k:intro` · `explore` · `gate` · `win`

#### `chu-l` — 🍃 Chữ L

- **speakText:** Chữ L
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ L. Lá bắt đầu bằng chữ L!
- **exploreHint:** Chạm chữ L và nghe nhé!
- **friend:** `ban-chu-l` · 🍃 Bạn L · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ L và lá nào!
- **story.gateLine:** Đâu là chữ L? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn L về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ L?
- **gate.choices:** L · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-l.jpg`
- **exploreItems (3):**
  - Chữ L — *Đây là chữ L* · `assets/explore/chu/chu-l.svg`
  - Lá — *Lá bắt đầu bằng chữ L* · `assets/explore/ai/chu-l.jpg`
  - Nghe L — *Chữ L* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-l:intro` · `explore` · `gate` · `win`

#### `chu-m` — 🐱 Chữ M

- **speakText:** Chữ M
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ M. Mèo bắt đầu bằng chữ M!
- **exploreHint:** Chạm chữ M và nghe nhé!
- **friend:** `ban-chu-m` · 🐱 Bạn M · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ M và mèo nào!
- **story.gateLine:** Đâu là chữ M? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn M về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ M?
- **gate.choices:** M · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-m.jpg`
- **exploreItems (3):**
  - Chữ M — *Đây là chữ M* · `assets/explore/chu/chu-m.svg`
  - Mèo — *Mèo bắt đầu bằng chữ M* · `assets/explore/ai/chu-m.jpg`
  - Nghe M — *Chữ M* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-m:intro` · `explore` · `gate` · `win`

#### `chu-n` — 👒 Chữ N

- **speakText:** Chữ N
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ N. Nón bắt đầu bằng chữ N!
- **exploreHint:** Chạm chữ N và nghe nhé!
- **friend:** `ban-chu-n` · 👒 Bạn N · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ N và nón nào!
- **story.gateLine:** Đâu là chữ N? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn N về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ N?
- **gate.choices:** N · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-n.jpg`
- **exploreItems (3):**
  - Chữ N — *Đây là chữ N* · `assets/explore/chu/chu-n.svg`
  - Nón — *Nón bắt đầu bằng chữ N* · `assets/explore/ai/chu-n.jpg`
  - Nghe N — *Chữ N* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-n:intro` · `explore` · `gate` · `win`

#### `chu-o` — 🐝 Chữ O

- **speakText:** Chữ O
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ O. Ong bắt đầu bằng chữ O!
- **exploreHint:** Chạm chữ O và nghe nhé!
- **friend:** `ban-chu-o` · 🐝 Bạn O · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ O và ong nào!
- **story.gateLine:** Đâu là chữ O? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn O về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ O?
- **gate.choices:** O · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-o.jpg`
- **exploreItems (3):**
  - Chữ O — *Đây là chữ O* · `assets/explore/chu/chu-o.svg`
  - Ong — *Ong bắt đầu bằng chữ O* · `assets/explore/ai/chu-o.jpg`
  - Nghe O — *Chữ O* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-o:intro` · `explore` · `gate` · `win`

#### `chu-p` — 🔋 Chữ P

- **speakText:** Chữ P
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ P. Pin bắt đầu bằng chữ P!
- **exploreHint:** Chạm chữ P và nghe nhé!
- **friend:** `ban-chu-p` · 🔋 Bạn P · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ P và pin nào!
- **story.gateLine:** Đâu là chữ P? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn P về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ P?
- **gate.choices:** P · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-p.jpg`
- **exploreItems (3):**
  - Chữ P — *Đây là chữ P* · `assets/explore/chu/chu-p.svg`
  - Pin — *Pin bắt đầu bằng chữ P* · `assets/explore/ai/chu-p.jpg`
  - Nghe P — *Chữ P* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-p:intro` · `explore` · `gate` · `win`

#### `chu-q` — 🌀 Chữ Q

- **speakText:** Chữ Q
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ Q. Quạt bắt đầu bằng chữ Q!
- **exploreHint:** Chạm chữ Q và nghe nhé!
- **friend:** `ban-chu-q` · 🌀 Bạn Q · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ Q và quạt nào!
- **story.gateLine:** Đâu là chữ Q? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Q về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ Q?
- **gate.choices:** Q · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-q.jpg`
- **exploreItems (3):**
  - Chữ Q — *Đây là chữ Q* · `assets/explore/chu/chu-q.svg`
  - Quạt — *Quạt bắt đầu bằng chữ Q* · `assets/explore/ai/chu-q.jpg`
  - Nghe Q — *Chữ Q* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-q:intro` · `explore` · `gate` · `win`

#### `chu-r` — 🐢 Chữ R

- **speakText:** Chữ R
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ R. Rùa bắt đầu bằng chữ R!
- **exploreHint:** Chạm chữ R và nghe nhé!
- **friend:** `ban-chu-r` · 🐢 Bạn R · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ R và rùa nào!
- **story.gateLine:** Đâu là chữ R? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn R về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ R?
- **gate.choices:** R · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-r.jpg`
- **exploreItems (3):**
  - Chữ R — *Đây là chữ R* · `assets/explore/chu/chu-r.svg`
  - Rùa — *Rùa bắt đầu bằng chữ R* · `assets/explore/ai/chu-r.jpg`
  - Nghe R — *Chữ R* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-r:intro` · `explore` · `gate` · `win`

#### `chu-s` — 📚 Chữ S

- **speakText:** Chữ S
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ S. Sách bắt đầu bằng chữ S!
- **exploreHint:** Chạm chữ S và nghe nhé!
- **friend:** `ban-chu-s` · 📚 Bạn S · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ S và sách nào!
- **story.gateLine:** Đâu là chữ S? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn S về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ S?
- **gate.choices:** S · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-s.jpg`
- **exploreItems (3):**
  - Chữ S — *Đây là chữ S* · `assets/explore/chu/chu-s.svg`
  - Sách — *Sách bắt đầu bằng chữ S* · `assets/explore/ai/chu-s.jpg`
  - Nghe S — *Chữ S* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-s:intro` · `explore` · `gate` · `win`

#### `chu-t` — 🍎 Chữ T

- **speakText:** Chữ T
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ T. Táo bắt đầu bằng chữ T!
- **exploreHint:** Chạm chữ T và nghe nhé!
- **friend:** `ban-chu-t` · 🍎 Bạn T · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ T và táo nào!
- **story.gateLine:** Đâu là chữ T? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn T về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ T?
- **gate.choices:** T · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-t.jpg`
- **exploreItems (3):**
  - Chữ T — *Đây là chữ T* · `assets/explore/chu/chu-t.svg`
  - Táo — *Táo bắt đầu bằng chữ T* · `assets/explore/ai/chu-t.jpg`
  - Nghe T — *Chữ T* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-t:intro` · `explore` · `gate` · `win`

#### `chu-u` — 🥤 Chữ U

- **speakText:** Chữ U
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ U. Uống bắt đầu bằng chữ U!
- **exploreHint:** Chạm chữ U và nghe nhé!
- **friend:** `ban-chu-u` · 🥤 Bạn U · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ U và uống nào!
- **story.gateLine:** Đâu là chữ U? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn U về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ U?
- **gate.choices:** U · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-u.jpg`
- **exploreItems (3):**
  - Chữ U — *Đây là chữ U* · `assets/explore/chu/chu-u.svg`
  - Uống — *Uống bắt đầu bằng chữ U* · `assets/explore/ai/chu-u.jpg`
  - Nghe U — *Chữ U* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-u:intro` · `explore` · `gate` · `win`

#### `chu-v` — 🐘 Chữ V

- **speakText:** Chữ V
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ V. Voi bắt đầu bằng chữ V!
- **exploreHint:** Chạm chữ V và nghe nhé!
- **friend:** `ban-chu-v` · 🐘 Bạn V · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ V và voi nào!
- **story.gateLine:** Đâu là chữ V? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn V về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ V?
- **gate.choices:** V · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-v.jpg`
- **exploreItems (3):**
  - Chữ V — *Đây là chữ V* · `assets/explore/chu/chu-v.svg`
  - Voi — *Voi bắt đầu bằng chữ V* · `assets/explore/ai/chu-v.jpg`
  - Nghe V — *Chữ V* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-v:intro` · `explore` · `gate` · `win`

#### `chu-w` — 🍉 Chữ W

- **speakText:** Chữ W
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ W. Watermelon bắt đầu bằng chữ W!
- **exploreHint:** Chạm chữ W và nghe nhé!
- **friend:** `ban-chu-w` · 🍉 Bạn W · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ W và watermelon nào!
- **story.gateLine:** Đâu là chữ W? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn W về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ W?
- **gate.choices:** W · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-w.jpg`
- **exploreItems (3):**
  - Chữ W — *Đây là chữ W* · `assets/explore/chu/chu-w.svg`
  - Watermelon — *Watermelon bắt đầu bằng chữ W* · `assets/explore/ai/chu-w.jpg`
  - Nghe W — *Chữ W* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-w:intro` · `explore` · `gate` · `win`

#### `chu-x` — 🚲 Chữ X

- **speakText:** Chữ X
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ X. Xe bắt đầu bằng chữ X!
- **exploreHint:** Chạm chữ X và nghe nhé!
- **friend:** `ban-chu-x` · 🚲 Bạn X · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ X và xe nào!
- **story.gateLine:** Đâu là chữ X? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn X về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ X?
- **gate.choices:** X · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-x.jpg`
- **exploreItems (3):**
  - Chữ X — *Đây là chữ X* · `assets/explore/chu/chu-x.svg`
  - Xe — *Xe bắt đầu bằng chữ X* · `assets/explore/ai/chu-x.jpg`
  - Nghe X — *Chữ X* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-x:intro` · `explore` · `gate` · `win`

#### `chu-y` — 💛 Chữ Y

- **speakText:** Chữ Y
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ Y. Yêu bắt đầu bằng chữ Y!
- **exploreHint:** Chạm chữ Y và nghe nhé!
- **friend:** `ban-chu-y` · 💛 Bạn Y · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ Y và yêu nào!
- **story.gateLine:** Đâu là chữ Y? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Y về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ Y?
- **gate.choices:** Y · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-y.jpg`
- **exploreItems (3):**
  - Chữ Y — *Đây là chữ Y* · `assets/explore/chu/chu-y.svg`
  - Yêu — *Yêu bắt đầu bằng chữ Y* · `assets/explore/ai/chu-y.jpg`
  - Nghe Y — *Chữ Y* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-y:intro` · `explore` · `gate` · `win`

#### `chu-z` — 🦓 Chữ Z

- **speakText:** Chữ Z
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là chữ Z. Zebra bắt đầu bằng chữ Z!
- **exploreHint:** Chạm chữ Z và nghe nhé!
- **friend:** `ban-chu-z` · 🦓 Bạn Z · tint `#7c5cff`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn chữ Z và zebra nào!
- **story.gateLine:** Đâu là chữ Z? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Z về rồi!
- **story.theme:** `topic-chu`
- **gate.promptVi:** Đâu là chữ Z?
- **gate.choices:** Z · A *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/chu-z.jpg`
- **exploreItems (3):**
  - Chữ Z — *Đây là chữ Z* · `assets/explore/chu/chu-z.svg`
  - Zebra — *Zebra bắt đầu bằng chữ Z* · `assets/explore/ai/chu-z.jpg`
  - Nghe Z — *Chữ Z* · `assets/explore/ai/shared-nghe.jpg`
- **Audio slots (Người lớn):** `lesson:chu-z:intro` · `explore` · `gate` · `win`

---

## 5. Vườn Bạn Bè (`dong-vat`) — 12 màn

| Trường | Giá trị |
|---------|---------|
| shortName | Vườn Bạn |
| speakName | Vườn Bạn Bè |
| emoji | 🐰 |
| helper | `dom-dom` |
| color | `#fab005` |
| order | 5 |

### Mục tiêu sư phạm

Nhận biết và gọi tên con vật quen thuộc (explore thường × 6 màu).

### Danh sách bài (bảng nhanh)

| # | ID | Tiêu đề | Bạn | Ô explore | Gate (prompt) | Xu | Tuổi |
|---|-----|---------|-----|-----------|---------------|-----|------|
| 1 | `dv-meo` | 🐱 Mèo | 🐱 Bạn Mèo | 6 | Đâu là con Mèo? | 5 | 2 |
| 2 | `dv-cho` | 🐶 Chó | 🐶 Bạn Chó | 6 | Đâu là con Chó? | 5 | 2 |
| 3 | `dv-ga` | 🐔 Gà | 🐔 Bạn Gà | 6 | Đâu là con Gà? | 5 | 2 |
| 4 | `dv-bo` | 🐮 Bò | 🐮 Bạn Bò | 6 | Đâu là con Bò? | 5 | 2 |
| 5 | `dv-heo` | 🐷 Heo | 🐷 Bạn Heo | 6 | Đâu là con Heo? | 5 | 2 |
| 6 | `dv-vit` | 🦆 Vịt | 🦆 Bạn Vịt | 6 | Đâu là con Vịt? | 5 | 2 |
| 7 | `dv-tho` | 🐰 Thỏ | 🐰 Bạn Thỏ | 6 | Đâu là con Thỏ? | 5 | 2 |
| 8 | `dv-ca` | 🐟 Cá | 🐟 Bạn Cá | 6 | Đâu là con Cá? | 5 | 2 |
| 9 | `dv-chim` | 🐦 Chim | 🐦 Bạn Chim | 6 | Đâu là con Chim? | 5 | 2 |
| 10 | `dv-ho` | 🐯 Hổ | 🐯 Bạn Hổ | 6 | Đâu là con Hổ? | 5 | 2 |
| 11 | `dv-voi` | 🐘 Voi | 🐘 Bạn Voi | 6 | Đâu là con Voi? | 5 | 2 |
| 12 | `dv-khi` | 🐵 Khỉ | 🐵 Bạn Khỉ | 6 | Đâu là con Khỉ? | 5 | 2 |

### Chi tiết từng bài

#### `dv-meo` — 🐱 Mèo

- **speakText:** Meo meo
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là con Mèo. Mèo có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng mèo màu khác nhau nhé!
- **friend:** `ban-dv-meo` · 🐱 Bạn Mèo · tint `#f76707`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Mèo màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là con Mèo? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Mèo về rồi!
- **story.theme:** `topic-dong-vat`
- **gate.promptVi:** Đâu là con Mèo?
- **gate.choices:** Mèo · Chó *(correctIndex=0)*
- **mapImg:** `assets/explore/dong-vat/dv-meo-cam.jpg`
- **exploreItems (6):**
  - `[do]` Mèo đỏ — *Mèo màu đỏ* · `assets/explore/dong-vat/dv-meo-do.jpg` _(ai-topic-color)_
  - `[vang]` Mèo vàng — *Mèo màu vàng* · `assets/explore/dong-vat/dv-meo-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Mèo xanh dương — *Mèo màu xanh dương* · `assets/explore/dong-vat/dv-meo-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Mèo xanh lá — *Mèo màu xanh lá* · `assets/explore/dong-vat/dv-meo-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Mèo cam — *Mèo màu cam* · `assets/explore/dong-vat/dv-meo-cam.jpg` _(ai-topic-color)_
  - `[tim]` Mèo tím — *Mèo màu tím* · `assets/explore/dong-vat/dv-meo-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dv-meo:intro` · `explore` · `gate` · `win`

#### `dv-cho` — 🐶 Chó

- **speakText:** Gâu gâu
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là con Chó. Chó có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng chó màu khác nhau nhé!
- **friend:** `ban-dv-cho` · 🐶 Bạn Chó · tint `#f76707`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Chó màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là con Chó? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Chó về rồi!
- **story.theme:** `topic-dong-vat`
- **gate.promptVi:** Đâu là con Chó?
- **gate.choices:** Chó · Mèo *(correctIndex=0)*
- **mapImg:** `assets/explore/dong-vat/dv-cho-cam.jpg`
- **exploreItems (6):**
  - `[do]` Chó đỏ — *Chó màu đỏ* · `assets/explore/dong-vat/dv-cho-do.jpg` _(ai-topic-color)_
  - `[vang]` Chó vàng — *Chó màu vàng* · `assets/explore/dong-vat/dv-cho-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Chó xanh dương — *Chó màu xanh dương* · `assets/explore/dong-vat/dv-cho-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Chó xanh lá — *Chó màu xanh lá* · `assets/explore/dong-vat/dv-cho-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Chó cam — *Chó màu cam* · `assets/explore/dong-vat/dv-cho-cam.jpg` _(ai-topic-color)_
  - `[tim]` Chó tím — *Chó màu tím* · `assets/explore/dong-vat/dv-cho-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dv-cho:intro` · `explore` · `gate` · `win`

#### `dv-ga` — 🐔 Gà

- **speakText:** Cục tác
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là con Gà. Gà có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng gà màu khác nhau nhé!
- **friend:** `ban-dv-ga` · 🐔 Bạn Gà · tint `#ffd43b`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Gà màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là con Gà? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Gà về rồi!
- **story.theme:** `topic-dong-vat`
- **gate.promptVi:** Đâu là con Gà?
- **gate.choices:** Gà · Mèo *(correctIndex=0)*
- **mapImg:** `assets/explore/dong-vat/dv-ga-vang.jpg`
- **exploreItems (6):**
  - `[do]` Gà đỏ — *Gà màu đỏ* · `assets/explore/dong-vat/dv-ga-do.jpg` _(ai-topic-color)_
  - `[vang]` Gà vàng — *Gà màu vàng* · `assets/explore/dong-vat/dv-ga-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Gà xanh dương — *Gà màu xanh dương* · `assets/explore/dong-vat/dv-ga-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Gà xanh lá — *Gà màu xanh lá* · `assets/explore/dong-vat/dv-ga-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Gà cam — *Gà màu cam* · `assets/explore/dong-vat/dv-ga-cam.jpg` _(ai-topic-color)_
  - `[tim]` Gà tím — *Gà màu tím* · `assets/explore/dong-vat/dv-ga-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dv-ga:intro` · `explore` · `gate` · `win`

#### `dv-bo` — 🐮 Bò

- **speakText:** Ụm bò
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là con Bò. Bò có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng bò màu khác nhau nhé!
- **friend:** `ban-dv-bo` · 🐮 Bạn Bò · tint `#f76707`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Bò màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là con Bò? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Bò về rồi!
- **story.theme:** `topic-dong-vat`
- **gate.promptVi:** Đâu là con Bò?
- **gate.choices:** Bò · Mèo *(correctIndex=0)*
- **mapImg:** `assets/explore/dong-vat/dv-bo-cam.jpg`
- **exploreItems (6):**
  - `[do]` Bò đỏ — *Bò màu đỏ* · `assets/explore/dong-vat/dv-bo-do.jpg` _(ai-topic-color)_
  - `[vang]` Bò vàng — *Bò màu vàng* · `assets/explore/dong-vat/dv-bo-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Bò xanh dương — *Bò màu xanh dương* · `assets/explore/dong-vat/dv-bo-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Bò xanh lá — *Bò màu xanh lá* · `assets/explore/dong-vat/dv-bo-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Bò cam — *Bò màu cam* · `assets/explore/dong-vat/dv-bo-cam.jpg` _(ai-topic-color)_
  - `[tim]` Bò tím — *Bò màu tím* · `assets/explore/dong-vat/dv-bo-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dv-bo:intro` · `explore` · `gate` · `win`

#### `dv-heo` — 🐷 Heo

- **speakText:** Ụt ịt
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là con Heo. Heo có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng heo màu khác nhau nhé!
- **friend:** `ban-dv-heo` · 🐷 Bạn Heo · tint `#f76707`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Heo màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là con Heo? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Heo về rồi!
- **story.theme:** `topic-dong-vat`
- **gate.promptVi:** Đâu là con Heo?
- **gate.choices:** Heo · Mèo *(correctIndex=0)*
- **mapImg:** `assets/explore/dong-vat/dv-heo-cam.jpg`
- **exploreItems (6):**
  - `[do]` Heo đỏ — *Heo màu đỏ* · `assets/explore/dong-vat/dv-heo-do.jpg` _(ai-topic-color)_
  - `[vang]` Heo vàng — *Heo màu vàng* · `assets/explore/dong-vat/dv-heo-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Heo xanh dương — *Heo màu xanh dương* · `assets/explore/dong-vat/dv-heo-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Heo xanh lá — *Heo màu xanh lá* · `assets/explore/dong-vat/dv-heo-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Heo cam — *Heo màu cam* · `assets/explore/dong-vat/dv-heo-cam.jpg` _(ai-topic-color)_
  - `[tim]` Heo tím — *Heo màu tím* · `assets/explore/dong-vat/dv-heo-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dv-heo:intro` · `explore` · `gate` · `win`

#### `dv-vit` — 🦆 Vịt

- **speakText:** Cạp cạp
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là con Vịt. Vịt có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng vịt màu khác nhau nhé!
- **friend:** `ban-dv-vit` · 🦆 Bạn Vịt · tint `#ffd43b`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Vịt màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là con Vịt? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Vịt về rồi!
- **story.theme:** `topic-dong-vat`
- **gate.promptVi:** Đâu là con Vịt?
- **gate.choices:** Vịt · Mèo *(correctIndex=0)*
- **mapImg:** `assets/explore/dong-vat/dv-vit-vang.jpg`
- **exploreItems (6):**
  - `[do]` Vịt đỏ — *Vịt màu đỏ* · `assets/explore/dong-vat/dv-vit-do.jpg` _(ai-topic-color)_
  - `[vang]` Vịt vàng — *Vịt màu vàng* · `assets/explore/dong-vat/dv-vit-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Vịt xanh dương — *Vịt màu xanh dương* · `assets/explore/dong-vat/dv-vit-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Vịt xanh lá — *Vịt màu xanh lá* · `assets/explore/dong-vat/dv-vit-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Vịt cam — *Vịt màu cam* · `assets/explore/dong-vat/dv-vit-cam.jpg` _(ai-topic-color)_
  - `[tim]` Vịt tím — *Vịt màu tím* · `assets/explore/dong-vat/dv-vit-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dv-vit:intro` · `explore` · `gate` · `win`

#### `dv-tho` — 🐰 Thỏ

- **speakText:** Thỏ nhảy
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là con Thỏ. Thỏ có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng thỏ màu khác nhau nhé!
- **friend:** `ban-dv-tho` · 🐰 Bạn Thỏ · tint `#ffd43b`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Thỏ màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là con Thỏ? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Thỏ về rồi!
- **story.theme:** `topic-dong-vat`
- **gate.promptVi:** Đâu là con Thỏ?
- **gate.choices:** Thỏ · Mèo *(correctIndex=0)*
- **mapImg:** `assets/explore/dong-vat/dv-tho-vang.jpg`
- **exploreItems (6):**
  - `[do]` Thỏ đỏ — *Thỏ màu đỏ* · `assets/explore/dong-vat/dv-tho-do.jpg` _(ai-topic-color)_
  - `[vang]` Thỏ vàng — *Thỏ màu vàng* · `assets/explore/dong-vat/dv-tho-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Thỏ xanh dương — *Thỏ màu xanh dương* · `assets/explore/dong-vat/dv-tho-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Thỏ xanh lá — *Thỏ màu xanh lá* · `assets/explore/dong-vat/dv-tho-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Thỏ cam — *Thỏ màu cam* · `assets/explore/dong-vat/dv-tho-cam.jpg` _(ai-topic-color)_
  - `[tim]` Thỏ tím — *Thỏ màu tím* · `assets/explore/dong-vat/dv-tho-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dv-tho:intro` · `explore` · `gate` · `win`

#### `dv-ca` — 🐟 Cá

- **speakText:** Bơi bơi
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là con Cá. Cá có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng cá màu khác nhau nhé!
- **friend:** `ban-dv-ca` · 🐟 Bạn Cá · tint `#1c7ed6`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Cá màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là con Cá? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Cá về rồi!
- **story.theme:** `topic-dong-vat`
- **gate.promptVi:** Đâu là con Cá?
- **gate.choices:** Cá · Mèo *(correctIndex=0)*
- **mapImg:** `assets/explore/dong-vat/dv-ca-xanh-duong.jpg`
- **exploreItems (6):**
  - `[do]` Cá đỏ — *Cá màu đỏ* · `assets/explore/dong-vat/dv-ca-do.jpg` _(ai-topic-color)_
  - `[vang]` Cá vàng — *Cá màu vàng* · `assets/explore/dong-vat/dv-ca-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Cá xanh dương — *Cá màu xanh dương* · `assets/explore/dong-vat/dv-ca-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Cá xanh lá — *Cá màu xanh lá* · `assets/explore/dong-vat/dv-ca-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Cá cam — *Cá màu cam* · `assets/explore/dong-vat/dv-ca-cam.jpg` _(ai-topic-color)_
  - `[tim]` Cá tím — *Cá màu tím* · `assets/explore/dong-vat/dv-ca-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dv-ca:intro` · `explore` · `gate` · `win`

#### `dv-chim` — 🐦 Chim

- **speakText:** Chip chip
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là con Chim. Chim có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng chim màu khác nhau nhé!
- **friend:** `ban-dv-chim` · 🐦 Bạn Chim · tint `#f76707`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Chim màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là con Chim? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Chim về rồi!
- **story.theme:** `topic-dong-vat`
- **gate.promptVi:** Đâu là con Chim?
- **gate.choices:** Chim · Mèo *(correctIndex=0)*
- **mapImg:** `assets/explore/dong-vat/dv-chim-cam.jpg`
- **exploreItems (6):**
  - `[do]` Chim đỏ — *Chim màu đỏ* · `assets/explore/dong-vat/dv-chim-do.jpg` _(ai-topic-color)_
  - `[vang]` Chim vàng — *Chim màu vàng* · `assets/explore/dong-vat/dv-chim-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Chim xanh dương — *Chim màu xanh dương* · `assets/explore/dong-vat/dv-chim-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Chim xanh lá — *Chim màu xanh lá* · `assets/explore/dong-vat/dv-chim-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Chim cam — *Chim màu cam* · `assets/explore/dong-vat/dv-chim-cam.jpg` _(ai-topic-color)_
  - `[tim]` Chim tím — *Chim màu tím* · `assets/explore/dong-vat/dv-chim-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dv-chim:intro` · `explore` · `gate` · `win`

#### `dv-ho` — 🐯 Hổ

- **speakText:** Gừ gừ nhẹ
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là con Hổ. Hổ có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng hổ màu khác nhau nhé!
- **friend:** `ban-dv-ho` · 🐯 Bạn Hổ · tint `#f76707`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Hổ màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là con Hổ? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Hổ về rồi!
- **story.theme:** `topic-dong-vat`
- **gate.promptVi:** Đâu là con Hổ?
- **gate.choices:** Hổ · Mèo *(correctIndex=0)*
- **mapImg:** `assets/explore/dong-vat/dv-ho-cam.jpg`
- **exploreItems (6):**
  - `[do]` Hổ đỏ — *Hổ màu đỏ* · `assets/explore/dong-vat/dv-ho-do.jpg` _(ai-topic-color)_
  - `[vang]` Hổ vàng — *Hổ màu vàng* · `assets/explore/dong-vat/dv-ho-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Hổ xanh dương — *Hổ màu xanh dương* · `assets/explore/dong-vat/dv-ho-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Hổ xanh lá — *Hổ màu xanh lá* · `assets/explore/dong-vat/dv-ho-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Hổ cam — *Hổ màu cam* · `assets/explore/dong-vat/dv-ho-cam.jpg` _(ai-topic-color)_
  - `[tim]` Hổ tím — *Hổ màu tím* · `assets/explore/dong-vat/dv-ho-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dv-ho:intro` · `explore` · `gate` · `win`

#### `dv-voi` — 🐘 Voi

- **speakText:** Rống vui
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là con Voi. Voi có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng voi màu khác nhau nhé!
- **friend:** `ban-dv-voi` · 🐘 Bạn Voi · tint `#1c7ed6`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Voi màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là con Voi? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Voi về rồi!
- **story.theme:** `topic-dong-vat`
- **gate.promptVi:** Đâu là con Voi?
- **gate.choices:** Voi · Mèo *(correctIndex=0)*
- **mapImg:** `assets/explore/dong-vat/dv-voi-xanh-duong.jpg`
- **exploreItems (6):**
  - `[do]` Voi đỏ — *Voi màu đỏ* · `assets/explore/dong-vat/dv-voi-do.jpg` _(ai-topic-color)_
  - `[vang]` Voi vàng — *Voi màu vàng* · `assets/explore/dong-vat/dv-voi-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Voi xanh dương — *Voi màu xanh dương* · `assets/explore/dong-vat/dv-voi-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Voi xanh lá — *Voi màu xanh lá* · `assets/explore/dong-vat/dv-voi-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Voi cam — *Voi màu cam* · `assets/explore/dong-vat/dv-voi-cam.jpg` _(ai-topic-color)_
  - `[tim]` Voi tím — *Voi màu tím* · `assets/explore/dong-vat/dv-voi-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dv-voi:intro` · `explore` · `gate` · `win`

#### `dv-khi` — 🐵 Khỉ

- **speakText:** Kia kia
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là con Khỉ. Khỉ có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng khỉ màu khác nhau nhé!
- **friend:** `ban-dv-khi` · 🐵 Bạn Khỉ · tint `#f76707`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Khỉ màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là con Khỉ? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Khỉ về rồi!
- **story.theme:** `topic-dong-vat`
- **gate.promptVi:** Đâu là con Khỉ?
- **gate.choices:** Khỉ · Mèo *(correctIndex=0)*
- **mapImg:** `assets/explore/dong-vat/dv-khi-cam.jpg`
- **exploreItems (6):**
  - `[do]` Khỉ đỏ — *Khỉ màu đỏ* · `assets/explore/dong-vat/dv-khi-do.jpg` _(ai-topic-color)_
  - `[vang]` Khỉ vàng — *Khỉ màu vàng* · `assets/explore/dong-vat/dv-khi-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Khỉ xanh dương — *Khỉ màu xanh dương* · `assets/explore/dong-vat/dv-khi-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Khỉ xanh lá — *Khỉ màu xanh lá* · `assets/explore/dong-vat/dv-khi-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Khỉ cam — *Khỉ màu cam* · `assets/explore/dong-vat/dv-khi-cam.jpg` _(ai-topic-color)_
  - `[tim]` Khỉ tím — *Khỉ màu tím* · `assets/explore/dong-vat/dv-khi-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dv-khi:intro` · `explore` · `gate` · `win`

---

## 6. Vườn Trái Cây (`trai-cay`) — 8 màn

| Trường | Giá trị |
|---------|---------|
| shortName | Vườn Quả |
| speakName | Vườn Trái Cây |
| emoji | 🍎🧺 |
| helper | `dom-dom` |
| color | `#e03131` |
| order | 6 |

### Mục tiêu sư phạm

Nhận biết trái cây quen thuộc (explore thường × màu).

### Danh sách bài (bảng nhanh)

| # | ID | Tiêu đề | Bạn | Ô explore | Gate (prompt) | Xu | Tuổi |
|---|-----|---------|-----|-----------|---------------|-----|------|
| 1 | `tc-tao` | 🍎 Táo | 🍎 Bạn Táo | 6 | Đâu là quả Táo? | 5 | 2 |
| 2 | `tc-chuoi` | 🍌 Chuối | 🍌 Bạn Chuối | 6 | Đâu là quả Chuối? | 5 | 2 |
| 3 | `tc-cam` | 🍊 Cam | 🍊 Bạn Cam | 6 | Đâu là quả Cam? | 5 | 2 |
| 4 | `tc-xoai` | 🥭 Xoài | 🥭 Bạn Xoài | 6 | Đâu là quả Xoài? | 5 | 2 |
| 5 | `tc-dua-hau` | 🍉 Dưa hấu | 🍉 Bạn Dưa hấu | 6 | Đâu là quả Dưa hấu? | 5 | 2 |
| 6 | `tc-nho` | 🍇 Nho | 🍇 Bạn Nho | 6 | Đâu là quả Nho? | 5 | 2 |
| 7 | `tc-dau` | 🍓 Dâu | 🍓 Bạn Dâu | 6 | Đâu là quả Dâu? | 5 | 2 |
| 8 | `tc-dua` | 🥥 Dừa | 🥥 Bạn Dừa | 6 | Đâu là quả Dừa? | 5 | 2 |

### Chi tiết từng bài

#### `tc-tao` — 🍎 Táo

- **speakText:** Táo
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là quả Táo. Táo có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng táo màu khác nhau nhé!
- **friend:** `ban-tc-tao` · 🍎 Bạn Táo · tint `#e03131`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Táo màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là quả Táo? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Táo về rồi!
- **story.theme:** `topic-trai-cay`
- **gate.promptVi:** Đâu là quả Táo?
- **gate.choices:** Táo · Chuối *(correctIndex=0)*
- **mapImg:** `assets/explore/trai-cay/tc-tao-do.jpg`
- **exploreItems (6):**
  - `[do]` Táo đỏ — *Táo màu đỏ* · `assets/explore/trai-cay/tc-tao-do.jpg` _(ai-topic-color)_
  - `[vang]` Táo vàng — *Táo màu vàng* · `assets/explore/trai-cay/tc-tao-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Táo xanh dương — *Táo màu xanh dương* · `assets/explore/trai-cay/tc-tao-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Táo xanh lá — *Táo màu xanh lá* · `assets/explore/trai-cay/tc-tao-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Táo cam — *Táo màu cam* · `assets/explore/trai-cay/tc-tao-cam.jpg` _(ai-topic-color)_
  - `[tim]` Táo tím — *Táo màu tím* · `assets/explore/trai-cay/tc-tao-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:tc-tao:intro` · `explore` · `gate` · `win`

#### `tc-chuoi` — 🍌 Chuối

- **speakText:** Chuối
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là quả Chuối. Chuối có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng chuối màu khác nhau nhé!
- **friend:** `ban-tc-chuoi` · 🍌 Bạn Chuối · tint `#ffd43b`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Chuối màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là quả Chuối? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Chuối về rồi!
- **story.theme:** `topic-trai-cay`
- **gate.promptVi:** Đâu là quả Chuối?
- **gate.choices:** Chuối · Táo *(correctIndex=0)*
- **mapImg:** `assets/explore/trai-cay/tc-chuoi-vang.jpg`
- **exploreItems (6):**
  - `[do]` Chuối đỏ — *Chuối màu đỏ* · `assets/explore/trai-cay/tc-chuoi-do.jpg` _(ai-topic-color)_
  - `[vang]` Chuối vàng — *Chuối màu vàng* · `assets/explore/trai-cay/tc-chuoi-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Chuối xanh dương — *Chuối màu xanh dương* · `assets/explore/trai-cay/tc-chuoi-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Chuối xanh lá — *Chuối màu xanh lá* · `assets/explore/trai-cay/tc-chuoi-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Chuối cam — *Chuối màu cam* · `assets/explore/trai-cay/tc-chuoi-cam.jpg` _(ai-topic-color)_
  - `[tim]` Chuối tím — *Chuối màu tím* · `assets/explore/trai-cay/tc-chuoi-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:tc-chuoi:intro` · `explore` · `gate` · `win`

#### `tc-cam` — 🍊 Cam

- **speakText:** Cam
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là quả Cam. Cam có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng cam màu khác nhau nhé!
- **friend:** `ban-tc-cam` · 🍊 Bạn Cam · tint `#f76707`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Cam màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là quả Cam? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Cam về rồi!
- **story.theme:** `topic-trai-cay`
- **gate.promptVi:** Đâu là quả Cam?
- **gate.choices:** Cam · Táo *(correctIndex=0)*
- **mapImg:** `assets/explore/trai-cay/tc-cam-cam.jpg`
- **exploreItems (6):**
  - `[do]` Cam đỏ — *Cam màu đỏ* · `assets/explore/trai-cay/tc-cam-do.jpg` _(ai-topic-color)_
  - `[vang]` Cam vàng — *Cam màu vàng* · `assets/explore/trai-cay/tc-cam-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Cam xanh dương — *Cam màu xanh dương* · `assets/explore/trai-cay/tc-cam-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Cam xanh lá — *Cam màu xanh lá* · `assets/explore/trai-cay/tc-cam-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Cam cam — *Cam màu cam* · `assets/explore/trai-cay/tc-cam-cam.jpg` _(ai-topic-color)_
  - `[tim]` Cam tím — *Cam màu tím* · `assets/explore/trai-cay/tc-cam-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:tc-cam:intro` · `explore` · `gate` · `win`

#### `tc-xoai` — 🥭 Xoài

- **speakText:** Xoài
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là quả Xoài. Xoài có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng xoài màu khác nhau nhé!
- **friend:** `ban-tc-xoai` · 🥭 Bạn Xoài · tint `#ffd43b`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Xoài màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là quả Xoài? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Xoài về rồi!
- **story.theme:** `topic-trai-cay`
- **gate.promptVi:** Đâu là quả Xoài?
- **gate.choices:** Xoài · Táo *(correctIndex=0)*
- **mapImg:** `assets/explore/trai-cay/tc-xoai-vang.jpg`
- **exploreItems (6):**
  - `[do]` Xoài đỏ — *Xoài màu đỏ* · `assets/explore/trai-cay/tc-xoai-do.jpg` _(ai-topic-color)_
  - `[vang]` Xoài vàng — *Xoài màu vàng* · `assets/explore/trai-cay/tc-xoai-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Xoài xanh dương — *Xoài màu xanh dương* · `assets/explore/trai-cay/tc-xoai-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Xoài xanh lá — *Xoài màu xanh lá* · `assets/explore/trai-cay/tc-xoai-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Xoài cam — *Xoài màu cam* · `assets/explore/trai-cay/tc-xoai-cam.jpg` _(ai-topic-color)_
  - `[tim]` Xoài tím — *Xoài màu tím* · `assets/explore/trai-cay/tc-xoai-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:tc-xoai:intro` · `explore` · `gate` · `win`

#### `tc-dua-hau` — 🍉 Dưa hấu

- **speakText:** Dưa hấu
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là quả Dưa hấu. Dưa hấu có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng dưa hấu màu khác nhau nhé!
- **friend:** `ban-tc-dua-hau` · 🍉 Bạn Dưa hấu · tint `#2f9e44`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Dưa hấu màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là quả Dưa hấu? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Dưa hấu về rồi!
- **story.theme:** `topic-trai-cay`
- **gate.promptVi:** Đâu là quả Dưa hấu?
- **gate.choices:** Dưa hấu · Táo *(correctIndex=0)*
- **mapImg:** `assets/explore/trai-cay/tc-dua-hau-xanh-la.jpg`
- **exploreItems (6):**
  - `[do]` Dưa hấu đỏ — *Dưa hấu màu đỏ* · `assets/explore/trai-cay/tc-dua-hau-do.jpg` _(ai-topic-color)_
  - `[vang]` Dưa hấu vàng — *Dưa hấu màu vàng* · `assets/explore/trai-cay/tc-dua-hau-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Dưa hấu xanh dương — *Dưa hấu màu xanh dương* · `assets/explore/trai-cay/tc-dua-hau-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Dưa hấu xanh lá — *Dưa hấu màu xanh lá* · `assets/explore/trai-cay/tc-dua-hau-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Dưa hấu cam — *Dưa hấu màu cam* · `assets/explore/trai-cay/tc-dua-hau-cam.jpg` _(ai-topic-color)_
  - `[tim]` Dưa hấu tím — *Dưa hấu màu tím* · `assets/explore/trai-cay/tc-dua-hau-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:tc-dua-hau:intro` · `explore` · `gate` · `win`

#### `tc-nho` — 🍇 Nho

- **speakText:** Nho
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là quả Nho. Nho có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng nho màu khác nhau nhé!
- **friend:** `ban-tc-nho` · 🍇 Bạn Nho · tint `#9c36b5`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Nho màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là quả Nho? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Nho về rồi!
- **story.theme:** `topic-trai-cay`
- **gate.promptVi:** Đâu là quả Nho?
- **gate.choices:** Nho · Táo *(correctIndex=0)*
- **mapImg:** `assets/explore/trai-cay/tc-nho-tim.jpg`
- **exploreItems (6):**
  - `[do]` Nho đỏ — *Nho màu đỏ* · `assets/explore/trai-cay/tc-nho-do.jpg` _(ai-topic-color)_
  - `[vang]` Nho vàng — *Nho màu vàng* · `assets/explore/trai-cay/tc-nho-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Nho xanh dương — *Nho màu xanh dương* · `assets/explore/trai-cay/tc-nho-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Nho xanh lá — *Nho màu xanh lá* · `assets/explore/trai-cay/tc-nho-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Nho cam — *Nho màu cam* · `assets/explore/trai-cay/tc-nho-cam.jpg` _(ai-topic-color)_
  - `[tim]` Nho tím — *Nho màu tím* · `assets/explore/trai-cay/tc-nho-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:tc-nho:intro` · `explore` · `gate` · `win`

#### `tc-dau` — 🍓 Dâu

- **speakText:** Dâu
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là quả Dâu. Dâu có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng dâu màu khác nhau nhé!
- **friend:** `ban-tc-dau` · 🍓 Bạn Dâu · tint `#e03131`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Dâu màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là quả Dâu? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Dâu về rồi!
- **story.theme:** `topic-trai-cay`
- **gate.promptVi:** Đâu là quả Dâu?
- **gate.choices:** Dâu · Táo *(correctIndex=0)*
- **mapImg:** `assets/explore/trai-cay/tc-dau-do.jpg`
- **exploreItems (6):**
  - `[do]` Dâu đỏ — *Dâu màu đỏ* · `assets/explore/trai-cay/tc-dau-do.jpg` _(ai-topic-color)_
  - `[vang]` Dâu vàng — *Dâu màu vàng* · `assets/explore/trai-cay/tc-dau-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Dâu xanh dương — *Dâu màu xanh dương* · `assets/explore/trai-cay/tc-dau-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Dâu xanh lá — *Dâu màu xanh lá* · `assets/explore/trai-cay/tc-dau-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Dâu cam — *Dâu màu cam* · `assets/explore/trai-cay/tc-dau-cam.jpg` _(ai-topic-color)_
  - `[tim]` Dâu tím — *Dâu màu tím* · `assets/explore/trai-cay/tc-dau-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:tc-dau:intro` · `explore` · `gate` · `win`

#### `tc-dua` — 🥥 Dừa

- **speakText:** Dừa
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là quả Dừa. Dừa có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng dừa màu khác nhau nhé!
- **friend:** `ban-tc-dua` · 🥥 Bạn Dừa · tint `#ffd43b`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Dừa màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là quả Dừa? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Dừa về rồi!
- **story.theme:** `topic-trai-cay`
- **gate.promptVi:** Đâu là quả Dừa?
- **gate.choices:** Dừa · Táo *(correctIndex=0)*
- **mapImg:** `assets/explore/trai-cay/tc-dua-vang.jpg`
- **exploreItems (6):**
  - `[do]` Dừa đỏ — *Dừa màu đỏ* · `assets/explore/trai-cay/tc-dua-do.jpg` _(ai-topic-color)_
  - `[vang]` Dừa vàng — *Dừa màu vàng* · `assets/explore/trai-cay/tc-dua-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Dừa xanh dương — *Dừa màu xanh dương* · `assets/explore/trai-cay/tc-dua-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Dừa xanh lá — *Dừa màu xanh lá* · `assets/explore/trai-cay/tc-dua-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Dừa cam — *Dừa màu cam* · `assets/explore/trai-cay/tc-dua-cam.jpg` _(ai-topic-color)_
  - `[tim]` Dừa tím — *Dừa màu tím* · `assets/explore/trai-cay/tc-dua-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:tc-dua:intro` · `explore` · `gate` · `win`

---

## 7. Nhà Đồ Vật (`do-vat`) — 12 màn

| Trường | Giá trị |
|---------|---------|
| shortName | Nhà Đồ |
| speakName | Nhà Đồ Vật |
| emoji | ⚽ |
| helper | `be-gau` |
| color | `#e67700` |
| order | 7 |

### Mục tiêu sư phạm

Nhận biết đồ vật gần gũi hàng ngày (explore thường × màu).

### Danh sách bài (bảng nhanh)

| # | ID | Tiêu đề | Bạn | Ô explore | Gate (prompt) | Xu | Tuổi |
|---|-----|---------|-----|-----------|---------------|-----|------|
| 1 | `dvat-bong` | ⚽ Bóng | ⚽ Bạn Bóng | 6 | Đâu là Bóng? | 5 | 2 |
| 2 | `dvat-sach` | 📚 Sách | 📚 Bạn Sách | 6 | Đâu là Sách? | 5 | 2 |
| 3 | `dvat-coc` | 🥛 Cốc | 🥛 Bạn Cốc | 6 | Đâu là Cốc? | 5 | 2 |
| 4 | `dvat-thia` | 🥄 Thìa | 🥄 Bạn Thìa | 6 | Đâu là Thìa? | 5 | 2 |
| 5 | `dvat-mu` | 🎩 Mũ | 🎩 Bạn Mũ | 6 | Đâu là Mũ? | 5 | 2 |
| 6 | `dvat-giay` | 👟 Giày | 👟 Bạn Giày | 6 | Đâu là Giày? | 5 | 2 |
| 7 | `dvat-xe-hoi` | 🚗 Xe hơi | 🚗 Bạn Xe hơi | 6 | Đâu là Xe hơi? | 5 | 2 |
| 8 | `dvat-xe-dap` | 🚲 Xe đạp | 🚲 Bạn Xe đạp | 6 | Đâu là Xe đạp? | 5 | 2 |
| 9 | `dvat-tui` | 🎒 Túi | 🎒 Bạn Túi | 6 | Đâu là Túi? | 5 | 2 |
| 10 | `dvat-ghe` | 🪑 Ghế | 🪑 Bạn Ghế | 6 | Đâu là Ghế? | 5 | 2 |
| 11 | `dvat-giuong` | 🛏️ Giường | 🛏️ Bạn Giường | 6 | Đâu là Giường? | 5 | 2 |
| 12 | `dvat-ban-chai` | 🪥 Bàn chải | 🪥 Bạn Bàn chải | 6 | Đâu là Bàn chải? | 5 | 2 |

### Chi tiết từng bài

#### `dvat-bong` — ⚽ Bóng

- **speakText:** Bóng
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Bóng. Bóng có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng bóng màu khác nhau nhé!
- **friend:** `ban-dvat-bong` · ⚽ Bạn Bóng · tint `#2f9e44`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Bóng màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Bóng? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Bóng về rồi!
- **story.theme:** `topic-do-vat`
- **gate.promptVi:** Đâu là Bóng?
- **gate.choices:** Bóng · Sách *(correctIndex=0)*
- **mapImg:** `assets/explore/do-vat/dvat-bong-xanh-la.jpg`
- **exploreItems (6):**
  - `[do]` Bóng đỏ — *Bóng màu đỏ* · `assets/explore/do-vat/dvat-bong-do.jpg` _(ai-topic-color)_
  - `[vang]` Bóng vàng — *Bóng màu vàng* · `assets/explore/do-vat/dvat-bong-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Bóng xanh dương — *Bóng màu xanh dương* · `assets/explore/do-vat/dvat-bong-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Bóng xanh lá — *Bóng màu xanh lá* · `assets/explore/do-vat/dvat-bong-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Bóng cam — *Bóng màu cam* · `assets/explore/do-vat/dvat-bong-cam.jpg` _(ai-topic-color)_
  - `[tim]` Bóng tím — *Bóng màu tím* · `assets/explore/do-vat/dvat-bong-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dvat-bong:intro` · `explore` · `gate` · `win`

#### `dvat-sach` — 📚 Sách

- **speakText:** Sách
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Sách. Sách có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng sách màu khác nhau nhé!
- **friend:** `ban-dvat-sach` · 📚 Bạn Sách · tint `#f76707`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Sách màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Sách? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Sách về rồi!
- **story.theme:** `topic-do-vat`
- **gate.promptVi:** Đâu là Sách?
- **gate.choices:** Sách · Bóng *(correctIndex=0)*
- **mapImg:** `assets/explore/do-vat/dvat-sach-cam.jpg`
- **exploreItems (6):**
  - `[do]` Sách đỏ — *Sách màu đỏ* · `assets/explore/do-vat/dvat-sach-do.jpg` _(ai-topic-color)_
  - `[vang]` Sách vàng — *Sách màu vàng* · `assets/explore/do-vat/dvat-sach-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Sách xanh dương — *Sách màu xanh dương* · `assets/explore/do-vat/dvat-sach-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Sách xanh lá — *Sách màu xanh lá* · `assets/explore/do-vat/dvat-sach-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Sách cam — *Sách màu cam* · `assets/explore/do-vat/dvat-sach-cam.jpg` _(ai-topic-color)_
  - `[tim]` Sách tím — *Sách màu tím* · `assets/explore/do-vat/dvat-sach-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dvat-sach:intro` · `explore` · `gate` · `win`

#### `dvat-coc` — 🥛 Cốc

- **speakText:** Cốc
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Cốc. Cốc có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng cốc màu khác nhau nhé!
- **friend:** `ban-dvat-coc` · 🥛 Bạn Cốc · tint `#1c7ed6`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Cốc màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Cốc? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Cốc về rồi!
- **story.theme:** `topic-do-vat`
- **gate.promptVi:** Đâu là Cốc?
- **gate.choices:** Cốc · Bóng *(correctIndex=0)*
- **mapImg:** `assets/explore/do-vat/dvat-coc-xanh-duong.jpg`
- **exploreItems (6):**
  - `[do]` Cốc đỏ — *Cốc màu đỏ* · `assets/explore/do-vat/dvat-coc-do.jpg` _(ai-topic-color)_
  - `[vang]` Cốc vàng — *Cốc màu vàng* · `assets/explore/do-vat/dvat-coc-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Cốc xanh dương — *Cốc màu xanh dương* · `assets/explore/do-vat/dvat-coc-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Cốc xanh lá — *Cốc màu xanh lá* · `assets/explore/do-vat/dvat-coc-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Cốc cam — *Cốc màu cam* · `assets/explore/do-vat/dvat-coc-cam.jpg` _(ai-topic-color)_
  - `[tim]` Cốc tím — *Cốc màu tím* · `assets/explore/do-vat/dvat-coc-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dvat-coc:intro` · `explore` · `gate` · `win`

#### `dvat-thia` — 🥄 Thìa

- **speakText:** Thìa
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Thìa. Thìa có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng thìa màu khác nhau nhé!
- **friend:** `ban-dvat-thia` · 🥄 Bạn Thìa · tint `#ffd43b`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Thìa màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Thìa? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Thìa về rồi!
- **story.theme:** `topic-do-vat`
- **gate.promptVi:** Đâu là Thìa?
- **gate.choices:** Thìa · Bóng *(correctIndex=0)*
- **mapImg:** `assets/explore/do-vat/dvat-thia-vang.jpg`
- **exploreItems (6):**
  - `[do]` Thìa đỏ — *Thìa màu đỏ* · `assets/explore/do-vat/dvat-thia-do.jpg` _(ai-topic-color)_
  - `[vang]` Thìa vàng — *Thìa màu vàng* · `assets/explore/do-vat/dvat-thia-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Thìa xanh dương — *Thìa màu xanh dương* · `assets/explore/do-vat/dvat-thia-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Thìa xanh lá — *Thìa màu xanh lá* · `assets/explore/do-vat/dvat-thia-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Thìa cam — *Thìa màu cam* · `assets/explore/do-vat/dvat-thia-cam.jpg` _(ai-topic-color)_
  - `[tim]` Thìa tím — *Thìa màu tím* · `assets/explore/do-vat/dvat-thia-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dvat-thia:intro` · `explore` · `gate` · `win`

#### `dvat-mu` — 🎩 Mũ

- **speakText:** Mũ
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Mũ. Mũ có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng mũ màu khác nhau nhé!
- **friend:** `ban-dvat-mu` · 🎩 Bạn Mũ · tint `#f76707`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Mũ màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Mũ? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Mũ về rồi!
- **story.theme:** `topic-do-vat`
- **gate.promptVi:** Đâu là Mũ?
- **gate.choices:** Mũ · Bóng *(correctIndex=0)*
- **mapImg:** `assets/explore/do-vat/dvat-mu-cam.jpg`
- **exploreItems (6):**
  - `[do]` Mũ đỏ — *Mũ màu đỏ* · `assets/explore/do-vat/dvat-mu-do.jpg` _(ai-topic-color)_
  - `[vang]` Mũ vàng — *Mũ màu vàng* · `assets/explore/do-vat/dvat-mu-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Mũ xanh dương — *Mũ màu xanh dương* · `assets/explore/do-vat/dvat-mu-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Mũ xanh lá — *Mũ màu xanh lá* · `assets/explore/do-vat/dvat-mu-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Mũ cam — *Mũ màu cam* · `assets/explore/do-vat/dvat-mu-cam.jpg` _(ai-topic-color)_
  - `[tim]` Mũ tím — *Mũ màu tím* · `assets/explore/do-vat/dvat-mu-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dvat-mu:intro` · `explore` · `gate` · `win`

#### `dvat-giay` — 👟 Giày

- **speakText:** Giày
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Giày. Giày có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng giày màu khác nhau nhé!
- **friend:** `ban-dvat-giay` · 👟 Bạn Giày · tint `#e03131`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Giày màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Giày? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Giày về rồi!
- **story.theme:** `topic-do-vat`
- **gate.promptVi:** Đâu là Giày?
- **gate.choices:** Giày · Bóng *(correctIndex=0)*
- **mapImg:** `assets/explore/do-vat/dvat-giay-do.jpg`
- **exploreItems (6):**
  - `[do]` Giày đỏ — *Giày màu đỏ* · `assets/explore/do-vat/dvat-giay-do.jpg` _(ai-topic-color)_
  - `[vang]` Giày vàng — *Giày màu vàng* · `assets/explore/do-vat/dvat-giay-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Giày xanh dương — *Giày màu xanh dương* · `assets/explore/do-vat/dvat-giay-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Giày xanh lá — *Giày màu xanh lá* · `assets/explore/do-vat/dvat-giay-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Giày cam — *Giày màu cam* · `assets/explore/do-vat/dvat-giay-cam.jpg` _(ai-topic-color)_
  - `[tim]` Giày tím — *Giày màu tím* · `assets/explore/do-vat/dvat-giay-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dvat-giay:intro` · `explore` · `gate` · `win`

#### `dvat-xe-hoi` — 🚗 Xe hơi

- **speakText:** Xe hơi
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Xe hơi. Xe hơi có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng xe hơi màu khác nhau nhé!
- **friend:** `ban-dvat-xe-hoi` · 🚗 Bạn Xe hơi · tint `#e03131`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Xe hơi màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Xe hơi? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Xe hơi về rồi!
- **story.theme:** `topic-do-vat`
- **gate.promptVi:** Đâu là Xe hơi?
- **gate.choices:** Xe hơi · Bóng *(correctIndex=0)*
- **mapImg:** `assets/explore/do-vat/dvat-xe-hoi-do.jpg`
- **exploreItems (6):**
  - `[do]` Xe hơi đỏ — *Xe hơi màu đỏ* · `assets/explore/do-vat/dvat-xe-hoi-do.jpg` _(ai-topic-color)_
  - `[vang]` Xe hơi vàng — *Xe hơi màu vàng* · `assets/explore/do-vat/dvat-xe-hoi-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Xe hơi xanh dương — *Xe hơi màu xanh dương* · `assets/explore/do-vat/dvat-xe-hoi-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Xe hơi xanh lá — *Xe hơi màu xanh lá* · `assets/explore/do-vat/dvat-xe-hoi-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Xe hơi cam — *Xe hơi màu cam* · `assets/explore/do-vat/dvat-xe-hoi-cam.jpg` _(ai-topic-color)_
  - `[tim]` Xe hơi tím — *Xe hơi màu tím* · `assets/explore/do-vat/dvat-xe-hoi-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dvat-xe-hoi:intro` · `explore` · `gate` · `win`

#### `dvat-xe-dap` — 🚲 Xe đạp

- **speakText:** Xe đạp
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Xe đạp. Xe đạp có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng xe đạp màu khác nhau nhé!
- **friend:** `ban-dvat-xe-dap` · 🚲 Bạn Xe đạp · tint `#1c7ed6`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Xe đạp màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Xe đạp? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Xe đạp về rồi!
- **story.theme:** `topic-do-vat`
- **gate.promptVi:** Đâu là Xe đạp?
- **gate.choices:** Xe đạp · Bóng *(correctIndex=0)*
- **mapImg:** `assets/explore/do-vat/dvat-xe-dap-xanh-duong.jpg`
- **exploreItems (6):**
  - `[do]` Xe đạp đỏ — *Xe đạp màu đỏ* · `assets/explore/do-vat/dvat-xe-dap-do.jpg` _(ai-topic-color)_
  - `[vang]` Xe đạp vàng — *Xe đạp màu vàng* · `assets/explore/do-vat/dvat-xe-dap-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Xe đạp xanh dương — *Xe đạp màu xanh dương* · `assets/explore/do-vat/dvat-xe-dap-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Xe đạp xanh lá — *Xe đạp màu xanh lá* · `assets/explore/do-vat/dvat-xe-dap-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Xe đạp cam — *Xe đạp màu cam* · `assets/explore/do-vat/dvat-xe-dap-cam.jpg` _(ai-topic-color)_
  - `[tim]` Xe đạp tím — *Xe đạp màu tím* · `assets/explore/do-vat/dvat-xe-dap-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dvat-xe-dap:intro` · `explore` · `gate` · `win`

#### `dvat-tui` — 🎒 Túi

- **speakText:** Túi
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Túi. Túi có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng túi màu khác nhau nhé!
- **friend:** `ban-dvat-tui` · 🎒 Bạn Túi · tint `#f76707`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Túi màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Túi? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Túi về rồi!
- **story.theme:** `topic-do-vat`
- **gate.promptVi:** Đâu là Túi?
- **gate.choices:** Túi · Bóng *(correctIndex=0)*
- **mapImg:** `assets/explore/do-vat/dvat-tui-cam.jpg`
- **exploreItems (6):**
  - `[do]` Túi đỏ — *Túi màu đỏ* · `assets/explore/do-vat/dvat-tui-do.jpg` _(ai-topic-color)_
  - `[vang]` Túi vàng — *Túi màu vàng* · `assets/explore/do-vat/dvat-tui-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Túi xanh dương — *Túi màu xanh dương* · `assets/explore/do-vat/dvat-tui-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Túi xanh lá — *Túi màu xanh lá* · `assets/explore/do-vat/dvat-tui-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Túi cam — *Túi màu cam* · `assets/explore/do-vat/dvat-tui-cam.jpg` _(ai-topic-color)_
  - `[tim]` Túi tím — *Túi màu tím* · `assets/explore/do-vat/dvat-tui-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dvat-tui:intro` · `explore` · `gate` · `win`

#### `dvat-ghe` — 🪑 Ghế

- **speakText:** Ghế
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Ghế. Ghế có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng ghế màu khác nhau nhé!
- **friend:** `ban-dvat-ghe` · 🪑 Bạn Ghế · tint `#f76707`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Ghế màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Ghế? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Ghế về rồi!
- **story.theme:** `topic-do-vat`
- **gate.promptVi:** Đâu là Ghế?
- **gate.choices:** Ghế · Bóng *(correctIndex=0)*
- **mapImg:** `assets/explore/do-vat/dvat-ghe-cam.jpg`
- **exploreItems (6):**
  - `[do]` Ghế đỏ — *Ghế màu đỏ* · `assets/explore/do-vat/dvat-ghe-do.jpg` _(ai-topic-color)_
  - `[vang]` Ghế vàng — *Ghế màu vàng* · `assets/explore/do-vat/dvat-ghe-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Ghế xanh dương — *Ghế màu xanh dương* · `assets/explore/do-vat/dvat-ghe-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Ghế xanh lá — *Ghế màu xanh lá* · `assets/explore/do-vat/dvat-ghe-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Ghế cam — *Ghế màu cam* · `assets/explore/do-vat/dvat-ghe-cam.jpg` _(ai-topic-color)_
  - `[tim]` Ghế tím — *Ghế màu tím* · `assets/explore/do-vat/dvat-ghe-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dvat-ghe:intro` · `explore` · `gate` · `win`

#### `dvat-giuong` — 🛏️ Giường

- **speakText:** Giường
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Giường. Giường có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng giường màu khác nhau nhé!
- **friend:** `ban-dvat-giuong` · 🛏️ Bạn Giường · tint `#1c7ed6`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Giường màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Giường? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Giường về rồi!
- **story.theme:** `topic-do-vat`
- **gate.promptVi:** Đâu là Giường?
- **gate.choices:** Giường · Bóng *(correctIndex=0)*
- **mapImg:** `assets/explore/do-vat/dvat-giuong-xanh-duong.jpg`
- **exploreItems (6):**
  - `[do]` Giường đỏ — *Giường màu đỏ* · `assets/explore/do-vat/dvat-giuong-do.jpg` _(ai-topic-color)_
  - `[vang]` Giường vàng — *Giường màu vàng* · `assets/explore/do-vat/dvat-giuong-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Giường xanh dương — *Giường màu xanh dương* · `assets/explore/do-vat/dvat-giuong-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Giường xanh lá — *Giường màu xanh lá* · `assets/explore/do-vat/dvat-giuong-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Giường cam — *Giường màu cam* · `assets/explore/do-vat/dvat-giuong-cam.jpg` _(ai-topic-color)_
  - `[tim]` Giường tím — *Giường màu tím* · `assets/explore/do-vat/dvat-giuong-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dvat-giuong:intro` · `explore` · `gate` · `win`

#### `dvat-ban-chai` — 🪥 Bàn chải

- **speakText:** Bàn chải
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Bàn chải. Bàn chải có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng bàn chải màu khác nhau nhé!
- **friend:** `ban-dvat-ban-chai` · 🪥 Bạn Bàn chải · tint `#2f9e44`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Bàn chải màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Bàn chải? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Bàn chải về rồi!
- **story.theme:** `topic-do-vat`
- **gate.promptVi:** Đâu là Bàn chải?
- **gate.choices:** Bàn chải · Bóng *(correctIndex=0)*
- **mapImg:** `assets/explore/do-vat/dvat-ban-chai-xanh-la.jpg`
- **exploreItems (6):**
  - `[do]` Bàn chải đỏ — *Bàn chải màu đỏ* · `assets/explore/do-vat/dvat-ban-chai-do.jpg` _(ai-topic-color)_
  - `[vang]` Bàn chải vàng — *Bàn chải màu vàng* · `assets/explore/do-vat/dvat-ban-chai-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Bàn chải xanh dương — *Bàn chải màu xanh dương* · `assets/explore/do-vat/dvat-ban-chai-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Bàn chải xanh lá — *Bàn chải màu xanh lá* · `assets/explore/do-vat/dvat-ban-chai-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Bàn chải cam — *Bàn chải màu cam* · `assets/explore/do-vat/dvat-ban-chai-cam.jpg` _(ai-topic-color)_
  - `[tim]` Bàn chải tím — *Bàn chải màu tím* · `assets/explore/do-vat/dvat-ban-chai-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:dvat-ban-chai:intro` · `explore` · `gate` · `win`

---

## 8. Góc Cảm Xúc (`cam-xuc`) — 6 màn

| Trường | Giá trị |
|---------|---------|
| shortName | Trái Tim |
| speakName | Góc Cảm Xúc |
| emoji | 😊 |
| helper | `dom-dom` |
| color | `#f08c00` |
| order | 8 |

### Mục tiêu sư phạm

Nhận biết cảm xúc cơ bản qua mặt / hình (vui, buồn…).

### Danh sách bài (bảng nhanh)

| # | ID | Tiêu đề | Bạn | Ô explore | Gate (prompt) | Xu | Tuổi |
|---|-----|---------|-----|-----------|---------------|-----|------|
| 1 | `cx-vui` | 😊 Vui | 😊 Bạn Vui | 3 | Mặt nào đang Vui? | 5 | 2 |
| 2 | `cx-buon` | 😢 Buồn | 😢 Bạn Buồn | 3 | Mặt nào đang Buồn? | 5 | 2 |
| 3 | `cx-ngac-nhien` | 😮 Ngạc nhiên | 😮 Bạn Ngạc nhiên | 3 | Mặt nào đang Ngạc nhiên? | 5 | 2 |
| 4 | `cx-yeu-thuong` | 🤗 Yêu thương | 🤗 Bạn Yêu thương | 3 | Mặt nào đang Yêu thương? | 5 | 2 |
| 5 | `cx-gian-nhe` | 😠 Giận nhẹ | 😠 Bạn Giận nhẹ | 3 | Mặt nào đang Giận nhẹ? | 5 | 2 |
| 6 | `cx-met` | 😴 Mệt | 😴 Bạn Mệt | 3 | Mặt nào đang Mệt? | 5 | 2 |

### Chi tiết từng bài

#### `cx-vui` — 😊 Vui

- **speakText:** Bé vui
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là mặt Vui. Bé vui thì cười!
- **exploreHint:** Chạm mặt vui và nghe nhé!
- **friend:** `ban-cx-vui` · 😊 Bạn Vui · tint `#f08c00`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn mặt vui nào!
- **story.gateLine:** Mặt nào đang Vui? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Vui về rồi!
- **story.theme:** `topic-cam-xuc`
- **gate.promptVi:** Mặt nào đang Vui?
- **gate.choices:** Vui · Buồn *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/cx-vui.jpg`
- **exploreItems (3):**
  - Mặt vui — *Đây là mặt vui* · `assets/explore/ai/cx-vui.jpg` _(emotion-clear-v2)_
  - Cười — *Miệng cười vui* · `assets/explore/ai/cx-vui.jpg` _(emotion-clear-v2)_
  - Nói vui — *Bé vui* · `assets/explore/ai/shared-nghe.jpg` _(emotion-clear-v2)_
- **Audio slots (Người lớn):** `lesson:cx-vui:intro` · `explore` · `gate` · `win`

#### `cx-buon` — 😢 Buồn

- **speakText:** Bé buồn
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là mặt Buồn. Buồn có nước mắt.
- **exploreHint:** Chạm mặt buồn và nghe nhé!
- **friend:** `ban-cx-buon` · 😢 Bạn Buồn · tint `#f08c00`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn mặt buồn nào!
- **story.gateLine:** Mặt nào đang Buồn? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Buồn về rồi!
- **story.theme:** `topic-cam-xuc`
- **gate.promptVi:** Mặt nào đang Buồn?
- **gate.choices:** Buồn · Vui *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/cx-buon.jpg`
- **exploreItems (3):**
  - Mặt buồn — *Đây là mặt buồn* · `assets/explore/ai/cx-buon.jpg` _(emotion-clear-v2)_
  - Nước mắt — *Buồn có nước mắt* · `assets/explore/ai/cx-buon.jpg` _(emotion-clear-v2)_
  - Nói buồn — *Bé buồn* · `assets/explore/ai/shared-nghe.jpg` _(emotion-clear-v2)_
- **Audio slots (Người lớn):** `lesson:cx-buon:intro` · `explore` · `gate` · `win`

#### `cx-ngac-nhien` — 😮 Ngạc nhiên

- **speakText:** Ồ
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là mặt Ngạc nhiên. Miệng tròn Ồ!
- **exploreHint:** Chạm mặt ngạc nhiên và nghe nhé!
- **friend:** `ban-cx-ngac-nhien` · 😮 Bạn Ngạc nhiên · tint `#f08c00`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn mặt ngạc nhiên nào!
- **story.gateLine:** Mặt nào đang Ngạc nhiên? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Ngạc nhiên về rồi!
- **story.theme:** `topic-cam-xuc`
- **gate.promptVi:** Mặt nào đang Ngạc nhiên?
- **gate.choices:** Ngạc nhiên · Vui *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/cx-ngac-nhien.jpg`
- **exploreItems (3):**
  - Mặt ngạc nhiên — *Đây là mặt ngạc nhiên* · `assets/explore/ai/cx-ngac-nhien.jpg` _(emotion-clear-v2)_
  - Ồ! — *Ồ ngạc nhiên* · `assets/explore/ai/cx-ngac-nhien.jpg` _(emotion-clear-v2)_
  - Nói Ồ — *Ồ* · `assets/explore/ai/shared-nghe.jpg` _(emotion-clear-v2)_
- **Audio slots (Người lớn):** `lesson:cx-ngac-nhien:intro` · `explore` · `gate` · `win`

#### `cx-yeu-thuong` — 🤗 Yêu thương

- **speakText:** Yêu thương
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là mặt Yêu thương. Có trái tim ấm áp!
- **exploreHint:** Chạm mặt yêu thương và nghe nhé!
- **friend:** `ban-cx-yeu-thuong` · 🤗 Bạn Yêu thương · tint `#f08c00`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn mặt yêu thương nào!
- **story.gateLine:** Mặt nào đang Yêu thương? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Yêu thương về rồi!
- **story.theme:** `topic-cam-xuc`
- **gate.promptVi:** Mặt nào đang Yêu thương?
- **gate.choices:** Yêu thương · Buồn *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/cx-yeu-thuong.jpg`
- **exploreItems (3):**
  - Mặt yêu thương — *Đây là mặt yêu thương* · `assets/explore/ai/cx-yeu-thuong.jpg` _(emotion-clear-v2)_
  - Trái tim — *Yêu thương có trái tim* · `assets/explore/ai/cx-yeu-thuong.jpg` _(emotion-clear-v2)_
  - Nói yêu — *Yêu thương* · `assets/explore/ai/shared-nghe.jpg` _(emotion-clear-v2)_
- **Audio slots (Người lớn):** `lesson:cx-yeu-thuong:intro` · `explore` · `gate` · `win`

#### `cx-gian-nhe` — 😠 Giận nhẹ

- **speakText:** Hơi giận
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là mặt Giận nhẹ. Hơi giận, rồi hết!
- **exploreHint:** Chạm mặt giận nhẹ và nghe nhé!
- **friend:** `ban-cx-gian-nhe` · 😠 Bạn Giận nhẹ · tint `#f08c00`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn mặt giận nhẹ nào!
- **story.gateLine:** Mặt nào đang Giận nhẹ? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Giận nhẹ về rồi!
- **story.theme:** `topic-cam-xuc`
- **gate.promptVi:** Mặt nào đang Giận nhẹ?
- **gate.choices:** Giận nhẹ · Vui *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/cx-gian-nhe.jpg`
- **exploreItems (3):**
  - Mặt giận nhẹ — *Đây là mặt giận nhẹ* · `assets/explore/ai/cx-gian-nhe.jpg` _(emotion-clear-v2)_
  - Hơi giận — *Hơi giận rồi hết* · `assets/explore/ai/cx-gian-nhe.jpg` _(emotion-clear-v2)_
  - Nói giận — *Hơi giận* · `assets/explore/ai/shared-nghe.jpg` _(emotion-clear-v2)_
- **Audio slots (Người lớn):** `lesson:cx-gian-nhe:intro` · `explore` · `gate` · `win`

#### `cx-met` — 😴 Mệt

- **speakText:** Bé mệt
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là mặt Mệt. Mệt thì muốn ngủ!
- **exploreHint:** Chạm mặt mệt và nghe nhé!
- **friend:** `ban-cx-met` · 😴 Bạn Mệt · tint `#f08c00`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn mặt mệt nào!
- **story.gateLine:** Mặt nào đang Mệt? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Mệt về rồi!
- **story.theme:** `topic-cam-xuc`
- **gate.promptVi:** Mặt nào đang Mệt?
- **gate.choices:** Mệt · Vui *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/cx-met.jpg`
- **exploreItems (3):**
  - Mặt mệt — *Đây là mặt mệt* · `assets/explore/ai/cx-met.jpg` _(emotion-clear-v2)_
  - Ngáp — *Mệt thì ngáp* · `assets/explore/ai/cx-met.jpg` _(emotion-clear-v2)_
  - Nói mệt — *Bé mệt* · `assets/explore/ai/shared-nghe.jpg` _(emotion-clear-v2)_
- **Audio slots (Người lớn):** `lesson:cx-met:intro` · `explore` · `gate` · `win`

---

## 9. Bến Phương Tiện (`phuong-tien`) — 6 màn

| Trường | Giá trị |
|---------|---------|
| shortName | Bến Xe |
| speakName | Bến Phương Tiện |
| emoji | 🚌 |
| helper | `soc` |
| color | `#1971c2` |
| order | 9 |

### Mục tiêu sư phạm

Nhận biết phương tiện (xe, tàu, máy bay…).

### Danh sách bài (bảng nhanh)

| # | ID | Tiêu đề | Bạn | Ô explore | Gate (prompt) | Xu | Tuổi |
|---|-----|---------|-----|-----------|---------------|-----|------|
| 1 | `pt-xe-buyt` | 🚌 Xe buýt | 🚌 Bạn Xe buýt | 6 | Đâu là Xe buýt? | 5 | 2 |
| 2 | `pt-may-bay` | ✈️ Máy bay | ✈️ Bạn Máy bay | 6 | Đâu là Máy bay? | 5 | 2 |
| 3 | `pt-tau-lua` | 🚂 Tàu lửa | 🚂 Bạn Tàu lửa | 6 | Đâu là Tàu lửa? | 5 | 2 |
| 4 | `pt-thuyen` | ⛵ Thuyền | ⛵ Bạn Thuyền | 6 | Đâu là Thuyền? | 5 | 2 |
| 5 | `pt-xe-may` | 🛵 Xe máy | 🛵 Bạn Xe máy | 6 | Đâu là Xe máy? | 5 | 2 |
| 6 | `pt-truc-thang` | 🚁 Trực thăng | 🚁 Bạn Trực thăng | 6 | Đâu là Trực thăng? | 5 | 2 |

### Chi tiết từng bài

#### `pt-xe-buyt` — 🚌 Xe buýt

- **speakText:** Xe buýt
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Xe buýt. Xe buýt có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng xe buýt màu khác nhau nhé!
- **friend:** `ban-pt-xe-buyt` · 🚌 Bạn Xe buýt · tint `#ffd43b`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Xe buýt màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Xe buýt? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Xe buýt về rồi!
- **story.theme:** `topic-phuong-tien`
- **gate.promptVi:** Đâu là Xe buýt?
- **gate.choices:** Xe buýt · Máy bay *(correctIndex=0)*
- **mapImg:** `assets/explore/phuong-tien/pt-xe-buyt-vang.jpg`
- **exploreItems (6):**
  - `[do]` Xe buýt đỏ — *Xe buýt màu đỏ* · `assets/explore/phuong-tien/pt-xe-buyt-do.jpg` _(ai-topic-color)_
  - `[vang]` Xe buýt vàng — *Xe buýt màu vàng* · `assets/explore/phuong-tien/pt-xe-buyt-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Xe buýt xanh dương — *Xe buýt màu xanh dương* · `assets/explore/phuong-tien/pt-xe-buyt-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Xe buýt xanh lá — *Xe buýt màu xanh lá* · `assets/explore/phuong-tien/pt-xe-buyt-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Xe buýt cam — *Xe buýt màu cam* · `assets/explore/phuong-tien/pt-xe-buyt-cam.jpg` _(ai-topic-color)_
  - `[tim]` Xe buýt tím — *Xe buýt màu tím* · `assets/explore/phuong-tien/pt-xe-buyt-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:pt-xe-buyt:intro` · `explore` · `gate` · `win`

#### `pt-may-bay` — ✈️ Máy bay

- **speakText:** Máy bay
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Máy bay. Máy bay có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng máy bay màu khác nhau nhé!
- **friend:** `ban-pt-may-bay` · ✈️ Bạn Máy bay · tint `#1c7ed6`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Máy bay màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Máy bay? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Máy bay về rồi!
- **story.theme:** `topic-phuong-tien`
- **gate.promptVi:** Đâu là Máy bay?
- **gate.choices:** Máy bay · Xe buýt *(correctIndex=0)*
- **mapImg:** `assets/explore/phuong-tien/pt-may-bay-xanh-duong.jpg`
- **exploreItems (6):**
  - `[do]` Máy bay đỏ — *Máy bay màu đỏ* · `assets/explore/phuong-tien/pt-may-bay-do.jpg` _(ai-topic-color)_
  - `[vang]` Máy bay vàng — *Máy bay màu vàng* · `assets/explore/phuong-tien/pt-may-bay-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Máy bay xanh dương — *Máy bay màu xanh dương* · `assets/explore/phuong-tien/pt-may-bay-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Máy bay xanh lá — *Máy bay màu xanh lá* · `assets/explore/phuong-tien/pt-may-bay-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Máy bay cam — *Máy bay màu cam* · `assets/explore/phuong-tien/pt-may-bay-cam.jpg` _(ai-topic-color)_
  - `[tim]` Máy bay tím — *Máy bay màu tím* · `assets/explore/phuong-tien/pt-may-bay-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:pt-may-bay:intro` · `explore` · `gate` · `win`

#### `pt-tau-lua` — 🚂 Tàu lửa

- **speakText:** Tàu lửa
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Tàu lửa. Tàu lửa có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng tàu lửa màu khác nhau nhé!
- **friend:** `ban-pt-tau-lua` · 🚂 Bạn Tàu lửa · tint `#e03131`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Tàu lửa màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Tàu lửa? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Tàu lửa về rồi!
- **story.theme:** `topic-phuong-tien`
- **gate.promptVi:** Đâu là Tàu lửa?
- **gate.choices:** Tàu lửa · Xe buýt *(correctIndex=0)*
- **mapImg:** `assets/explore/phuong-tien/pt-tau-lua-do.jpg`
- **exploreItems (6):**
  - `[do]` Tàu lửa đỏ — *Tàu lửa màu đỏ* · `assets/explore/phuong-tien/pt-tau-lua-do.jpg` _(ai-topic-color)_
  - `[vang]` Tàu lửa vàng — *Tàu lửa màu vàng* · `assets/explore/phuong-tien/pt-tau-lua-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Tàu lửa xanh dương — *Tàu lửa màu xanh dương* · `assets/explore/phuong-tien/pt-tau-lua-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Tàu lửa xanh lá — *Tàu lửa màu xanh lá* · `assets/explore/phuong-tien/pt-tau-lua-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Tàu lửa cam — *Tàu lửa màu cam* · `assets/explore/phuong-tien/pt-tau-lua-cam.jpg` _(ai-topic-color)_
  - `[tim]` Tàu lửa tím — *Tàu lửa màu tím* · `assets/explore/phuong-tien/pt-tau-lua-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:pt-tau-lua:intro` · `explore` · `gate` · `win`

#### `pt-thuyen` — ⛵ Thuyền

- **speakText:** Thuyền
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Thuyền. Thuyền có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng thuyền màu khác nhau nhé!
- **friend:** `ban-pt-thuyen` · ⛵ Bạn Thuyền · tint `#1c7ed6`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Thuyền màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Thuyền? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Thuyền về rồi!
- **story.theme:** `topic-phuong-tien`
- **gate.promptVi:** Đâu là Thuyền?
- **gate.choices:** Thuyền · Xe buýt *(correctIndex=0)*
- **mapImg:** `assets/explore/phuong-tien/pt-thuyen-xanh-duong.jpg`
- **exploreItems (6):**
  - `[do]` Thuyền đỏ — *Thuyền màu đỏ* · `assets/explore/phuong-tien/pt-thuyen-do.jpg` _(ai-topic-color)_
  - `[vang]` Thuyền vàng — *Thuyền màu vàng* · `assets/explore/phuong-tien/pt-thuyen-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Thuyền xanh dương — *Thuyền màu xanh dương* · `assets/explore/phuong-tien/pt-thuyen-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Thuyền xanh lá — *Thuyền màu xanh lá* · `assets/explore/phuong-tien/pt-thuyen-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Thuyền cam — *Thuyền màu cam* · `assets/explore/phuong-tien/pt-thuyen-cam.jpg` _(ai-topic-color)_
  - `[tim]` Thuyền tím — *Thuyền màu tím* · `assets/explore/phuong-tien/pt-thuyen-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:pt-thuyen:intro` · `explore` · `gate` · `win`

#### `pt-xe-may` — 🛵 Xe máy

- **speakText:** Xe máy
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Xe máy. Xe máy có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng xe máy màu khác nhau nhé!
- **friend:** `ban-pt-xe-may` · 🛵 Bạn Xe máy · tint `#e03131`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Xe máy màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Xe máy? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Xe máy về rồi!
- **story.theme:** `topic-phuong-tien`
- **gate.promptVi:** Đâu là Xe máy?
- **gate.choices:** Xe máy · Xe buýt *(correctIndex=0)*
- **mapImg:** `assets/explore/phuong-tien/pt-xe-may-do.jpg`
- **exploreItems (6):**
  - `[do]` Xe máy đỏ — *Xe máy màu đỏ* · `assets/explore/phuong-tien/pt-xe-may-do.jpg` _(ai-topic-color)_
  - `[vang]` Xe máy vàng — *Xe máy màu vàng* · `assets/explore/phuong-tien/pt-xe-may-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Xe máy xanh dương — *Xe máy màu xanh dương* · `assets/explore/phuong-tien/pt-xe-may-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Xe máy xanh lá — *Xe máy màu xanh lá* · `assets/explore/phuong-tien/pt-xe-may-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Xe máy cam — *Xe máy màu cam* · `assets/explore/phuong-tien/pt-xe-may-cam.jpg` _(ai-topic-color)_
  - `[tim]` Xe máy tím — *Xe máy màu tím* · `assets/explore/phuong-tien/pt-xe-may-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:pt-xe-may:intro` · `explore` · `gate` · `win`

#### `pt-truc-thang` — 🚁 Trực thăng

- **speakText:** Trực thăng
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là Trực thăng. Trực thăng có nhiều màu! Bé nhìn nào!
- **exploreHint:** Chạm từng trực thăng màu khác nhau nhé!
- **friend:** `ban-pt-truc-thang` · 🚁 Bạn Trực thăng · tint `#1c7ed6`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Nhìn Trực thăng màu đỏ, vàng, xanh… nào!
- **story.gateLine:** Đâu là Trực thăng? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Trực thăng về rồi!
- **story.theme:** `topic-phuong-tien`
- **gate.promptVi:** Đâu là Trực thăng?
- **gate.choices:** Trực thăng · Xe buýt *(correctIndex=0)*
- **mapImg:** `assets/explore/phuong-tien/pt-truc-thang-xanh-duong.jpg`
- **exploreItems (6):**
  - `[do]` Trực thăng đỏ — *Trực thăng màu đỏ* · `assets/explore/phuong-tien/pt-truc-thang-do.jpg` _(ai-topic-color)_
  - `[vang]` Trực thăng vàng — *Trực thăng màu vàng* · `assets/explore/phuong-tien/pt-truc-thang-vang.jpg` _(ai-topic-color)_
  - `[xanh-duong]` Trực thăng xanh dương — *Trực thăng màu xanh dương* · `assets/explore/phuong-tien/pt-truc-thang-xanh-duong.jpg` _(ai-topic-color)_
  - `[xanh-la]` Trực thăng xanh lá — *Trực thăng màu xanh lá* · `assets/explore/phuong-tien/pt-truc-thang-xanh-la.jpg` _(ai-topic-color)_
  - `[cam]` Trực thăng cam — *Trực thăng màu cam* · `assets/explore/phuong-tien/pt-truc-thang-cam.jpg` _(ai-topic-color)_
  - `[tim]` Trực thăng tím — *Trực thăng màu tím* · `assets/explore/phuong-tien/pt-truc-thang-tim.jpg` _(ai-topic-color)_
- **Audio slots (Người lớn):** `lesson:pt-truc-thang:intro` · `explore` · `gate` · `win`

---

## 10. Sân Nhảy Múa (`nhay-mua`) — 6 màn

| Trường | Giá trị |
|---------|---------|
| shortName | Sân Nhảy |
| speakName | Sân Nhảy Múa |
| emoji | 💃 |
| helper | `dom-dom` |
| color | `#e64980` |
| order | 10 |

### Mục tiêu sư phạm

Bắt chước động tác vận động nhẹ (vỗ tay, giơ tay…).

### Danh sách bài (bảng nhanh)

| # | ID | Tiêu đề | Bạn | Ô explore | Gate (prompt) | Xu | Tuổi |
|---|-----|---------|-----|-----------|---------------|-----|------|
| 1 | `nm-vo-tay` | 👏 Vỗ tay | 👏 Bạn Vỗ tay | 3 | Đâu là vỗ tay? | 5 | 2 |
| 2 | `nm-nhun-chan` | 🦶 Nhún chân | 🦶 Bạn Nhún chân | 3 | Đâu là nhún chân? | 5 | 2 |
| 3 | `nm-xoay-tron` | 🔄 Xoay tròn | 🔄 Bạn Xoay tròn | 3 | Đâu là xoay tròn? | 5 | 2 |
| 4 | `nm-gio-tay-cao` | 🙌 Giơ tay | 🙌 Bạn Giơ tay | 3 | Đâu là giơ tay cao? | 5 | 2 |
| 5 | `nm-nhay-nhe` | 🐰 Nhảy nhẹ | 🐰 Bạn Nhảy nhẹ | 3 | Đâu là nhảy nhẹ? | 5 | 2 |
| 6 | `nm-lac-lu` | 🎵 Lắc lư | 🎵 Bạn Lắc lư | 3 | Đâu là lắc lư? | 5 | 2 |

### Chi tiết từng bài

#### `nm-vo-tay` — 👏 Vỗ tay

- **speakText:** Vỗ tay
- **teachText:** Bạn Gấu ơi, cứu mình với! Bé vỗ tay nào!
- **exploreHint:** Chạm vỗ tay và làm theo nhé!
- **friend:** `ban-nm-vo-tay` · 👏 Bạn Vỗ tay · tint `#e64980`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Chạm vỗ tay và làm theo nào!
- **story.gateLine:** Đâu là vỗ tay? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Vỗ tay về rồi!
- **story.theme:** `topic-nhay-mua`
- **gate.promptVi:** Đâu là vỗ tay?
- **gate.choices:** Vỗ tay · Nhún chân *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/nm-vo-tay.jpg`
- **exploreItems (3):**
  - Vỗ tay — *Vỗ tay nào* · `assets/explore/ai/nm-vo-tay.jpg` _(toddler-clear-v1)_
  - Hai tay — *Vỗ hai tay* · `assets/explore/ai/nm-vo-tay.jpg` _(toddler-clear-v1)_
  - Nói vỗ tay — *Vỗ tay* · `assets/explore/ai/shared-nghe.jpg` _(toddler-clear-v1)_
- **Audio slots (Người lớn):** `lesson:nm-vo-tay:intro` · `explore` · `gate` · `win`

#### `nm-nhun-chan` — 🦶 Nhún chân

- **speakText:** Nhún chân
- **teachText:** Bạn Gấu ơi, cứu mình với! Bé nhún chân nhẹ nào!
- **exploreHint:** Chạm nhún chân và làm theo nhé!
- **friend:** `ban-nm-nhun-chan` · 🦶 Bạn Nhún chân · tint `#e64980`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Chạm nhún chân và làm theo nào!
- **story.gateLine:** Đâu là nhún chân? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Nhún chân về rồi!
- **story.theme:** `topic-nhay-mua`
- **gate.promptVi:** Đâu là nhún chân?
- **gate.choices:** Nhún chân · Vỗ tay *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/nm-nhun-chan.jpg`
- **exploreItems (3):**
  - Nhún chân — *Nhún chân nào* · `assets/explore/ai/nm-nhun-chan.jpg` _(toddler-clear-v1)_
  - Chân nhún — *Chân nhún nhẹ* · `assets/explore/ai/nm-nhun-chan.jpg` _(toddler-clear-v1)_
  - Nói nhún chân — *Nhún chân* · `assets/explore/ai/shared-nghe.jpg` _(toddler-clear-v1)_
- **Audio slots (Người lớn):** `lesson:nm-nhun-chan:intro` · `explore` · `gate` · `win`

#### `nm-xoay-tron` — 🔄 Xoay tròn

- **speakText:** Xoay tròn
- **teachText:** Bạn Gấu ơi, cứu mình với! Bé xoay tròn nhẹ nào!
- **exploreHint:** Chạm xoay tròn và làm theo nhé!
- **friend:** `ban-nm-xoay-tron` · 🔄 Bạn Xoay tròn · tint `#e64980`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Chạm xoay tròn và làm theo nào!
- **story.gateLine:** Đâu là xoay tròn? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Xoay tròn về rồi!
- **story.theme:** `topic-nhay-mua`
- **gate.promptVi:** Đâu là xoay tròn?
- **gate.choices:** Xoay tròn · Vỗ tay *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/nm-xoay-tron.jpg`
- **exploreItems (3):**
  - Xoay tròn — *Xoay tròn nào* · `assets/explore/ai/nm-xoay-tron.jpg` _(toddler-clear-v1)_
  - Quay vòng — *Quay vòng vui* · `assets/explore/ai/nm-xoay-tron.jpg` _(toddler-clear-v1)_
  - Nói xoay tròn — *Xoay tròn* · `assets/explore/ai/shared-nghe.jpg` _(toddler-clear-v1)_
- **Audio slots (Người lớn):** `lesson:nm-xoay-tron:intro` · `explore` · `gate` · `win`

#### `nm-gio-tay-cao` — 🙌 Giơ tay

- **speakText:** Giơ tay cao
- **teachText:** Bạn Gấu ơi, cứu mình với! Bé giơ tay cao nào!
- **exploreHint:** Chạm giơ tay và làm theo nhé!
- **friend:** `ban-nm-gio-tay-cao` · 🙌 Bạn Giơ tay · tint `#e64980`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Chạm giơ tay và làm theo nào!
- **story.gateLine:** Đâu là giơ tay cao? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Giơ tay về rồi!
- **story.theme:** `topic-nhay-mua`
- **gate.promptVi:** Đâu là giơ tay cao?
- **gate.choices:** Giơ tay · Vỗ tay *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/nm-gio-tay-cao.jpg`
- **exploreItems (3):**
  - Giơ tay — *Giơ tay cao nào* · `assets/explore/ai/nm-gio-tay-cao.jpg` _(toddler-clear-v1)_
  - Tay cao — *Hai tay cao* · `assets/explore/ai/nm-gio-tay-cao.jpg` _(toddler-clear-v1)_
  - Nói giơ tay — *Giơ tay cao* · `assets/explore/ai/shared-nghe.jpg` _(toddler-clear-v1)_
- **Audio slots (Người lớn):** `lesson:nm-gio-tay-cao:intro` · `explore` · `gate` · `win`

#### `nm-nhay-nhe` — 🐰 Nhảy nhẹ

- **speakText:** Nhảy nhẹ
- **teachText:** Bạn Gấu ơi, cứu mình với! Bé nhảy nhẹ như thỏ nào!
- **exploreHint:** Chạm nhảy nhẹ và làm theo nhé!
- **friend:** `ban-nm-nhay-nhe` · 🐰 Bạn Nhảy nhẹ · tint `#e64980`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Chạm nhảy nhẹ và làm theo nào!
- **story.gateLine:** Đâu là nhảy nhẹ? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Nhảy nhẹ về rồi!
- **story.theme:** `topic-nhay-mua`
- **gate.promptVi:** Đâu là nhảy nhẹ?
- **gate.choices:** Nhảy nhẹ · Vỗ tay *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/nm-nhay-nhe.jpg`
- **exploreItems (3):**
  - Nhảy nhẹ — *Nhảy nhẹ nào* · `assets/explore/ai/nm-nhay-nhe.jpg` _(toddler-clear-v1)_
  - Nhảy như thỏ — *Nhảy như thỏ* · `assets/explore/ai/nm-nhay-nhe.jpg` _(toddler-clear-v1)_
  - Nói nhảy nhẹ — *Nhảy nhẹ* · `assets/explore/ai/shared-nghe.jpg` _(toddler-clear-v1)_
- **Audio slots (Người lớn):** `lesson:nm-nhay-nhe:intro` · `explore` · `gate` · `win`

#### `nm-lac-lu` — 🎵 Lắc lư

- **speakText:** Lắc lư
- **teachText:** Bạn Gấu ơi, cứu mình với! Bé lắc lư vui nào!
- **exploreHint:** Chạm lắc lư và làm theo nhé!
- **friend:** `ban-nm-lac-lu` · 🎵 Bạn Lắc lư · tint `#e64980`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Chạm lắc lư và làm theo nào!
- **story.gateLine:** Đâu là lắc lư? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Lắc lư về rồi!
- **story.theme:** `topic-nhay-mua`
- **gate.promptVi:** Đâu là lắc lư?
- **gate.choices:** Lắc lư · Vỗ tay *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/nm-lac-lu.jpg`
- **exploreItems (3):**
  - Lắc lư — *Lắc lư nào* · `assets/explore/ai/nm-lac-lu.jpg` _(toddler-clear-v1)_
  - Lắc người — *Lắc người vui* · `assets/explore/ai/nm-lac-lu.jpg` _(toddler-clear-v1)_
  - Nói lắc lư — *Lắc lư* · `assets/explore/ai/shared-nghe.jpg` _(toddler-clear-v1)_
- **Audio slots (Người lớn):** `lesson:nm-lac-lu:intro` · `explore` · `gate` · `win`

---

## 11. Góc Họa Sĩ (`hoa-si`) — 6 màn

| Trường | Giá trị |
|---------|---------|
| shortName | Họa Sĩ |
| speakName | Góc Họa Sĩ |
| emoji | 🎨 |
| helper | `be-gau` |
| color | `#ae3ec9` |
| order | 11 |

### Mục tiêu sư phạm

Hành động sáng tạo đơn giản (tô màu, vẽ tròn, bảng màu…).

### Danh sách bài (bảng nhanh)

| # | ID | Tiêu đề | Bạn | Ô explore | Gate (prompt) | Xu | Tuổi |
|---|-----|---------|-----|-----------|---------------|-----|------|
| 1 | `hs-to-do` | 🔴 Tô đỏ | 🔴 Bạn Tô đỏ | 3 | Đâu là tô màu đỏ? | 5 | 2 |
| 2 | `hs-to-vang` | 🟡 Tô vàng | 🟡 Bạn Tô vàng | 3 | Đâu là tô màu vàng? | 5 | 2 |
| 3 | `hs-ve-vong-tron` | ⭕ Vẽ tròn | ⭕ Bạn Vẽ tròn | 3 | Đâu là vẽ hình tròn? | 5 | 2 |
| 4 | `hs-go-trong` | 🥁 Gõ trống | 🥁 Bạn Gõ trống | 3 | Đâu là gõ trống? | 5 | 2 |
| 5 | `hs-nghe-sao` | 🎨 Bảng màu | 🎨 Bạn Bảng màu | 3 | Đâu là bảng màu? | 5 | 2 |
| 6 | `hs-dan-sao` | ⭐ Dán sao | ⭐ Bạn Dán sao | 3 | Đâu là dán sao? | 5 | 2 |

### Chi tiết từng bài

#### `hs-to-do` — 🔴 Tô đỏ

- **speakText:** Tô đỏ
- **teachText:** Bạn Gấu ơi, cứu mình với! Bé tô màu đỏ nào!
- **exploreHint:** Chạm tô đỏ và nghe nhé!
- **friend:** `ban-hs-to-do` · 🔴 Bạn Tô đỏ · tint `#ae3ec9`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Chạm tô đỏ và nghe nào!
- **story.gateLine:** Đâu là tô màu đỏ? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Tô đỏ về rồi!
- **story.theme:** `topic-hoa-si`
- **gate.promptVi:** Đâu là tô màu đỏ?
- **gate.choices:** Tô đỏ · Tô vàng *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/hs-to-do.jpg`
- **exploreItems (3):**
  - Tô đỏ — *Tô màu đỏ* · `assets/explore/ai/hs-to-do.jpg` _(toddler-clear-v1)_
  - Màu đỏ — *Đây là màu đỏ* · `assets/explore/ai/hs-to-do.jpg` _(toddler-clear-v1)_
  - Nói tô đỏ — *Tô đỏ* · `assets/explore/ai/shared-nghe.jpg` _(toddler-clear-v1)_
- **Audio slots (Người lớn):** `lesson:hs-to-do:intro` · `explore` · `gate` · `win`

#### `hs-to-vang` — 🟡 Tô vàng

- **speakText:** Tô vàng
- **teachText:** Bạn Gấu ơi, cứu mình với! Bé tô màu vàng nào!
- **exploreHint:** Chạm tô vàng và nghe nhé!
- **friend:** `ban-hs-to-vang` · 🟡 Bạn Tô vàng · tint `#ae3ec9`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Chạm tô vàng và nghe nào!
- **story.gateLine:** Đâu là tô màu vàng? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Tô vàng về rồi!
- **story.theme:** `topic-hoa-si`
- **gate.promptVi:** Đâu là tô màu vàng?
- **gate.choices:** Tô vàng · Tô đỏ *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/hs-to-vang.jpg`
- **exploreItems (3):**
  - Tô vàng — *Tô màu vàng* · `assets/explore/ai/hs-to-vang.jpg` _(toddler-clear-v1)_
  - Màu vàng — *Đây là màu vàng* · `assets/explore/ai/hs-to-vang.jpg` _(toddler-clear-v1)_
  - Nói tô vàng — *Tô vàng* · `assets/explore/ai/shared-nghe.jpg` _(toddler-clear-v1)_
- **Audio slots (Người lớn):** `lesson:hs-to-vang:intro` · `explore` · `gate` · `win`

#### `hs-ve-vong-tron` — ⭕ Vẽ tròn

- **speakText:** Vẽ tròn
- **teachText:** Bạn Gấu ơi, cứu mình với! Bé vẽ hình tròn nào!
- **exploreHint:** Chạm vẽ tròn và nghe nhé!
- **friend:** `ban-hs-ve-vong-tron` · ⭕ Bạn Vẽ tròn · tint `#ae3ec9`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Chạm vẽ tròn và nghe nào!
- **story.gateLine:** Đâu là vẽ hình tròn? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Vẽ tròn về rồi!
- **story.theme:** `topic-hoa-si`
- **gate.promptVi:** Đâu là vẽ hình tròn?
- **gate.choices:** Vẽ tròn · Tô đỏ *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/hs-ve-vong-tron.jpg`
- **exploreItems (3):**
  - Vẽ tròn — *Vẽ hình tròn* · `assets/explore/ai/hs-ve-vong-tron.jpg` _(toddler-clear-v1)_
  - Hình tròn — *Đây là hình tròn* · `assets/explore/ai/hs-ve-vong-tron.jpg` _(toddler-clear-v1)_
  - Nói vẽ tròn — *Vẽ tròn* · `assets/explore/ai/shared-nghe.jpg` _(toddler-clear-v1)_
- **Audio slots (Người lớn):** `lesson:hs-ve-vong-tron:intro` · `explore` · `gate` · `win`

#### `hs-go-trong` — 🥁 Gõ trống

- **speakText:** Gõ trống
- **teachText:** Bạn Gấu ơi, cứu mình với! Bé gõ trống vui nào!
- **exploreHint:** Chạm trống và nghe nhé!
- **friend:** `ban-hs-go-trong` · 🥁 Bạn Gõ trống · tint `#ae3ec9`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Chạm trống và nghe nào!
- **story.gateLine:** Đâu là gõ trống? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Gõ trống về rồi!
- **story.theme:** `topic-hoa-si`
- **gate.promptVi:** Đâu là gõ trống?
- **gate.choices:** Gõ trống · Tô đỏ *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/hs-go-trong.jpg`
- **exploreItems (3):**
  - Gõ trống — *Gõ trống nào* · `assets/explore/ai/hs-go-trong.jpg` _(toddler-clear-v1)_
  - Trống — *Đây là trống* · `assets/explore/ai/hs-go-trong.jpg` _(toddler-clear-v1)_
  - Nói gõ trống — *Gõ trống* · `assets/explore/ai/shared-nghe.jpg` _(toddler-clear-v1)_
- **Audio slots (Người lớn):** `lesson:hs-go-trong:intro` · `explore` · `gate` · `win`

#### `hs-nghe-sao` — 🎨 Bảng màu

- **speakText:** Bảng màu
- **teachText:** Bạn Gấu ơi, cứu mình với! Đây là bảng màu. Bé nhìn màu nào!
- **exploreHint:** Chạm bảng màu và nghe nhé!
- **friend:** `ban-hs-nghe-sao` · 🎨 Bạn Bảng màu · tint `#ae3ec9`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Chạm bảng màu và nghe nào!
- **story.gateLine:** Đâu là bảng màu? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Bảng màu về rồi!
- **story.theme:** `topic-hoa-si`
- **gate.promptVi:** Đâu là bảng màu?
- **gate.choices:** Bảng màu · Trống *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/hs-nghe-sao.jpg`
- **exploreItems (3):**
  - Bảng màu — *Đây là bảng màu* · `assets/explore/ai/hs-nghe-sao.jpg` _(toddler-clear-v1)_
  - Cọ vẽ — *Cọ để tô màu* · `assets/explore/ai/hs-co-ve.svg` _(geometry-svg-vis)_
  - Nói bảng màu — *Bảng màu* · `assets/explore/ai/shared-nghe.jpg` _(toddler-clear-v1)_
- **Audio slots (Người lớn):** `lesson:hs-nghe-sao:intro` · `explore` · `gate` · `win`

#### `hs-dan-sao` — ⭐ Dán sao

- **speakText:** Dán sao
- **teachText:** Bạn Gấu ơi, cứu mình với! Bé dán ngôi sao nào!
- **exploreHint:** Chạm ngôi sao và nghe nhé!
- **friend:** `ban-hs-dan-sao` · ⭐ Bạn Dán sao · tint `#ae3ec9`
- **story.intro:** Bạn Gấu ơi, cứu mình với!
- **story.exploreLine:** Chạm ngôi sao và nghe nào!
- **story.gateLine:** Đâu là dán sao? Giúp mình với!
- **story.winLine:** Cảm ơn Bạn Gấu! Bạn Dán sao về rồi!
- **story.theme:** `topic-hoa-si`
- **gate.promptVi:** Đâu là dán sao?
- **gate.choices:** Dán sao · Tô đỏ *(correctIndex=0)*
- **mapImg:** `assets/explore/ai/hs-dan-sao.jpg`
- **exploreItems (3):**
  - Dán sao — *Dán ngôi sao* · `assets/explore/ai/hs-dan-sao.jpg` _(toddler-clear-v1)_
  - Ngôi sao — *Đây là ngôi sao* · `assets/explore/ai/hs-dan-sao.jpg` _(toddler-clear-v1)_
  - Nói dán sao — *Dán sao* · `assets/explore/ai/shared-nghe.jpg` _(toddler-clear-v1)_
- **Audio slots (Người lớn):** `lesson:hs-dan-sao:intro` · `explore` · `gate` · `win`

---

## Phụ lục A — Tra cứu ID nhanh

- **mau:** `mau-do`, `mau-vang`, `mau-xanh-duong`, `mau-xanh-la`, `mau-cam`, `mau-tim`, `mau-hong`, `mau-nau`
- **hinh:** `hinh-circle`, `hinh-square`, `hinh-triangle`, `hinh-rect`, `hinh-star`, `hinh-heart`, `hinh-oval`
- **so:** `so-1`, `so-2`, `so-3`, `so-4`, `so-5`, `so-6`, `so-7`, `so-8`, `so-9`, `so-10`
- **chu:** `chu-a`, `chu-b`, `chu-c`, `chu-d`, `chu-e`, `chu-f`, `chu-g`, `chu-h`, `chu-i`, `chu-j`, `chu-k`, `chu-l`, `chu-m`, `chu-n`, `chu-o`, `chu-p`, `chu-q`, `chu-r`, `chu-s`, `chu-t`, `chu-u`, `chu-v`, `chu-w`, `chu-x`, `chu-y`, `chu-z`
- **dong-vat:** `dv-meo`, `dv-cho`, `dv-ga`, `dv-bo`, `dv-heo`, `dv-vit`, `dv-tho`, `dv-ca`, `dv-chim`, `dv-ho`, `dv-voi`, `dv-khi`
- **trai-cay:** `tc-tao`, `tc-chuoi`, `tc-cam`, `tc-xoai`, `tc-dua-hau`, `tc-nho`, `tc-dau`, `tc-dua`
- **do-vat:** `dvat-bong`, `dvat-sach`, `dvat-coc`, `dvat-thia`, `dvat-mu`, `dvat-giay`, `dvat-xe-hoi`, `dvat-xe-dap`, `dvat-tui`, `dvat-ghe`, `dvat-giuong`, `dvat-ban-chai`
- **cam-xuc:** `cx-vui`, `cx-buon`, `cx-ngac-nhien`, `cx-yeu-thuong`, `cx-gian-nhe`, `cx-met`
- **phuong-tien:** `pt-xe-buyt`, `pt-may-bay`, `pt-tau-lua`, `pt-thuyen`, `pt-xe-may`, `pt-truc-thang`
- **nhay-mua:** `nm-vo-tay`, `nm-nhun-chan`, `nm-xoay-tron`, `nm-gio-tay-cao`, `nm-nhay-nhe`, `nm-lac-lu`
- **hoa-si:** `hs-to-do`, `hs-to-vang`, `hs-ve-vong-tron`, `hs-go-trong`, `hs-nghe-sao`, `hs-dan-sao`

## Phụ lục B — Cập nhật tài liệu

```bash
node scripts/export-curriculum-md.js
```

Output: `docs/chuong-trinh-chi-tiet.md`
