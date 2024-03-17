const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [isEmail, "Please enter a valid email"],
      lowercase: true,
    },
    password: { type: String, required: true, minlength: 4, maxlength: 1024 },
    bio: { type: String, maxlength: 1024 },
    followers: { type: [String] },
    following: { type: [String] },
    picture: { type: String, default: "" },
    likes: { type: [String] },
  },
  { timestamps: true }
);

// salt pass
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// login static
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
