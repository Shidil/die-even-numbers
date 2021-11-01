const mysql = require("mysql2");

// Fixme: Read from env
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "randIdsdostuff",
    password: "password@123",
});

// TODO: close connection

const TABLE_NAME = "values_rec";

const getCurrentValue = async function (id) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT value from \`${TABLE_NAME}\` WHERE \`id\` = "${id}"`,
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results ? results[0] : null);
                }
            }
        );
    });
};

const updateValue = function (id, value) {
    return new Promise((resolve, reject) => {
        connection.query(
            `UPDATE \`${TABLE_NAME}\` SET \`value\` = ${value}  WHERE \`id\` = "${id}"`,
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            }
        );
    });
};

// TODO insert

module.exports = {
    getCurrentValue,
    updateValue,
};
