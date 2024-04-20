const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

//Database Connecting
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
    console.log("Database: Connected");
  })
  .catch(() => console.log("Database: Unable to connect", err));

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/authRoutes"))
app.use("/", require("./routes/foodRoutes"))