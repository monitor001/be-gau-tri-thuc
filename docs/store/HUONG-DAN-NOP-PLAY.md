# Hướng dẫn nộp Google Play — Bé Gấu Tri Thức

## 1. Build AAB (bắt buộc cho Play)

```powershell
npm run release:setup-keystore   # một lần — sao lưu android/release/ + mật khẩu
npm run release:aab
```

File nộp: **`dist-aab/BeGau-TriThuc-v1.0.0-1-release.aab`**

Mỗi lần phát hành mới: tăng `versionCode` (bắt buộc) và `versionName` trong `android/app/build.gradle`, rồi build lại.

## 2. Play Console — từng mục checklist

**Hướng dẫn chi tiết từng bước (khớp màn hình “Hoàn tất bước thiết lập”):**  
→ **`docs/store/HUONG-DAN-CONSOLE-CHI-TIET.md`**

Tóm tắt thứ tự:

1. Host privacy → dán URL (mục 1)
2. App access: không login (mục 2)
3. Ads: Không (mục 3)
4. Content rating IARC (mục 4)
5. Target audience: trẻ dưới 5 / Families (mục 5)
6. Data safety: audio on-device (mục 6)
7. Government / Financial / Health: Không (mục 7–9)
8. Store listing + upload AAB thử nghiệm nội bộ

## 3. Quyền RECORD_AUDIO

Play sẽ hỏi chi tiết: chỉ người lớn, chỉ lưu máy, mục đích thay TTS. Khớp với `docs/phat-hanh-play-families.md`.

## 4. Checklist trước Production

- [ ] QA thiết bị Đạt: `docs/eval/qa-thiet-bi-checklist.md`
- [ ] Keystore + mật khẩu đã sao lưu an toàn
- [ ] Privacy policy URL sống
- [ ] Data safety = thực tế code
- [ ] `versionCode` tăng so với bản trước (nếu cập nhật)

## 5. Lệnh tham khảo

| Lệnh | Mục đích |
|------|----------|
| `npm run apk` | APK debug — test nội bộ |
| `npm run release:aab` | AAB ký release — Play Store |
| `npm run audit:lessons` | Audit nội dung trước ship |
