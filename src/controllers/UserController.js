const User = require("../models/User");
const bcrypt = require('bcryptjs');
require("dotenv/config");

module.exports = {
    async store(req, res) {
        try {
            req.body.password = await bcrypt.hash(req.body.password,parseInt(process.env.SALT_WORK_FACTOR));
            const newUser = await User.create(req.body);
            return res.json(newUser);
        } catch (error) {
            return res.status(400).json({ error });
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