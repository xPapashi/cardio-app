const express = require("express");
const router = express.Router();
const cors = require("cors");
const { connTest, registerUser } = require("../controllers/authController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", connTest);
router.post("/register", registerUser)

module.exports = router;
