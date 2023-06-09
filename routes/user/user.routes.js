const authorize = require("../../utils/authorize");
const express = require("express");
const { register, viewAll, view } = require("./user.controller.js");
const userRoutes = express.Router();

userRoutes.post("/register", authorize(), register);
userRoutes.get("/view", viewAll);
userRoutes.get("/view/:id", view);

module.exports = userRoutes;
