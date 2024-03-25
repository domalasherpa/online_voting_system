const jwt= require('jsonwebtoken');
const user = require('../models/user.js');
const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');

exports.signin = async(req, res, next)=> {
    try {
        //data fetch
        const {email, password} = req.body;
        //validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message: "Invalid email or password !!!"
            })
        }

        //check for registered User
        let User= await user.findOne({email: `${email}`});
        
        //if user not registered or not found in database
        if(!User){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        //verify password and generate a JWt token 🔎
        if(await bcrypt.compare(password, User.password)){
            req.user = User;
        }
        next();
    } catch (error) {
        console.error(error)
        next(createHttpError.InternalServerError());

    }

}