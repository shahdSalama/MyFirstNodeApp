var express = require("express");
var router = express.Router();
var path  = require("path");
const passport = require("passport");
var handlerDB = require("../controllers/dbHandler");
const Usermodel = require("../db/users");


// handle requestes accourding to its type (get/post/delete)

// responde to a get request (route , fire a function when u type / in the url -> send the html file to be opened)
// we dont specify the content type in the headers. express is smart enough to figure it out
//     get(endpoint , callback func)
router.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "../Home.html"));
});


// router for login tab
router.get("/login", function (req, res) {
	res.sendFile(path.join(__dirname, "../login.html"));
});

//            form action
router.post("/signup", function (req, res) {  
          //call back fuction returns the user from the strategy used  userpassport.js
          var userTobeAdded = {
				username: req.body.username,
				email: req.body.email,
				password: req.body.password
			}
			// custom callback
			// authenticate() is called from within the route handler
			// rather than being used as route middleware. This gives the callback access to the req and res objects through closure.
	passport.authenticate("local.signup", function (err, user, info) {
		if (user) {
			console.log(user + " user already exists");
		} else {
			handlerDB.addUser(userTobeAdded);
			console.log("user saved in db");
			return res.redirect("/login");
		}

	})(req, res);
});

// router for posting login data
router.post("/login", function (req, res, next) {
		// custom callback
	passport.authenticate("local.login", function (err, user, info) {
		if (err) {
			console.log(err);
		}
		if (user) {
			var hashedPassword = user.comparePassword(req.body.password);
			if (hashedPassword) { // el user el fel parameter eli gay me el db	
					// req.logIn(user, function (error) {
					// 	if (error) {
					// 		return console.log(err);
					// 	}
					// 	req.session.authenticated = true;
     //                    req.authenticated = true;

					// });
					global.user = user;
					return res.redirect("/MyTasks");
				} else {
					console.log("password is incorrect");
				}

		}
		if (!user) {
			console.log('username doesnot exist . please make a new accout')
			return res.redirect("/")
		}
	})(req, res, next);
});

// router for post a new task
router.post("/addtask", function (req, res) {
	 if (user) {
	handlerDB.addTask(req, res);
	//console.log(req.body)
	 }

});
// when the url in the browser is /mytasks  
router.get("/MyTasks",  function (req, res) {
	if (req.xhr) {
		return res.json(user);
	} 
	res.sendFile(path.join(__dirname, "../MyTasks.html"));
});

router.delete("/deleteTask", function (req, res) {
	handlerDB.deleteTask(req, res);
});

// function to secure routes 

// function isLoggedIn(req, res, next) {
// 	// user is autheticated.
// 	if (req.isAuthenticated()) {
// 		return next();
// 	} else {
// 		console.log(req.isAuthenticated());
// 		 console.log('not authenticated');
// 		return res.redirect("/");
// 	}
// }

module.exports = router;





//Basic routing
/*
var http =require('http');
var fs = require('fs');

var server = http.createServer(function(req,res ){
	console.log('request was made: ' + req.url);
	if (req.url === '/'){
              \status code and content type of the data 
res.writeHead(200,{'Content-Type' : 'text/html'});
creat stream to read it and read the html and send it to the
respose to read it  all in one step using pipe
fs.creatReadStream(__dirname + '../Home.html').pipe(res);
}
})
*/