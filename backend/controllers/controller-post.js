const multer = require("multer");
const mongoose = require("mongoose");
const Post = require("../models/post"); // Importa il modello Post

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "publics/post");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const postController = (app) =>
  app.post("/", upload.single("picture"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    try {
      const newPost = new Post({
        ...req.body,
        picture: req.file ? req.file.path : undefined,
      });

      const result = await newPost.save();
      console.log(result);

      res.json(result);
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .send("Si è verificato un errore durante il recupero dei dati");
    }
  });

module.exports = postController;
