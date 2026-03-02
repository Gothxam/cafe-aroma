const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const targetStr = "process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'";

walkDir(path.join(__dirname, 'src'), function (filePath) {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Find anything that looks like ${process.env.NEXT_PUBLIC_API_URL ... 'http://localhost:5000' ... }
        // This regex aggressively matches any recursive mess I made
        const messyRegex = /\$\{process\.env\.NEXT_PUBLIC_API_URL(?:(?!\${).|\$\{process\.env\.NEXT_PUBLIC_API_URL(?:(?!\${).|\$\{process\.env\.NEXT_PUBLIC_API_URL(?:(?!\${).|\$\{process\.env\.NEXT_PUBLIC_API_URL(?:(?!\${).)*\})*\})*\})*\|\| 'http:\/\/localhost:5000'(?:'\}'\}'\}'\}|\}'\}'\}|\}'\}|\})*/g;

        // Simpler approach: find any stretch of text starting with ${process.env.NEXT_PUBLIC_API_URL and ending with 'http://localhost:5000' and some number of }
        const simpleMessyRegex = /\$\{process\.env\.NEXT_PUBLIC_API_URL[\s\S]*?'http:\/\/localhost:5000'['" \}]*?\}/g;

        content = content.replace(simpleMessyRegex, `\${${targetStr}}`);

        // Also catch ones that missed the ${ } entirely or are just raw localhost
        content = content.replace(/http:\/\/localhost:5000/g, targetStr);

        // Final cleanup of double targets
        content = content.replace(/\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| 'http:\/\/localhost:5000'\}\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| 'http:\/\/localhost:5000'\}/g, `\${${targetStr}}`);

        if (originalContent !== content) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Final Cleaned:', filePath);
        }
    }
});
