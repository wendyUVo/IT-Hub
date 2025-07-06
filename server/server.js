const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const routes = require("./routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ========== Middleware ==========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret", // better to move to .env
    resave: false,
    saveUninitialized: false,
  })
);

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend Vite URL
    credentials: true,
  })
);

// Passport config
// const passport = require("./config/passport"); // if you have a config/passport.js file
// app.use(passport.initialize());
// app.use(passport.session());
const passport = require("passport");
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// ========== Static Assets ==========
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist")); // or "client/build" for CRA
}

// ========== Routes ==========
app.use("/api", routes);

// ========== MongoDB Connection ==========
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/itHub", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));
// console.log("MONGODB_URI:", process.env.MONGODB_URI);

// ========== Start Server ==========
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
