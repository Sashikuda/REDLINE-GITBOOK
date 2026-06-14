const fs = require('fs');
const https = require('https');
const path = require('path');
const { JSDOM } = require('jsdom');
const TurndownService = require('turndown');

const urls = [
    { url: '/instructions/welcome/introduction', file: 'README.md' },
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

const turndownService = new TurndownService({ headingStyle: 'atx' });

function fetchPage(route) {
    return new Promise((resolve, reject) => {
        https.get(baseUrl + route, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function run() {
    for (let item of urls) {
        console.log('Fetching', item.url);
        try {
            const html = await fetchPage(item.url);
            const dom = new JSDOM(html);
            const doc = dom.window.document;
            
            // GitBook places the main content within a <main> tag
            let mainNode = doc.querySelector('main');
            
            if (!mainNode) {
                 console.log("Could not find <main> on", item.url, "falling back to full body.");
                 mainNode = doc.body;
            }
            
            // Convert the HTML to Markdown using Turndown
            let md = turndownService.turndown(mainNode.innerHTML);
            
            // Clean up Markdown (GitBook inserts a lot of noise with Copy buttons, etc)
            md = md.replace(/CopyOn this page[\s\S]*?(?=#)/g, ''); // Remove "On this page" sidebar text
            md = md.replace(/\[!\[\][^\]]*\]/g, ''); // Remove empty image links that Gitbook uses for anchoring
            
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
