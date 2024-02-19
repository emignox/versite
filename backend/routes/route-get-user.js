// route-get-user.js
const getUser = require("../controllers/controller-get-user");
const express = require("express");
const router = express.Router();

getUser(router);

module.exports = router;
