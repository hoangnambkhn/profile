var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 8080;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({ extended: true })); 
app.get('/',function(req,res){
    // gửi trả kết quả khi request là http://127.0.0.1:port/home
    express.static(__dirname+"/public")
			//res.end("Hello World!");
			});
			
app.get('/home',function(req, res) {
    res.redirect('/');

})
			
app.get('/welcome-page',function(req,res){
    res.send("hello guy");
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
app.listen(port,function(err){
    if(err) console.error(err);
    console.log("server starting");
});