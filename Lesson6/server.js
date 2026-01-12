const http = require('http');

const server = http.createServer((req, res) => {
    
    console.log("Запрос на адрес:", req.url);

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    
        res.end(`
            <h1>Привет! Я Ярослав</h1>
            <p>Добро пожаловать на мой первый сервер.</p>
            <a href="/contact">Мои контакты</a>
            <br>
            <a href="/api/info">Информация о сервере (API)</a>
        `);
    }

    else if (req.url === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <h2>Контакты</h2>
            <p>Email: student@sigma.js</p>
            <p>Telegram: @CroCoDIlSPID</p>
            <a href="/">Вернуться на главную</a>
        `);
    }

    else if (req.url === '/api/info') {
        res.writeHead(200, { 'Content-Type': 'application/json' });

        const serverInfo = {
            serverName: "MyPC",
            version: "1.0.0",
            status: "working"
        };

        res.end(JSON.stringify(serverInfo));
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <h1>404: Страница не найдена 😿</h1>
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtY2J6eHl5aDExbWJqYnZmb3Z6a3Z6a3Z6a3Z6a3Z6a3Z6a3Z6/VBNH8y11A93i/giphy.gif" width="300">
            <p>Такой страницы нет!</p>
            <a href="/">Вернуться домой</a>
        `);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Сервер запущен! Перейди по ссылке: http://localhost:${PORT}`);
});