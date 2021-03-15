const db = require("./../config/database")

function getAllUsers() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users", (err, rows) => {
            if (err) reject(err)
            if (rows) {
                resolve(rows)
            }
        })
    })
}

function createUser(email, password) {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password], (err, result) => {
            if (err) reject(err)
            if (result) {
                resolve(result)
            }
        })
    })
}

function getByEmail(email) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
            if (err) reject(err)
            if (rows) {
                resolve(rows[0])
            }
        })
    })
}

function getUserById(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE id = ?", [id], (err, rows) => {
            if (err) reject(err)
            if (rows) {
                resolve(rows[0])
            }
        })
    })
}

module.exports = {
    getAllUsers,
    createUser,
    getByEmail,
    getUserById,
}
