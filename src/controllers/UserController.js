module.exports = {
    async store(req,res){
        try {
            return res.json("AAA")
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