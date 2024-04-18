const otpGenerator = require("otp-generator");
const user = require("../models/user");
const OTP = require('../models/OTP');
const { generateToken } = require("../middlewares/jwtAuthMiddleware");
require('dotenv').config();


exports.sendotp = async (req, res) => {
	try {
		const email= req.body["email"];
		let User = req.user ?? 0;

		if(!user){
			User = await findOne({email: `${email}`});
		}

		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});

		const result = await OTP.findOne({ otp: otp });
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);

        //already generated OTP
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}
        
		const payload ={
			email: User.email,
			id: User._id,
			role: User.role,
		}

		const token =  generateToken(payload, process.env.JWT_AUTH_SECRET);

		// User.password = undefined
		const options = {
		expires: new Date( Date.now()+ 3*24*60*60*1000),
		httpOnly: true , //It will make cookie not accessible on clinet side -> good way to keep hackers away
		path: '/'
		}

		const otpPayload = { email, otp };
		const otpBody = await OTP.create(otpPayload);
		console.log("OTP Body", otpBody);
		// const token =  generateToken({email}, process.env.JWT_AUTH_SECRET);
		return res.cookie(
			"token",
			token,
			options
		).status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			token: token
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
};