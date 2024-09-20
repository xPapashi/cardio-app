const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  connTest,
  registerUser,
  loginUser,
  getProfile,
  setCalorieGoal,
  logoutUser,
} = require("../controllers/authController");

router.use(
  cors({
    credentials: true,
    origin: process.env.VITE_REACT_APP_BACKEND_BASEURL,
  })
);

console.log(`AuthROutes backend url is: ${process.env.VITE_REACT_APP_BACKEND_BASEURL}`);

router.get("/", connTest);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.put("/setCalorieGoal", setCalorieGoal);
router.post("/logout", logoutUser);

module.exports = router;
