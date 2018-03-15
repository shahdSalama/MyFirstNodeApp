const passport = require("passport");
// local strategy uses accounts saved in database
const LocalStrategy = require("passport-local");  // later will use diff strategy to sign in from facebook / google
const User = require("../db/users");


passport.serializeUser(function (user, done) {
	// fetched 
	done(err, user.id);
});
                               //   id from db
passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user); // user that came back from db
	});
});
// use function to configure the strategy
passport.use("local.signup", new LocalStrategy({
	usernameField: "username",
	passwordField: "password",
	passReqToCallback: true // to be able to return done. callback
}, function (req, username, password, done) { // fetch user to check if it exists or not
	User.findOne({"username": username}, function (err, user) {
		//verify call back function
		return done(err, user);
// 		
	});
}));

passport.use("local.login", new LocalStrategy({
	usernameField: "username",
	passwordField: "password",
	passReqToCallback: true // to be able to return done. callback
}, function (req, username, password, done) { // fetch user to check if it exists or not
	User.findOne({"username": username}, function (err, user) {
		return done(err, user);
// 		
	});
}));

