const mysql = require("mysql2/promise");
const { env } = require("process");

// Fixme: Read from env
const pool = mysql.createPool({
  host: env.DB_HOSTNAME,
  user: env.DB_USERNAME,
  database: env.DB_DATABASE,
  password: env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  port: env.DB_PORT,
});

const tearDown = function () {
  pool.end();
};

const TABLE_NAME = "values_rec";

const getCurrentValue = async function (id) {
  const [result] = await pool.query(
    `SELECT value from ${TABLE_NAME} WHERE id = ${mysql.escape(id)}`
  );

  return result[0];
};

const incrementValue = async function (id) {
  await pool.query(`call sp_incrementValue(${mysql.escape(id)})`);
};

const updateValue = async function (id, value) {
  await pool.query(
    `UPDATE ${TABLE_NAME} SET value = ${mysql.escape(
      value
    )}  WHERE id = ${mysql.escape(id)}`
  );
};

// INSERT INTO values_rec(id, value) VALUES ('[value-1]',10)
const insertValue = async function (id, value) {
  await pool.query(
    `INSERT INTO ${TABLE_NAME}(id, value) VALUES(${mysql.escape(
      id
    )}, ${mysql.escape(value)})`
  );
};

// TODO insert

module.exports = {
  getCurrentValue,
  updateValue,
  insertValue,
  tearDown,
  incrementValue,
  getConnection: async () => pool.getConnection(),
  tableName: TABLE_NAME,
};
