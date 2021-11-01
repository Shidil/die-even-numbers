const increment = function (currentValue) {
    if (typeof currentValue !== "number") {
        return 1;
    }

    const isEven = currentValue % 2 === 0;
    return isEven ? currentValue + 3 : currentValue + 1;
};

module.exports = {
    increment,
};
