const mongoose = require("mongoose");
require("dotenv").config(); // Import dotenv
const UserModel = require("./models/user.model");
const { Result } = require("postcss");

mongoose
  .connect(process.env.URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

UserModel.collection.dropIndexes(function (err, results) {
  if (err) {
    console.log("Failed to drop indexes:", err);
  } else {
    let results = UserModel.init()
      .then(function () {
        console.log(results);
        console.log("Recreated indexes");
        mongoose.connection.close(); // Close the connection after recreating the indexes
      })
      .catch(function (error) {
        console.log("Failed to recreate indexes:", error);
      });
  }
});
