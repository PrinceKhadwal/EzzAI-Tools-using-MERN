const express = require("express");
const {
  getUser,
  login,
  register,
} = require("../controllers/userController.js");
// const { isLoggedIn } = require("./middleware/isLoggedIn.js");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getUser);

module.exports = router;