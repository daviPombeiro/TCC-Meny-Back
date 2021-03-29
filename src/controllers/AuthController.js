const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv/config");

module.exports = {
    async login(req,res){
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email: email});
            if(user != undefined){
                if(user.password === password){
                    const token = jwt.sign({user},process.env.SECRET_KEY);
                    return res.json({token});
                }
                return res.status(400).json({error});
            }
            return res.status(400).json({error});
        } catch (error) {
            return res.status(400).json({error});
        }
    }
}

