const express = require("express");
const router = express.Router();
const cors = require("cors");

const { addFood, getAllFoods, updateFood, deleteFood } = require("../controllers/foodController");

router.use(
  cors({
    credentials: true,
    origin: `${process.env.VITE_REACT_APP_BACKEND_BASEURL}`,
  })
);

router.post("/addFood", addFood);
router.post("/getAllFoods", getAllFoods);
router.post("/updateFood", updateFood);
router.post("/deleteFood", deleteFood);

module.exports = router;
