const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../../config/isAuthenticated");
const Profile = require("../../../models/profile");
const User = require("../../../models/user");

router.get("/me", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name profilePicUrl");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "profilePicUrl"]
    );

    if (!profile) {
      // Always return a consistent, non-null object
      return res.status(200).json({
        user,
        bio: "",
        social: {
          facebook: "",
          youtube: "",
          linkedin: "",
          instagram: "",
        },
      });
    }

    return res.status(200).json(profile);
  } catch (err) {
    console.error("❌ Error in /me route:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Update current user's profile
router.post("/update", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;

    const { bio, social, profilePicUrl } = req.body;

    const profileFields = {
      user: userId,
      bio,
      social: {
        facebook: social?.facebook || "",
        youtube: social?.youtube || "",
        linkedin: social?.linkedin || "",
        instagram: social?.instagram || "",
      },
    };
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: profileFields },
      {
        new: true,
        upsert: true, //  creates profile if not exists
        setDefaultsOnInsert: true,
      }
    );

    if (profilePicUrl) {
      const user = await User.findById(userId);
      user.profilePicUrl = profilePicUrl;
      await user.save();
    }

    console.log("✅ Updated Profile:", updatedProfile);

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
