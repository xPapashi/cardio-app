const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  connTest,
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} = require("../controllers/authController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", connTest);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.post("/logout", logoutUser);

module.exports = router;
