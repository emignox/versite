const Post = require("../models/post");

const getPost = (app) => {
  app.get("/", async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
      console.log(posts);
    } catch (error) {
      res
        .status(500)
        .send("Si è verificato un errore durante il recupero dei dati");
    }
  });
};

module.exports = getPost;
