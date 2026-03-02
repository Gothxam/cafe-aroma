const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (f === 'node_modules' || f === '.git' || f === '.next') return;
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const finalGoodSegment = "`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api";

walkDir(path.join(__dirname, 'src'), function (filePath) {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Matches any mess starting with ${process.env.NEXT_PUBLIC_API_URL and ending just before /api
        // We handle potential quotes, braces, and backticks in between.
        // The most common mess is `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api

        // Let's use a very specific regex for the corruption:
        // ${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api
        const corruptedRegex = /\$\{process\.env\.NEXT_PUBLIC_API_URL[\s\S]*?http:\/\/localhost:5000[\s\S]*?\/api/g;

        content = content.replace(corruptedRegex, finalGoodSegment);

        // Also cleanup raw localhost if it survived
        content = content.replace(/`http:\/\/localhost:5000\/api/g, finalGoodSegment);

        // Fix double backticks if created
        content = content.replace(/``\$\{/g, '`${');

        if (originalContent !== content) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Final Polish:', filePath);
        }
    }
});
