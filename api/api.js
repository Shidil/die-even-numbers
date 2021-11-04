const express = require("express");
const { incrementValue, getCurrentValue } = require("../shared/dal");
const app = express();

app.use(express.json());

/**
 * POST /increment-value
 * @params JSON { id } string
 * Updates db record for given id, based on business rule in findNthValue(x)
 */
app.post("/increment-value", async function (req, res) {
  const params = req.body;
  const result = await incrementValue(params.id);

  res.json({
    success: true,
    result: 0,
  });
});

/**
 * GET /get-value
 * @params QUERY { id } string
 * Returns current value in db for the given id
 */
app.get("/get-value", async function (req, res) {
  const params = req.query;
  const record = await getCurrentValue(params.id);
  const result = record ? record.value : 0;

  res.json({
    success: true,
    result,
  });
});

module.exports = {
  app,
};
