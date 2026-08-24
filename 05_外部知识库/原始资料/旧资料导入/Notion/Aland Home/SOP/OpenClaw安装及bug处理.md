---
notion-id: 362f95cb-4a24-8146-8d3a-fbda73a1e02c
---
## 安装
[my.feishu.cn](https://my.feishu.cn/wiki/KN4iwZaBqi10thkI9wOc39KKnac) 安装原文
1. **安装node.js **[Node.js — 在任何地方运行 JavaScript](https://nodejs.org/zh-cn)
2. 安装git [Git](https://git-scm.com/)
3. 验证
```powershell
node -v
npm -v
git --version
```
> [!note]+ **BUG：系统禁止运行脚本 报错显示及解决办法**
> > [!note]+ 报错显示
> > ```powershell
> > PS C:\Windows\system32> npm -v
> > >> node -v
> > npm : 无法加载文件 D:\Node.js\npm.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/
> > ?LinkID=135170 中的 about_Execution_Policies。
> > 所在位置 行:1 字符: 1
> > + npm -v
> > + ~~~
> >     + CategoryInfo          : SecurityError: (:) []，PSSecurityException
> >     + FullyQualifiedErrorId : UnauthorizedAccess
> > ```
> > 
> 
> > [!note]+ 解决办法
> > ### 1. 以管理员身份运行 PowerShell
> > - 点击 Windows 开始菜单，搜索 `PowerShell`
> > - 右键点击「Windows PowerShell」，选择「以管理员身份运行」
> > 
> > ### 2. 查看当前执行策略
> > 执行以下命令，查看当前系统的脚本执行策略：
> > ```powershell
> > Get-ExecutionPolicy
> > ```
> > 通常此时会返回 `Restricted`（受限），这是默认策略，禁止运行任何脚本。
> > ### 3. 修改执行策略
> > 执行以下命令，将执行策略改为 `RemoteSigned`（允许运行本地脚本，远程脚本需签名）：
> > ```powershell
> > Set-ExecutionPolicy RemoteSigned
> > ```
> > - 执行后会弹出确认提示，输入 `Y` 并回车确认即可。
> > - 如果提示「是否更改执行策略」，同样输入 `Y` 确认。
> > 
> > ### 4. 验证修改是否生效
> > 再次执行以下命令，确认执行策略已变为 `RemoteSigned`：
> > ```powershell
> > Get-ExecutionPolicy
> > ```
> > ### 5. 测试 npm 命令
> > 关闭当前 PowerShell 窗口，重新打开（无需管理员权限），执行：
> > ```powershell
> > npm -v
> > node -v
> > ```
> > 此时应该能正常显示 npm 和 node 的版本号，不再报错。
4. **安装 Clawdbot**
```powershell
npm i -g openclaw
```
5. **配置 Clawdbot**
```powershell
openclaw onboard
```

## 22:55:38 [plugins] plugins.allow is empty; discovered non-bundled plugins may auto-load: feishu (C:\Users\89836\AppData\Roaming\npm\node_modules\openclaw\extensions\feishu\index.ts). Set plugins.allow to explicit trusted ids.
