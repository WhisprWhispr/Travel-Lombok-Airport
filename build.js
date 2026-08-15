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
    
    // Replace the placeholders with actual values
    scriptContent = scriptContent.replace('__FIREBASE_API_KEY__', process.env.FIREBASE_API_KEY || '');
    scriptContent = scriptContent.replace('__FIREBASE_AUTH_DOMAIN__', process.env.FIREBASE_AUTH_DOMAIN || '');
    scriptContent = scriptContent.replace('__FIREBASE_PROJECT_ID__', process.env.FIREBASE_PROJECT_ID || '');
    scriptContent = scriptContent.replace('__FIREBASE_STORAGE_BUCKET__', process.env.FIREBASE_STORAGE_BUCKET || '');
    scriptContent = scriptContent.replace('__FIREBASE_MESSAGING_SENDER_ID__', process.env.FIREBASE_MESSAGING_SENDER_ID || '');
    scriptContent = scriptContent.replace('__FIREBASE_APP_ID__', process.env.FIREBASE_APP_ID || '');
    scriptContent = scriptContent.replace('__FIREBASE_MEASUREMENT_ID__', process.env.FIREBASE_MEASUREMENT_ID || '');
    
    fs.writeFileSync(scriptPath, scriptContent);
    console.log('Build successful! API keys and Firebase config injected safely for deployment.');
} else {
    console.warn('script.js not found in dist.');
}
