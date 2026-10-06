# NPC đồng hành — hình ảnh + âm thanh đồng thời

## Nhân vật

| NPC | Vai trò | Vùng chính |
|-----|---------|------------|
| **bé Gấu** | Hướng dẫn chính, luôn có mặt | Mọi vùng |
| **Đom Đóm Lấp** | Nhận diện màu, cảm xúc, gợi ý sáng | Rừng Màu, Vườn Bạn |
| **Sóc Bản Đồ** | Đếm số, dẫn đường trên map | Suối Số, Bản đồ |

## Tương tác đồng thời

Khi NPC nói, app **cùng lúc**:

1. Hiện **avatar** NPC (animation `is-speaking`)
2. Hiện **bong bóng chữ** (`npc-bubble`)
3. Phát **TTS tiếng Việt** nhịp chậm (rate ~0.8)

Trẻ chạm avatar hoặc nút 🔊 để nghe lại / nhận tip nhận diện.

## API (`js/npc.js`)

- `NPC.enter(regionId)` — vào vùng
- `NPC.teach(regionId, text)` — hướng dẫn màn chơi
- `NPC.correct` / `retry` / `hint` — feedback
- `NPC.tip` — bài học nhận diện ngắn
- `NPC.win` — mừng sao
