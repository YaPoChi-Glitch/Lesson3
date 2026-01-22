// index.js (CommonJS) — доступен по Wi-Fi (LAN) с телефона/компа

const path = require("node:path");
const http = require("node:http");
const fs = require("node:fs/promises");
const os = require("node:os");

const PORT = 3000;
const HOST = "0.0.0.0"; // слушаем все интерфейсы
const UPLOAD_DIR = path.join(__dirname, "public", "uploads");

const getLocalIp = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) return iface.address;
    }
  }
  return "localhost";
};

const sendJson = (response, statusCode, obj) => {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(obj));
};

const sendText = (response, statusCode, text) => {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.end(text);
};

const sendFile = async (filePath, response, contentType) => {
  try {
    const data = await fs.readFile(filePath);
    response.statusCode = 200;
    response.setHeader("Content-Type", contentType);
    response.end(data);
  } catch {
    sendText(response, 404, "Not Found");
  }
};

const getMime = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".js") return "application/javascript; charset=utf-8";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".ico") return "image/x-icon";
  return "application/octet-stream";
};

const PUBLIC_DIR = path.join(__dirname, "public");

const server = http.createServer(async (request, response) => {
  // CORS (минимально нужное)
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.statusCode = 204;
    return response.end();
  }

  // Главная страница
  if (request.method === "GET" && request.url === "/") {
    return sendFile(path.join(PUBLIC_DIR, "index.html"), response, "text/html; charset=utf-8");
  }

  // Статика из /public (css/js/картинки) — чтобы фронт работал и на телефоне
  if (request.method === "GET" && request.url.startsWith("/public/")) {
    const rel = decodeURI(request.url.replace("/public/", ""));
    const safeRel = rel.replace(/\\/g, "/");
    const filePath = path.join(PUBLIC_DIR, safeRel);

    // защита от выхода из папки
    if (!filePath.startsWith(PUBLIC_DIR)) return sendText(response, 403, "Forbidden");

    return sendFile(filePath, response, getMime(filePath));
  }

  // Список файлов
  if (request.method === "GET" && request.url === "/api/files") {
    try {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
      const files = await fs.readdir(UPLOAD_DIR);
      return sendJson(response, 200, files);
    } catch {
      return sendJson(response, 500, { error: "Ошибка чтения папки" });
    }
  }

  // Скачать файл
  if (request.method === "GET" && request.url.startsWith("/uploads/")) {
    const fileName = decodeURI(request.url.replace("/uploads/", ""));
    const safeFileName = path.basename(fileName); // защита от ../
    const filePath = path.join(UPLOAD_DIR, safeFileName);
    return sendFile(filePath, response, "application/octet-stream");
  }

  // Загрузка (multipart/form-data, один файл)
  if (request.method === "POST" && request.url === "/upload") {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));

    request.on("end", async () => {
      const fullBuffer = Buffer.concat(chunks);
      const contentType = request.headers["content-type"];

      if (!contentType || !contentType.includes("boundary=")) {
        return sendText(response, 400, "Нет boundary");
      }

      const boundaryStr = contentType.split("boundary=")[1];
      const boundary = Buffer.from(`--${boundaryStr}`);
      const doubleNewline = Buffer.from("\r\n\r\n");

      const headersEndIndex = fullBuffer.indexOf(doubleNewline);
      if (headersEndIndex === -1) return sendText(response, 400, "Ошибка парсинга");

      const headersSection = fullBuffer.subarray(0, headersEndIndex).toString();
      const fileNameMatch = headersSection.match(/filename="(.+?)"/);
      if (!fileNameMatch) return sendText(response, 400, "Не удалось найти имя файла");

      const originalName = path.basename(fileNameMatch[1]);

      const fileStart = headersEndIndex + 4;
      const fileEnd = fullBuffer.indexOf(boundary, fileStart);
      if (fileEnd === -1) return sendText(response, 400, "Ошибка парсинга boundary");

      const fileData = fullBuffer.subarray(fileStart, fileEnd - 2); // -2 убираем \r\n перед boundary

      try {
        await fs.mkdir(UPLOAD_DIR, { recursive: true });
        await fs.writeFile(path.join(UPLOAD_DIR, originalName), fileData);
        return sendText(response, 200, "Сохранено");
      } catch {
        return sendText(response, 500, "Ошибка сохранения");
      }
    });

    return;
  }

  // Удаление файла: DELETE /api/files/<name>
  if (request.method === "DELETE" && request.url.startsWith("/api/files/")) {
    const urlName = decodeURI(request.url.replace("/api/files/", ""));
    const safeFileName = path.basename(urlName);
    const filePath = path.join(UPLOAD_DIR, safeFileName);

    try {
      await fs.unlink(filePath);
      return sendText(response, 200, "Файл удален");
    } catch {
      return sendText(response, 404, "Ошибка удаления файла");
    }
  }

  return sendText(response, 404, "Ничего не найдено");
});

server.listen(PORT, HOST, () => {
  const ip = getLocalIp();
  console.log(`LOCAL: http://localhost:${PORT}`);
  console.log(`LAN:   http://${ip}:${PORT}`);
});
