const mongoose = require("mongoose");

const RestaurantWeekTimeSchema = new mongoose.Schema({
    
    restaurant: {type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true},
    openHour: {type: Number, required: true},
    closeHour: {type: Number, required: true},
    isOpen: {type: Boolean,  required: true, default: true},
    dayOfWeek: {type: Number, required: true}

}, { timestamps: {} });

module.exports = mongoose.model('RestaurantWeekTime', RestaurantWeekTimeSchema);