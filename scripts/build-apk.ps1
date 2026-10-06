# Build APK Bé Gấu Tri Thức (debug)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$jdk21 = Get-ChildItem "C:\Program Files\Microsoft" -Directory -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -like "jdk-21*" } |
  Select-Object -First 1
if (-not $jdk21) {
  Write-Error "Can JDK 21 (Microsoft.OpenJDK.21). Cai: winget install Microsoft.OpenJDK.21"
}
$env:JAVA_HOME = $jdk21.FullName
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
$env:Path = "$env:JAVA_HOME\bin;$env:Path"

Write-Host "JAVA_HOME=$env:JAVA_HOME"
npm run build:web
npx cap sync android
Set-Location "$root\android"
.\gradlew.bat assembleDebug --no-daemon

$apk = Join-Path $root "android\app\build\outputs\apk\debug\app-debug.apk"
$outDir = Join-Path $root "dist-apk"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$dest = Join-Path $outDir "BeGau-TriThuc-v1.0-debug.apk"
Copy-Item $apk $dest -Force
Write-Host ""
Write-Host "APK san sang:"
Write-Host $dest
