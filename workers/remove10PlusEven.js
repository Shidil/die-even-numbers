const { getConnection } = require("../shared/dal");

const remove10PlusEven = async function () {
  const connection = await getConnection();

  await connection.query(`call sp_removeNPlusEven(10)`);

  connection.release();
};

module.exports = {
  remove10PlusEven,
};
