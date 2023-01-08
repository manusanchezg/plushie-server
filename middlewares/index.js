const uuid = require("uuid")
const session = require("express-session")

const sessionMiddleware = session({
    genpid: req => {
        return uuid.v4()
    },
    key: "userId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
})

module.exports = sessionMiddleware