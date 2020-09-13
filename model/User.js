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
        required: true
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
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RequestBlood'
    }]
},{timestamps:true});

module.exports = mongoose.model('User', userSchema)