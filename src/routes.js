const express = require('express');
const routes = express.Router();
const auth = require('./auth');

const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");

// User
routes.post("/users",UserController.store);
routes.get("/users",UserController.getUsers);
routes.post("/forgot_password",UserController.forgotPassword);
routes.post("/verify_token",UserController.verifyToken);
routes.post("/change_password",UserController.changePassword);

// Login
routes.post("/login",AuthController.login);

module.exports = routes;