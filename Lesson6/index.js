const http = require("http");
const PORT = 3000;

// const server = http.createServer((request, response) => {
//     console.log("Кто-то зашел к нам на сервер");

//     response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" })

//     response.write("Привет из Node.js");

//     response.end();
// });

// const server = http.createServer((request, response) => {
//     response.setHeader("Content-Type", "text/plain; charset=utf-8");

//     if (request.url === '/') {
//         resonse.statusCode = 200; 
//         response.write("Главная страница сайта");
//         resonse.end();
//     }else if (request.url === '/about') {
//         resonse.statusCode = 200; 
//         response.write("Это стартовая страница нашего файлообменника");
//         resonse.end();
//     } else (request.url === '/stats') {
        
//     }
//          resonse.statusCode = 404;
//         response.write("Такой страницы не существует!");
//         resonse.end();
//     }

// });

// server.listen(PORT);
// console.log("Сервер был успешно запущен");
