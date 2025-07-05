const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    body: { type: String, default: "" },
    // Consider linking to user directly if needed later:
    // createdBy: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Post", postSchema);
