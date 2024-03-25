const jwt = require('jsonwebtoken');
const createError = require('http-errors');
require('dotenv').config();


const jwtAuthToken = (req, res, next)=>{ //for accessing otps path

    const token = req.cookies.token ??  0 ; //if null then set token to 0

    if(!token) return next(createError(401, 'Unauthorized access'));

    try{
        const payload = jwt.verify(token, process.env.JWT_AUTH_SECRET);
        req.payload = payload;
        console.log("verified");
        next();
    }
    catch(err){
        console.error(err);
        return next(createError(401, 'Invalid token'));
    }
}

const jwtAccessToken = (req, res, next)=>{ //for only users only available through login
    const token = req.cookies.token ??  0 ; //if null then set token to 0

    if(!token) return next(createError(401, 'Unauthorized access'));

    try{
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.payload = payload;
        console.log("verified");
        next();
    }
    catch(err){
        console.error(err);
        return next(createError(401, 'Invalid token'));
    }
}

function generateToken(payloads, secretKey) {
    //generate jwt token using user data
    const payload = payloads;
    const secret = secretKey;
    const options = {
        "expiresIn": "3600s",
    };

    try {
        return jwt.sign(payload, secret, options);
    }
    catch (err) {
        console.log(err);
        return createError.InternalServerError();
    }

}

module.exports =  { jwtAccessToken, jwtAuthToken, generateToken };