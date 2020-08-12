const validator = require('validator');

const registerInput = (data) => { //data is arguement!!
    let errors = {};
    if (data.username) {
        if (!validator.isLength(data.username.trim(), {min:5, max: 30})) { //trim() is used to remove white space from both ends and not from between two words. !!!!
            errors.username = 'Username must be in 5 to 30 chacraters.'
        }
    } else errors.username = 'Username is required';

    if (data.password) {
        if ((!validator.isLength(data.password.trim(), {min:5, max: 30}))) 
            errors.username = 'Password must be in 5 to 30 chacraters.'
    } else errors.password = 'Password is required'

    return { 
        errors,
        isvalid: Object.keys(errors).length === 0
    }
}
module.exports = {
    registerInput
};