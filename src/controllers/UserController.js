const User = require("../models/User");
const bcrypt = require('bcryptjs');
require("dotenv/config");

module.exports = {
    async store(req, res) {
        try {
            let user = await User.findOne({ email: req.body.email});
            if(user){
                return res.status(400).json({ error:"Email cadastrado já existente" });
            }
            req.body.password = await bcrypt.hash(req.body.password,parseInt(process.env.SALT_WORK_FACTOR));
            const newUser = await User.create(req.body);
            return res.json(newUser);
        } catch (error) {
            return res.status(400).json({ error:"Ocorreu um erro durante o cadastro tende mais tarde!" });
        }
    },
    async getUsers(req, res) {
        try {
            const user = await User.find();
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }
}