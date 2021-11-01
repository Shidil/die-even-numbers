const express = require("express");
const { doStuff } = require("./doStuffApi");
const app = express();

app.use(express.json());

// POST /do-stuff takes randomId as input
app.post("/do-stuff", async function (req, res) {
    const params = req.body;
    const result = await doStuff(params.id);

    res.json({
        success: true,
        result,
    });
});

module.exports = {
    app,
};
