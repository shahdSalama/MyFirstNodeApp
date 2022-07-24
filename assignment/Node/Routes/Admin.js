const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {Product} = require('../Models/Products');

router.get('/', async (req, res) => {
    const prods = await Product.find().sort({Name:1});
    res.render('pages/admin',{
        Products:prods
    })
});

module.exports=router;
