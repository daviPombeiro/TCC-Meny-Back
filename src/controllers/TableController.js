const mongoose = require("mongoose");
const Table = require("../models/Table");

module.exports = {
    async getTableActive(req, res) {
        const table = await Table
            .findById(new mongoose.Types.ObjectId(req.params.idTable))
            .populate({
                path: 'menu',
                populate: {
                    path:'items',
                    model: 'Items'
                }
            });

        return res.json(table.active);
    }
}