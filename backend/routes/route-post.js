const Post = require("../controllers/controller-post");
const express = require("express");
const router = express.Router();

Post(router);

module.exports = router;
