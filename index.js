var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 8080;

var MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose");
// var client = require("./models/client");
var messageDb = require("./models/message");
var User = require('./models/user');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/myDatabase');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
}));
app.get('/',function(req,res){
    res.render('home');
    
});

app.get('/getrequestdata',function(req, res) {
    client.find({},function(err,data){
        if(err) console.error(err);
        console.log(data);
        res.json({"client" : data});
    })
})
			
app.get('/home',function(req, res) {
    res.redirect('/');

})
			
app.get('/welcome-page',function(req,res){
    console.log("test")
    res.send("hello guy");
})
app.get('/arifureta',function(req, res) {
    res.render('arifureta');
})

app.get('/link',function(req,res){
    res.render('link');
})
app.get('/about',function(req, res) {
    res.render('about');
})
app.get('/blog',function(req, res) {
    res.render('blog');
})
app.get('/photo',function(req, res) {
    res.render('photo');
})
app.get('/contact',function(req, res) {
    res.render('contact');
})
app.get('/confes',function(req, res) {
    res.render('confes');
})
app.get('/confes/sendmessage',function(req, res) {
    var nameReq = req.query.name;
    if(!nameReq) {
        nameReq = "Anonymous";
    }
    var messageReq = req.query.message;
    var messageData = new messageDb({
        name : nameReq,
        message : messageReq
    })
    messageData.save(function(err){
        if(err) console.error(err);
    })
    res.redirect('/confes/thankyou')
})

app.get('/admin/getconfesdata/01652577727',function(req, res) {
    User.find({},function(err,data){
        if(err) console.error(err);
        console.log(data);
        res.json({"acc" : data});
        
    })
})
app.get('/confes/thankyou',function(req, res) {
    res.render("respone");
})
// var routes = require('./routes/router');
// app.use('/login', routes);

// app.use(function (req, res, next) {
//     var err = new Error('File Not Found');
//     err.status = 404;
//     next(err);
//   });
  
//   // error handler
//   // define as the last app.use callback
//   app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.send(err.message);
//   });
app.get('/login',function(req,res,next){
    console.log("get login");
    return res.render('login');
});
app.post('/login',function(req,res,next){
    if(req.body.password !== req.body.passwordConf){
        var err =  new Error("password not match fuck");
        err.status = 400;
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
                    req.session.userId = user._id;
                    console.log(user._id);

                    res.redirect('/profile');
                }
            })
        }
    else if(req.body.logemail && req.body.logpassword){
        User.authenticate(req.body.logemail,req.body.logpassword,function(err,user){
            if(err){
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            }
            else {
                console.log(user._id);
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        })  

    }
    else {
        var err = new Error("Somthings wrong");
        err.status = 400;
        return next(err);
    }
});
app.get('/profile',function(req, res ,next){
    console.log(req.session.userId);
    User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return  res.render('admin', {user : user});
        }
      }
    });
    
})
app.get('/remove',function(req,res){
    var questionID = req.url;
    console.log("url:"+questionID);
    var id = questionID.split('=')[1];
    messageDb.find({_id:id}).remove().exec();
    res.redirect('profile');


})
app.get('/getMyQuestion',function(req,res,next){
    messageDb.find({},function(err,data){
        console.log(data);
        res.json({question: data});
    })
})

app.listen(port,function(err){
    if(err) console.error(err);
    console.log("server starting at " + port);
})
