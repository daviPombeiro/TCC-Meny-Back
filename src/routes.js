const express = require('express');
const routes = express.Router();
const UserController = require("./controllers/UserController");

// User
routes.post("/users",UserController.store);
routes.get("/users",UserController.getUsers);

module.exports = routes;