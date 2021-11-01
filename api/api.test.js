const request = require("supertest");
const { app } = require("./api");
const db = require("../shared/dal");

const randId = "test_rec_" + Math.random();

describe("/do-stuff non existent", () => {
  test("value for non existent id results in 1", async () => {
    await request(app)
      .post("/do-stuff")
      .send({ id: randId })
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          success: true,
          result: 1,
        });
      });
  });
});

describe("/do-stuff existing", () => {
  test("odd values gets incremented by 1", async () => {
    await request(app)
      .post("/do-stuff")
      .send({ id: randId })
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          success: true,
          result: 2,
        });
      });
  });
});

describe("/do-stuff existing even", () => {
  afterAll(() => {
    db.tearDown();
  });

  test("even values gets incremented by 1", async () => {
    await request(app)
      .post("/do-stuff")
      .send({ id: randId })
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          success: true,
          result: 5,
        });
      });
  });
});
