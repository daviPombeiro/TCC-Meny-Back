const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
    
    name: {type: String, required: true},
    chairs: {type: Number, required: true},
    active: {type: Boolean, default: false}

}, { timestamps: {} });

module.exports = mongoose.model('Table', TableSchema);