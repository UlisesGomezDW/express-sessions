const { createUser, getByEmail } = require("./../models/user")
const { createToken } = require("./../services/index")
const { mainMail } = require("./../services/mail")
const bcrypt = require("bcrypt")

async function registerUser(req, res, next) {
    const { email, password } = req.body
    if (email && password) {
        const encryptPass = bcrypt.hashSync(password, 10)
        const result = await createUser(email, encryptPass)
        mainMail()
        result
            ? res.json({ success: true, payload: result })
            : res.json({ success: false, payload: result, error: true })
    } else {
        res.json({ message: "datos no recibidos" }).status(400)
    }
}

async function userLogin(req, res) {
    const { email, password } = req.body
    if (email && password) {
        const user = await getByEmail(email)
        if (user === undefined) {
            res.json({ message: "user not found" }).status(400)
        } else {
            const equals = bcrypt.compareSync(password, user.password)
            if (!equals) {
                res.json({ success: false, message: "email or password is not correct", error: true })
            } else {
                res.json({ success: true, data: user, token: createToken(user) })
            }
        }
    } else {
        res.json({ message: "data not received" }).status(400)
    }
}

module.exports = {
    registerUser,
    userLogin,
}
