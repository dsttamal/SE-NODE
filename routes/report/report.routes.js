const authorize = require("../../utils/authorize");
const express = require("express");
const { addReport, viewAll, viewByUser, view } = require("./report.controller.js");
const reportRoutes = express.Router();

reportRoutes.post("/add", authorize(), addReport);
reportRoutes.get("/view", authorize(), viewAll);
reportRoutes.get("/view/user/:id", authorize(), viewByUser);
reportRoutes.get("/view/:id", view);

module.exports = reportRoutes;
