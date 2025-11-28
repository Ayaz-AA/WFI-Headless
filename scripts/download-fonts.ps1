# Script to download fonts
# Note: Figma fonts may need to be exported manually or obtained from Google Fonts

Write-Host "Font Download Script" -ForegroundColor Cyan
Write-Host "===================" -ForegroundColor Cyan
Write-Host ""

# Create fonts directory
if (-not (Test-Path "public\fonts")) {
    New-Item -ItemType Directory -Path "public\fonts" -Force | Out-Null
    Write-Host "Created directory: public\fonts" -ForegroundColor Green
}

Write-Host "Font Information:" -ForegroundColor Yellow
Write-Host "  - Inter: Available via Google Fonts (already configured in layout.tsx)" -ForegroundColor White
Write-Host "  - Arimo: Available via Google Fonts (already configured in layout.tsx)" -ForegroundColor White
Write-Host "  - Bayon: Not available on Google Fonts. You may need to:" -ForegroundColor White
Write-Host "    1. Export from Figma manually" -ForegroundColor Gray
Write-Host "    2. Download from a font service (e.g., Font Squirrel, MyFonts)" -ForegroundColor Gray
Write-Host "    3. Use a similar alternative font" -ForegroundColor Gray
Write-Host ""

# Check if Bayon font files exist
$bayonFiles = Get-ChildItem -Path "public\fonts" -Filter "*bayon*" -ErrorAction SilentlyContinue
if ($bayonFiles) {
    Write-Host "Found Bayon font files:" -ForegroundColor Green
    $bayonFiles | ForEach-Object { Write-Host "  - $($_.Name)" -ForegroundColor White }
} else {
    Write-Host "Bayon font files not found in public\fonts\" -ForegroundColor Yellow
    Write-Host "The application will use system font fallback for Bayon." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Note: Inter and Arimo fonts are automatically loaded via Next.js Google Fonts integration." -ForegroundColor Cyan
Write-Host "No manual download needed for these fonts." -ForegroundColor Cyan

