# 视频托管说明

本仓库不提交完整原片视频。三条原片文件较大，直接放入 GitHub/GitHub Pages 会导致仓库过大、推送失败或页面加载体验不稳定。

## 本地原片

原片目前保留在本地目录：

- `assets/media/film-dew-original.mp4`，约 629M
- `assets/media/film-coast-original.mp4`，约 233M
- `assets/media/film-bunker-original.mp4`，约 173M

根目录 `.gitignore` 已排除：

```gitignore
assets/media/*-original.mp4
```

## 推荐托管

正式上线时，将三条原片上传到独立媒体托管：

- 国内访问优先：腾讯云 COS + CDN 或阿里云 OSS + CDN
- 海外与低维护：Cloudflare R2 + CDN
- 需要自适应码率播放：Cloudflare Stream、腾讯云点播或阿里云视频点播

## 接入方式

上传后，把三个公开可访问的 HTTPS 地址填入：

```js
// assets/video-config.js
window.ShenzhouVideoConfig = {
  dew: "https://media.example.com/shenzhou/film-dew-original.mp4",
  coast: "https://media.example.com/shenzhou/film-coast-original.mp4",
  bunker: "https://media.example.com/shenzhou/film-bunker-original.mp4",
};
```

在未填写 CDN URL 前，前台影像区会显示高清封面和“高清影片待接入”，不会加载不存在的大视频文件。

## 本地测试原片

如果只在本机预览完整原片，可复制：

```bash
cp assets/video-config.local.example.js assets/video-config.local.js
```

再临时把 `index.html` 中 `assets/video-config.js` 改为 `assets/video-config.local.js` 预览。`assets/video-config.local.js` 已被 `.gitignore` 排除，不会提交到 GitHub。
