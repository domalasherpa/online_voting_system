const express = require('express');
const router = express.Router();

//Handlers from controllers
const {signup, validateUser}= require("../controllers/signup");
const {sendotp}= require("../controllers/sendotp");
const {verifyOtp} = require("../middlewares/verifyOtp");
const {signin} = require("../controllers/signin");
const createHttpError = require('http-errors');
const {jwtAccessToken, jwtAuthToken} = require("../middlewares/jwtAuthMiddleware");
const {upload, validateUserImage} = require('../middlewares/imageHandler.js');

//register
router.post('/signup', upload.single('profile'), validateUserImage, validateUser, signup);

//login
router.post('/signin',signin, sendotp);
router.post('/verifyotp', jwtAuthToken, verifyOtp )

router.post('/sendotp', jwtAuthToken, sendotp);    //only the user with jwt token

router.all('/', (req, res, next)=>{
    return next(createHttpError.Unauthorized()); 
});

module.exports = router
