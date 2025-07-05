const router = require("express").Router();
const ProfileRoutes = require("./profile");

// User routes
router.use("/", ProfileRoutes);

module.exports = router;