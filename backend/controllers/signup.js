//to add usr photo path in mongo db and store it in the folder using node js
const bcrypt = require('bcrypt')
const user = require("../models/user")
const OTP = require('../models/OTP');
const createError = require('http-errors');
const sendotp = require('./sendotp');
//signup handle
exports.signup = async(req, res)=> {
    try {
        //get input data
        const {name, email, phone_no, password}= req.body; 

        //verify otp
        console.log("INside the sign up: :", name);
        // Check if All Details are there or not
		if (!validateUserData(email, phone_no, password)) throw createError('403', "Please enter valid information.");

        const existingUser = await user.findOne({email});
        if(existingUser) throw createError(401, "user already exists.");

        //secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);  //hash along with the salt
        } catch (error) {
            throw createError.InternalServerError();
        }

        const User = await user.create({name, email, password:hashedPassword, phone_no, "profile_path": req.file ? req.file.filename : ""});
        console.log("user created sucessfully");
        return res.status(200).json({success: true, message: "user created successfully ✅"});

    } catch (error) {
        console.error(`Error occured in signup: ${error}`);
        return res.status(400).json({message: "Internal server error"});
    }
}

exports.validateUser = async (req, res, next)=>{
    try{
        console.log("insisde validae user");
        const {name, email, phone_no, password} = JSON.parse(JSON.stringify(req.body));
        console.log(name, email, "datas", req);
        if (!validateUserData(email, phone_no, password)) return next(createError('403', "Please enter valid information."));
        const existingUser = await user.findOne({email});
        if(existingUser) return next(createError.Conflict("user already exists"));
        //check file size multer
        return next();
    }
    catch(err){
        return next(createError(401, "unable to validate user data"));
    }
    
}

function validateUserData(email, phone_no, password){
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    const phonenumberRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    
    if(email.match(emailRegex) && password.match(passwordRegex) && phone_no.match(phonenumberRegex)){
        return true;
    } 
    else{
        return false;
    }
}