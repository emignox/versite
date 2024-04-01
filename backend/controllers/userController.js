const { json } = require("body-parser");
const UserModel = require("../models/user.model");

const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

  try {
    const user = await UserModel.findById(req.params.id).select("-password");
    if (!user) throw Error("ID unknow : " + req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

  try {
    let user = await UserModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          bio: req.body.bio,
          username: req.body.username, // aggiungi questo
          email: req.body.email, // e questo
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!user) throw Error("Something went wrong");
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

  try {
    let user = await UserModel.findOneAndDelete({ _id: req.params.id }).exec();
    if (!user) throw Error("Something went wrong");
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

///CODE FOR FOLLOW A USER///
module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknow : " + req.params.id);
  /// UPEDATE THE FOLLOWER LIST///
  try {
    let follower = await UserModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $addToSet: {
          following: req.body.idToFollow,
        },
      },
      { new: true, upsert: true }
    );
    if (!follower) throw Error("Something went wrong");
    ///UPDATE THE FOLLOWING LIST///
    let following = await UserModel.findOneAndUpdate(
      {
        _id: req.body.idToFollow,
      },
      {
        $addToSet: {
          followers: req.params.id,
        },
      },
      { new: true, upsert: true }
    );
    if (!following) throw Error("Something went wrong");

    res.status(200).json({
      message: "You are now following " + req.body.idToFollow,
      followedBy: req.params.id,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//code for unfollowing a user//
module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnFollow)
  )
    return res.status(400).send("ID unknow : " + req.params.id);

  try {
    let follower = await UserModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $pull: {
          following: req.body.idToUnFollow,
        },
      },
      { new: true, upsert: true }
    );
    if (!follower) throw Error("Something went wrong");
    ///UPDATE THE FOLLOWING LIST///
    let following = await UserModel.findOneAndUpdate(
      {
        _id: req.body.idToUnFollow,
      },
      {
        $pull: {
          followers: req.params.id,
        },
      },
      { new: true, upsert: true }
    );
    if (!following) throw Error("Something went wrong");

    res.status(200).json({
      followedBy: req.params.id,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
