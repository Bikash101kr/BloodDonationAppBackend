const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    requirement:{
        type: String,
        required: true,
        default: false,
        enum: ['fresh','general']
    },
    patientName:{
        type: String,
        required: true
    },
    patientAge:{
        type: String,
        required: true
    },
    bloodGroup:{
        type: String,
       required: true,
        default: false,
        enum: ['A+','B+','AB+','O+','A-','B-','AB-','O-']
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
    hospitalName:{
        type: String,
        required: true
    },
    location:{
    type: String,
    enum: ['Point'],
    required: true
    },
    needUnit:{
        type: String,
        required: true
    },
    requirementReason:{
        type: String,
        required: true
    },
    requireBefore:{
        type: Date,
        required: true
    },
    requestID:{
        type: String,
        required: false,
        unique: true,
    }
},{timestamps:true});

module.exports = mongoose.model('RequestBlood',requestSchema )

