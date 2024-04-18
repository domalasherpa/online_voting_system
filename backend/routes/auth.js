const express = require('express');
const router = express.Router();

//Handlers from controllers
const {signup}= require("../controllers/signup");
const {sendotp}= require("../controllers/sendotp");

router.post('/signup', signup);
router.post('/sendotp', sendotp);

module.exports = router