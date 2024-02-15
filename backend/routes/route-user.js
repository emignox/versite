const express = require("express");
const router = express.Router();
const createUser = require("../controllers/controllers-users");

createUser(router);

module.exports = router;
