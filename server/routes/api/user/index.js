const router = require("express").Router();
const userRoutes = require("./user");

// User routes
// router.use("/user", userRoutes);
router.use("/", userRoutes);

module.exports = router;
