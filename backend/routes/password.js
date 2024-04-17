
const express = require('express');
const router = express.Router();

const {sendResetLink, verifyPasswordToken, sendResetPasswordPage} = require('../controllers/resetpassword.js');

router.get("/forget-password", (req , res, next)=>{
    // res.end("this is forgot pass");
    res.render("forget-password");
})

router.post("/send-password-reset", sendResetLink); //send links from the backend
router.get("/reset-password/:id/:token", sendResetPasswordPage);  //request for the reset password page./ rendering
router.post("/reset-password/:id/:token", verifyPasswordToken, (req, res, next)=>{
    if(res.locals.status == 200){
        //give password reset sucessfully message
        //redirect to login
        return res.status(200).json({'success': true, 'message': 'Password reset sucessfully.'})
    }
    else{
        //throw error and its handler in fs
        return res.status(500).json({'success': false, 'message': 'Password reset failed.'})

    }
});  

router.all('/', (req, res, next)=>{
    console.log("Internal server error");
})

module.exports = router;