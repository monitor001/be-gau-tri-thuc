# Create upload keystore for Google Play (once). Losing it blocks future updates.
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$android = Join-Path $root "android"
$releaseDir = Join-Path $android "release"
$ksPath = Join-Path $releaseDir "be-gau-upload.jks"
$propsPath = Join-Path $android "keystore.properties"
$secretPath = Join-Path $releaseDir "PLAY-SIGNING-SECRET.txt"

$jdk21 = Get-ChildItem "C:\Program Files\Microsoft" -Directory -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -like "jdk-21*" } |
  Select-Object -First 1
if (-not $jdk21) {
  Write-Error "Need JDK 21. Install: winget install Microsoft.OpenJDK.21"
}
$keytool = Join-Path $jdk21.FullName "bin\keytool.exe"

New-Item -ItemType Directory -Force -Path $releaseDir | Out-Null

if (Test-Path $ksPath) {
  Write-Host "Keystore exists: $ksPath"
  if (-not (Test-Path $propsPath)) {
    Write-Error "Missing android/keystore.properties - see keystore.properties.example"
  }
  exit 0
}

$storePass = $env:BEGAU_KEYSTORE_PASS
$keyPass = $env:BEGAU_KEY_PASS
if (-not $storePass) {
  $bytes = New-Object byte[] 24
  [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
  $storePass = [Convert]::ToBase64String($bytes) -replace '[+/=]', 'x'
}
if (-not $keyPass) { $keyPass = $storePass }

$dname = "CN=Be Gau Tri Thuc, OU=Mobile, O=BeGau, L=Ho Chi Minh, C=VN"
Write-Host "Creating keystore (alias=upload, validity=10000 days)..."

& $keytool -genkeypair -v `
  -keystore $ksPath `
  -alias upload `
  -keyalg RSA `
  -keysize 2048 `
  -validity 10000 `
  -storepass $storePass `
  -keypass $keyPass `
  -dname $dname

$propsText = @"
storeFile=release/be-gau-upload.jks
storePassword=$storePass
keyAlias=upload
keyPassword=$keyPass
"@
[System.IO.File]::WriteAllText($propsPath, $propsText.Trim() + [Environment]::NewLine)

$backup = @"
BE GAU PLAY SIGNING - BACKUP THIS FILE
Created: $(Get-Date -Format "yyyy-MM-dd HH:mm")
Keystore: android/release/be-gau-upload.jks
Alias: upload
Store password: $storePass
Key password: $keyPass

Save keystore + passwords offline. Without them you cannot update the app on Play.
Delete this file after storing passwords safely.
"@
$backup | Set-Content -Path $secretPath -Encoding UTF8

Write-Host ""
Write-Host "Keystore: $ksPath"
Write-Host "Passwords saved: $secretPath"
Write-Host "Created android/keystore.properties"
