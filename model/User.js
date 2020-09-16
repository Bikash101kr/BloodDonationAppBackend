const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        
    },
    password: {
        type: String,
        required: true,
        
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
        required: false
    },
    
    address:{
        type: String,
        required: true

        
    },
    role:{
        type: String,
        required: false,
        default: 'basic',
        enum: ['basic', 'admin']
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

module.exports = mongoose.model('User', userSchema)