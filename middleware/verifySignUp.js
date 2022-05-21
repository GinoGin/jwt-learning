const db = require('../model');
const User = db.user;
const ROLES = db.ROLES


checkDuplicateUsernameOrEmail=(req,res,next)=>{
    User.findOne({
        username : req.body.username
    }).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err})
            return
        }
        if(user){
            res.status(400).send({message:"Username is already in use"})
            return
        }
        User.findOne({
            email : req.body.email
        }).exec((err,user)=>{
            if(err){
                res.status(500).send({message:err})
                return
            }
            if(user){
                res.status(400).send({message:"email already exist"})
                return
            }

            next();
    
        })

    });

    
}

checkRolesExisted = (req,res,next)=>{
    if(req.body.roles){
        for(let i=0; i<req.body.roles.length;i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400)
                .send({message:`failed! Role ${req.body.roles[i]} doesn't exit`});
                return
            }
        }
    }
    next();
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
}

module.exports= verifySignUp;