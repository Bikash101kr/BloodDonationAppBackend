const express = require ('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');

const jwt = require ('jsonwebtoken');

//const validation = require('../validation');

router.post('/register', (req, res, next) => {
    const { errors, isvalid} = validation.registerInput(req.body);
    if(!isvalid){
        res.status(400).json({
            status: 'errors',
            message: errors
        });
    }

    let { username, password, firstName, lastName, role} = req.body;
    User.findOne({username})
    .then((user) => {
        if (user) {
            let err = new Error('User already exists!');
            err.status = 401;
            return next(err);
        }
        bcrypt.hash(password,  (err, hashed) => {
            if(err) next(err);
            User.create({username, password: hashed, firstName, lastName, role})
            .then((user) => {
                res.json({status: 'Registration Sucessful'});
            }).catch(next);
        })
        
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
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role

            }
            jwt.sign(payload, process.env.SECRET, (err,token)=> {
                if(err){
                    return next(err);
                }
                res.json({
                    status: 'Login Sucessful',
                    token: `Bearer ${token}`
                });
            });
            

        }).catch(next);
    }).catch(next);

})














module.exports = router;