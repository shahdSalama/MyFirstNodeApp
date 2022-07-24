const express = require('express')
const mongoose = require('mongoose');
const cors=require('cors');
const app = express();
const product = require('./Routes/Products');
const User = require('./Routes/User');
const Authenticate = require('./Routes/Authenticate');
const Admin = require('./Routes/Admin');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
const port = 3000
app.set('view engine', 'ejs')

app.use(cors());
app.use(express.json());
app.use('/api/product',product);
app.use('/api/user',User)
app.use('/api/authenticate',Authenticate);
app.use('/api/admin',Admin);


mongoose.connect('mongodb://127.0.0.1:27017/Store').then(()=>{
    console.log('Connecting to Database......');
}).catch(()=>{console.log('connection failed....')})
app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})