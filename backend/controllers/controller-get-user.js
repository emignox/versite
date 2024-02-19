// controller-get-user.js
const express = require("express");
const User = require("../models/user");

const getUser = (router) => {
  router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      console.log(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .send("Si è verificato un errore durante il recupero dei dati");
    }
  });
};

module.exports = getUser;
