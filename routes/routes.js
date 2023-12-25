const express = require("express");
const authController = require("../controllers/authController");
const route = express.Router();

route.post("/signup", authController.addUser);
route.post("/login", authController.login);
route.post("/findEmail", authController.findEmail);
route.post("/update", authController.updatePass);

module.exports = route;
