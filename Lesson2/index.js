let totalPrice = 5000; 
const accountBalance = 5000;
const isVip = false; 
console.log("Цена до скидки:", totalPrice);
if (isVip === true) {
    totalPrice = totalPrice * 0.9; 
    console.log("Сработала VIP скидка! Новая цена:", totalPrice);
}
if (accountBalance >= totalPrice) {
    console.log("Успешно! Покупка сделана");
} else {
    // "Иначе" (если денег меньше)
    console.log("Недостаточно средств");
}