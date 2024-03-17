module.exports.signUpErrors = (err) => {
  const errors = { username: "", email: "", password: "" };
  if (err.message.includes("username"))
    errors.username = "Username incorrect or already taken";
  if (err.message.includes("email")) errors.email = "Email incorrect";
  if (err.message.includes("password"))
    errors.password = "The password must be 4 characters long";
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("username"))
    errors.username = "This username is already taken";
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "This email is already taken";
  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("email")) errors.email = "Email unknown";
  if (err.message.includes("password")) errors.password = "Incorrect password";
  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };
  if (err.message.includes("Invalid file"))
    errors.format = "Format incompatible";
  if (err.message.includes("max size"))
    errors.maxSize = "The file exceeds 500ko";
  return errors;
};
