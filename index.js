var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 8080;

var MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose");
// var client = require("./models/client");
var messageDb = require("./models/message");



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/myDatabase');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true })); 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
    // gửi trả kết quả khi request là http://127.0.0.1:port/home
    // var data = new client({
    //     ip : req.header('x-forwarded-for') || req.connection.remoteAddress,
    //     language : req.headers['accept-language'].split(',')[0],
    //     systemdata : req.headers["user-agent"].match(/\((.*?)\)/)[1]
    // })
    // data.save(function(err){
    //     if(err) console.err(err);
    //     console.log("client save");
    // })
    
    
    // var data = {}
    // data.ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    // data.language = req.headers['accept-language'].split(',')[0];
    // data.system = req.headers["user-agent"].match(/\((.*?)\)/)[1];
    // console.log(data.system);
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
    messageDb.find({},function(err,data){
        if(err) console.error(err);
        console.log(data);
        res.json({"client" : data});
        
    })
})
app.get('/confes/thankyou',function(req, res) {
    res.render("respone");
})
app.listen(port,function(err){
    if(err) console.error(err);
    console.log("server starting");
})
