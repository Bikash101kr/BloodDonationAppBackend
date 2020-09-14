const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'    
    },
    email:{
        type:String,
        required: false
    },
    image:{
        type: String,
        required: false
    },
    
    dateOfBirth:{
        type: String,
        required: false
    },
    gender:{
        type: String,
        required: false,
        enum: ['male', 'female', 'others']
    },
    bloodGroup:{
        type: String,
        required: false,
        enum:['A+','B+','O+','AB+','A-','B-','AB-','O-']
    },
    lastDonation:{
        type:String,
        required:false
    }
},{timestamps:true});

module.exports = mongoose.model('Profile', profileSchema)