require("dotenv").config();
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users");
const controller = new UserController();
const verifyJWT = require("../middlewares/auth");

/* GET users listing. */
// router.get("/", (req, res, next) => {
//   db.query(`SELECT * FROM user`, (err, result) => {
//     if (err) console.log(err);
//     res.status(200).send(result);
//   });
// });

router.post("/register", (req, res) => {
  const { username, password, email } = req.body;
  controller
    .register(username, password, email)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.get("/login", (req, res) => {
  if (req.session.user && req.session.user.isAdmin === "true"){
    res.send({ loggedIn: true, user: req.session.user });
    console.log("entre")
  }
  else if (req.session.user) {
    delete req.session.user.isAdmin;
    res.send({ loggedIn: true, user: req.session.user });
    console.log("Entre sin ser admin")
  } else res.send({ loggedIn: false });
});

router.get("/auth", verifyJWT, (req, res) => {
  res.send({ message: "You're authenticated" });
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  controller
    .login(req, username, password)
    .then((result) => {
      console.log(result)
      res.status(200).json(result)})
    .catch((err) => {
      console.log(err)
      res.status(404).json(err)});
});

router.post("/logout", (req, res, next) => {
  res.clearCookie("userId").send({ message: "Logged out successful" });
});

router.get("/:id", (req, res) => {
  const { password, username } = req.body;
  controller
    .getUserInfo(username, password)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.put("/:username", (req, res) => {
  const { username } = req.params;
  const { name, lastName, birthdate, shippingAddress } = req.body;
  controller
    .modifyUserData(username, name, lastName, birthdate, shippingAddress)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
