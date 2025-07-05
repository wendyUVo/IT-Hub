const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// LOCAL STRATEGY for login with email & password
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.getUserByEmail(email, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: "Unknown Email" });

      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) return done(err);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid Password" });
        }
      });
    });
  })
);

// Serialize user to session (stores user ID)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session using ID
passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
