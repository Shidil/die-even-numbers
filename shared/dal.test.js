const {
  getCurrentValue,
  updateValue,
  tearDown,
  insertValue,
  incrementValue,
} = require("./dal");
const { getRandomId } = require("./getRandomId");
const { findNthValue } = require("./increment");

describe("dal tests. FIXME: use mocks", () => {
  afterAll(() => {
    tearDown();
  });

  const randId = getRandomId();

  test("insert value", async () => {
    await insertValue(randId, findNthValue(10));
    const result = await getCurrentValue(randId);

    expect(result.value).toBe(findNthValue(10));
  });

  test("get value by id", async () => {
    const result = await getCurrentValue(randId);
    expect(result.value).toBe(findNthValue(10));
  });

  test("update value", async () => {
    await updateValue(randId, findNthValue(16));
    const result = await getCurrentValue(randId);
    expect(result.value).toBe(findNthValue(16));
  });

  test("incrementValue value", async () => {
    await incrementValue(randId); // 17th value
    await incrementValue(randId); // 18th value
    const result = await getCurrentValue(randId);
    expect(result.value).toBe(findNthValue(18));
  });
});
