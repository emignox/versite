const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const { uploadErrors } = require("../utils/errors.utils");
const { set } = require("mongoose");
const pipeline = promisify(require("stream").pipeline);
const Readable = require("stream").Readable;
const path = require("path");

module.exports.uploadProfil = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file was uploaded." });
  }
  let ext = req.file.mimetype.split("/")[1];

  try {
    if (ext != "jpg" && ext != "png" && ext != "jpeg")
      throw Error("Invalid file");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }

  const fileName = req.body.name + "." + ext;
  const readableStream = new Readable();
  readableStream.push(req.file.buffer);
  readableStream.push(null);

  await pipeline(
    readableStream,
    fs.createWriteStream(
      path.join(
        __dirname,
        "..",
        "..",
        "whisper",
        "client",
        "public",
        "uploads",
        "profil",
        fileName
      )
    )
  );
  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: "./uploads/profil/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true } //upsert: true, setDefaultsOnInsert: true
    );
    if (!req.body.userId) throw Error("userId not found");
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    return res.status(201).json({ err });
  }
};
