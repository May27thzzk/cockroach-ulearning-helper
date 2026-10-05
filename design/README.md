# 界面样式维护

`sidebar.css` 是助手侧栏、悬浮日志和面板开关的样式；`selector.css` 是课件章节选择弹窗的样式。修改后运行：

```powershell
python design/embed_styles.py
```

脚本将 CSS 嵌入根目录的 `莞工小蟑螂-优学院全能助手.user.js`，它才是浏览器可直接安装的单文件用户脚本。发布前将其复制到版本文件和 `xz-ulearning-helper/` 对应文件。

生图定稿位于 `assets/mascot-v4.2.png`，嵌入面板的 `LOGO_URI`。同主题的轻量矢量版位于 `assets/mascot-v4.2.svg`，用于用户脚本的 `@icon` 元数据，避免在单文件脚本中重复嵌入大 PNG。没有 PNG 时，矢量版会成为面板图标。构建脚本只复制原图字节，不修改图片内容。

`preview_ui.py` 可以在本地合成页面生成界面截图；它不会访问或操作真实课程。

`audit_ui.py` 使用隔离浏览器检查自动刷课、题库导出和读书计时三个视图在桌面及窄屏尺寸下的视口适配、导航状态、底部操作区、输入标签和按钮名称。视觉方向和色彩令牌记录在 `reference-v4.4.md`。
