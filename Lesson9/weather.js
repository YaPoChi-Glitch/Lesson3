const http = require("http");
const PORT = 3000;

const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=55.75&longitude=37.61&current_weather=true';

const server = http.createServer(async (request, response) => {

    response.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (request.method === 'GET' && request.url === '/weather') {
        try {
            const fetchResponse = await fetch(WEATHER_URL);
            const data = await fetchResponse.json();

            const temp = data.current_weather.temperature;
            const wind = data.current_weather.windspeed;
            
            response.writeHead(200);
            response.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Погода в Москве</title>
                    <style>
                        body { font-family: sans-serif; text-align: center; background-color: #e0f7fa; padding-top: 50px; }
                        .card { background: white; padding: 20px; border-radius: 15px; display: inline-block; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
                        h1 { color: #00796b; }
                        .temp { font-size: 60px; font-weight: bold; color: #ff5722; margin: 10px 0; }
                        .info { font-size: 20px; color: #555; }
                        button { margin-top: 20px; padding: 10px 20px; cursor: pointer; background: #00796b; color: white; border: none; border-radius: 5px; }
                        button:hover { background: #004d40; }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <h1>🌤 Погода в Москве</h1>
                        <div class="temp">${temp}°C</div>
                        <div class="info">Ветер: ${wind} км/ч</div>
                        <a href="/"><button>На главную</button></a>
                    </div>
                </body>
                </html>
            `);

        } catch (error) {
            console.error(error);
            response.writeHead(500);
            response.end("<h1>Ошибка получения погоды ☔️</h1><p>Сервис недоступен</p>");
        }
    }

    else if (request.url === '/') {
        response.writeHead(200);
        response.end(`
            <div style="text-align:center; margin-top:50px; font-family:sans-serif;">
                <h1>Добро пожаловать!</h1>
                <a href="/weather" style="font-size:24px;">Узнать погоду в Москве ➡️</a>
            </div>
        `);
    }

    else {
        response.writeHead(404);
        response.end("<h1>404: Страница не найдена</h1>");
    }
});

server.listen(PORT, () => {
    console.log(`Сервер погоды запущен: http://localhost:${PORT}`);
});