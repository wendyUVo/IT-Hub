const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../../config/isAuthenticated");
const Profile = require("../../../models/profile");
const User = require("../../../models/user");

// Get current user's profile
router.get("/me", isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "profilePicUrl"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update current user's profile
router.post("/update", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const { bio, facebook, youtube, linkedin, instagram, profilePicUrl } =
      req.body;

    const profileFields = {
      user: userId,
      bio,
      social: { facebook, youtube, linkedin, instagram },
    };

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: profileFields },
      { new: true }
    );

    if (profilePicUrl) {
      const user = await User.findById(userId);
      user.profilePicUrl = profilePicUrl;
      await user.save();
    }

    return res
      .status(200)
      .json({ msg: "Profile updated successfully", profile: updatedProfile });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// Get profile by user ID
router.get("/user/:id", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    const posts = await Post.find({ postedBy: req.params.id }).populate(
      "postedBy",
      "_id name"
    );
    res.json({ user, posts });
  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
});

module.exports = router;
