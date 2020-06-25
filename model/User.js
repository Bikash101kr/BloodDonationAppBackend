const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true,
        
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 15
    },
    role:{
        type: String,
        default: 'basic',
        enum:['admin', 'basic']
    },
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    
    },
    email:{
        type:String,
        required: false
    },
    image:{
        type: String,
        required: false
    },
    address:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    gender:{
        type: String,
        required: true,
        default: false,
        enum: ['male', 'female', 'others']
    },
    bloodGroup:{
        type: String,
        required: true,
        default: false,
        enum:['A+','B+','O+','AB+','A-','B-','AB-','O-']
    },
    lastDonation:{
        type:Date,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('User', userSchema)