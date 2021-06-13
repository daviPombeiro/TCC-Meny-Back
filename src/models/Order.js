const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
    items: [{type: mongoose.Types.ObjectId, ref: "items"}],
    user: {type: mongoose.Types.ObjectId, ref: "users", required: true}
});

const OrdersSchema = new mongoose.Schema({
    
    table: {type: mongoose.Types.ObjectId, ref: "Tables", required: true},
    orders: [subSchema],
    total: {type: Number, required: true},
    paid: {type: Number, default: 0},
    active: {type: Boolean, default: true}

}, { timestamps: {} });

module.exports = mongoose.model('Order', OrdersSchema);