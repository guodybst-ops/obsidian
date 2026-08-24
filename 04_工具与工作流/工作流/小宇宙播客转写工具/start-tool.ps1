$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

function Test-LocalPort([int]$port) {
  $client = [System.Net.Sockets.TcpClient]::new()
  try { $client.Connect('127.0.0.1', $port); return $true }
  catch { return $false }
  finally { $client.Dispose() }
}

function Start-HiddenProcess([string]$file, [string]$arguments, [string]$workingDirectory) {
  $info = [System.Diagnostics.ProcessStartInfo]::new()
  $info.FileName = $file
  $info.Arguments = $arguments
  $info.WorkingDirectory = $workingDirectory
  $info.UseShellExecute = $true
  $info.WindowStyle = [System.Diagnostics.ProcessWindowStyle]::Hidden
  [System.Diagnostics.Process]::Start($info) | Out-Null
}

function Find-CommandPath([string]$name) {
  $cmd = Get-Command $name -ErrorAction SilentlyContinue
  if (-not $cmd) { throw "找不到 $name，请先安装 Node.js，并确认 node 可以在命令行运行。" }
  return $cmd.Source
}

if (-not (Test-LocalPort 23020)) {
  Start-HiddenProcess (Join-Path $root 'bin\xyz.exe') '' $root
  Start-Sleep -Seconds 2
}
if (-not (Test-LocalPort 23100)) {
  Start-HiddenProcess (Find-CommandPath 'node.exe') 'server.mjs' $root
}
