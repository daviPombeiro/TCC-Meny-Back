const RestaurantWeekTime = require("../models/restaurantWeekTime");

module.exports = {
    async index(req,res){
        try {
            let rest = await RestaurantWeekTime.find({});
            return res.json(rest);
        } catch (error) {
            return res.status(400).json({error});
        }
    },
    async store(req,res){
        try {
            const newRes = await RestaurantWeekTime.create(req.body);
            return res.json(newRes);
        } catch (error) {
            return res.status(400).json({error});
        }
    },
}