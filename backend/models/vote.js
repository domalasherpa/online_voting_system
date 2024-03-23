const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (assuming you have one)
        required: true
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate', // Reference to the Candidate model
        required: true
    },
    election: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Election', // Reference to the Election model
        required: true
    }
    // You can add more fields as needed
});

// Mongoose pre-save hook to validate user, candidate, and election references
voteSchema.pre('save', async function (next) {
    try {
        // Ensure that the user, candidate, and election references are populated and valid
        if (!this.user || !mongoose.Types.ObjectId.isValid(this.user)) {
            throw new Error('Invalid user reference');
        }

        if (!this.candidate || !mongoose.Types.ObjectId.isValid(this.candidate)) {
            throw new Error('Invalid candidate reference');
        }

        if (!this.election || !mongoose.Types.ObjectId.isValid(this.election)) {
            throw new Error('Invalid election reference');
        }

        // If all references are valid, proceed with saving the vote
        next();
    } catch (error) {
        next(error); // Pass any validation error to the next middleware
    }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
