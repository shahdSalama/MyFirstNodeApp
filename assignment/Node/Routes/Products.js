const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Product} = require('../Models/Products');

router.get('/',async(req,res)=>{
    const prods = await Product.find().sort({Name:1});
    res.render('pages/products',{
        Products:prods
    });
})
router.post('/addproduct',async(req,res)=>{
    const prod = new Product({
        ID:req.body.ID,
        Name:req.body.Name
    });
    const result= await prod.save();
    res.send(result);
});

module.exports=router;