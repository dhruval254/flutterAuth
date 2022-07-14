var User = require('../models/user')
var jwt = require('jwt-simple')
var  config=require('../config/dbconfig')

var functions={
    addNew: function(req,res) {
        if((!req.body.name) || (!req.body.password)){
            res.json({success: false,msg: 'Fill all fields'})
        }
        else{
            var newUser=User({
                name: req.body.name,
                password: req.body.password
            });
            newUser.save(function (err,newUser){
                if(err){
                    res.json({success: false, msg:'Failed to save'})
                }
                else{
                    res.json({success: true,msg : 'Succesfully Saved'})
                }
            })
        }
    },
    authenticate: function(req,res){
        User.findOne({
            name: req.body.name
        }), function(err,user){
            if(err) throw err
            if(!user){
                res.status(403).send({success: false,msg:'Authentication Failed, User not found'})
            }

            else{
                user.comparePassword(req.body.password,function(err,isMatch){
                    if(isMatch && !err){
                        var token = jwt.encode(user, config.secret)
                        res.json({success: true, token:token})
                    }
                    else{
                        return res.status(403).send({success: false, msg:'Authentication Failed , Wrong Password'})
                    }
                })
            }
        })
    }
}

module.exports = functions
