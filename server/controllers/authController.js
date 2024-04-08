const User = require("../models/user");
const { hashPassword, comparePasswords } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const connTest = (req, res) => {
  res.json("Test connection is working!");
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
        error: "Password is required and it sohuld be at least 6 characters long!",
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
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
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

//Get User Account
const getAccount = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  connTest,
  registerUser,
  loginUser,
  getAccount,
};
