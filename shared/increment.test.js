const { increment, findNthValue } = require("./increment");

describe("increment", () => {
  test("increments even value by 3", () => {
    expect(increment(10)).toBe(13);
  });

  test("increments odd value by 1", () => {
    expect(increment(11)).toBe(12);
  });

  test("invalid input gets treated as 1", () => {
    expect(increment(null)).toBe(1);
  });
});

describe("findNthValue", () => {
  test("starts with 1", () => {
    expect(findNthValue(1)).toBe(1);
  });

  test("1 2 5 6 9 and next is 10", () => {
    expect(findNthValue(6)).toBe(10);
  });

  test("51st value is 101", () => {
    expect(findNthValue(51)).toBe(101);
  });
});