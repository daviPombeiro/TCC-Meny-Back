const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
    
    name: {type: String, required: true},
    chairs: {type: Number, required: true},
    active: {type: Boolean, default: false},
    restaurant: {type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true},

}, { timestamps: {} });

module.exports = mongoose.model('Table', TableSchema);