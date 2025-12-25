// const wait =  (ms) => new Promise((resolve) => setTimeout (resolve, ms));

// const processFile = async () => {
//     try {
//         console.log("Upload...");

//         await wait(2000);

//         console.log("Connect to DataBase");

//         await wait(1000);

//         console.log("Done")

//     } catch {

//     }
// };

// processFile()

// const delay =  (ms) => new Promise((resolve) => setTimeout (resolve, ms));


// const uploadFile = async (name, size) => {
//     console.log(`Начали загрузку файла: ${name} (${size}) MB`);

//     await delay(size * 10);

//     console.log('Файл был загружен');
// };

// const runCloud = async () => {
//     console.log("Облако было запущено");

//     await Promise.all(
// [
//     uploadFile("photo.jpg", 200),
//     uploadFile("video.mp4", 500)
// ]
//     );

//     console.log("Загрузка завершена")
// };

// runCloud();

// const undici = require("undici")

const getData = async () => {
    const data = await request('https://youtube.com/video/12327141814');
    let originalViews;

    data.views
};