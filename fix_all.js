const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const directories = ['r6s', 'fivem', 'products', 'troubleshooting', '.'];
function fixMarkdownFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && file !== 'node_modules' && file !== '.git') {
            // ignore
        } else if (file.endsWith('.md') && file !== 'SUMMARY.md') {
            let content = fs.readFileSync(fullPath, 'utf8');
            const firstHeaderIndex = content.indexOf('\n# ');
            let titleIndex = content.indexOf('# ');
            if (firstHeaderIndex !== -1 && (titleIndex === -1 || firstHeaderIndex < titleIndex)) {
                titleIndex = firstHeaderIndex + 1;
            }
            if (titleIndex !== -1) {
                const beforeText = content.substring(0, titleIndex);
                if (beforeText.includes('For the complete documentation index')) {
                    content = content.substring(titleIndex);
                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log('Fixed header in ' + fullPath);
                }
            }
            content = content.replace(/Last updated.*ago\s*$/g, '');
            fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
        }
    }
}

for (const dir of directories) {
    if (fs.existsSync(dir)) {
        fixMarkdownFiles(dir);
    }
}

const html = fs.readFileSync('closetware_content.html', 'utf8');
const dom = new JSDOM(html);
const doc = dom.window.document;

const exactSummaryArray = [
"# Table of contents\n",
"## 👋 Welcome!",
"* [📃﹒Introduction](README.md)\n",
"## [R6S] Products",
"* [❔﹒Ban Information/HWID Bans](r6s/ban-information-hwid-bans.md)",
"* [🔴﹒Lethal Lite & Full [R6S]](r6s/lethal-lite-and-full-r6s.md)",
"* [🟢﹒Zeroday [R6S]](r6s/zeroday-r6s.md)",
"* [🟢﹒Cursader [R6S]](r6s/cursader-r6s.md)",
"* [🟢﹒Calamari [R6S]](r6s/calamari-r6s.md)",
"* [🟢﹒Ring-1 Basic & Full [R6S]](r6s/ring-1-basic-and-full-r6s.md)",
"* [🟡﹒Aptitude Recoil [R6S]](r6s/aptitude-recoil-r6s.md)\n",
"## [FIVEM] Products",
"* [🟢﹒Susano [FIVEM]](fivem/susano-fivem.md)\n",
"## [OTHER] Products",
"* [🟢﹒Disconnect [FN]](products/disconnect-fn.md)",
"* [🟢﹒Disconnect [RUST]](products/disconnect-rust.md)\n",
"## [PC] Troubleshooting",
"* [🪟﹒Checking WinVer Versions](troubleshooting/checking-winver-versions.md)",
"* [🌐﹒VPN Bypassing](troubleshooting/vpn-bypassing.md)",
"* [📁﹒Sharing QB's](troubleshooting/sharing-qbs.md)",
"* [⬇️﹒Downgrading Windows Versions (24H2)](troubleshooting/downgrading-windows-versions-24h2.md)",
"* [🛠️﹒Visual C++ Runtimes](troubleshooting/visual-c++-runtimes.md)",
"* [🛡️﹒Disable Anti-Virus (dControl)](troubleshooting/disable-anti-virus-dcontrol.md)",
"* [🛡️﹒Disable/Remove Anti-Cheat](troubleshooting/disable-remove-anti-cheat.md)",
"* [💻﹒Virtualization & Hyper-V](troubleshooting/virtualization-and-hyper-v.md)",
"* [📁﹒Corrupted Files](troubleshooting/corrupted-files.md)",
"* [⌚﹒Sync Date & Time](troubleshooting/sync-date-and-time.md)",
"* [🛡️﹒Disable Core Isolation](troubleshooting/disable-core-isolation.md)",
"* [🛡️﹒Disable Overlays](troubleshooting/disable-overlays.md)",
"* [🛡️﹒Disable Secure Boot](troubleshooting/disable-secure-boot.md)",
"* [🛡️﹒Disable Control Flow Guard (CFG)](troubleshooting/disable-control-flow-guard-cfg.md)"
];

let exactSummary = exactSummaryArray.join('\n');

const linkMap = {
    '/instructions': 'README.md',
    '/instructions/r6s/ban-information-hwid-bans': 'r6s/ban-information-hwid-bans.md',
    '/instructions/r6s/lethal-lite-and-full-r6s': 'r6s/lethal-lite-and-full-r6s.md',
    '/instructions/r6s/zeroday-r6s': 'r6s/zeroday-r6s.md',
    '/instructions/r6s/cursader-r6s': 'r6s/cursader-r6s.md',
    '/instructions/r6s/calamari-r6s': 'r6s/calamari-r6s.md',
    '/instructions/r6s/ring-1-basic-and-full-r6s': 'r6s/ring-1-basic-and-full-r6s.md',
    '/instructions/r6s/aptitude-recoil-r6s': 'r6s/aptitude-recoil-r6s.md',
    '/instructions/fivem/susano-fivem': 'fivem/susano-fivem.md',
    '/instructions/products/disconnect-fn': 'products/disconnect-fn.md',
    '/instructions/products/disconnect-rust': 'products/disconnect-rust.md',
    '/instructions/troubleshooting/checking-winver-versions': 'troubleshooting/checking-winver-versions.md',
    '/instructions/troubleshooting/vpn-bypassing': 'troubleshooting/vpn-bypassing.md',
    '/instructions/troubleshooting/sharing-qbs': 'troubleshooting/sharing-qbs.md',
    '/instructions/troubleshooting/downgrading-windows-versions-24h2': 'troubleshooting/downgrading-windows-versions-24h2.md',
    '/instructions/troubleshooting/visual-c++-runtimes': 'troubleshooting/visual-c++-runtimes.md',
    '/instructions/troubleshooting/disable-anti-virus-dcontrol': 'troubleshooting/disable-anti-virus-dcontrol.md',
    '/instructions/troubleshooting/disable-remove-anti-cheat': 'troubleshooting/disable-remove-anti-cheat.md',
    '/instructions/troubleshooting/virtualization-and-hyper-v': 'troubleshooting/virtualization-and-hyper-v.md',
    '/instructions/troubleshooting/corrupted-files': 'troubleshooting/corrupted-files.md',
    '/instructions/troubleshooting/sync-date-and-time': 'troubleshooting/sync-date-and-time.md',
    '/instructions/troubleshooting/disable-core-isolation': 'troubleshooting/disable-core-isolation.md',
    '/instructions/troubleshooting/disable-overlays': 'troubleshooting/disable-overlays.md',
    '/instructions/troubleshooting/disable-secure-boot': 'troubleshooting/disable-secure-boot.md',
    '/instructions/troubleshooting/disable-control-flow-guard-cfg': 'troubleshooting/disable-control-flow-guard-cfg.md'
};

let resolvedSummary = exactSummary;
for (const [url, file] of Object.entries(linkMap)) {
    const a = doc.querySelector('a[href="' + url + '"]');
    if (a) {
        let text = a.textContent.trim();
        const regexStr = '\\\\[([^\\]]+)\\\\]\\\\(' + file.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&') + '\\\\)';
        const regex = new RegExp(regexStr);
        resolvedSummary = resolvedSummary.replace(regex, '[' + text + '](' + file + ')');
    }
}

fs.writeFileSync('SUMMARY.md', resolvedSummary, 'utf8');
console.log('SUMMARY.md correctly generated.');
