const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const finalTarget = "${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}";

walkDir(path.join(__dirname, 'src'), function (filePath) {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Flatten any nesting that looks like ${A || '${A || B}'}
        // This regex is very specific to the remnant I saw
        const remnantRegex = /\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| '\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| 'http:\/\/localhost:5000'\}'\}/g;
        content = content.replace(remnantRegex, finalTarget);

        // General fallback search for anything that might have survived
        const nestedRegex = /\$\{process\.env\.NEXT_PUBLIC_API_URL[^}]*?http:\/\/localhost:5000[^}]*?\}/g;
        content = content.replace(nestedRegex, finalTarget);

        if (originalContent !== content) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Perfectly Flattened:', filePath);
        }
    }
});
