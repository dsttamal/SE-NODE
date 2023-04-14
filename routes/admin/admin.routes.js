const authorize = require("../../utils/authorize");
const express = require("express");
const { login } = require("./admin.controller.js");
const adminRoutes = express.Router();

/**
 * @swagger
 * /v1/admin/login:
 *  post:
 *   description: Login an admin
 *  parameters:
 *  - in: body
 *    name: body
 *    type: object
 *  responses:
 *   200:
 *      description: Admin logged in successfully
 *   400:
 *      description: Phone and password required
 *
 */

adminRoutes.post("/login", login);

module.exports = adminRoutes;
