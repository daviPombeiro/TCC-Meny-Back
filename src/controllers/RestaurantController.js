const mongoose = require("mongoose");

const Restaurant = require("../models/Restaurant");
const Item = require("../models/Item");

module.exports = {
    async index(req,res){
        try {
            const { name=""} = req.query;
            let rest = []
            if(name !== ""){
                rest =  await Restaurant.find({name: name}).populate('opening_hours');
            }else{
                rest = await Restaurant.find({}).populate('opening_hours');
            }
            
            let todayWeekDay = new Date().getDay();
            let openRestaurant = [];
            let aberto = 0;
            let fechado = 0;
            for(let count = 0; count < rest.length; count++){
                if(rest[count].opening_hours[todayWeekDay].isOpen){
                    aberto++;
                    openRestaurant.push(rest[count]);
                }else{
                    fechado++;
                }
            }
            return res.json(openRestaurant);
        } catch (error) {
            return res.status(400).json({error});
        }
    },
    async createRestaurant(req,res){
        try {
            const newRes = await Restaurant.create(req.body);
            return res.json(newRes);
        } catch (error) {
            return res.status(400).json({error});
        }
    },
    async getRestaurant(req, res) {
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

            return res.json(rest);

        } catch(error) {
            return res.status(400).json({error});
        }
    }
}