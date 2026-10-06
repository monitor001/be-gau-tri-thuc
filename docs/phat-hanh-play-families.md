# Chuẩn bị phát hành Play Store — Families / trẻ em

**Trạng thái:** 🟡 AAB release đã có lệnh build · còn URL privacy + questionnaire Play + QA 2 máy  
**Đối tượng app:** trẻ **dưới 5 tuổi** (nhóm dưới 13 → dính **Google Play Families Policy**)

---

## 1. Families Policy & đối tượng mục tiêu

| Việc | Trạng thái | Ghi chú |
|------|------------|---------|
| Khai Target audience & content trong Play Console (dưới 13) | 🔲 | Bắt buộc |
| Tuân thủ [Families Policy](https://support.google.com/googleplay/android-developer/answer/9893335) | 🔲 | App dạy trẻ |
| COPPA (nếu phân phối Mỹ) | 🔲 | Không thu thập PII trẻ |
| Data safety form: ghi âm chỉ **on-device**, không upload | 🔲 | Quyền `RECORD_AUDIO` bị soi kỹ |
| Privacy policy **URL công khai** | ✅ | `https://monitor001.github.io/be-gau-tri-thuc/privacy-policy.html` |
| Chỉ người lớn vào màn ghi âm (parent gate) | 🟡 | Đã có — đã nâng độ khó (xem app) |

### Data safety — nội dung khai đề xuất

- **Audio:** thu thập khi PH ghi âm · mục đích: thay TTS trong app · **không** chia sẻ · lưu trên thiết bị · có thể xóa trong app  
- **Không** bán dữ liệu · **Không** tài khoản trẻ · **Không** quảng cáo trong luồng chơi  
- **Xu / tiến độ:** lưu local (localStorage) · không đồng bộ mây (hiện tại)

---

## 2. Build release (Play)

| Việc | Owner gợi ý | Trạng thái |
|------|-------------|------------|
| Tạo keystore, backup offline + cloud mã hóa | Dev lead | ✅ `npm run release:setup-keystore` |
| `versionCode` / `versionName` có quy ước tăng | Dev | ✅ `1` / `1.0.0` — tăng mỗi lần nộp |
| Xuất **AAB** (không chỉ APK) | Dev | ✅ `npm run release:aab` → `dist-aab/` |
| `targetSdk` theo yêu cầu Play hiện hành | Dev | ✅ targetSdk **36** |
| Tắt WebView debugging production | Dev | ✅ `capacitor.config` |
| Minify / shrink resources release | Dev | 🟡 Tắt (Capacitor WebView); ProGuard rules sẵn sàng |
| Không thêm SDK analytics/crash **chưa** Families Self-Certified | Mọi người | ✅ hiện chỉ Capacitor + TTS community |

---

## 3. Parent gate (bắt buộc trước store)

Không còn “tuỳ chọn”. Gate phải chặn trẻ ~5–6 tuổi vào ghi âm.

**Đã nâng trong app (2026-10-06):** hỏi *“Gõ số … (chữ)”* với số 13–19, không chỉ phép cộng 1 chữ số.

Tuỳ chọn bổ sung sau: nhấn giữ 2s · phép 2 chữ số lớn hơn.

---

## 4. Privacy policy — outline tối thiểu

1. Ai vận hành app  
2. Trẻ dùng không cần tài khoản  
3. Dữ liệu lưu máy: tiến độ, xu, file ghi âm PH  
4. Micro chỉ dùng khi PH vào Cài đặt người lớn và ghi âm  
5. Không bán dữ liệu · không quảng cáo hành vi  
6. Cách xóa: xóa dữ liệu app / nút xóa ghi âm trong NL  
7. Liên hệ phụ huynh  

---

## 5. Checklist nộp store (tóm)

- [ ] Privacy policy URL sống  
- [ ] Data safety khớp thực tế code  
- [ ] Families questionnaire  
- [ ] AAB ký release (`npm run release:aab`)  
- [ ] QA thiết bị Đạt (`docs/eval/qa-thiet-bi-checklist.md`)  
- [ ] Không SDK bên thứ ba ngoài allowlist Families  
- [ ] Store listing: ảnh, mô tả tuổi, không claim y tế  

---

*Liên quan: `docs/an-toan-tre-em.md` · `docs/trang-thai-trien-khai.md` · `docs/eval/qa-thiet-bi-checklist.md`*
