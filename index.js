var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

app.use(express.static(__dirname+"/public"));
app.get('/',function(req,res){
    // gửi trả kết quả khi request là http://127.0.0.1:port/home
    express.static(__dirname+"/public")
			//res.end("Hello World!");
			});
app.listen(port,function(err){
    if(err) console.error(err);
    console.log("server starting");
});