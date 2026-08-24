github地址
[Feicaiclub/video-spec-builder： video-spec-builder —— 把我想做个视频逼成一份精确到秒的分镜脚本 video-spec.md，交给 HyperFrames 渲染。一条命令装到 Claude Code / Cursor / Codex：npx skills add feicaiclub/video-spec-builder](https://github.com/feicaiclub/video-spec-builder/tree/main)

介绍及原视频
[[ai剪辑，codex+hyperframes]]

可能卡点：无法使用，codex市场无法加载插件
教程：[[codex需要手机验证]]

第一，**纯本地技能型插件，大概率还能用。**

比如这类插件通常只是给 Codex 增加 workflow、skills、说明文档、脚本或本地工具能力：

```
vercel
cloudflare
netlify
hyperframes
remotion
build-web-apps
build-ios-apps
build-macos-apps
codex-security
openai-developers
superpowers
```

这些安装后，本地文件还在，切回 API key 后通常仍然能被 Codex 使用。前提是插件不依赖 ChatGPT workspace 服务，也不要求额外连接外部账号。

第二，**需要 ChatGPT 连接器/外部授权的插件，切回 API key 后可能不能完整使用。**

例如：

```
gmail
google-drive
google-calendar
slack
teams
sharepoint
outlook-email
outlook-calendar
figma
notion
github
linear
asana
```

这些插件往往涉及外部服务登录、ChatGPT app/connector、OAuth、MCP 或 workspace 权限。它们即使“插件包”还在，本地也不一定能继续访问你的 Gmail、Slack、Google Drive、Figma 等数据。官方文档也说，如果插件包含 apps 或 MCP servers，可能需要在安装时或首次使用时登录外部 app 或做额外认证；API key 登录下，一些依赖 ChatGPT workspace/cloud 的能力会受限。参考：[Codex Plugins 权限说明](https://developers.openai.com/codex/plugins)、[Codex Authentication](https://developers.openai.com/codex/llms-full.txt)。

第三，**切回 API key 后，插件市场刷新/远端同步可能又会受限。**

也就是说：

```
已安装的插件：多数会留着
插件市场继续浏览/刷新：可能又不稳定
需要 ChatGPT 授权的插件：可能不能用或需要重新登录
纯本地技能插件：大概率可继续用
```

你本机之前日志里已经出现过这个核心报错：

```
chatgpt authentication required to sync remote plugins; api key auth is not supported
```

所以 API key 模式下最容易出问题的是“市场同步”和“ChatGPT 账号/工作区相关能力”，不是本地插件文件本身。