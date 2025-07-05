const express = require("express");
const router = express.Router();
const passport = require("../../../config/passport");
const isAuthenticated = require("../../../config/isAuthenticated");

const {
  signup,
  login,
  getCurrentUser,
  logout,
} = require("../../../controllers/userController");

// Validators
const { runValidation } = require("../../../validators");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../../../validators/auth");

// Register a new user
router.post("/signup", userSignupValidator, runValidation, signup);

// Login
router.post(
  "/login",
  userSigninValidator,
  runValidation,
  passport.authenticate("local"),
  login
);

// Get current logged-in user
router.get("/", isAuthenticated, getCurrentUser);

// Logout
router.get("/logout", logout);

module.exports = router;
