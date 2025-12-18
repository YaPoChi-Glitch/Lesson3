// const user = {
//     name: "Alex",
//     sayHiStandard: function() {
//         setTimeout(function() {
//             console.log(this.name);
//         }, 1000);
//     },

//     sayHiArrow: function() {
//         setTimeout(() => {
//             console.log(this.name);
//         }, 1000);
//     }
// };

// user.sayHiStandard();
// user.sayHiArrow();

// const formatSize = (bytes) => {
//     if (bytes < 1024) {
//         return `${bytes} B`;
//     }

//     const mbytes = (bytes / 1024 / 1024). toFixed(2);

//     return `${mbytes} MB`;
// };

// const filesSize = [500, 5000000, 5000000]; 

// for (const fileSize of filesSize) {
//     console.log(formatSize(fileSize));
// }

// let finalPrice = 0;

// const usdToRub = (usd) => {
//     const odd = (a,b) => a * b;

//     if (usd > 300) {
//         finalPrice = odd(usd, 85);
//     } else if (usd > 1000) {
//         finalPrice = odd(usd, 90);
//     }

//     finalPrice = odd(usd, 80);
// };

// usdToRub(120);

// console.log(finalPrice);

const checkAge = (age) => {
    if (age >= 18) {
        return "Человек совершеннолетний";
        } else {
        return "Человек маленький";
    }
};

console.log(checkAge(12));