const auth = require("../controllers/controller-auth");
const express = require("express");
const router = express.Router();

auth(router);

module.exports = router;
