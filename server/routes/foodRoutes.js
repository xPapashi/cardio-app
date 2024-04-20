const express = require("express");
const router = express.Router();
const cors = require("cors");

const { addFood, getAllFoods } = require("../controllers/foodController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/addFood", addFood);
router.post("/getAllFoods", getAllFoods);

module.exports = router;
