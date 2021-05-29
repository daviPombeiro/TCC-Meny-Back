const express = require('express');
const routes = express.Router();
const auth = require('./auth');

const UserController = require("./controllers/UserController");
const RestaurantController = require("./controllers/RestaurantController");
const RestaurantWeekTimeController = require("./controllers/RestaurantWeekTimeController");
const AuthController = require("./controllers/AuthController");

// User
routes.post("/users",UserController.store);
routes.get("/users",UserController.getUsers);
routes.post("/forgot_password",UserController.forgotPassword);
routes.post("/verify_token",UserController.verifyToken);
routes.post("/change_password",UserController.changePassword);

// Restaurant
routes.post("/restaurant",RestaurantController.createRestaurant);
routes.get("/restaurant/:idRestaurant", auth, RestaurantController.getRestaurant);
routes.get("/restaurant", auth,RestaurantController.index);

// Restaurant Week Time
routes.get("/restaurantWeekTime", auth,RestaurantWeekTimeController.index);
routes.post("/restaurantWeekTime", auth,RestaurantWeekTimeController.store);

// Login
routes.post("/login",AuthController.login);

module.exports = routes;