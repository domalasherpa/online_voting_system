//to add usr photo path in mongo db and store it in the folder using node js
const bcrypt = require('bcrypt')
const user = require("../models/user")
const OTP = require('../models/OTP')
require('dotenv').config()

//signup handle
exports.signup = async(req, res)=> {
    try {
        //get input data
        const {name, email, phone_no, password}= req.body
        // Check if All Details are there or not
		if (!name ||
			!email ||
			!password ||
            !phone_no
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}

        //check if use already exists?
        const existingUser = await user.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        // Find the most recent OTP for the email
		// const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		// console.log(response);
		// if (response.length === 0) {
		// 	// OTP not found for the email
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The OTP is not valid",
		// 	});
		// } else if (otp !== response[0].otp) {
		// 	// Invalid OTP
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The OTP is not valid",
		// 	});
		// }
        // else{
        //     verified = true;
        // }


        //secure password
        let hashedPassword
        try {
            hashedPassword = await bcrypt.hash(password,10)
        } catch (error) {
            return res.status(500).json({
                success: false,
                message : `Hashing pasword error for ${password}: `+error.message
            })
        }

        const User = await user.create({
            name, email, password:hashedPassword, phone_no
        })

        return res.status(200).json({
            success: true,
            User,
            message: "user created successfully ✅"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "User registration failed"
        })
    }
}
