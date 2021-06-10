const express = require('express');
const routes = express.Router();
const auth = require('./auth');

const UserController = require("./controllers/UserController");
const RestaurantController = require("./controllers/RestaurantController");
const AuthController = require("./controllers/AuthController");
const OrderController = require("./controllers/OrderController");

// User
routes.post("/users",UserController.store);
routes.get("/users",UserController.getUsers);
routes.post("/forgot_password",UserController.forgotPassword);
routes.post("/verify_token",UserController.verifyToken);
routes.post("/change_password",UserController.changePassword);

// Order
routes.post("/order/:idTable", OrderController.makeOrder);

// Restaurant
routes.post("/restaurant",RestaurantController.createRestaurant);
routes.get("/restaurant/:idRestaurant", RestaurantController.getRestaurant);

// Login
routes.post("/login",AuthController.login);

module.exports = routes;