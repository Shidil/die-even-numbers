// const db = require("../shared/dal");
const { app } = require("./api");

var server = app.listen(8000, function () {
    console.log("Listening on 8000 :)");
});

// TODO: call db.tearDown on server end
