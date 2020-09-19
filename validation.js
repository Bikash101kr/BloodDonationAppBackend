const validator = require('validator');

const RegisterInput = (data) => { //data is arguement!!
    let errors = {};
    if (data.username) {
        if (!validator.isLength(data.username.trim(), {min:5, max: 30})) { //trim() is used to remove white space from both ends and not from between two words. !!!!
            errors.username = 'Username must be in 5 to 30 chacraters.'
        }
    } else errors.username = 'Username is required';

    if (data.password) {
        if ((!validator.isLength(data.password.trim(), {min:5, max: 30}))) 
            errors.username = 'Password must be in 5 to 30 chacraters.'
    } else errors.password = 'Password is required';
    if (data.firstName) {
        if (!validator.isLength(data.firstName.trim(), { min: 2, max: 30 })) {
            errors.firstName = 'First name must be between 2 and 30 characters';
        }
    } else errors.firstName = 'First name is required';

    if (data.lastName) {
        if (!validator.isLength(data.lastName.trim(), { min: 2, max: 30 })) {
            errors.lastName = 'Last name must be between 2 and 30 characters'
        }
    } else errors.lastName = 'Last name is required';
    if (data.address) {
        if (!validator.isLength(data.address.trim(), { min: 2, max: 50 })) {
            errors.address = 'address must be between 2 and 50 characters'
        }
    } else errors.address = 'address is required';


    return { 
        errors,
        isvalid: Object.keys(errors).length === 0
    }
}
module.exports = {
    RegisterInput
};