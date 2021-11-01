// const db = require("../shared/dal");
const { app } = require("./api");

const port = process.env.PORT || 8000;

var server = app.listen(port, function () {
  console.log(`Listening on ${port} :)`);
});

// TODO: call db.tearDown on server end
