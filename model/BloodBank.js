const mongoose = require('mongoose');

const bloodBankSchema = new mongoose.Schema({
    BloodBankName:{
        type: String,
        required: true
    },
    bloodGroup:{
        type: String,
        required: true,
        default: false,
        enum: ['A+','B+','AB+','0+','A-','B-','AB-','O-']
    },
    BloodStatus:{
        type: String, 
        required: true,
        enum: ['available','unavailable']
    }
},{timestamps:true});

module.exports = mongoose.model('BloodBank', bloodBankSchema )

