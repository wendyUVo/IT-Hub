const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    bio: { type: String, default: "" },
    company: { type: String, default: "" },
    website: { type: String, default: "" },
    location: { type: String, default: "" },

    status: { type: String, required: true, trim: true },
    skills: { type: [String], required: true },

    githubusername: { type: String, default: "" },
    social: {
      facebook: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      youtube: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
