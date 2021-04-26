const jwt = require("jsonwebtoken");
require("dotenv/config");

const auth = (req,res,next) => {
    const authorization = req.headers['authorization'];
    const token = (String(authorization).startsWith("Barear ")) ? authorization.slice(7, authorization.length) : authorization;
    if(token === true){
        jwt.verify(token, process.env.SECRET_KEY, (err,decoded) => {
            if(err){
                return res.status(401).json({error: err.name });
            }else{
                req.decoded = decoded;
                return next();
            }
        })
    }else{
        return res.status(401).json({error: "Unauthorized" });
    }
}

module.exports = auth;