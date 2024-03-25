const user = require('../models/user.js');
const OTP = require('../models/OTP.js');
const {generateToken, jwtAuthMiddleware} = require('./jwtAuthMiddleware.js');
const createError = require('http-errors');

exports.verifyOtp = async(req, res, next)=>{
    // Find the most recent OTP for the email
       const {email, otp} = req.body;
       const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
      
       const User = await user.findOne({email});
       if(User && User.verified == true) return next(createError(400, "User already verified"));

       if (response.length === 0) { 
            return next(createError(400, "The otp is not valid."));
       }
       else if (otp == response[0].otp) {
            //set user verified to true
            if(!User.verified){ //for first time users
                User.verified = true;
                try{
                    await User.save();
                }
                catch(err){
                    if (err instanceof Error && err.name === 'MongooseError') {
                        // This error is from Mongoose
                        console.error('Mongoose error:', err);
                    }
                }
            }
            console.log("otp is valid.");
            const payload ={ email: User.email, id: User._id, role: User.role}
            let token = generateToken(payload, process.env.JWT_ACCESS_SECRET);
            const options = {
                expires: new Date( Date.now()+ 3*24*60*60*1000),
                httpOnly: true
            }

            return res.cookie(
                "token",
                token,
                options
            ).status(200).json({
                success: true,
                message: "Logged in Successfully✅"

            });
       }
       else{
            console.log("invalid otp");
            return next(createError(400, "The otp is not valid."));
       }
}