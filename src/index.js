const express = require("express")
const app = express()
const path = require("path")
const morgan = require("morgan")
const port = 4000
const session = require("express-session")
const flash = require("connect-flash")
const cors = require("cors")
const route = require("./routes/user")
const bodyParser = require("body-parser")
require("dotenv").config()
// Settings
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// Middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(
    session({
        secret: "mysecretkey",
        resave: false,
        saveUninitialized: false,
    })
)
app.use(flash())
app.use(bodyParser.json())
app.use((req, res, next) => {
    app.locals.messages = req.flash("success")
    next()
})

app.use(route)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
