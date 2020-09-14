const mongoose = require('mongoose');

const bloodBankSchema = new mongoose.Schema({
    BloodBankName:{
        type: String,
        required: true
    },
    availableBloodGroup:{
        type: String,
        required: false
    },
    donations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DonateBlood'
    }],
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    requests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'RequestBlood'
    }]
},{timestamps:true});

module.exports = mongoose.model('BloodBank', bloodBankSchema )

