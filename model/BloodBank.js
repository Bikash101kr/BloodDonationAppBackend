const mongoose = require('mongoose');

const bloodBankSchema = new mongoose.Schema({
    BloodBankName:{
        type: String,
        required: true
    },
    donationID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DonateBlood'
    }],
    bloodGroup:{
        type: String,
        required: true,
        default: false,
        enum: ['A+','B+','AB+','O+','A-','B-','AB-','O-']
    },
    BloodStatus:{
        type: String, 
        required: true,
        enum: ['available','unavailable']
    }
},{timestamps:true});

module.exports = mongoose.model('BloodBank', bloodBankSchema )

