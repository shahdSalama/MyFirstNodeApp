// express is web framework over nodejs to ease dealing with requests(request/ response). it is a wrapper over the node js http module.
// it helps the app when creating an mvc project (model(handles the db),controler (bl),view(ui visible to the user))
// it makes a gracefull error handeling
// it hanldes REST api
const express = require("express");
//make expresss app to access all the functions in express
// a router is attached to this app instance.
//middle ware are attached to this app instance.

const app = express();
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
// use the routs file
const routes = require("./routes/routes.js");
// require the use passport file
require("./configPassport/userpassport");


// use body parser midddle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// setting of session

app.use(session({
	secret: "shahd",
	saveUninitialized: true,// sessions aren't stored for brand new sessions that are empty, they won't stored until somthing is in them
	// this cuts down on database traffic(memory)
	resave: true// update session on each page view. to avoid session expirey. updates the session
}));
// setting of passport init



app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// serve static files like css .. map the static files in public folder
// the public folder is accessed directly without useing routes
app.use(express.static(path.join(__dirname, "public")));

// use the routes
app.use("/", routes);

// handel the error // middleware
app.use(function (req, res, next) {
	var err = new Error("not found");
	err.status = 404;
	// next means go to the next middle ware
	next(err);
});

// route if there are error    ...
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.sendFile(path.join(__dirname, "error.html"));
});
var port = process.env.PORT || 3000;



// listen to a port
app.listen(port);
