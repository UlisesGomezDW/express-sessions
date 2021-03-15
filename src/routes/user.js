const { Router } = require("express")
const route = Router()
const { getAllUsers, getUserById } = require("./../models/user")
const { registerUser, userLogin } = require("./../controllers/user.controller")
const { checkToken } = require("./../services/auth/authMiddleware")

route.post("/user", registerUser)
route.post("/login", userLogin)

route.use(checkToken)

route.get("/profile", async (req, res) => {
    if (req.userId) {
        const results = await getUserById(req.userId)
        if (results) {
            res.json({ success: true, data: results }).status(200)
        } else {
            res.json({ message: "error", data: results }).status(404)
        }
    } else {
        res.json({ message: "not param" }).status(404)
    }
})

route.get("/user", async (req, res) => {
    const results = await getAllUsers()
    if (results) {
        res.json({ message: "hola", data: results }).status(200)
    } else {
        res.json({ message: "error", data: results }).status(404)
    }
})

module.exports = route
