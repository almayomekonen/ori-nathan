const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { username, password, email, fullName } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      email,
      fullName,
    });

    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error, "Error Signin the user.");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "User Logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        token: token,
        name: user.fullName,
      },
    });
  } catch (error) {
    console.error(error, "❌ Error occured ❌");
  }
};
