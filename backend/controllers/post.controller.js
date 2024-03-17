const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const { uploadErrors } = require("../utils/errors.utils");
const { Readable } = require("stream");
const fs = require("fs");
const { pipeline } = require("stream").promises;

module.exports.readPost = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 });
    res.send(posts);
  } catch (err) {
    console.log("Error to get data : " + err);
  }
};

module.exports.createPost = async (req, res) => {
  let fileName;
  let ext;

  if (req.file) {
    ext = req.file.mimetype.split("/")[1];
    if (ext != "jpg" && ext != "png" && ext != "jpeg") {
      const errors = uploadErrors(new Error("Invalid file"));
      return res.status(201).json({ errors });
    }

    if (req.file.size > 500000) {
      const errors = uploadErrors(new Error("max size"));
      return res.status(201).json({ errors });
    }

    fileName = req.body.posterId + Date.now() + "." + ext;
    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);
    await pipeline(
      readableStream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/posts/${fileName}`
      )
    );
  } else {
    fileName = req.body.posterId + Date.now() + ".jpg";
  }

  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: "./uploads/posts/" + fileName,
    video: req.body.video,
    likers: [],
    comments: [],
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//updatePost

module.exports.updatePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
  };

  try {
    let docs = await PostModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true }
    );
    if (!docs) {
      console.log("Update error : Document not found");
    } else {
      res.send(docs);
    }
  } catch (err) {
    console.log("Update error : " + err);
  }
};

module.exports.deletePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    let post = await PostModel.findOneAndDelete(req.params.id);
    if (!post) {
      res.status(404).send("Post not found");
    } else {
      res.send(post);
    }
  } catch (err) {
    console.log("Delete error : " + err);
  }
};

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const like = await PostModel.findById(req.params.id);
    if (!like.likers.includes(req.body.id)) {
      await like.updateOne({ $push: { likers: req.body.id } });
      res.status(200).send("The post has been liked");
    } else {
      await like.updateOne({ $pull: { likers: req.body.id } });
      res.status(200).send("The post has been unliked");
    }
  } catch (err) {
    console.log("Like error : " + err);
  }
};

module.exports.commentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterUsername: req.body.commenterUsername,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).send("Post not found");
    }

    return res.send(updatedPost);
  } catch (err) {
    console.log("Comment error : " + err);
    return res.status(500).send(err);
  }
};

module.exports.editCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const docs = await PostModel.findById(req.params.id);

    const theComment = docs.comments.find((comment) =>
      comment._id.equals(req.body.commentId)
    );

    if (!theComment) return res.status(404).send("Comment not found");

    theComment.text = req.body.text;

    try {
      await docs.save();
      return res.status(200).send(docs);
    } catch (err) {
      console.log("Save error : " + err);
      return res.status(500).send(err);
    }
  } catch (err) {
    console.log("Edit comment error : " + err);
    return res.status(500).send(err);
  }
};

module.exports.deleteCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const docs = await PostModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true }
    );

    if (!docs) {
      return res.status(404).send("Post not found");
    }

    return res.send(docs);
  } catch (err) {
    console.log("Delete comment error : " + err);
    return res.status(500).send(err);
  }
};
