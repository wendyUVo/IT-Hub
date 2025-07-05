const { check } = require("express-validator");

exports.userSignupValidator = [
  check("name").trim().notEmpty().withMessage("Name is required"),

  check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email address"),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),
];

exports.userSigninValidator = [
  check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email address"),

  check("password").notEmpty().withMessage("Password is required"),
];
