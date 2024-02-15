const multer = require("multer");
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "publics/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const createUser = (app) => {
  app.post("/create-user", upload.single("profile_image"), async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        ...req.body,
        password: hashedPassword,
        profile_image: req.file.path, // Modifica qui
      });

      const result = await newUser.save();
      console.log(result);

      res.json(result);
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .send("Si è verificato un errore durante il recupero dei dati");
    }
  });
};

module.exports = createUser;
