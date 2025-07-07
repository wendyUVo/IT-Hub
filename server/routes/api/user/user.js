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
router.post("/login", userSigninValidator, runValidation, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: info.message || "Login failed" });
    }

    // Persist login session
    req.login(user, (err) => {
      if (err) return next(err);
      return login(req, res);
    });
  })(req, res, next);
});

// Get current logged-in user
router.get("/", isAuthenticated, getCurrentUser);

router.get("/user", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Logout
// router.get("/logout", logout);
router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.clearCookie("connect.sid"); // clears cookie from browser
    res.status(200).send("Logged out");
  });
});

module.exports = router;
