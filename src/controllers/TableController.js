const mongoose = require("mongoose");
const Order = require("../models/Order");
const Table = require("../models/Table");

module.exports = {
    async getTableActive(req, res) {
        let order = {};
        const tableId = new mongoose.Types.ObjectId(req.params.idTable);
        const table = await Table.findById(tableId);
        if(table.active){
            order = await Order.findOne({table: tableId, active: true});
        } else {
            const newOrder = {
                table: tableId,
                orders: [],
                total: 0,
                paid: 0,
                active: true
            }
            order = await Order.create(newOrder);
        }
        return res.json({active: table.active, order: order._id});
    }
}