var express = require('express');

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('public'));
app.get("/", function(req, res){
	res.render('login');
});
app.get("/home", function(req, res){
	res.render('index');
});

app.listen(3000,function(){
	console.log("server ruinng at 30000");
})