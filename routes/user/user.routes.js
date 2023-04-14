const authorize = require("../../utils/authorize");
const express = require("express");
const { register } = require("./user.controller.js");
const userRoutes = express.Router();

/**
 * @swagger
 * /v1/user/register:
 *  post:
 *   description: Register a new user
 *  parameters:
 *  - in: body
 *    name: body
 *    type: object
 *  responses:
 *   201:
 *   description: User created successfully
 *  400:
 *  description: Phone and password required
 *
 */

userRoutes.post("/register", register);

module.exports = userRoutes;
