const User = require("../models/user");
const {hashPassword, comparePassword} = require("../helpers/auth")

const connTest = (req, res) => {
  res.json("Test connection is working!");
};

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

module.exports = {
  connTest,
  registerUser,
};
