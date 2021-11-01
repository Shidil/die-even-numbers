const { getConnection, tableName } = require("../shared/dal");

const remove10PlusEven = async function () {
  const connection = await getConnection();

  await connection.query(
    `DELETE FROM ${tableName} WHERE value >= 10 AND value % 2 = 0`
  );

  connection.release();
};

module.exports = {
  remove10PlusEven,
};
