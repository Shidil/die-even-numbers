const request = require("supertest");
const { app } = require("./api");

describe("root", () => {
    test("/do-stuff with valid id", async () => {
        await request(app)
            .post("/do-stuff", { id: "test_rec" })
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    success: true,
                    result: 1,
                });
            });
    });
});
