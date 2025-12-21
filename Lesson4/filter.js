const ages = [10, 18, 55, 3, 20];
const checkAccess = (age) => {
    if (age >= 18) {
        return "Доступ разрешен";
    } else {
        return "Доступ запрещен";
    }
};

for (const age of ages) {
    console.log(`Возраст ${age}: ${checkAccess(age)}`);
}