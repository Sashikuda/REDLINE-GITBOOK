const fs = require('fs');
const https = require('https');
const path = require('path');

const urls = [
    { url: '/instructions', file: 'README.md' },
    { url: '/instructions/r6s/ban-information-hwid-bans', file: 'r6s/ban-information-hwid-bans.md' },
    { url: '/instructions/r6s/lethal-lite-and-full-r6s', file: 'r6s/lethal-lite-and-full-r6s.md' },
    { url: '/instructions/r6s/zeroday-r6s', file: 'r6s/zeroday-r6s.md' },
    { url: '/instructions/r6s/cursader-r6s', file: 'r6s/cursader-r6s.md' },
    { url: '/instructions/r6s/calamari-r6s', file: 'r6s/calamari-r6s.md' },
    { url: '/instructions/r6s/ring-1-basic-and-full-r6s', file: 'r6s/ring-1-basic-and-full-r6s.md' },
    { url: '/instructions/r6s/aptitude-recoil-r6s', file: 'r6s/aptitude-recoil-r6s.md' },
    { url: '/instructions/fivem/susano-fivem', file: 'fivem/susano-fivem.md' },
    { url: '/instructions/products/disconnect-fn', file: 'products/disconnect-fn.md' },
    { url: '/instructions/products/disconnect-rust', file: 'products/disconnect-rust.md' },
    { url: '/instructions/troubleshooting/checking-winver-versions', file: 'troubleshooting/checking-winver-versions.md' },
    { url: '/instructions/troubleshooting/vpn-bypassing', file: 'troubleshooting/vpn-bypassing.md' },
    { url: '/instructions/troubleshooting/sharing-qbs', file: 'troubleshooting/sharing-qbs.md' },
    { url: '/instructions/troubleshooting/downgrading-windows-versions-24h2', file: 'troubleshooting/downgrading-windows-versions-24h2.md' },
    { url: '/instructions/troubleshooting/visual-c++-runtimes', file: 'troubleshooting/visual-c++-runtimes.md' },
    { url: '/instructions/troubleshooting/disable-anti-virus-dcontrol', file: 'troubleshooting/disable-anti-virus-dcontrol.md' },
    { url: '/instructions/troubleshooting/disable-remove-anti-cheat', file: 'troubleshooting/disable-remove-anti-cheat.md' },
    { url: '/instructions/troubleshooting/virtualization-and-hyper-v', file: 'troubleshooting/virtualization-and-hyper-v.md' },
    { url: '/instructions/troubleshooting/corrupted-files', file: 'troubleshooting/corrupted-files.md' },
    { url: '/instructions/troubleshooting/sync-date-and-time', file: 'troubleshooting/sync-date-and-time.md' },
    { url: '/instructions/troubleshooting/disable-core-isolation', file: 'troubleshooting/disable-core-isolation.md' },
    { url: '/instructions/troubleshooting/disable-overlays', file: 'troubleshooting/disable-overlays.md' },
    { url: '/instructions/troubleshooting/disable-secure-boot', file: 'troubleshooting/disable-secure-boot.md' },
    { url: '/instructions/troubleshooting/disable-control-flow-guard-cfg', file: 'troubleshooting/disable-control-flow-guard-cfg.md' }
];

const baseUrl = 'https://closetware.gitbook.io';

function fetchPage(route) {
    return new Promise((resolve, reject) => {
        https.get(baseUrl + route, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function htmlToMarkdown(html) {
    // Very basic extraction for title and text to avoid complex AST
    let mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
    let mainContent = mainMatch ? mainMatch[1] : '';
    
    // Extract headers
    mainContent = mainContent.replace(/<h1[^>]*>(.*?)<\/h1>/g, '# $1\n\n');
    mainContent = mainContent.replace(/<h2[^>]*>(.*?)<\/h2>/g, '## $1\n\n');
    mainContent = mainContent.replace(/<h3[^>]*>(.*?)<\/h3>/g, '### $1\n\n');
    
    // Extract paragraphs
    mainContent = mainContent.replace(/<p[^>]*>(.*?)<\/p>/g, '$1\n\n');
    
    // Extract links
    mainContent = mainContent.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)');
    
    // Extract images
    mainContent = mainContent.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/g, '![$2]($1)');
    
    // Remove remaining HTML tags
    mainContent = mainContent.replace(/<[^>]+>/g, '');
    
    // Decode entities
    mainContent = mainContent.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
    
    return mainContent.trim();
}

async function run() {
    for (let item of urls) {
        console.log('Fetching', item.url);
        try {
            const html = await fetchPage(item.url);
            let md = htmlToMarkdown(html);
            if (!md) {
                // If main extraction fails, just put a generic title based on URL
                md = '# ' + item.file.split('/').pop().replace('.md', '').replace(/-/g, ' ');
            }
            
            const filePath = path.join(__dirname, item.file);
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(filePath, md, 'utf8');
            console.log('Saved to', item.file);
        } catch (e) {
            console.error('Failed', item.url, e);
        }
    }
}

run();
