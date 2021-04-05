const mongoose = require("mongoose");

const Restaurant = require("../models/Restaurant");
const Item = require("../models/Item");

module.exports = {
    async createRestaurant(req,res){
        try {
            const newRes = await Restaurant.create(req.body);
            return res.json(newRes);
        } catch (error) {
            return res.status(400).json({error});
        }
    },
    async getMenu(req, res) {
        try{
            const rest = await Restaurant
                .findById(new mongoose.Types.ObjectId(req.params.idRestaurant))
                .populate({
                    path: 'menu',
                    populate: {
                        path:'items',
                        model: 'Items'
                    }
                });

            return res.json(rest.menu);

        } catch(error) {
            return res.status(400).json({error});
        }
    }
}