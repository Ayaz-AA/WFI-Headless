# PowerShell script to download all Figma assets
# This script downloads images from Figma API URLs

$ErrorActionPreference = "Continue"

# Asset mapping with new URLs from Figma
$assets = @{
    # Logo
    "wfi-logo.png" = "https://www.figma.com/api/mcp/asset/9045efd1-9625-4a6c-a8ba-0dfd51c1d78f"
    
    # Hero Section
    "hero-main.jpg" = "https://www.figma.com/api/mcp/asset/b2e31d91-1f8b-4030-951f-9b1de6a1abb0"
    "user-avatar-1.png" = "https://www.figma.com/api/mcp/asset/70f9df60-9dd2-4829-9278-262026bb2976"
    "user-avatar-2.png" = "https://www.figma.com/api/mcp/asset/7301d261-fd87-4665-8280-7b0b14824402"
    "stars-rating.png" = "https://www.figma.com/api/mcp/asset/5e8e69d1-823c-4a10-bd33-d337ae1c52d5"
    "line-decor.svg" = "https://www.figma.com/api/mcp/asset/fe92d9d6-0298-4c0e-b27c-7371c2e90c11"
    
    # Programs Section
    "program-video-thumb.jpg" = "https://www.figma.com/api/mcp/asset/a9d659a2-376c-4c97-af5e-cfb2baa5497f"
    "quote-icon.svg" = "https://www.figma.com/api/mcp/asset/12982107-e5c9-4fc1-aa5c-8c24ca2f45b5"
    "line-52.svg" = "https://www.figma.com/api/mcp/asset/32a290c6-967f-4d49-ad8f-a5516eafec27"
    "line-53.svg" = "https://www.figma.com/api/mcp/asset/fa502790-cbd7-4b84-ba0f-18c0eadc283a"
    "play-button.png" = "https://www.figma.com/api/mcp/asset/3f7b77d2-cf20-45fc-b80b-92db2b9b567a"
    "program-ai-generative.jpg" = "https://www.figma.com/api/mcp/asset/9378f043-265d-45c0-9f5e-a9c3eca1f896"
    "program-ui-ux.jpg" = "https://www.figma.com/api/mcp/asset/7328b85f-25c0-43b0-8e3f-b3c5da3de392"
    "program-digital-marketing-1.jpg" = "https://www.figma.com/api/mcp/asset/bf8aac46-af9b-4975-bae3-2ae87463818d"
    "program-digital-marketing-2.jpg" = "https://www.figma.com/api/mcp/asset/0825093a-615e-4d4f-938f-07a254bf246c"
    
    # Testimonials Section
    "testimonial-avatar.png" = "https://www.figma.com/api/mcp/asset/1028ccf0-54c0-4abb-bd60-faa63d87a7a6"
    "star-filled.svg" = "https://www.figma.com/api/mcp/asset/1547d1e8-d8f9-428f-bf12-2b7384a7abe1"
    "star-half.svg" = "https://www.figma.com/api/mcp/asset/07a8d571-28df-4773-82a5-d242037ab9de"
    "star-empty.svg" = "https://www.figma.com/api/mcp/asset/154e695b-b38a-4128-bbad-0c83194e765a"
    "quote-icon-large.svg" = "https://www.figma.com/api/mcp/asset/57101354-84cd-4c03-8abd-09196f462f3c"
    "ellipse-decor-1.png" = "https://www.figma.com/api/mcp/asset/3f2e5668-0666-4b09-a20f-394a86ecc309"
    "ellipse-decor-2.png" = "https://www.figma.com/api/mcp/asset/b38f4aca-c61d-406e-be50-93c401605d47"
    "ellipse-decor-3.png" = "https://www.figma.com/api/mcp/asset/2d3822f7-b764-40ef-9301-43e4b72bfc7f"
    "ellipse-decor-4.png" = "https://www.figma.com/api/mcp/asset/0b5bfa5c-81a8-46a9-9ab4-c23353e10fd4"
    
    # Partners Section
    "partner-logo-1.png" = "https://www.figma.com/api/mcp/asset/60296052-1d90-439c-855a-002250fec4f8"
    "partner-logo-2.png" = "https://www.figma.com/api/mcp/asset/9599c987-809f-423a-898e-6e9feef0a3b8"
    "partner-logo-3.png" = "https://www.figma.com/api/mcp/asset/ebb86d51-7de9-476f-b53d-0dcba4815a61"
    "partner-logo-4.png" = "https://www.figma.com/api/mcp/asset/6ba81933-2e97-4c1f-a4e8-4270cc9c3c67"
    "partner-logo-5.png" = "https://www.figma.com/api/mcp/asset/f241ae02-0231-4d7d-a9ff-9126f99523a7"
    "partner-logo-6.png" = "https://www.figma.com/api/mcp/asset/75d733b5-32e9-4499-9cfa-92c9728ffb5b"
    "partner-logo-7.png" = "https://www.figma.com/api/mcp/asset/5678bee8-d216-4ef0-9e28-ca503aab06cd"
    "partner-logo-8.png" = "https://www.figma.com/api/mcp/asset/629925a6-bf4f-41ae-8879-9150eb63dcef"
    "partner-logo-9.png" = "https://www.figma.com/api/mcp/asset/57c3a57e-3eb9-4fdf-870a-d8d81f9e13b6"
    "partner-logo-10.png" = "https://www.figma.com/api/mcp/asset/0db2aa05-f93c-4483-a378-586251e225c3"
    "partner-logo-11.png" = "https://www.figma.com/api/mcp/asset/b7b5a65b-172b-46b8-a147-2308263b5874"
    "partner-logo-12.png" = "https://www.figma.com/api/mcp/asset/db315193-2305-4645-bfb9-eefb2e1d13bb"
    
    # Blog Section
    "blog-thumb-1.jpg" = "https://www.figma.com/api/mcp/asset/5fcc6419-cfa4-4c36-9fd5-6e4e9b6664ba"
    "blog-featured.jpg" = "https://www.figma.com/api/mcp/asset/3fc15f15-7d97-4404-9d08-cecacc7c5848"
    
    # Other images
    "rectangle-63.jpg" = "https://www.figma.com/api/mcp/asset/92040885-8b26-4574-bbe6-972a4cce8252"
    "futuristic-hand.jpg" = "https://www.figma.com/api/mcp/asset/9bcfda92-84f5-4f70-b63f-c4f99c486e2a"
}

# Create directories
$directories = @("public\images", "public\icons", "public\logos")
foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created directory: $dir" -ForegroundColor Green
    }
}

Write-Host "`nStarting asset downloads from Figma...`n" -ForegroundColor Cyan
$successCount = 0
$failCount = 0

foreach ($file in $assets.Keys) {
    $url = $assets[$file]
    
    # Determine target directory
    if ($file -match "logo|partner") {
        $targetPath = "public\logos\$file"
    } elseif ($file -match "icon|arrow|star|quote|line|\.svg") {
        $targetPath = "public\icons\$file"
    } else {
        $targetPath = "public\images\$file"
    }
    
    try {
        Write-Host "Downloading: $file" -ForegroundColor Yellow -NoNewline
        $response = Invoke-WebRequest -Uri $url -OutFile $targetPath -UseBasicParsing -ErrorAction Stop
        
        if (Test-Path $targetPath) {
            $fileSize = (Get-Item $targetPath).Length
            Write-Host " ✓ ($([math]::Round($fileSize/1KB, 2)) KB)" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host " ✗ Failed" -ForegroundColor Red
            $failCount++
        }
    } catch {
        Write-Host " ✗ Error: $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
}

Write-Host "`n" -NoNewline
Write-Host "Download Summary:" -ForegroundColor Cyan
Write-Host "  Success: $successCount" -ForegroundColor Green
Write-Host "  Failed: $failCount" -ForegroundColor $(if ($failCount -gt 0) { "Red" } else { "Green" })
Write-Host "`nAssets download complete!`n" -ForegroundColor Green

