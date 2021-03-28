const User = require("../models/User");

module.exports = {
    async store(req,res){
        try {
            const newUser = await User.create(req.body);
            return res.json(newUser);
        } catch (error) {
            return res.status(400).json({error});
        }
    },
    async getUsers(req,res){
        try {
            return res.json("AAA")
        } catch (error) {
            return res.status(400).json({error});
        }
    }
}