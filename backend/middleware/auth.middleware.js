const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
require("dotenv").config();

module.exports.checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        console.log(decodedToken.id);
        let user = await UserModel.findById(decodedToken.id); // Find the user
        res.locals.user = user; // Set the user
        console.log(user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(200).json("no token");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("no token");
  }
};
