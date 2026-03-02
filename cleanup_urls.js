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

        // 1. First, flatten any deeply nested mess I made
        // Example: ${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || ...}`}
        // We can just find any sequence that starts with ${process.env.NEXT_PUBLIC_API_URL and ends with 'http://localhost:5000'}}...}
        // and replace it with targetStr

        const messyRegex = /\$\{process\.env\.NEXT_PUBLIC_API_URL[^}]*\}\}/g;
        while (messyRegex.test(content)) {
            content = content.replace(messyRegex, targetStr);
        }

        // 2. Replace raw localhost strings that are inside backticks
        // Example: `http://localhost:5000/api/...` -> `${process.env...}/api/...`
        content = content.replace(/http:\/\/localhost:5000/g, targetStr);

        // 3. Fix potential double targetStr injection
        content = content.replace(/\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| 'http:\/\/localhost:5000'\}\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| 'http:\/\/localhost:5000'\}/g, targetStr);

        if (originalContent !== content) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Cleaned:', filePath);
        }
    }
});
