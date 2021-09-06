const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
const Employee = require("../models/Employee");
const Restaurant = require("../models/Restaurant");
const Order = require("../models/Order");
require("dotenv/config");

module.exports = {
    async store(req, res) {
        try {
            let employee = await Employee.findOne({ email: req.body.email });
            if (employee) {
                return res.status(400).json({ error: "Email cadastrado já existente" });
            }
            req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_WORK_FACTOR));
            const newEmployee = await Employee.create(req.body);
            return res.json(newEmployee);
        } catch (error) {
            return res.status(400).json({ error: "Ocorreu um erro durante o cadastro tende mais tarde!" });
        }
    },
    async getOpenOrders(req, res) {
        const employee = req.decoded.employee;
        
        if(!employee.rolls.includes("cheff")){
            return res.status(401).json({ error: "Você não tem permissão para isso" });
        }

        var tables = []
        await Restaurant.findById(employee.restaurant, function(err, rest){
            tables = rest.tables;
        });

        var activeOrder = []
        for(let a = 0; a < tables.length; a++){
            let tableId = tables[a];
            const orders = await Order.find({ table: tableId, active: true }).populate("table")
            .populate({
                path: "orders",
                populate: {
                    path: "items",
                    model: "Items"
                }
            })
            .populate({
                path: "orders",
                populate: {
                    path: "user",
                    model: "User"
                }
            });

            for(var i = 0; i < orders.length; i++) {
                await orders[i].orders.forEach(ord => {
                    if(ord.making) {
                        let obj = {
                            orderId: ord._id,
                            orderPos: i,
                            tableName: orders[i].table.name,
                            order: ord
                        }

                        activeOrder.push(obj);
                    }
                });
            }
        };

        return await res.json(activeOrder);

    },
    async closeOrder(req, res) {
        const { orderId, orderPos } = req.body;

        const order = Order.findById(orderId);

        order.orders[orderPos].making = false;
        await order.save();

        return res.json(order);
    }
}