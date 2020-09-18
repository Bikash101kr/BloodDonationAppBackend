const mongoose = require('mongoose');

const donateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'    
    },
    weight:{
        type: String,
        required: true
    },
    country:{
        type:String,
        required: true
    },

    state: { 
        type: String,
        required: true
    },

    district:{
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },
    street: { 
        type: String,
        required: true
    },
    location:{
    type: String,
    required: false
    },
    status:{
        type: String,
        required: false,
        enum: ['used', 'on the way', 
        'stocked on blood bank']
    },
    bloodGroup:{
        type: String,
       required: true,
        default: false,
        enum: ['A+','B+','AB+','O+','A-','B-','AB-','O-']
    },

}, {timestamps: true});

module.exports = mongoose.model('DonateBlood',
donateSchema );