const express = require("express");

const {
    getFoods,
    getFoodById,
    addFood,
    updateFood,
    deleteFood,
    getFoodsByDate,
    } = require("../controllers/foodController");

const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();

router.use(requireAuth);
router.get("/", getFoods);
router.get("/:id", getFoodById);
router.post("/", addFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);
router.get("/date/:date", getFoodsByDate);

module.exports = router;