/**
 * Node.js script to download all Figma assets
 * Run with: node scripts/download-assets-node.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const assets = {
  // Logo
  'wfi-logo.png': { url: 'https://www.figma.com/api/mcp/asset/9045efd1-9625-4a6c-a8ba-0dfd51c1d78f', dir: 'logos' },
  
  // Hero Section
  'hero-main.jpg': { url: 'https://www.figma.com/api/mcp/asset/b2e31d91-1f8b-4030-951f-9b1de6a1abb0', dir: 'images' },
  'user-avatar-1.png': { url: 'https://www.figma.com/api/mcp/asset/70f9df60-9dd2-4829-9278-262026bb2976', dir: 'images' },
  'user-avatar-2.png': { url: 'https://www.figma.com/api/mcp/asset/7301d261-fd87-4665-8280-7b0b14824402', dir: 'images' },
  'stars-rating.png': { url: 'https://www.figma.com/api/mcp/asset/5e8e69d1-823c-4a10-bd33-d337ae1c52d5', dir: 'icons' },
  'line-decor.svg': { url: 'https://www.figma.com/api/mcp/asset/fe92d9d6-0298-4c0e-b27c-7371c2e90c11', dir: 'icons' },
  
  // Programs Section
  'program-video-thumb.jpg': { url: 'https://www.figma.com/api/mcp/asset/a9d659a2-376c-4c97-af5e-cfb2baa5497f', dir: 'images' },
  'quote-icon.svg': { url: 'https://www.figma.com/api/mcp/asset/12982107-e5c9-4fc1-aa5c-8c24ca2f45b5', dir: 'icons' },
  'line-52.svg': { url: 'https://www.figma.com/api/mcp/asset/32a290c6-967f-4d49-ad8f-a5516eafec27', dir: 'icons' },
  'line-53.svg': { url: 'https://www.figma.com/api/mcp/asset/fa502790-cbd7-4b84-ba0f-18c0eadc283a', dir: 'icons' },
  'play-button.png': { url: 'https://www.figma.com/api/mcp/asset/3f7b77d2-cf20-45fc-b80b-92db2b9b567a', dir: 'images' },
  'program-ai-generative.jpg': { url: 'https://www.figma.com/api/mcp/asset/9378f043-265d-45c0-9f5e-a9c3eca1f896', dir: 'images' },
  'program-ui-ux.jpg': { url: 'https://www.figma.com/api/mcp/asset/7328b85f-25c0-43b0-8e3f-b3c5da3de392', dir: 'images' },
  'program-digital-marketing-1.jpg': { url: 'https://www.figma.com/api/mcp/asset/bf8aac46-af9b-4975-bae3-2ae87463818d', dir: 'images' },
  'program-digital-marketing-2.jpg': { url: 'https://www.figma.com/api/mcp/asset/0825093a-615e-4d4f-938f-07a254bf246c', dir: 'images' },
  
  // Testimonials Section
  'testimonial-avatar.png': { url: 'https://www.figma.com/api/mcp/asset/1028ccf0-54c0-4abb-bd60-faa63d87a7a6', dir: 'images' },
  'star-filled.svg': { url: 'https://www.figma.com/api/mcp/asset/1547d1e8-d8f9-428f-bf12-2b7384a7abe1', dir: 'icons' },
  'star-half.svg': { url: 'https://www.figma.com/api/mcp/asset/07a8d571-28df-4773-82a5-d242037ab9de', dir: 'icons' },
  'star-empty.svg': { url: 'https://www.figma.com/api/mcp/asset/154e695b-b38a-4128-bbad-0c83194e765a', dir: 'icons' },
  'quote-icon-large.svg': { url: 'https://www.figma.com/api/mcp/asset/57101354-84cd-4c03-8abd-09196f462f3c', dir: 'icons' },
  'ellipse-decor-1.png': { url: 'https://www.figma.com/api/mcp/asset/3f2e5668-0666-4b09-a20f-394a86ecc309', dir: 'images' },
  'ellipse-decor-2.png': { url: 'https://www.figma.com/api/mcp/asset/b38f4aca-c61d-406e-be50-93c401605d47', dir: 'images' },
  'ellipse-decor-3.png': { url: 'https://www.figma.com/api/mcp/asset/2d3822f7-b764-40ef-9301-43e4b72bfc7f', dir: 'images' },
  'ellipse-decor-4.png': { url: 'https://www.figma.com/api/mcp/asset/0b5bfa5c-81a8-46a9-9ab4-c23353e10fd4', dir: 'images' },
  
  // Partners Section
  'partner-logo-1.png': { url: 'https://www.figma.com/api/mcp/asset/60296052-1d90-439c-855a-002250fec4f8', dir: 'logos' },
  'partner-logo-2.png': { url: 'https://www.figma.com/api/mcp/asset/9599c987-809f-423a-898e-6e9feef0a3b8', dir: 'logos' },
  'partner-logo-3.png': { url: 'https://www.figma.com/api/mcp/asset/ebb86d51-7de9-476f-b53d-0dcba4815a61', dir: 'logos' },
  'partner-logo-4.png': { url: 'https://www.figma.com/api/mcp/asset/6ba81933-2e97-4c1f-a4e8-4270cc9c3c67', dir: 'logos' },
  'partner-logo-5.png': { url: 'https://www.figma.com/api/mcp/asset/f241ae02-0231-4d7d-a9ff-9126f99523a7', dir: 'logos' },
  'partner-logo-6.png': { url: 'https://www.figma.com/api/mcp/asset/75d733b5-32e9-4499-9cfa-92c9728ffb5b', dir: 'logos' },
  
  // Blog Section
  'blog-thumb-1.jpg': { url: 'https://www.figma.com/api/mcp/asset/5fcc6419-cfa4-4c36-9fd5-6e4e9b6664ba', dir: 'images' },
  'blog-featured.jpg': { url: 'https://www.figma.com/api/mcp/asset/3fc15f15-7d97-4404-9d08-cecacc7c5848', dir: 'images' },
};

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, filepath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadAll() {
  const publicDir = path.join(__dirname, '..', 'public');
  const dirs = ['images', 'icons', 'logos', 'fonts'];
  
  // Create directories
  dirs.forEach(dir => {
    const dirPath = path.join(publicDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created: public/${dir}/`);
    }
  });
  
  console.log('\n========================================');
  console.log('Downloading Figma Assets');
  console.log('========================================\n');
  
  let success = 0;
  let failed = 0;
  const total = Object.keys(assets).length;
  
  for (const [filename, { url, dir }] of Object.entries(assets)) {
    const filepath = path.join(publicDir, dir, filename);
    const progress = Math.round(((success + failed + 1) / total) * 100);
    
    try {
      process.stdout.write(`[${progress}%] Downloading ${filename}... `);
      await downloadFile(url, filepath);
      const stats = fs.statSync(filepath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`✓ (${sizeKB} KB)`);
      success++;
    } catch (error) {
      console.log(`✗ Error: ${error.message}`);
      failed++;
    }
  }
  
  console.log('\n========================================');
  console.log('Download Summary');
  console.log('========================================');
  console.log(`Total:   ${total}`);
  console.log(`Success: ${success}`);
  console.log(`Failed:  ${failed}`);
  console.log('\nFont Information:');
  console.log('  ✓ Inter: Loaded via Google Fonts (Next.js)');
  console.log('  ✓ Arimo: Loaded via Google Fonts (Next.js)');
  console.log('  ⚠ Bayon: Not on Google Fonts. Use system fallback or add local font files.');
  console.log('');
}

downloadAll().catch(console.error);

