const express = require("express");
const router = express.Router();
const cors = require("cors");

const { addFood } = require("../controllers/foodController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/addFood", addFood);

module.exports = router;
