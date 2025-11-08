# Clear Next.js Server Cache
# This script removes all Next.js build and cache directories

Write-Host "Clearing Next.js caches..." -ForegroundColor Yellow

# Clear .next directory (build cache)
if (Test-Path .next) {
    Remove-Item -Recurse -Force .next
    Write-Host "✓ Cleared .next cache" -ForegroundColor Green
} else {
    Write-Host "  .next folder not found" -ForegroundColor Gray
}

# Clear .turbo directory (Turbopack cache)
if (Test-Path .turbo) {
    Remove-Item -Recurse -Force .turbo
    Write-Host "✓ Cleared .turbo cache" -ForegroundColor Green
} else {
    Write-Host "  .turbo folder not found" -ForegroundColor Gray
}

# Clear node_modules cache
if (Test-Path node_modules\.cache) {
    Remove-Item -Recurse -Force node_modules\.cache
    Write-Host "✓ Cleared node_modules cache" -ForegroundColor Green
} else {
    Write-Host "  node_modules cache not found" -ForegroundColor Gray
}

Write-Host "`nCache clearing complete!" -ForegroundColor Green
Write-Host "You can now run: npm run build" -ForegroundColor Cyan

