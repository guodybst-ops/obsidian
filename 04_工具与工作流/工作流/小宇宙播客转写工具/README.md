# 小宇宙播客转写工具

本地工具，当前阶段用于读取小宇宙订阅更新并按单集 ID 去重。

## 启动

1. 先启动 xyz（默认 `http://127.0.0.1:23020`）。
2. 在本目录运行 `npm start`。
3. 打开 `http://127.0.0.1:23100`，完成短信登录并点击“检查新单集”。

运行数据保存在 `%LOCALAPPDATA%\XiaoyuzhouPodcastTool`，其中含本机登录令牌和模型缓存，不会进入 Obsidian Vault。

本地转写默认使用中文多语言 `Xenova/whisper-tiny`，模型缓存位于 `models`。可通过环境变量 `WHISPER_MODEL` 改用更高精度模型，例如 `Xenova/whisper-base`；`whisper-small` 在当前电脑上过慢，不建议作为默认值。

自动模式每 6 小时读取一次订阅更新，只把“启用自动模式以后新发现的单集”加入串行转写队列，已有历史单集仍由用户手动选择。

`start-tool.vbs` 会在后台启动 xyz 和网页工具。配置为 Windows 登录时自动运行后，自动模式才能在重启电脑后继续工作。
