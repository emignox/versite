const getPost = require("../controllers/controller-getPost");
const express = require("express");
const router = express.Router();

getPost(router);

module.exports = router;
