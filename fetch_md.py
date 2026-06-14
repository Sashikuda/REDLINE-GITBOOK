import urllib.request

url = "https://closetware.gitbook.io/instructions/r6s/lethal-lite-and-full-r6s.md"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read()
        with open('sample.md', 'wb') as f:
            f.write(html)
except Exception as e:
    with open('sample.md', 'w') as f:
        f.write(str(e))
