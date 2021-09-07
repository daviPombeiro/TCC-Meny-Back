const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    street: {type: String, required: true},
    number: {type: Number, required: true},
    neighbourhood: {type: String, required: true},
    city: {type: String, required: true},
    estate: {type: String, required: true},
    cep: {type: Number, default: 0}
});

const SectionSchema = new mongoose.Schema({
    name: {type: String, default: ""},
    items: [{type: mongoose.Types.ObjectId, ref: "Items"}]
});

const RestaurantSchema = new mongoose.Schema({
    
    name: {type: String, required: true},
    address: {type: addressSchema, required: true},
    opening_hours: [{type: mongoose.Schema.Types.ObjectId, ref: "RestaurantWeekTime",require: false}],
    menu: {type: [SectionSchema], default: []},
    tables: [{type: mongoose.Types.ObjectId, ref: "Table"}],
    image:{type:String, required: true},
    imageKey:{type:String, required: true},
    category:{type:String, required: true}

}, { timestamps: {} });

module.exports = mongoose.model('Restaurant', RestaurantSchema);