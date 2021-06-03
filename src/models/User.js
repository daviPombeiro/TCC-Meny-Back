const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    
    name: {type: String,required: true},
    email: {type: String,required: true,unique: true},
    password: {type: String,required: true},
    birthday: {type: Date,required: true},
    cpf: {type: String,required: true},
    tokenPassword: {type: String,required: false},
    datePassword: {type: Date,required: false},
    liked: [{type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: false}]

}, { timestamps: {} });

module.exports = mongoose.model('User', UserSchema);