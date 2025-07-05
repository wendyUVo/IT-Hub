const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup Controller
exports.signup = async (req, res) => {
  const { name, email, password, profilePicUrl } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    // Create new user instance

    const newUser = new User({ name, email, password, profilePicUrl });

    // Save user to database
    await newUser.save();

    return res.status(201).json({ message: "Sigup success! Please log in." });
  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).json({
      error: "Server error. Please try again later.",
    });
  }
};

// Login Controller
exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }

  //Passport handles the session logic. Response with success
  const loginUser = {
    email: req.body.email,
  };
  return res.status(200).json({ message: "Login successful", user: loginUser });
};

//Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized user" });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// Logout Controller
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "Logout successful" });
  });
};
