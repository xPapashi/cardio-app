const User = require("../models/user");
const { hashPassword, comparePasswords } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const connTest = (req, res) => {
  res.json("Test connection is working!!!");
};

//Register User function
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Check if name entered
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    //Check if pass valid
    if (!password || password.length < 6) {
      return res.json({
        error:
          "Password is required and it sohuld be at least 6 characters long!",
      });
    }
    //Check email taken/valid
    //if email exists find in database
    if (!email) {
      return res.json({
        error: "Email is required!",
      });
    }

    const takenEmail = await User.findOne({ email });
    if (takenEmail) {
      return res.json({
        error: "Email is already taken!",
      });
    }

    const hashedPassword = await hashPassword(password);

    //Create new user after checking
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(newUser);
  } catch (error) {
    console.log(error);
  }
};

//Login User function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found!",
      });
    }

    //Check if passwords match
    const match = await comparePasswords(password, user.password);
    if (match) {
      console.log("User logged in successfully!");
      console.log(`JWT SECRET: ${process.env.JWT_SECRET}`);
      jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          calorieGoal: user.calorieGoal,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" },
        (err, token) => {
          if (err) throw err;

          console.log("Generated Token:", token);
          res.cookie("token", token).json(user);
        }
      );
    }

    if (!match) {
      res.json({
        error: "Passwords do not match!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  console.log(`GET PROFILE JWT SECRET: ${process.env.JWT_SECRET}`);

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }

  console.log("Received Token:", token);
};

const setCalorieGoal = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      const { calorieGoal } = req.body;
      const updatedUser = await User.findByIdAndUpdate(user.id, {
        calorieGoal: calorieGoal,
      });
      res.json(updatedUser); // Only send the response once
    });
  } else {
    res.json(null);
  }
};

// Logout User function
const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User logged out successfully!" });
};

module.exports = {
  connTest,
  registerUser,
  loginUser,
  getProfile,
  setCalorieGoal,
  logoutUser,
};
