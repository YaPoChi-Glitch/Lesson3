const path = require("node:path");
const http = require("node:http");
const fs = require("node:fs/promises");

const PORT = 3000;
const UPLOAD_DIR = path.join(__dirname, "public", "uploads");

const sendFile = async (filePath, response, contentType) => {
    try {
        const data = await fs.readFile(filePath);
        response.setHeader("Content-Type", contentType);
        response.statusCode = 200;
        response.end(data);
    } catch (err) {
        response.statusCode = 404;
        response.end("Not Found");
    }
};

const server = http.createServer(async (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");

    if (request.method === 'GET' && request.url === '/') {
        await sendFile(
            path.join(__dirname, "public", "index.html"),
            response,
            "text/html; charset=utf-8"
        );
    }

    else if (request.method === 'GET' && request.url === '/api/files') {
        try {
            await fs.mkdir(UPLOAD_DIR, { recursive: true }); 
            const files = await fs.readdir(UPLOAD_DIR);

            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify(files));
        } catch (err) {
            response.statusCode = 404;
            response.end(JSON.stringify({ error: "Ошибка чтения папки" }));
        }
    }
    
    else if (request.method === 'GET' && request.url.startsWith('/uploads/')) {

        const fileName = decodeURI(request.url.replace('/uploads/', ''));
        const filePath = path.join(UPLOAD_DIR, fileName);

        await sendFile(filePath, response, "application/octet-stream");
    }

    else if (request.method === 'POST' && request.url === '/upload') {
        console.log("Загрузка файла...");
        const chunks = [];

        request.on('data', (chunk) => chunks.push(chunk));

        request.on('end', async () => {
            const fullBuffer = Buffer.concat(chunks);

            const contentType = request.headers['content-type'];

            if (!contentType || !contentType.includes('boundary=')) {
                response.statusCode = 400;
                return response.end("Нет boundary");
            }

            const boundary = Buffer.from(`--${contentType.split('boundary=')[1]}`);
            const doubleNewline = Buffer.from('\r\n\r\n');


            const headersEndIndex = fullBuffer.indexOf(doubleNewline);

            if (headersEndIndex === -1) return response.end("Ошибка парсинга");

            const headersSection = fullBuffer.subarray(0, headersEndIndex).toString();
            const fileNameMatch = headersSection.match(/filename="(.+?)"/);

            if (!fileNameMatch) {
                return response.end("Не удалось найти имя файла");
            }

            const originalName = path.basename(fileNameMatch[1]);

            // Достаем тело файла
            const fileStart = headersEndIndex + 4;
            const fileEnd = fullBuffer.indexOf(boundary, fileStart);
            const fileData = fullBuffer.subarray(fileStart, fileEnd - 2);

            // Сохраняем
            try {
                await fs.mkdir(UPLOAD_DIR, { recursive: true });
                await fs.writeFile(path.join(UPLOAD_DIR, originalName), fileData);

                response.statusCode = 200;
                response.end("Сохранено");
            } catch (err) {
                console.error(err);
                response.statusCode = 500;
                response.end("Ошибка сохранения");
            }
        }); 
    }      

    else if (request.method === 'DELETE' && request.url.startsWith('/api/files/')) {
        const safeFileName = path.basename(request.url);
        const filePath = path.join(UPLOAD_DIR, safeFileName);

        try {
            // fs.unlink - это команда "Удалить файл"
            await fs.unlink(filePath);

            response.statusCode = 200;
            response.end("Файл удален");
        } catch (err) {
            console.error(err);
            // Если файла нет или ошибка доступа
            response.statusCode = 404;
            response.end("Ошибка удаления файла");
        }
    }

    else {
        response.statusCode = 404;
        response.end("Ничего не найдено");
    }

});


server.listen(PORT);
console.log(`Сервер был запущен по адресу http://localhost:${PORT}`);

