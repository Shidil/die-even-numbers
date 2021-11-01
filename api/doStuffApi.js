const { getCurrentValue, updateValue, insertValue } = require("../shared/dal");
const { increment } = require("../shared/increment");

const doStuff = async function (id) {
    const record = await getCurrentValue(id);
    const current = record ? record.value : null;
    const nextValue = increment(current);

    if (typeof current !== "number") {
        await insertValue(id, nextValue);
    } else {
        await updateValue(id, nextValue);
    }

    return nextValue;
};

module.exports = {
    doStuff,
};
