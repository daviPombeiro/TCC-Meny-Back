const Order = require("../models/Order");
const Table = require("../models/Table");

module.exports = {
    async makeOrder (req,res) {
        const table = req.params.idTable;
        const {total} = req.body;
        const list = {
            items: req.body.items,
            user: req.decoded.user._id
        }
        let order = {};

        try{
            let tab = await Table.findById(table);

            if(!tab) {
                return res.status(404).json({error: "table not found"});
            }

            if (!tab.active){
                tab.active = true;
                await tab.save();

                const newOrder = {
                    table: table,
                    orders: [list],
                    total: total
                }

                order = await Order.create(newOrder);

            } else {
                order = await Order.findOne({table: table, active: true})
                order.orders.push(list);
                order.total += total;
                await order.save();
            }

            return res.json(order);
            
        } catch(error) {
            return res.status(400).json({error});
        }
    },

    async getOrder (req, res) {
        try{
            var clients = [];
            var items = [];
            var or = [];
            let order = await Order
                .findById(req.params.idOrder)
                .populate({
                    path: "orders",
                    populate: {
                        path: "items",
                        model: "Items"
                    }
                })
                .populate({
                    path: "orders",
                    populate: {
                        path: "user",
                        model: "User"
                    }
                });
            
            order.orders.forEach(a => {
                let i = clients.indexOf(a.user);
                if(i === -1){
                    clients.push(a.user);
                    items.push(a.items);
                }else {
                    items[i] = items[i].concat(a.items);
                }
            });

            clients.forEach((element, index) => {
                or.push({
                    user: element.name,
                    items: items[index]
                });
            });

            const a = order.total - order.paid;
            return res.json({order: or, total: a});

        } catch(error) {
            return res.status(400).json({error});
        }
    }
}