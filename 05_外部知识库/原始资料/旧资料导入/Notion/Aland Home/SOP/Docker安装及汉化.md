---
notion-id: 362f95cb-4a24-8131-b047-d843a3313252
---
1. [Docker: Accelerated Container Application Development](https://www.docker.com/)
![[8a07c380e8d8656c56ce66aafd6218c0.png]]
2. 不要勾选“Allow Windows Containers to be used with this installation”
![[image 16.png]]
![[dc873928f7da2608c31a3e27fc0c192d.png]]
3.  https://github.com/asxez/DockerDesktop-CN/releases  汉化包地址，需要梯
4. 下载汉化包
![[image 17.png]]
5. 关闭Docker Desktop
6. 在Docker安装目录找到app.asar文件并将其备份，防止出现意外
    - Windows下默认为`C:\Program Files\Docker\Docker\frontend\resources`
    - Macos下默认为`/Applications/Docker.app/Contents/MacOS/Docker Desktop.app/Contents/Resources`
    - Ubuntu/Debian下默认为`/opt/docker-desktop/resources`
7. 将从仓库下载的asar文件改名为app.asar后替换原文件
![[7a5d24fc81f7d6650c203852db929064.png]]
![[1cbf43960e647c2912824472f7330d6d.png]]
![[8f421522302a1e02c90a2c08eb173de4.png]]
8. 完成，重新打开docker即为中文版
9. 验证测试
```javascript
# 查看Docker版本，确认安装成功
docker --version

# 运行一个测试容器，如果能成功输出欢迎信息，就一切就绪了
docker run hello-world
```


# Docker无法启动问题
[chat.deepseek.com](https://chat.deepseek.com/share/5ugmilvqq053axwzcg)