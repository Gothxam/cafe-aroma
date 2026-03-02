const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let count = 0;
// Scan src directory for both quotes and backticks
walkDir(path.join(__dirname, 'src'), function (filePath) {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Replace http://localhost:5000 with the environment variable logic
        // This handles cases inside backticks, double quotes, and single quotes
        // We match "http://localhost:5000" or 'http://localhost:5000' or `http://localhost:5000`
        const regex = /[`"']http:\/\/localhost:5000([^`"']*)[`"']/g;
        content = content.replace(regex, (match, suffix) => {
            return `\${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${suffix}`;
        });

        // Special case: if it's already inside a template literal that we just created, 
        // we might need to wrap the whole thing in backticks if it wasn't already.
        // The above replacement works well for literal strings. 
        // Let's do a simpler replacement for any remaining raw localhost strings.
        content = content.replace(/http:\/\/localhost:5000/g, "${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}");

        if (originalContent !== content) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated:', filePath);
            count++;
        }
    }
});

console.log(`Replaced hardcoded URLs in ${count} files.`);
