const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    street: {type: String, required: true},
    number: {type: Number, required: true},
    neighbourhood: {type: String, required: true},
    city: {type: String, required: true},
    estate: {type: String, required: true},
    cep: {type: Number, default: 0}
});

const OpeningSchema = new mongoose.Schema({
    day_of_week: {type: String, required: true},
    opening_hour: {type: String, required: true},
    closing_hour: {type: String, required: true}
});

const SectionSchema = new mongoose.Schema({
    name: {type: String, default: ""},
    items: [{type: mongoose.Types.ObjectId, ref: "Items"}]
});

const RestaurantSchema = new mongoose.Schema({
    
    name: {type: String, required: true},
    address: {type: addressSchema, required: true},
    opening_hours: {type: [OpeningSchema], default: []},
    menu: {type: [SectionSchema], default: []},
    tables: [{type: mongoose.Types.ObjectId, ref: "Tables"}]

}, { timestamps: {} });

module.exports = mongoose.model('Restaurant', RestaurantSchema);