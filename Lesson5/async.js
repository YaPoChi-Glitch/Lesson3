const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};


// const cookDinner = async () => {
//     console.log(" Начинаем готовить ужин...");

//     console.log(" Включаю плиту...");
//     await sleep(1000); 

//     console.log(" Режу овощи...");
//     await sleep(2000); 

//     console.log(" Варю суп...");
//     await sleep(3000);

//     console.log(" Ужин готов!");
// };

// cookDinner();

const cookDinner = async () => {
    console.log(" Начинаем готовить ужин...");

    try {
        const isGasOn = false; 

        if (isGasOn === false) {
            throw new Error("Нет газа! Включите вентиль.");
        }

        console.log(" Включаю плиту...");
        await sleep(1000);

        console.log(" Режу овощи...");
        await sleep(2000);

        console.log(" Варю суп...");
        await sleep(3000);

        console.log(" Ужин готов!");

    } catch (err) {
        console.log(" Ошибка на кухне:", err.message);
    }
};

cookDinner();