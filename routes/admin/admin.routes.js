const authorize = require("../../utils/authorize");
const express = require("express");
const { login } = require("./admin.controller.js");
const adminRoutes = express.Router();


adminRoutes.post("/login", login);

module.exports = adminRoutes;
