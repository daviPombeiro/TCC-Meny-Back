const express = require('express');
const routes = express.Router();
const auth = require('./auth');

const UserController = require("./controllers/UserController");
const RestaurantController = require("./controllers/RestaurantController");
const RestaurantWeekTimeController = require("./controllers/RestaurantWeekTimeController");
const AuthController = require("./controllers/AuthController");
//const OrderController = require("./controllers/OrderController");
//const TableController = require("./controllers/TableController");
//const EmployeeController = require("./controllers/EmployeeController");
//const ItemController = require("./controllers/ItemController");

// User
routes.post("/users",UserController.store);
routes.get("/users",UserController.getUsers);
routes.get("/users/:id",UserController.getOneUser);
routes.post("/forgot_password",UserController.forgotPassword);
routes.post("/verify_token",UserController.verifyToken);
routes.post("/change_password",UserController.changePassword);
routes.post("/like",UserController.likeRestaurant);

// Item
//routes.get("/item", auth,ItemController.index);
//routes.post("/item", auth,multer(upload.item).single("file"),ItemController.store);
//routes.put("/item/:id", auth,multer(upload.item).single("file"),ItemController.update);
//routes.delete("/item/:id", auth,ItemController.delete);

// Employee
//routes.post("/forgot_password_employee",EmployeeController.forgotPassword);
//routes.put("/change_password_employee",EmployeeController.changePassword);

// Order
//routes.get("/order/:idOrder", auth, OrderController.getOrder);
//routes.post("/order/make/:idOrder", auth, OrderController.makeOrder);
//routes.post("/pay/:idOrder", auth, OrderController.payOrder);
//routes.post("/pay/close/:idOrder", auth, OrderController.closeOrder);

// Table
//routes.get("/table/:idTable", auth, TableController.getTableActive);

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