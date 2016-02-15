var express = require('express');
var session = require('express-session');

var app = express();
var sess;
app.use(session({secret: 'ssshhhhh'}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('public'));

app.get("/", function(req, res){
	sess = req.session;
	if(!sess.user){
		console.log("insideeeeeeeeee00 app.jsx");
	    res.render('login');
	}else{
		res.redirect("/home");
	}
});
app.get("/home", function(req, res){
	console.log("insideeeeeeeee /home  app.jsx");
    sess = req.session;
	if(sess.user){
	    res.render('index');
	}else{
		res.redirect("/");
	}
});

app.get('/adminlogin',function(req, res){
	console.log("insideeeeeeeeee /adminlogin app.jsx");
	sess=req.session;
	sess.user='admin';
	res.redirect("/");
});
app.get('/adminlogout',function(req, res){
	console.log("insideeeeeeeeee1 app.jsx");
	req.session.destroy(function(err)
	{
		if(err){
			console.log("insideeeeeeeeee2 app.jsx");
		    res.redirect("/home");
		}else{
			console.log("insideeeeeeeeee3");
			res.redirect("/");
		}
	});
})

app.use(function(req, res, next) {

  res.redirect("/");
});

app.listen(3000,function(){
	console.log("server ruinng at 30000");
})