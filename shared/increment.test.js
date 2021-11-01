const { increment } = require("./increment");

describe("increment", () => {
    test("increments even value by 3", () => {
        expect(increment(10)).toBe(13);
    });

    test("increments odd value by 1", () => {
        expect(increment(11)).toBe(12);
    });

    test("invalid input gets treated as 1", () => {
        expect(increment(null)).toBe(1)
    })
});
