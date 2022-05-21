const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')

const {TokenExpiredError}  = jwt;

const  catchError = (err,res)=>{
    if(err instanceof TokenExpiredError ){
        return res.status(401).send({message:"Unauthorized! token was expired"})
    }
    return res.status(401).send({message:"unauthorized!"})
}

verifyToken = (req,res,next)=>{
    let token = req.headers["x-access-token"];
    if(!token){
       return res.status(403).send({message:"No token provided"})
    }
    jwt.verify(token,config.secretKey,(err,decoded)=>{
        if(err){
           return catchError(err,res)
        }
        req.userId=decoded.id;
        next();
    })
}

const authJWT = {
    verifyToken
}

module.exports  = authJWT;