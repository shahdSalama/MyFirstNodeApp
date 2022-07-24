const mongoose=require('mongoose');
// user schema id, name, email and password
const UserSchema=mongoose.Schema({
    ID:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        // data type
        type:String,
        // ccannot be null
        required:true
    }
});

const User = mongoose.model('user',UserSchema);

exports.User=User;