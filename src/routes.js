const express = require('express');
const routes = express.Router();
const auth = require('./auth');

const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");

// User
routes.post("/users",UserController.store);
routes.get("/users",UserController.getUsers);

// Login
routes.post("/login",AuthController.login);

module.exports = routes;