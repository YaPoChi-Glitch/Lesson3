// const files = ["cat.jpg", "dog.png", "doc.docs", "document.pdf", "Virus.exe"];

// for (const file of files) {
//     if (file === "cat.jpg") {
//         console.log("Пропускаем данную картинку");
//         continue;
//     }

//     if (file === "Virus.exe") {
//         console.log("АЛАРМ! Вирус найден!");
//         break;
//     }

//     console.log("Файл проверен:" + file);
// }

// files.push("music.mp3");

// for (const file of files) {
//     console.log(file);
// }

// let fuel = 100; // топливо

// while (fuel > 0){
//     console.log("Едем " + "Топливо осталось: " + fuel);
//     fuel -= 10; // fuel = fuel - 10; 
// }

// console.log("Приехали")

// for (let i = 1; i <= 5; i++)  {
//     console.log("Отжимание номер " + i)
// }

// for (let i = 0; i <= file.length; i++) {
//     console.log(files[i]);
// }

const pinCodes = ["1111", "5678", "1234", "9999"];

const myPin = "1234";

for (let i = 0; i < pinCodes.length; i++) {
    const currentPin = pinCodes[i];
    if (currentPin === myPin) {
        console.log("Пин-код найден!");
        break;
    }  else {
        console.log("Неверный пин...");
    }
}