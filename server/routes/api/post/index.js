const router = require("express").Router();
const postRoutes = require("./posts");
// const userRoutes = require("./user");

// Post routes
// router.use("/posts", postRoutes);
// router.use("/user", userRoutes);
router.use("/", postRoutes);

module.exports = router;
