const { validationResult } = require("express-validator");

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Return all error messages for better debugging
    return res.status(422).json({
      errors: errors.array().map((err) => ({
        param: err.param,
        message: err.msg,
      })),
    });
  }

  next();
};
