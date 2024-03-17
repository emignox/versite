const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    likers: {
      type: [String],
      required: true,
    },
    comments: [
      {
        commenterId: String,
        commenterUsername: String,
        text: String,
        timestamp: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
