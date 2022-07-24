const express = require('express');
const {User} = require('../Models/User');
const router = express.Router();
// page register creates new user
router.get('/register', (req, res) => {
    res.render('pages/register')
});

router.post('/register',async (req, res) => {
    let user = new User({
        ID:'33',
        Name:req.body.Name,
        Email:req.body.Email,
        Password:req.body.Password
    });

    const result = await user.save();
    // after creating a new user, page redirects to login page
    res.redirect('/api/authenticate/login');
})

router.get('/login', (req, res) => {
    res.render('pages/login')
});
// after user logs in, page redirects to all products page
router.post('/login', async (req, res) => {
    res.redirect('/api/product');
})

module.exports=router;