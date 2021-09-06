const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    
    name: {type: String,required: true},
    email: {type: String,required: true,unique: true},
    password: {type: String,required: true},
    birthday: {type: Date,required: true},
    cpf: {type: String,required: true},
    tokenPassword: {type: String,required: false},
    datePassword: {type: Date,required: false},
    restaurant: {type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true},
    functions: [{type: String, required: false}]

}, { timestamps: {} });

module.exports = mongoose.model('Employee', EmployeeSchema);