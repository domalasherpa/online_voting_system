const express = require('express');
const cors = require('cors'); 
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const multer = require('multer');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './public')));

require('dotenv').config()
const PORT = process.env.PORT || 4000

const corsOptions = {
    origin: true,
    credentials: true, //included credentials as true
};

//middlewares
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser());
app.use(cors(corsOptions));


//calling Database function
require('./config/database').connect();


//route importing and mounting
const user = require('./routes/user');
const password = require('./routes/password');

app.use('/api/v1', user);
app.use('/api/v1', password);

//error handling
app.use((err, req, res, next) => {
    
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size limit exceeded. Maximum allowed size is 300KB' });
    }

    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message
    })
})

app.listen(PORT, ()=>{
    console.log("Server Started")
})