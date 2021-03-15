const jwt = require("jwt-simple")
const moment = require("moment")
const { TOKEN_KEY } = require("./../constants")

function createToken(user) {
    let payload = {
        userID: user.id,
        createdAt: moment().unix(),
        expiresAt: moment().add(2, "days").unix(),
    }

    return jwt.encode(payload, TOKEN_KEY)
}

module.exports = {
    createToken,
}
