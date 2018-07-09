var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/login',function(req,res,next){
    console.log("get login");
    console.log(path.join(__dirname + '/public/login.html'));
    return res.sendFile(path.join(__dirname + '/public/login.html'));
});
router.post('/login',function(req,res,next){
    if(req.body.password !== req.body.passwordConf){
        var err =  new Error("password not match");
        err.setStatus = 400;
        res.send("password not match");
        next(err);
    }
    if( req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf){
            var userData = {
                email: req.body.email,
                username : req.body.username,
                password : req.body.password,
                passwordConf : req.body.passwordConf
            }
            User.create(userData,function(err,user){
                if(err){
                    return next(err);
                }
                else {
                    req.sessionID.userId = user._id;
                    res.redirect('/profile');
                }
            })
        }
})
module.exports = router;
