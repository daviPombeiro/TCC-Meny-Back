const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, default: ""},
    image: {type: String, default: ""}

}, { timestamps: {} });

module.exports = mongoose.model('Items', ItemSchema);