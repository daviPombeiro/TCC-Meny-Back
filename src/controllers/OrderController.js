const mongoose = require("mongoose");
const Order = require("../models/Order");
const Table = require("../models/Table");

module.exports = {
    async makeOrder (req,res) {
        const orderId = new mongoose.Types.ObjectId(req.params.idOrder);
        const {total} = req.body;
        const list = {
            items: req.body.items,
            user: req.decoded.user._id
        }
        let order = {};
        try{
            order = await Order.findById(orderId);
            order.orders.push(list);
            order.total += total;
            await order.save();

            return res.json(order);
            
        } catch(error) {
            return res.status(400).json({error});
        }
    },

    async getOrder (req, res) {
        try{
            var clients = [];
            var items = [];
            var or = [];
            let order = await Order
                .findById(req.params.idOrder)
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
            
            order.orders.forEach(a => {
                let i = clients.indexOf(a.user);
                if(i === -1){
                    clients.push(a.user);
                    items.push(a.items);
                }else {
                    items[i] = items[i].concat(a.items);
                }
            });

            clients.forEach((element, index) => {
                or.push({
                    user: element.name,
                    items: items[index]
                });
            });

            const a = (order.total - order.paid).toFixed(2);
            return res.json({order: or, total: a});

        } catch(error) {
            console.log(error);
            return res.status(400).json({error});
        }
    },

    async payOrder(req, res) {
        const {amount} = req.body;
        const orderId = req.params.idOrder;

        try{
            let order = await Order.findById(orderId);
            order.paid += amount;
            await order.save();

            return res.json(order);

        } catch(error) {
            return res.status(400).json({error});
        }
    },

    async closeOrder(req, res) {
        const {amount} = req.body;
        const orderId = req.params.idOrder;

        try{
            let order = await Order.findById(orderId);
            order.paid += amount;
            order.active = false;
            const tableId = order.table;
            await order.save();

            let table = await Table.findById(tableId);
            table.active = false;
            await table.save();

            return res.json(order);

        } catch(error) {
            return res.status(400).json({error});
        }
    }
}