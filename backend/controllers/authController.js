const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Create a token
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};

module.exports.signUp = async (req, res) => {
  const { username, email, password } = req.body; // Destructure the username, email, and password from req.body
  try {
    const user = await UserModel.create({ username, email, password }); // Create a new user
    res.status(201).json({ user: user._id }); // Send the new user's id in the response
  } catch (err) {
    const errors = SignUpErrors(err);
    res.status(400).json({ errors }); // Send the error in the response
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body; // Destructure the email and password from req.body
  try {
    const user = await UserModel.login(email, password); // Log the user in
    const token = createToken(user._id); // Create a token
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge,
    }); // Store the token in a cookie
    res.status(200).json({ user: user._id }); // Send the user's id in the response
  } catch (err) {
    const errors = SignInErrors(err);
    res.status(400).json({ errors }); // Send the error in the response
  }
};
//LOGOUT//
module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 }); // Clear the token from the cookie
  res.redirect("/login"); // Redirect to the home page
};
