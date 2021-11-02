const db = require("../shared/dal");
const { getRandomId } = require("../shared/getRandomId");
const { remove10PlusEven } = require("./remove10PlusEven");

describe("remove10PlusEven", () => {
  // even and greater than or equal to 10
  const victims = [
    { id: getRandomId(), value: 10 },
    { id: getRandomId(), value: 144 },
  ];

  // either odd or less than 10
  const bystanders = [
    { id: getRandomId(), value: 5 },
    { id: getRandomId(), value: 6 },
    { id: getRandomId(), value: 13 },
    { id: getRandomId(), value: 131 },
  ];

  beforeAll(async () => {
    // setup, insert some values to db
    await Promise.all(
      [...victims, ...bystanders].map(async (x) => {
        await db.insertValue(x.id, x.value);
      })
    );
  });

  afterAll(() => {
    db.tearDown();
  });

  test("values above 10 and even gets removed", async () => {
    // verify setup
    let result = await Promise.all(
      [...victims, ...bystanders].map(async (x) => {
        const res = await db.getCurrentValue(x.id);
        return res.value === x.value;
      })
    );
    expect(result.every((x) => x === true)).toBe(true);

    // execute suspect method
    await remove10PlusEven();

    // verify aftermath, bystanders remain where victims are removed
    result = await Promise.all(
      bystanders.map(async (x) => {
        const res = await db.getCurrentValue(x.id);
        return res.value === x.value;
      })
    );
    expect(result.every((x) => x === true)).toBe(true);

    result = await Promise.all(
      victims.map(async (x) => {
        const res = await db.getCurrentValue(x.id);
        return res === undefined;
      })
    );

    expect(result.every((x) => x === true)).toBe(true);

  });
});
