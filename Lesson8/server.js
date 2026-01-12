const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.mp4': 'video/mp4' 
};

const server = http.createServer((req, res) => {
    console.log(`Запрос: ${req.url}`);

    let filePath = req.url === '/' ? 'index.html' : req.url;
    
    if (filePath.startsWith('/')) {
        filePath = filePath.substring(1);
    }

    const fullPath = path.join(__dirname, 'public', filePath);

    const ext = path.extname(fullPath);
    const contentType = MIME_TYPES[ext] || 'text/plain';

    const stream = fs.createReadStream(fullPath);

    stream.on('open', () => {
        res.writeHead(200, { 'Content-Type': contentType });
        stream.pipe(res);
    });

    stream.on('error', () => {
        res.writeHead(404);
        res.end("File not found");
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Видео-сервер запущен: http://localhost:${PORT}`);
});