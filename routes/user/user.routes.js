const authorize = require("../../utils/authorize");
const express = require("express");
const {
    register,
} = require("./user.controller.js");
const userRoutes = express.Router();

userRoutes.post("/register", register);

module.exports = userRoutes;
