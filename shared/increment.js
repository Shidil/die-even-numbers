const increment = function (currentValue) {
  if (typeof currentValue !== "number") {
    return 1;
  }

  const isEven = currentValue % 2 === 0;
  return isEven ? currentValue + 3 : currentValue + 1;
};

// https://qr.ae/pGxLs3
// (1+(−1)n2)+2n
const findNthValue = function (n) {
  if (typeof n !== 'number' || isNaN(n) || n <= 0) {
    return 0;
  }
  
  const pos = n - 1;
  return (1 + Math.pow(-1, pos)) / 2 + 2 * pos;
};

module.exports = {
  increment,
  findNthValue,
};
