const mongoose = require("mongoose");
const Order = require("../models/Order");
const Table = require("../models/Table");

module.exports = {
    async getTableActive(req, res) {
        const tableId = new mongoose.Types.ObjectId(req.params.idTable);
        const table = await Table.findById(tableId);
        const order = await Order.findOne({table: tableId, active: true});

        return res.json({active: table.active, order: order.id});
    }
}