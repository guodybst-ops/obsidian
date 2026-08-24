@echo off
chcp 65001 >nul
echo ====================================
echo   小宇宙 API 服务启动器
echo ====================================
echo.

set "GOROOT=C:\Users\89836\Documents\Obsidian Vault\.go\1.22.0"
set "PATH=%GOROOT%\bin;%PATH%"

echo 正在启动 xyz 服务（端口 23020）...
echo 启动后访问 http://localhost:23020/login
echo 按 Ctrl+C 停止服务
echo.

start "" "http://localhost:23020/login"
"%~dp0xyz.exe"

echo.
echo 服务已停止。
pause
