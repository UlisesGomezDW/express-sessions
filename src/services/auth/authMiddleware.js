const jwt = require("jwt-simple")
const moment = require("moment")
const { TOKEN_KEY } = require("./../../constants")

async function checkToken(req, res, next) {
    if (!req.headers.authorization) {
        res.json({ message: "Not header auth" })
    } else {
        const token = req.headers.authorization.split("Bearer ")[1]
        let payload = null
        try {
            payload = jwt.decode(token, TOKEN_KEY)
        } catch (e) {
            return res.json({ message: "invalid token", error: e })
        }

        if (moment().unix() > payload.expiresAt) {
            return res.json({ message: "expired token" })
        }

        req.userId = payload.userID
        next()
        return
    }
}

module.exports = { checkToken }
