const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Remove leading and trailing whitespace
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (endDate) {
                return this.startDate < endDate; // Ensure end date is after start date
            },
            message: 'End date must be after start date'
        }
    },
    candidates: [
        {
        _id:false,   //stops mongoose from creating it's own id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Election = mongoose.model('Election', electionSchema);

module.exports = Election;
