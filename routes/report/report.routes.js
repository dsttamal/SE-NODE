const authorize = require("../../utils/authorize");
const express = require("express");
const { addReport, viewAll, viewByUser, view, approve } = require("./report.controller.js");
const reportRoutes = express.Router();

reportRoutes.post("/add", authorize(), addReport);
reportRoutes.get("/view", authorize(), viewAll);
reportRoutes.get("/view/user/:id", authorize(), viewByUser);
reportRoutes.get("/view/:id", view);
reportRoutes.post("/approve", authorize(), approve);

module.exports = reportRoutes;
