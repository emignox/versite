const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    lastname: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, maxlength: 100 },
    password: { type: String, required: true, minleght: 5 },
    profile_image: { type: String, required: false },
    active: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    occupation: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
