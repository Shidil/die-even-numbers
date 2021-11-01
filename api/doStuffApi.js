const { getCurrentValue, updateValue } = require("../shared/dal");
const { increment } = require("../shared/increment");

const doStuff = async function (id) {
    const current = await getCurrentValue(id);
    const nextValue = increment(current);

    await updateValue(id, nextValue);
};

module.exports = {
    doStuff,
};
