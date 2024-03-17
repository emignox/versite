const mongoose = require("mongoose");
require("dotenv").config(); // Import dotenv

mongoose
  .connect(process.env.URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

module.exports = mongoose; // Export mongoose
