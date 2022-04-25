const fs = require('fs');
const from = process.env.TOOL === 'vite' ? './build/vite/index.html' : './build/webpack/index.html';
fs.copyFile(from, './index.html', (err) => {
    if (err) {
        console.warn('copy index.html failed', err);
        throw err;
    }
});