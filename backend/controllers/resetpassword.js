const jwt = require('jsonwebtoken')
const user = require('../models/user.js');

const path = require('path');
const mailSender = require('../utils/mailSender.js');
const bcrypt = require('bcrypt');

exports.sendResetLink =async (req, res, next)=>{
    try{

        const {email} = req.body;
        console.log("Inside the send reset link");
        const User = await user.findOne({"email": `${email}`});
        //make sure user exists in db
        if(!User){
            res.send("user not found!!");
            console.log("user not found");
            return;
        }

        //user exists then create one time link valid for 5 minutes
        const secret = process.env.JWT_AUTH_SECRET + User.password  //unique secretkey for everyuser
        const payload = {
            email: User.email,
            id: User.id
        }

        const token = jwt.sign(payload, secret , {expiresIn: "15m"});

        const link = `http://localhost:4000/api/v1/reset-password/${User.id}/${token}`;
        await mailSender(User.email, "reset password", link);
        return res.status(200).json({"success": true, "message": "password reset link has been sent!"});
    }
    catch(err){
        console.log("error: ", err);
        return res.status(500).json({"success": false, "message": "Internal server error"});
    }
}

exports.sendResetPasswordPage = async(req, res, next)=>{
    const {id,token} = req.params;
    const User = await user.findById(id);
    if(!User){
        return res.status(400).json({
            "success": false, 
            "message": "Invalid id"
        });
    }
    //valid id and have valid user with this id
    const secret = process.env.JWT_AUTH_SECRET + User.password;
    console.log("secret: ", secret);
    try{
        const payload = jwt.verify(token , secret);
        res.render("pages/reset-password", {email: User.email, id, token});
    }catch(e){
        console.log(e.message);
        const apiBaseUrl = process.env.API_BASE_URL;
        res.render('pages/resetLink-expired.ejs', {apiBaseUrl});
    }
}

exports.verifyPasswordToken = async(req, res, next)=>{
    const {id,token} = req.params;
    const {password, password2} = req.body;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

    if(!password.match(passwordRegex) && password != password2){
        return res.status(400).json({'success': false, 'message': 'Incorrect password format'});
    }
    
    const User = await user.findById(id);
    const secret = process.env.JWT_AUTH_SECRET + User.password;
    try {
        const payload = jwt.verify(token,secret);
        let hashedPassword = await bcrypt.hash(password, 10);
        User.password = hashedPassword;
        await User.save(); //save in mongodb
        res.locals.status = 200;
        next();
        
    } catch (error) {
        console.log(error.message);
        res.status(400).json({'success': false, 'message': "The reset password link has expired. "});
    }
}