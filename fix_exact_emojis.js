const fs = require('fs');
const path = require('path');

const exactSummary = `# Table of contents

## 👋 Welcome!
* [📃﹒Introduction](README.md)

## [R6S] Products
* [❔﹒Ban Information/HWID Bans](r6s/ban-information-hwid-bans.md)
* [🔴﹒Lethal Lite & Full [R6S]](r6s/lethal-lite-and-full-r6s.md)
* [🟢﹒Zeroday [R6S]](r6s/zeroday-r6s.md)
* [🟢﹒Cursader [R6S]](r6s/cursader-r6s.md)
* [🟢﹒Calamari [R6S]](r6s/calamari-r6s.md)
* [🟢﹒Ring-1 Basic & Full [R6S]](r6s/ring-1-basic-and-full-r6s.md)
* [🟡﹒Aptitude Recoil [R6S]](r6s/aptitude-recoil-r6s.md)

## [FIVEM] Products
* [🟢﹒Susano [FIVEM]](fivem/susano-fivem.md)

## [OTHER] Products
* [🟢﹒Disconnect [FN]](products/disconnect-fn.md)
* [🟢﹒Disconnect [RUST]](products/disconnect-rust.md)

## [PC] Troubleshooting
* [🪟﹒Checking WinVer Versions](troubleshooting/checking-winver-versions.md)
* [🌐﹒VPN Bypassing](troubleshooting/vpn-bypassing.md)
* [📁﹒Sharing QB's](troubleshooting/sharing-qbs.md)
* [⬇️﹒Downgrading Windows Versions (24H2)](troubleshooting/downgrading-windows-versions-24h2.md)
* [🛠️﹒Visual C++ Runtimes](troubleshooting/visual-c++-runtimes.md)
* [🛡️﹒Disable Anti-Virus (dControl)](troubleshooting/disable-anti-virus-dcontrol.md)
* [🛡️﹒Disable/Remove Anti-Cheat](troubleshooting/disable-remove-anti-cheat.md)
* [💻﹒Virtualization & Hyper-V](troubleshooting/virtualization-and-hyper-v.md)
* [📁﹒Corrupted Files](troubleshooting/corrupted-files.md)
* [⌚﹒Sync Date & Time](troubleshooting/sync-date-and-time.md)
* [🛡️﹒Disable Core Isolation](troubleshooting/disable-core-isolation.md)
* [🛡️﹒Disable Overlays](troubleshooting/disable-overlays.md)
* [🛡️﹒Disable Secure Boot](troubleshooting/disable-secure-boot.md)
* [🛡️﹒Disable Control Flow Guard (CFG)](troubleshooting/disable-control-flow-guard-cfg.md)
`;

fs.writeFileSync('SUMMARY.md', exactSummary, 'utf8');

// Now we need to update the heading inside each Markdown file to match exactly
const links = exactSummary.match(/\[(.*?)\]\((.*?)\)/g);
if (links) {
    for (let link of links) {
        const match = link.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
            let title = match[1];
            const file = match[2];
            const fullPath = path.join(__dirname, file);
            
            if (fs.existsSync(fullPath)) {
                let content = fs.readFileSync(fullPath, 'utf8');
                
                // Replace the first heading with the exact title from the link
                content = content.replace(/^#\s*.*$/m, '# ' + title);
                
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    }
}

console.log('Fixed SUMMARY.md and all page headings with the accurate manual emojis.');
