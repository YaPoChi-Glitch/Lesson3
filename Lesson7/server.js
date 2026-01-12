const http = require('http');
const fs = require('fs'); 
const path = require('path'); 

const server = http.createServer((req, res) => {
    console.log("Запрос:", req.url);

    const sendFile = (fileName, contentType, statusCode = 200) => {
        const fullPath = path.join(__dirname, 'public', fileName);

        fs.readFile(fullPath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Server Error");
                return;
            }
            
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(data);
        });
    };


    if (req.url === '/') {
        sendFile('index.html', 'text/html');
    } 
    
    else if (req.url === '/rules') {
        sendFile('rules.html', 'text/html');
    } 
    
    else if (req.url === '/style.css') {
        sendFile('style.css', 'text/css');
    } 
    
    else {
        sendFile('404.html', 'text/html', 404);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
});