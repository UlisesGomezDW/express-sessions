const mysql = require("mysql")
const { HOST, PORT, PASSWORD, USER, BD_NAME } = require("./../constants")

const pool = mysql.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    port: PORT,
    database: BD_NAME,
})

module.exports = pool
