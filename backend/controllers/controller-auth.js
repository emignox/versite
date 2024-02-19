const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { log } = require("console");

const auth = (app) => {
  app.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      console.log(req.body.email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      console.log(user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // User logged in successfully, generate a JWT
      JWT_SECRET = "secret";
      const secret = crypto.randomBytes(64).toString("hex");
      console.log(secret);
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    } catch (error) {
      console.error("Error generating JWT:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};

module.exports = auth;
