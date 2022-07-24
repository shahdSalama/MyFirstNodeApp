const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User} = require('../Models/User');

router.post('/register',async(req,res)=>{
    const user = new User({
        ID:req.body.ID,
        Name:req.body.Name,
        Email:req.body.Email,
        Password:req.body.Password
    });
    const result= await user.save();
    res.send(result);
});

module.exports=router;