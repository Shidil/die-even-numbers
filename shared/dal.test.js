// TODO: populate test db
// test_rec = 15

const {
  getCurrentValue,
  updateValue,
  tearDown,
  insertValue,
} = require("./dal");

describe("dal tests. FIXME: use mocks", () => {
  afterAll(() => {
    tearDown();
  });

  const randId = "test_rec" + Math.random();

  test("insert value", async () => {
    await insertValue(randId, 15);
    const result = await getCurrentValue(randId);

    expect(result.value).toBe(15);
  });

  test("get value by id", async () => {
    const result = await getCurrentValue(randId);
    expect(result.value).toBe(15);
  });

  test("update value", async () => {
    await updateValue(randId, 15);
    const result = await getCurrentValue(randId);
    expect(result.value).toBe(15);
  });
});
