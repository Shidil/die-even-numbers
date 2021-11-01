const express = require("express");
const { doStuff } = require("./doStuffApi");
const { increment } = require("./increment");
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

app.listen(3000);
