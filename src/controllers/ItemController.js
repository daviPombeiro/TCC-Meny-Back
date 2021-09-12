const Item = require("../models/Item");

module.exports = {
    async index(req, res) {
        try {
            const { employee } = req.decoded;
            let option = {restaurant: employee.restaurant};

            const newitem = await Item.find(option);
            return res.json(newitem);
        } catch (error) {
            return res.status(400).json({ error: "Ocorreu um erro para retornar as informações" });
        }
    },
    async store(req, res) {
        try {
            const { employee } = req.decoded;
            req.body.restaurant = employee.restaurant;
            req.body.image = req.file.location;
            const newitem = await Item.create(req.body);
            return res.json(newitem);
        } catch (error) {
            return res.status(400).json({ error: "Ocorreu um erro durante o cadastro tende mais tarde!" });
        }
    },
    async delete(req, res) {
        try {
            const {id} = req.params;
            const newitem = await Item.findOneAndDelete({_id: id});
            return res.json(newitem);
        } catch (error) {
            return res.status(400).json({ error: "Ocorreu um erro durante a exclusão tende mais tarde!" });
        }
    },
    async update(req, res) {
        try {
            const {id} = req.params;
            req.body.image = req.file.location;
            const newitem = await Item.findOneAndUpdate({_id: id},req.body);
            return res.json(newitem);
        } catch (error) {
            return res.status(400).json({ error: "Ocorreu um erro durante a alteração tende mais tarde!" });
        }
    }
}