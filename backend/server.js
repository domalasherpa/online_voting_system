const express = require('express')
const cors = require('cors');
const path = require('path');

const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 4000

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//calling Database function
require('./config/database').connect()


//route importing and mounting
const auth = require('./routes/auth')

app.use('/api/v1', auth)

app.use('/main', (req, res)=>{
    res.render('pages/dashboard');
})

app.use('/elections', (req, res)=>{
    res.sendFile(path.join(__dirname, 'allelection', 'electionDetails.html'));
} )

app.listen(PORT, ()=>{
    console.log("Server Started")
})