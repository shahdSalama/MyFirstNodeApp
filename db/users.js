var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/admin");
var Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

var newUser  = new Schema({
	username: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	tasks: {type: Array}
});


// create fun to encrypt pass
//bcrypt
// to hash the password   

// newuser.methods .... creating new methods to the prototype
newUser.methods.encryptPassword = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

// to compare the password when logging in
newUser.methods.comparePassword = function (password) {
	                //password entered in the login , password ni the data base(newuser)
	return bcrypt.compareSync(password, this.password);
}

// export users to be able to dealwith it outside this module(file name,schema,collection name ) 
var user = module.exports = mongoose.model("users", newUser, "usersColl");


