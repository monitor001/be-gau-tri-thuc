# Build Android App Bundle (AAB) signed release for Google Play
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$ksProps = Join-Path $root "android\keystore.properties"
if (-not (Test-Path $ksProps)) {
  Write-Host "No keystore.properties - running setup..."
  & (Join-Path $PSScriptRoot "setup-release-keystore.ps1")
}

$jdk21 = Get-ChildItem "C:\Program Files\Microsoft" -Directory -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -like "jdk-21*" } |
  Select-Object -First 1
if (-not $jdk21) {
  Write-Error "Need JDK 21. Install: winget install Microsoft.OpenJDK.21"
}
$env:JAVA_HOME = $jdk21.FullName
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
$env:Path = "$($env:JAVA_HOME)\bin;" + $env:Path

Write-Host "JAVA_HOME=$($env:JAVA_HOME)"
npm run build:web
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
npx cap sync android
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Set-Location (Join-Path $root "android")
.\gradlew.bat bundleRelease --no-daemon
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$aab = Join-Path $root "android\app\build\outputs\bundle\release\app-release.aab"
if (-not (Test-Path $aab)) {
  Write-Error "AAB not found at $aab"
}

$versionName = "1.0.0"
$versionCode = 1
$gradlePath = Join-Path $root "android\app\build.gradle"
$gradleLines = Get-Content $gradlePath
foreach ($line in $gradleLines) {
  if ($line -match 'versionName\s+"([^"]+)"') { $versionName = $Matches[1] }
  if ($line -match 'versionCode\s+(\d+)') { $versionCode = [int]$Matches[1] }
}

$outDir = Join-Path $root "dist-aab"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$dest = Join-Path $outDir "BeGau-TriThuc-v${versionName}-${versionCode}-release.aab"
Copy-Item $aab $dest -Force

$mapping = Join-Path $root "android\app\build\outputs\mapping\release\mapping.txt"
if (Test-Path $mapping) {
  Copy-Item $mapping (Join-Path $outDir "mapping-v${versionName}.txt") -Force
}

Write-Host ""
Write-Host "AAB ready for Play Console:"
Write-Host $dest
Write-Host ""
Write-Host "Play Console -> Release -> Upload this AAB"
