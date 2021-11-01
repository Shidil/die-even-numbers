// populate test db
// test_rec = 15

const { getCurrentValue, updateValue } = require("./dal");

describe("dal tests. FIXME: use mocks", () => {
    test("get value by id", async () => {
        const result = await getCurrentValue("test_rec");
        expect(result.value).toBe(15);
    });

    // test('update value', async () => {
    //     await updateValue('test_rec', 15);
    //     const result = await getCurrentValue("test_rec");
    //     expect(result.value).toBe(15);
    // })
});
