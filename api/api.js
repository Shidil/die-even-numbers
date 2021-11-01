const express = require("express");
// const db = require("../shared/dal");
const { doStuff } = require("./doStuffApi");
const app = express();

// POST /do-stuff takes randomId as input
app.post("/do-stuff", function (req, res) {
    const params = req.body;

    // get current value from db
    const result = doStuff(params.id);

    res.json({
        success: true,
        result,
    });
});

var server = app.listen(8000, function () {
    console.log("Listening on 8000 :)");
});

// TODO: call db.tearDown on server end
