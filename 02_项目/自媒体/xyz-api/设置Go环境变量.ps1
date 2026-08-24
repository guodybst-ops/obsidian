# 设置 Go 环境变量（仅需运行一次）
 = "C:\Users\89836\Documents\Obsidian Vault\.go\1.22.0"
  = "\bin"

if (-not (Test-Path )) {
    Write-Host "错误：Go 目录不存在 - " -ForegroundColor Red
    exit 1
}

 = [Environment]::GetEnvironmentVariable("GOROOT", "User")
if ( -ne ) {
    [Environment]::SetEnvironmentVariable("GOROOT", , "User")
    Write-Host "^ 已设置 GOROOT = " -ForegroundColor Green
} else {
    Write-Host ". GOROOT 已正确设置，跳过" -ForegroundColor Gray
}

 = [Environment]::GetEnvironmentVariable("Path", "User")
if ( -notlike "**") {
    [Environment]::SetEnvironmentVariable("Path", ";", "User")
    Write-Host "^ 已将 Go 添加到用户 PATH" -ForegroundColor Green
} else {
    Write-Host ". Go 已在 PATH 中，跳过" -ForegroundColor Gray
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Go 环境设置完成！" -ForegroundColor Cyan
Write-Host "  请关闭并重新打开终端，即可使用 go 命令" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
pause
