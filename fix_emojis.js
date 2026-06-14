const fs = require('fs');
const path = require('path');

const linkData = [
    { file: 'r6s/ban-information-hwid-bans.md', emoji: '❌', title: 'Ban Information/HWID Bans' },
    { file: 'r6s/lethal-lite-and-full-r6s.md', emoji: '💻', title: 'Lethal Lite & Full [R6S]' },
    { file: 'r6s/zeroday-r6s.md', emoji: '💻', title: 'Zeroday [R6S]' },
    { file: 'r6s/cursader-r6s.md', emoji: '💻', title: 'Cursader [R6S]' },
    { file: 'r6s/calamari-r6s.md', emoji: '💻', title: 'Calamari [R6S]' },
    { file: 'r6s/ring-1-basic-and-full-r6s.md', emoji: '💻', title: 'Ring-1 Basic & Full [R6S]' },
    { file: 'r6s/aptitude-recoil-r6s.md', emoji: '🟡', title: 'Aptitude Recoil [R6S]' },
    { file: 'fivem/susano-fivem.md', emoji: '💻', title: 'Susano [FIVEM]' },
    { file: 'products/disconnect-fn.md', emoji: '💻', title: 'Disconnect [FN]' },
    { file: 'products/disconnect-rust.md', emoji: '💻', title: 'Disconnect [RUST]' },
    { file: 'troubleshooting/checking-winver-versions.md', emoji: '🪟', title: 'Checking WinVer Versions' },
    { file: 'troubleshooting/vpn-bypassing.md', emoji: '🖇️', title: 'VPN Bypassing' },
    { file: 'troubleshooting/sharing-qbs.md', emoji: '📁', title: "Sharing QB's" },
    { file: 'troubleshooting/downgrading-windows-versions-24h2.md', emoji: '⤵️', title: 'Downgrading Windows Versions (24H2)' },
    { file: 'troubleshooting/visual-c++-runtimes.md', emoji: '👨‍💻', title: 'Visual C++ Runtimes' },
    { file: 'troubleshooting/disable-anti-virus-dcontrol.md', emoji: '🐛', title: 'Disable Anti-Virus (dControl)' },
    { file: 'troubleshooting/disable-remove-anti-cheat.md', emoji: '👀', title: 'Disable/Remove Anti-Cheat' },
    { file: 'troubleshooting/virtualization-and-hyper-v.md', emoji: '💾', title: 'Virtualization & Hyper-V' },
    { file: 'troubleshooting/corrupted-files.md', emoji: '💔', title: 'Corrupted Files' },
    { file: 'troubleshooting/sync-date-and-time.md', emoji: '🕐', title: 'Sync Date & Time' },
    { file: 'troubleshooting/disable-core-isolation.md', emoji: '🔐', title: 'Disable Core Isolation' },
    { file: 'troubleshooting/disable-overlays.md', emoji: '📑', title: 'Disable Overlays' },
    { file: 'troubleshooting/disable-secure-boot.md', emoji: '📀', title: 'Disable Secure Boot' },
    { file: 'troubleshooting/disable-control-flow-guard-cfg.md', emoji: '🧑', title: 'Disable Control Flow Guard (CFG)' }
];

for (const data of linkData) {
    const fullPath = path.join(__dirname, data.file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        if (content.startsWith('---\n')) {
            const endFrontmatter = content.indexOf('---\n', 4);
            if (endFrontmatter !== -1) {
                content = content.substring(endFrontmatter + 4);
            }
        }
        
        content = content.replace(/^#\s*([^\w\s\[]*)(.*)$/m, (match, p1, p2) => {
            if (match.includes(data.emoji)) {
                return match.replace(data.emoji, '').trim();
            }
            return match;
        });

        const frontmatter = '---\nicon: ' + data.emoji + '\n---\n';
        fs.writeFileSync(fullPath, frontmatter + content, 'utf8');
    }
}

const readmePath = path.join(__dirname, 'README.md');
if (fs.existsSync(readmePath)) {
    let content = fs.readFileSync(readmePath, 'utf8');
    if (content.startsWith('---\n')) {
        const endFrontmatter = content.indexOf('---\n', 4);
        if (endFrontmatter !== -1) {
            content = content.substring(endFrontmatter + 4);
        }
    }
    content = content.replace(/^#\s*([^\w\s\[]*)(.*)$/m, (match) => {
        return match.replace('📃﹒', '').replace('📃', '').trim();
    });
    const frontmatter = '---\nicon: 📃\n---\n';
    fs.writeFileSync(readmePath, frontmatter + content, 'utf8');
}

const exactSummaryArray = [
"# Table of contents\n",
"## 👋 Welcome!",
"* [Introduction](README.md)\n",
"## R6S",
"* [Ban Information/HWID Bans](r6s/ban-information-hwid-bans.md)",
"* [Lethal Lite & Full [R6S]](r6s/lethal-lite-and-full-r6s.md)",
"* [Zeroday [R6S]](r6s/zeroday-r6s.md)",
"* [Cursader [R6S]](r6s/cursader-r6s.md)",
"* [Calamari [R6S]](r6s/calamari-r6s.md)",
"* [Ring-1 Basic & Full [R6S]](r6s/ring-1-basic-and-full-r6s.md)",
"* [Aptitude Recoil [R6S]](r6s/aptitude-recoil-r6s.md)\n",
"## FIVEM",
"* [Susano [FIVEM]](fivem/susano-fivem.md)\n",
"## Products",
"* [Disconnect [FN]](products/disconnect-fn.md)",
"* [Disconnect [RUST]](products/disconnect-rust.md)\n",
"## Troubleshooting",
"* [Checking WinVer Versions](troubleshooting/checking-winver-versions.md)",
"* [VPN Bypassing](troubleshooting/vpn-bypassing.md)",
"* [Sharing QB's](troubleshooting/sharing-qbs.md)",
"* [Downgrading Windows Versions (24H2)](troubleshooting/downgrading-windows-versions-24h2.md)",
"* [Visual C++ Runtimes](troubleshooting/visual-c++-runtimes.md)",
"* [Disable Anti-Virus (dControl)](troubleshooting/disable-anti-virus-dcontrol.md)",
"* [Disable/Remove Anti-Cheat](troubleshooting/disable-remove-anti-cheat.md)",
"* [Virtualization & Hyper-V](troubleshooting/virtualization-and-hyper-v.md)",
"* [Corrupted Files](troubleshooting/corrupted-files.md)",
"* [Sync Date & Time](troubleshooting/sync-date-and-time.md)",
"* [Disable Core Isolation](troubleshooting/disable-core-isolation.md)",
"* [Disable Overlays](troubleshooting/disable-overlays.md)",
"* [Disable Secure Boot](troubleshooting/disable-secure-boot.md)",
"* [Disable Control Flow Guard (CFG)](troubleshooting/disable-control-flow-guard-cfg.md)"
];

fs.writeFileSync('SUMMARY.md', exactSummaryArray.join('\n'), 'utf8');
console.log('Fixed emojis to use GitBook frontmatter icons!');
