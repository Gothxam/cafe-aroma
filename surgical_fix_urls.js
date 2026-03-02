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

        // Find anything that starts with ${process.env.NEXT_PUBLIC_API_URL and contains nested quotes/braces
        // and replace it with targetStr
        // We match ${process.env.NEXT_PUBLIC_API_URL || ... http://localhost:5000 ... }
        // The pattern we saw was: `${process.env.NEXT_PUBLIC_API_URL || 'process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000''}'}'}}`

        // This regex will find any string starting with ${process.env.NEXT_PUBLIC_API_URL and ending with some combination of ' } }
        const CorruptedUrlRegex = /\$\{process\.env\.NEXT_PUBLIC_API_URL[\s\S]*?http:\/\/localhost:5000[\s\S]*?\}/g;

        content = content.replace(CorruptedUrlRegex, targetStr);

        // Also catch if it's just raw localhost inside backticks but missed the ${ }
        // or any other weird variations
        content = content.replace(/http:\/\/localhost:5000/g, targetStr);

        // Final sanity check for double injections
        content = content.replace(/\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| 'http:\/\/localhost:5000'\}\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| 'http:\/\/localhost:5000'\}/g, targetStr);

        if (originalContent !== content) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Surgically Cleaned:', filePath);
        }
    }
});
