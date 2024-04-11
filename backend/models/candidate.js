const { text } = require('express');
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Remove leading and trailing whitespace
    },
    email: {
        type: String,
        required : true,
        trim: true
    },
    phone_no:{
        type: String,
        required: true,
        trim: true
    },
    party: {
        type: String,
        trim: true // Remove leading and trailing whitespace
    },
    election:
        [
            {
                _id:false,
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Election'
            }
        ]
    ,
    dateOfBirth: {
        type: Date,
        // required: true
    },
    bio: String, // Optional field for candidate biography
    imageUrl: String, // Optional field for candidate's image URL
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    }

});

// Define a virtual field for the candidate's age based on the date of birth
candidateSchema.virtual('age').get(function() {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
