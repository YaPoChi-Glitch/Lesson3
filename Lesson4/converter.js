const usdToRub = (usd) => {
    const rate = 90;
    return usd * rate;
};

const euroToRub = (euro) => {
    const rate = 100;
    return euro * rate;
};

console.log(usdToRub(100));
console.log(euroToRub(50));