const mongoose = require('mongoose');
const donateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'    
    },
    weight:{
        type: String,
        required: false
    },
    country:{
        type:String,
        required: false
    },
    state: { 
        type: String,
        required: false
    },
    district:{
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    street: { 
        type: String,
        required: false
    },
    location:{
    type: String,
    enum: ['Point'],
    required: false
    },
    status:{
        type: String,
        required: false,
        enum: ['used', 'on the way', 'stocked on blood bank']
    }

}, {timestamps: true});

module.exports = mongoose.model('DonateBlood',donateSchema );