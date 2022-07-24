const mongoose=require('mongoose');
// producct schema id name image desc
const ProductSchema=mongoose.Schema({
    ID:{
        // data type
        type:String,
        // cannot be null:  needs to be entered
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Image:{
        type:String,
    },
    Description:{
        type:String,
    }
});

const Product = mongoose.model('product',ProductSchema);

exports.Product=Product;