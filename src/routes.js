const express = require('express');
const routes = express.Router();
const UserController = require("./controllers/UserController");
const RestaurantController = require("./controllers/RestaurantController");

// User
routes.post("/users",UserController.store);
routes.get("/users",UserController.getUsers);

// Restaurant
routes.post("/restaurant",RestaurantController.createRestaurant);
routes.get("/menu/:idRestaurant", RestaurantController.getMenu);

module.exports = routes;