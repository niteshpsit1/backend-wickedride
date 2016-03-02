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
	    res.render('login');
	}else{
		res.redirect("/home");
	}
});
app.get("/home", function(req, res){
    sess = req.session;
	if(sess.user){
	    res.render('index');
	}else{
		res.redirect("/");
	}
});

app.get('/adminlogin',function(req, res){
	sess=req.session;
	sess.user='admin';
	res.redirect("/");
});
app.get('/adminlogout',function(req, res){
	req.session.destroy(function(err)
	{
		if(err){
		    res.redirect("/home");
		}else{
			res.redirect("/");
		}
	});
})

app.use(function(req, res, next) {

  res.redirect("/");
});

app.listen(3000,function(){
	console.log("server ruinng at 3000");
})