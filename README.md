# Bé Gấu Giải Cứu Tri Thức

App học chơi cho trẻ dưới 5 tuổi. Bé Gấu tìm các ngôi sao tri thức qua 5 vùng mini-game nhẹ — không bạo lực, không countdown, luôn có thể thử lại.

**Privacy policy (Google Play):**  
https://monitor001.github.io/be-gau-tri-thuc/privacy-policy.html

**Play Console (từng bước):** `docs/store/HUONG-DAN-CONSOLE-CHI-TIET.md`

## Cài trên điện thoại (APK)

File APK đã build:

`dist-apk/BeGau-TriThuc-v1.0-debug.apk`

1. Copy file `.apk` sang điện thoại Android.
2. Mở file → cho phép **Cài từ nguồn không xác định** (nếu máy hỏi).
3. Cài app **Bé Gấu Tri Thức** (`com.begau.trithuc`).

> APK debug dùng để thử nội bộ.

Build lại APK:

```bash
npm run apk
```

## Google Play (AAB release)

```powershell
npm run release:setup-keystore   # một lần — sao lưu keystore + mật khẩu
npm run release:aab              # → dist-aab/*.aab
```

Chi tiết nộp store: `docs/store/HUONG-DAN-NOP-PLAY.md` · Families: `docs/phat-hanh-play-families.md`

(Cần JDK 21 + Android SDK. JDK 21: `winget install Microsoft.OpenJDK.21`)

## Chạy trên trình duyệt

Mở `index.html` bằng Chrome/Edge, hoặc:

```bash
npx --yes serve .
```

## Tổ hợp subagent giáo dục

Xem `AGENTS.md` và rule `.cursor/rules/be-gau-edu-team.mdc`.

| Mã | Vai trò |
|----|---------|
| PEDA | Sư phạm mầm non |
| STORY | Cốt truyện & thoại |
| GAME | Mini-game nhẹ |
| UX | Giao diện trẻ nhỏ |
| CURR | Chương trình học |
| SAFE | An toàn trẻ em |

Trong Cursor, gọi ví dụ: *“Với tư cách PEDA + GAME, thiết kế level mới cho Rừng Màu…”*

## Cấu trúc

- `index.html` + `css/` + `js/` — prototype chơi được
- `content/` — dữ liệu curriculum, levels, thoại, copy UI
- `docs/` — đặc tả sư phạm, story, game design, UX, an toàn
