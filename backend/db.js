const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

module.exports = mongoose;
