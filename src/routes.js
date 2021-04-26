const express = require('express');
const routes = express.Router();
const auth = require('./auth');

const UserController = require("./controllers/UserController");
const RestaurantController = require("./controllers/RestaurantController");
const AuthController = require("./controllers/AuthController");

// User
routes.post("/users",UserController.store);
routes.get("/users",UserController.getUsers);

// Restaurant
routes.post("/restaurant",RestaurantController.createRestaurant);
routes.get("/restaurant/:idRestaurant", RestaurantController.getRestaurant);

// Login
routes.post("/login",AuthController.login);

module.exports = routes;