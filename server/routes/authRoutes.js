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
    origin: "https://cardio-app-zqxv.vercel.app",
  })
);


router.get("/", connTest);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.put("/setCalorieGoal", setCalorieGoal);
router.post("/logout", logoutUser);

module.exports = router;
