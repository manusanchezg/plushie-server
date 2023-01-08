require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-acces-token"];
  if (!token) res.send({ message: "Not authenticated" });
  else {
    jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
      if (err)
        res.status(403).json({ auth: false, message: "Failed authentication" });
    else {
        req.userId = decoded.id
        next()
    }
    });
  }
};

module.exports = verifyJWT