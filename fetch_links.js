const https = require('https');
const { JSDOM } = require('jsdom');
const fs = require('fs');

https.get('https://closetware.gitbook.io/instructions', (res) => {
    let html = '';
    res.setEncoding('utf8');
    res.on('data', chunk => html += chunk);
    res.on('end', () => {
        fs.writeFileSync('closetware_content_fixed.html', html, 'utf8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;
        const links = doc.querySelectorAll('a');
        let out = '';
        links.forEach(l => {
            if(l.href.includes('/instructions')) {
                out += l.href + ' ||| ' + l.textContent.trim() + '\n';
            }
        });
        
        // Also let's extract the group names! Group names are often div elements with a specific class, or headings.
        // Let's just find all elements in the nav to see the raw text.
        const nav = doc.querySelector('nav');
        if (nav) {
            out += '\n\n=== NAV TEXT ===\n' + nav.textContent.replace(/\n+/g, '\n').trim();
        }
        
        fs.writeFileSync('all_links_fixed.txt', out, 'utf8');
        console.log('Done!');
    });
});
