const fs = require('fs');
const path = require('path');
require('dotenv').config();

const srcDir = path.join(__dirname, 'public');
const destDir = path.join(__dirname, 'dist');

// Function to copy directory recursively
function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach(function(childItemName) {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Clear or create dist directory
if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
}
fs.mkdirSync(destDir, { recursive: true });

// Copy public to dist
copyRecursiveSync(srcDir, destDir);

// Inject API key into script.js
const scriptPath = path.join(destDir, 'script.js');
if (fs.existsSync(scriptPath)) {
    let scriptContent = fs.readFileSync(scriptPath, 'utf8');
    const apiKey = process.env.FIREBASE_API_KEY || '';
    
    // Replace the placeholder with actual key
    scriptContent = scriptContent.replace('__FIREBASE_API_KEY__', apiKey);
    
    fs.writeFileSync(scriptPath, scriptContent);
    console.log('Build successful! API Key injected safely for deployment.');
} else {
    console.warn('script.js not found in dist.');
}
