# PowerShell script to download Figma assets
# Run with: .\scripts\download-assets.ps1

$assets = @{
    # Logo
    "wfi-logo.png" = "https://www.figma.com/api/mcp/asset/ef8a3564-0951-440b-863a-54182adbe2de"
    
    # Hero Section
    "hero-main.jpg" = "https://www.figma.com/api/mcp/asset/26d47f7d-387c-4f42-b982-dfb9f3afdc54"
    "user-avatar-1.png" = "https://www.figma.com/api/mcp/asset/5f3b1c1b-5f7e-4be4-ad96-deb003c58bbc"
    "user-avatar-2.png" = "https://www.figma.com/api/mcp/asset/dd2d2e84-42d2-45fa-89bd-75772392c249"
    "stars-rating.png" = "https://www.figma.com/api/mcp/asset/7a4c9b9e-0e0c-46df-8e69-e1acbb3eb460"
    "line-decor.svg" = "https://www.figma.com/api/mcp/asset/8519b9de-54b1-4896-8e3f-5e09ab155b36"
    "arrow-right.svg" = "https://www.figma.com/api/mcp/asset/a9ddaf79-cdc9-4ee2-ae5c-c98c4bea4c5a"
    
    # Programs Section
    "program-video-thumb.jpg" = "https://www.figma.com/api/mcp/asset/6b36b35b-4495-423a-babd-8970786caf62"
    "quote-icon.svg" = "https://www.figma.com/api/mcp/asset/8df73242-25bb-4958-a81f-40c4899bb2d2"
    "line-52.svg" = "https://www.figma.com/api/mcp/asset/5041d790-13e2-49a9-b472-753dce94116b"
    "line-53.svg" = "https://www.figma.com/api/mcp/asset/b6e3005f-d3ec-4821-a3aa-0600207c71d9"
    "play-button.png" = "https://www.figma.com/api/mcp/asset/c787c767-4063-484f-b2fa-5587248e1818"
    "arrow-left.svg" = "https://www.figma.com/api/mcp/asset/652252e3-f787-40d0-a0ce-a2bd49100c76"
    "arrow-right-nav.svg" = "https://www.figma.com/api/mcp/asset/f1a3628c-6981-4afc-be48-ac90b5d8998f"
    "program-ai-generative.jpg" = "https://www.figma.com/api/mcp/asset/c9d7e307-f7e0-4c9e-a04e-0eb6c79450d9"
    "program-ui-ux.jpg" = "https://www.figma.com/api/mcp/asset/9a39f1ff-6bce-4395-bba7-11ca687db291"
    "program-digital-marketing-1.jpg" = "https://www.figma.com/api/mcp/asset/c7d20974-d086-403a-a407-558446795275"
    "program-digital-marketing-2.jpg" = "https://www.figma.com/api/mcp/asset/e3ddf837-d921-48ce-bfef-7b876403a445"
    
    # Testimonials Section
    "testimonial-avatar.png" = "https://www.figma.com/api/mcp/asset/b238d8b4-98df-4157-8aa9-b811df9b3fb1"
    "star-filled.svg" = "https://www.figma.com/api/mcp/asset/3e932eb5-757d-4adc-a756-bce810aa557e"
    "star-half.svg" = "https://www.figma.com/api/mcp/asset/09d1898c-7c8f-4917-b8f8-1611d892f102"
    "star-empty.svg" = "https://www.figma.com/api/mcp/asset/4861048a-54e6-427c-9882-e0cd3f789758"
    "quote-icon-large.svg" = "https://www.figma.com/api/mcp/asset/081dfbe2-78b4-4a98-86c1-e5bc2d99a80d"
    "ellipse-decor-1.png" = "https://www.figma.com/api/mcp/asset/3ee4d0bc-a6e0-400c-a2bc-a65b1a098e21"
    "ellipse-decor-2.png" = "https://www.figma.com/api/mcp/asset/8649fa5f-aa41-4212-b562-a276d3bc383b"
    "ellipse-decor-3.png" = "https://www.figma.com/api/mcp/asset/66ea6b48-b839-4ff1-8b14-379f3540ab29"
    "ellipse-decor-4.png" = "https://www.figma.com/api/mcp/asset/9d204736-119f-4f46-96d4-fe1f0fb51af9"
    
    # Partners Section
    "partner-logo-1.png" = "https://www.figma.com/api/mcp/asset/9631307c-1ef3-46c5-83f8-e5b848716f49"
    "partner-logo-2.png" = "https://www.figma.com/api/mcp/asset/8df73242-25bb-4958-a81f-40c4899bb2d2"
    "partner-logo-3.png" = "https://www.figma.com/api/mcp/asset/84f996ec-67c9-4dc6-bdf0-ae44f9aeffe6"
    "partner-logo-4.png" = "https://www.figma.com/api/mcp/asset/479def8e-bd0e-469e-85b5-4e5071a8e677"
    "partner-logo-5.png" = "https://www.figma.com/api/mcp/asset/56efb347-8038-496c-baf6-77281276b630"
    "partner-logo-6.png" = "https://www.figma.com/api/mcp/asset/336feb70-b5c5-4aea-b94f-3129e55182a6"
    "partner-logo-7.png" = "https://www.figma.com/api/mcp/asset/3cedc2ed-88c8-4eff-bcb4-9dfae8de3407"
    "partner-logo-8.png" = "https://www.figma.com/api/mcp/asset/9055d84d-f6ed-4acc-8b45-80e82cbb9818"
    "partner-logo-9.png" = "https://www.figma.com/api/mcp/asset/7dc69e31-69b8-4be8-a75e-756be9f366e4"
    "partner-logo-10.png" = "https://www.figma.com/api/mcp/asset/ee16e539-4883-4a61-a825-03e9d19f6d2b"
    "partner-logo-11.png" = "https://www.figma.com/api/mcp/asset/5bf090b8-aa36-4d99-8e25-e0ae047315d1"
    "partner-logo-12.png" = "https://www.figma.com/api/mcp/asset/5dea89fd-881f-4251-b41f-b6ee9767ef2c"
    
    # Blog Section
    "blog-thumb-1.jpg" = "https://www.figma.com/api/mcp/asset/39f2bcc1-eb51-42a2-bf2c-0c75e801c6d0"
    "blog-featured.jpg" = "https://www.figma.com/api/mcp/asset/68c10577-d581-4a0d-8e8b-ccb517b4bba2"
    "arrow-continue.svg" = "https://www.figma.com/api/mcp/asset/b12983ea-80f3-4684-8eb8-0ceb8d534b39"
}

# Create directories
$directories = @("public\images", "public\icons", "public\logos")
foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

Write-Host "Downloading assets..." -ForegroundColor Green

foreach ($file in $assets.Keys) {
    $url = $assets[$file]
    
    # Determine target directory
    if ($file -match "logo") {
        $targetPath = "public\logos\$file"
    } elseif ($file -match "icon|arrow|star|quote|line|\.svg") {
        $targetPath = "public\icons\$file"
    } else {
        $targetPath = "public\images\$file"
    }
    
    try {
        Write-Host "Downloading: $file" -ForegroundColor Yellow
        Invoke-WebRequest -Uri $url -OutFile $targetPath -UseBasicParsing
        Write-Host "  ✓ Saved to $targetPath" -ForegroundColor Green
    } catch {
        Write-Host "  ✗ Error downloading $file : $_" -ForegroundColor Red
    }
}

Write-Host "`nDownload complete!" -ForegroundColor Green

