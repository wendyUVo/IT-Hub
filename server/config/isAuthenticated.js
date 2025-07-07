// middleware/isAuthenticated.js
module.exports = function (req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  // If user is not logged in, redirect to login
  return res.status(401).json({ msg: "Unauthorized" });
};
