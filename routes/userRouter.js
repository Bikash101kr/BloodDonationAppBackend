const express = require ('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const jwt = require ('jsonwebtoken');

process.env.SECRET_KEY = 'secret'
const validation = require('../validation');


router.post('/register', (req, res, next) => {
    let { errors, isvalid } = validation.RegisterInput(req.body);
    if (!isvalid) {
        return res.status(400).json({
            status: 'error',
            message: errors
        });
    }

    let { username, password, firstName, lastName, phone, address, role, email, image,
         dateOfBirth, gender,bloodGroup, lastDonation} = req.body;
    User.findOne({username})
    .then((user) => {
        if (user) {
            let err = new Error('User already exists!');
            err.status = 400;
            return next(err);
        }
        bcrypt.hash(password, 10)
        .then(hashed => {
            User.create({username, password: hashed, firstName, lastName, address, phone, role,
                email, image, dateOfBirth, gender,bloodGroup, lastDonation})
            .then(user => {
                res.status(201).json({ user, "status": "Registration successful" });
            }).catch(next);
        }).catch(next);
        
    }).catch(next);

})
router.post('/login', (req, res, next) => {
    let { username, password} = req.body;
    User.findOne({username})
    .then((user) => {
        if (!user) {
            let err = new Error('User not found ');
            err.status = 401;
            return next(err);
        }
        bcrypt.compare(password, user.password)
        .then((isMatched) => {
            if(!isMatched){
                let err = new Error('password does not match');
                err.status = 401;
                return next(err);
            }
            let payload = {
                id: user.id,
                username: user.username,
                firstName:user.firstName,
                lastName:user.lastName,
                phone:user.phone,
                address:user.address,
                role: user.role,
                email: user.email,
                image:user.image,
                dateOfBirth:user.dateOfBirth,
                gender:user.gender,
                bloodGroup:user.bloodGroup,
                lastDonation:user.lastDonation


            }
            jwt.sign(payload, process.env.SECRET, (err,token)=> {
                if(err){
                    return next(err);
                }
                res.json({
                    status: 'Login Sucessful',
                    token: `Bearer ${token}`,
                    id: user.id
                });
            });
            

        }).catch(next);
    }).catch(next);
    
})


module.exports = router;