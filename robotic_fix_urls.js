const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const targetStr = "${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}";

walkDir(path.join(__dirname, 'src'), function (filePath) {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Find the start of the disaster: ${process.env.NEXT_PUBLIC_API_URL
        // and find the last closing brace and quote of that specific block
        // We know it ends with something like '}'}'}}`

        // Let's use a simpler but extremely recursive-aware replacement
        // We'll replace ANY string starting with ${process.env.NEXT_PUBLIC_API_URL and containing localhost until the closing }
        // We scan for the first ${process.env.NEXT_PUBLIC_API_URL and then count braces to find the match

        let index = 0;
        while ((index = content.indexOf("${process.env.NEXT_PUBLIC_API_URL", index)) !== -1) {
            let start = index;
            let braceCount = 0;
            let end = -1;

            // Look for the end of the template literal part
            for (let i = start; i < content.length; i++) {
                if (content[i] === '{') braceCount++;
                if (content[i] === '}') {
                    braceCount--;
                    if (braceCount === 0) {
                        end = i;
                        break;
                    }
                }
            }

            if (end !== -1) {
                let block = content.substring(start, end + 1);
                // Only replace if it contains localhost (meaning it's one of ours)
                if (block.includes('localhost:5000')) {
                    content = content.substring(0, start) + targetStr + content.substring(end + 1);
                    // Move index forward
                    index = start + targetStr.length;
                } else {
                    index = end + 1;
                }
            } else {
                break;
            }
        }

        // Final cleanup for raw localhost strings that missed the ${ } wrapping
        // and avoid double targets
        content = content.replace(/http:\/\/localhost:5000/g, targetStr);
        content = content.replace(/\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| 'http:\/\/localhost:5000'\}\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| 'http:\/\/localhost:5000'\}/g, targetStr);

        if (originalContent !== content) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Robotically Cleaned:', filePath);
        }
    }
});
