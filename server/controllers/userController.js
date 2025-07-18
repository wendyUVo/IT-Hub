const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

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
    await newUser.save();

    // //Automatically create a profile for the new user
    // const newProfile = new Profile({
    //   user: newUser._id,
    //   status: "New user",
    //   skills: [],
    //   bio: "",
    //   social: {
    //     facebook: "",
    //     youtube: "",
    //     linkedin: "",
    //     instagram: "",
    //   },
    // });

    // await newProfile.save();

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
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }

  // Passport already authenticated the user and stored it in req.user
  return res.status(200).json({
    message: "Login successful",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profilePicUrl: req.user.profilePicUrl,
    },
  });
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
