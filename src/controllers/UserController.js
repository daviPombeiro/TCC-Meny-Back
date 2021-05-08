const User = require("../models/User");
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
require("dotenv/config");

module.exports = {
    async store(req, res) {
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Email cadastrado já existente" });
            }
            req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_WORK_FACTOR));
            const newUser = await User.create(req.body);
            return res.json(newUser);
        } catch (error) {
            return res.status(400).json({ error: "Ocorreu um erro durante o cadastro tende mais tarde!" });
        }
    },
    async getUsers(req, res) {
        try {
            const user = await User.find();
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async forgotPassword(req, res) {
        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ error: "Email não existente" });
            }

            let min = Math.ceil(100000);
            let token = Math.floor(Math.random() * (Math.floor(999999) - min)) + min;
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            await sgMail.send({
                to: user.email,
                from: 'menyappdr@gmail.com',
                templateId: 'd-091fb905ab384a73b8e8763690ae2e89',
                dynamic_template_data: {
                    name: user.name,
                    token: token
                }
            });

            const newUser = await User.updateOne({ _id: user._id }, { datePassword: new Date(), tokenPassword: token })

            return res.json(newUser);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error });
        }
    },
    async verifyToken(req, res) {
        try {
            let user = await User.find({ email: req.body.email._W });

            for (let count = 0; count < user.length; count++) {
                if (formatDate(user[count].datePassword).toDateString() === formatDate(new Date()).toDateString()) {
                    if (user[count].tokenPassword === req.body.token) {
                        return res.send();
                    }
                }
            }
            return res.status(400).json({});
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async changePassword(req, res){
        try {
            req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_WORK_FACTOR));
            const user = await User.updateOne({email: req.body.email._W}, {password: req.body.password});
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }
}

function formatDate(date) {
    date = new Date(date);
    return new Date(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate())
}