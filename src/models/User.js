const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    
    name: {type: String,required: true},
    email: {type: String,required: true,unique: true},
    password: {type: String,required: true},
    birthday: {type: Date},
    cpf: {type: Number,required: true},

}, { timestamps: {} });

module.exports = mongoose.model('User', UserSchema);