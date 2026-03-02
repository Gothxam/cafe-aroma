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

const targetStr = "`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api";

walkDir(path.join(__dirname, 'src'), function (filePath) {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Pattern 1: Any combination of nested process.env...http://localhost:5000 followed by garbage and /api
        // We want to replace everything from the first `${process.env...` up to `/api`
        // with the clean target string.

        // This regex matches: ${ followed by search for NEXT_PUBLIC_API_URL, then everything up to /api
        // It's aggressive but we know these are our API calls.
        const messyApiRegex = /\$\{process\.env\.NEXT_PUBLIC_API_URL[\s\S]*?\/api/g;
        content = content.replace(messyApiRegex, targetStr);

        // Pattern 2: Raw backticked localhost:5000/api
        content = content.replace(/`http:\/\/localhost:5000\/api/g, targetStr);

        // Pattern 3: Cleanup any double backticks or dangling braces
        // If we replaced and it became ``${...}``
        content = content.replace(/``\$\{/g, '`${');

        // Fix the specific corruption found in ReservationTable: '}'}'}/api
        content = content.replace(/'\}'\}'\}\/api/g, '/api');
        content = content.replace(/'\}'\}\/api/g, '/api');
        content = content.replace(/'\}\/api/g, '/api');

        if (originalContent !== content) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Fixed API URL in:', filePath);
        }
    }
});
