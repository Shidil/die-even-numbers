const request = require("supertest");
const { app } = require("./api");
const db = require("../shared/dal");
const { getRandomId } = require("../shared/getRandomId");
const { findNthValue } = require("../shared/increment");
const { insertValue } = require("../shared/dal");

describe("/get-value", () => {
  test("default value for a record is 0", async () => {
    const id = "does_not_exist" + Math.random();

    await request(app)
      .get("/get-value?id=" + id)
      .expect(200)
      .then((res) => {
        expect(res.body.result).toEqual(0);
      });
  });

  test("result for existing record", async () => {
    const id = "existing_record" + Math.random();
    const value = 156;

    // setup, add new record to test against
    await insertValue(id, value);

    await request(app)
      .get("/get-value?id=" + id)
      .expect(200)
      .then((res) => {
        expect(res.body.result).toEqual(value);
      });
  });

  test("sql injection", async () => {
    await request(app).get("/get-value?id=xx;SELECT *").expect(200);
  });
});

const getValueById = async (id) => {
  return request(app)
    .get("/get-value?id=" + id)
    .expect(200)
    .then((res) => res.body.result);
};

const incrementById = async (id) => {
  return request(app).post("/increment-value").send({ id }).expect(200);
};

describe("/increment-value ", () => {
  test("value starts with 1", async () => {
    const randId = getRandomId();

    await request(app)
      .post("/increment-value")
      .send({ id: randId })
      .expect(200)
      .then((res) => {
        expect(res.body.success).toBe(true);
      });

    expect(await getValueById(randId)).toBe(1);
  });

  test("increment existing record for odd value", async () => {
    const randId = getRandomId();
    const currentValue = findNthValue(115);
    const nextValue = findNthValue(116);

    // setup
    await insertValue(randId, currentValue);

    // action
    await incrementById(randId);

    // assert
    expect(await getValueById(randId)).toBe(nextValue);
  });

  test("increment existing record for even value", async () => {
    const randId = getRandomId();
    const currentValue = findNthValue(56);
    const nextValue = findNthValue(57);

    // setup
    await insertValue(randId, currentValue);

    // action
    await incrementById(randId);

    // assert
    expect(await getValueById(randId)).toBe(nextValue);
  });

  test("sql injection", async () => {
    await request(app).get("/get-value?id=xx;SELECT *").expect(200);
  });
});

const isEven = (x) => x % 2 === 0;

describe("/increment-value concurrency", () => {
  afterAll(() => {
    db.tearDown();
  });

  const testConcurrency = async (reqCount) => {
    const id = getRandomId();

    // Fire n requests concurrently. If api/db handles concurrency correctly,
    // each requests should result in value in that record being increased n times
    const requests = new Array(reqCount).fill(id).map((x) => {
      return request(app).post("/increment-value").send({ id: x }).expect(200);
    });

    await Promise.all(requests);

    // Check value of test id after many concurrent api calls.
    // It must be odd, after 151 increments
    // It's value should be equal to findNthValue(151)
    await request(app)
      .get("/get-value?id=" + id)
      .expect(200)
      .then((res) => {
        expect(isEven(res.body.result)).toBe(isEven(reqCount));
        expect(res.body.result).toEqual(findNthValue(reqCount));
      });
  };

  /* After a value in record is incremented n times, if n is odd value is also odd
   * ie if n = 5 value will be 1 => 2 => 5 => 6 => 9 and 9 is odd
   * if n = 8 value will be 1 => 2 => 5 => 6 => 9 => 10 => 13 => 14 and 14 is even
   */
  test("after n(odd) updates to a record resulting value should be odd", async () => {
    await testConcurrency(151); // n, odd
  }, 10000);

  test("after n(even) updates to a record resulting value should be even", async () => {
    await testConcurrency(98); // n, even
  }, 10000);
});
