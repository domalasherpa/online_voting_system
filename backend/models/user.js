const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        trim: true
    },
    email: {
        type: String,
        required : true,
        trim: true
    },
    phone_no:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required : true
    },
    profile_path:{
        type: String,
        default: ""
    },
    verfied:{
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum : ['Admin', 'User'],
        default: 'User'
    }
})

module.exports = mongoose.model('user', userSchema)