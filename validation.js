const validator = require('validator');

const registerInput = (data) => {
    let errors = {};
    if (data.username){
        if(!validator.isLenth(data.username.trim(),{ min: 6, max: 30})){
            errors.username='Username must be between 6 and 30 characters';
        }
    } else errors.username = 'username is required';
    if (data.password){
        if(!validator.isLenth(data.password.trim(), {min:6, max: 30})){
            errors.password = 'Password must be between 6 and 30 characters';
        }
    }else errors.password = 'password is required';
    return{ 
        errors,
        isValid: Object.keys(errors).length = 0
    }
}
module.exports = {
    registerInput
}