const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    
    name: {type: String,required: true},
    email: {type: String,required: true},
    password: {type: String,required: true},
    age: {type: Number,required: true},
    cpf: {type: Number,required: true},

}, { timestamps: {} });

module.exports = mongoose.model('User', UserSchema);