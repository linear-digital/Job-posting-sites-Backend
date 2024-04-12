const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require('dotenv').config()
const app = express();


// Middlewares
app.use(bodyparser.json());
app.use(cors());

// Routes 

app.use('/api/user', require('./modules/user/userRouter'));


// Connect Mongodb Database 

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true    
}).then(() => {
    console.log("Database Connection Successfull");
}).catch((err) => {
    console.log(err);
})



app.listen(5000, () => console.log("Server running on port 5000"));
