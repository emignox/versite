const mongoose = require("mongoose");
const User = require("../models/user");

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: false },
  content: { type: String, required: false },
  picture: { type: String, required: false },
  likes: { type: Number, required: false, default: 0 },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: { type: String },
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
