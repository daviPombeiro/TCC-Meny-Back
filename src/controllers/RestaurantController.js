const RestaurantWeekTime = require("../models/restaurantWeekTime");
const Employee = require("../models/Employee");
const Restaurant = require("../models/Restaurant");
const Order = require("../models/Order");
const bcrypt = require('bcryptjs');
require("dotenv/config");
const mongoose = require("mongoose");

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
            if (req.file === undefined & req.body.image === undefined) {
                return res.status(400).json({ error: `Invalid File` });
            }

            if(req.file !== undefined & req.body.image === undefined){
                const { location,key } = req.file;
                req.body.image = location;
                req.body.imageKey = key;
            }

            req.body.address = {
                cep: req.body.cep,
                street: req.body.street,
                neighbourhood: req.body.neighbourhood,
                number: req.body.number,
                estate: req.body.estate,
                city: req.body.city
            }

            const newRes = await Restaurant.create(req.body);

            let newEmployee = {
                name: req.body.nameUser,
                password: await bcrypt.hash(req.body.password, parseInt(process.env.SALT_WORK_FACTOR)),
                email: req.body.email,
                birthday: req.body.birthday,
                rolls: req.body.rolls,
                cpf: req.body.cpf,
                restaurant: newRes._id
            }

            await Employee.create(newEmployee);

            let time = [
                {
                    restaurant: newRes._id,
                    openHour: (req.body.sundayOpenHour === '')? 0 : parseFloat(req.body.sundayOpenHour),
                    closeHour: (req.body.sundayCloseHour === '')? 0 : parseFloat(req.body.sundayCloseHour),
                    isOpen: req.body.sunday,
                    dayOfWeek: 0
                },
                {
                    restaurant: newRes._id,
                    openHour: (req.body.mondayOpenHour === '')? 0 : parseFloat(req.body.mondayOpenHour),
                    closeHour: (req.body.mondayCloseHour === '')? 0 : parseFloat(req.body.mondayCloseHour),
                    isOpen: req.body.monday,
                    dayOfWeek: 1
                },
                {
                    restaurant: newRes._id,
                    openHour: (req.body.tuesdayOpenHour === '')? 0 : parseFloat(req.body.tuesdayOpenHour),
                    closeHour: (req.body.tuesdayCloseHour === '')? 0 : parseFloat(req.body.tuesdayCloseHour),
                    isOpen: req.body.tuesday,
                    dayOfWeek: 2
                },
                {
                    restaurant: newRes._id,
                    openHour: (req.body.wednesdayOpenHour === '')? 0 : parseFloat(req.body.wednesdayOpenHour),
                    closeHour: (req.body.wednesdayCloseHour === '')? 0 : parseFloat(req.body.wednesdayCloseHour),
                    isOpen: req.body.wednesday,
                    dayOfWeek: 3
                },
                {
                    restaurant: newRes._id,
                    openHour: (req.body.thursdayOpenHour === '')? 0 : parseFloat(req.body.thursdayOpenHour),
                    closeHour: (req.body.thursdayCloseHour === '')? 0 : parseFloat(req.body.thursdayCloseHour),
                    isOpen: req.body.thursday,
                    dayOfWeek: 4
                },
                {
                    restaurant: newRes._id,
                    openHour: (req.body.fridayOpenHour === '')? 0 : parseFloat(req.body.fridayOpenHour),
                    closeHour: (req.body.fridayCloseHour === '')? 0 : parseFloat(req.body.fridayCloseHour),
                    isOpen: req.body.friday,
                    dayOfWeek: 5
                },
                {
                    restaurant: newRes._id,
                    openHour: (req.body.saturdayOpenHour === '')? 0 : parseFloat(req.body.saturdayOpenHour),
                    closeHour: (req.body.saturdayCloseHour === '')? 0 : parseFloat(req.body.saturdayCloseHour),
                    isOpen: req.body.saturday,
                    dayOfWeek: 6
                }
            ]
            let opening_hours = [];
            for(let count = 0;count<time.length;count++){
                let weekTime = await RestaurantWeekTime.create(time[count]);
                opening_hours.push(weekTime._id);
            }
            await Restaurant.findOneAndUpdate({_id: newRes._id},{opening_hours});
            
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
    },
    async getMonthlyBalance(req, res) {
        const today = new Date();
        const currentDate = `${today.getFullYear()}-${today.getMonth()+2}-01`;
        const pastDate = `${today.getFullYear()}-${today.getMonth()+1}-01`;
        
        const employee = req.decoded.employee;

        if(!employee.rolls.includes("admin")){
            return res.status(401).json({ error: "Você não tem permissão para isso" });
        }

        var tables = []
        await Restaurant.findById(employee.restaurant, function(err, rest){
            tables = rest.tables;
        });
        
        var balance = 0
        for(let i = 0; i < tables.length; i++) {
            let tableId = tables[i];
            const orders = await Order.find({ table: tableId, updatedAt: { $gte: pastDate, $lte: currentDate } });

            orders.forEach(order => {
                balance += order.total;
            });
        };

        return await res.json({month: today.getMonth(), balance});
    },
    async getMenuRank(req, res) {
        const today = new Date();
        const currentDate = `${today.getFullYear()}-${today.getMonth()+1}-01`;
        const pastDate = `${today.getFullYear()}-${today.getMonth()}-01`;

        const employee = req.decoded.employee;

        if(!employee.rolls.includes("admin")){
            return res.status(401).json({ error: "Você não tem permissão para isso" });
        }

        var tables = []
        await Restaurant.findById(employee.restaurant, function(err, rest){
            tables = rest.tables;
        });

        var ordersGrouped = []
        for(let x = 0; x < tables.length; x++) {
            let tableId = tables[x];
            const orders = await Order.find({ table: tableId, active: true })
            .populate({
                path: "orders",
                populate: {
                    path: "items",
                    model: "Items"
                }
            });

            for(var i = 0; i < orders.length; i++) {
                for(let c = 0; c < orders[i].orders.length; c++) {
                    let ord = orders[i].orders[c];
                    for(let b = 0; b < ord.items.length; b++) {
                        let item = ord.items[b];
                        let blob = true;
                        for(var a = 0; a < ordersGrouped.length; a++) {
                            if (ordersGrouped[a]._id == item._id){
                                ordersGrouped[a].qntd += 1;
                                blob = false;
                            }
                        }

                        if(blob) {
                            ordersGrouped.push({
                                _id: item._id,
                                name: item.name,
                                price: item.price,
                                description: item.description,
                                image: item.image,
                                qntd: 1
                            });
                        }
                    }
                }
            }
        }

        return await res.json({month: today.getMonth(), ordersGrouped});
    }
}