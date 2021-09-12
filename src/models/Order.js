const mongoose = require("mongoose");
require('./Item');

const subSchema = new mongoose.Schema({
    items: [{type: mongoose.Types.ObjectId, ref: "Items", required: true}],
    user: {type: mongoose.Types.ObjectId, ref: "users", required: true},
    making: {type: Boolean, default: true}
});

const OrdersSchema = new mongoose.Schema({
    
    table: {type: mongoose.Types.ObjectId, ref: "Table", required: true},
    orders: [subSchema],
    total: {type: Number, required: true},
    paid: {type: Number, default: 0},
    active: {type: Boolean, default: true}

}, { timestamps: {} });

module.exports = mongoose.model('Order', OrdersSchema);