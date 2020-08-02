const express = require ('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');

const jwt = require ('jsonwebtoken');
const { verifyUser } = require('../auth');

//const validation = require('../validation');

router.post('/register', (req, res, next) => {
    // const { errors, isvalid } = validation.registerInput(req.body);
    // if (!isvalid){
    //     res.status(400).json(errors);
    // }

    let { username, password, firstName, lastName, phone, address, role} = req.body;
    User.findOne({username})
    .then((user) => {
        if (user) {
            let err = new Error('User already exists!');
            err.status = 401;
            return next(err);
        }
        bcrypt.hash(password, 10)
        .then(hashed => {
            User.create({username, password: hashed, firstName, lastName, address, phone, role})
            .then((user)=>{
                res.json(user,'status: Registration Successful'); 
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
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phone: user.phone,
                role: user.role,
                email: user.email

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
    router.get('/logout', (req, res) => {
        req.logout();
        req.flash('success_msg', 'You are logged out');
        res.redirect('/users/login');
      });

      

      // user/:userid/profile get gara
    //   router.route ('/:user_id')
    //   .get((req,res,next) => {
    //       User.find({user: req.params.id})
    //       .then(profile=> {
    //           res.json(profile)
    //       }).catch(next);
    //   })
      router.post ('/profile', verifyUser, (req,res,next)=>{
          let{email, image, dateOfBirth, lastDonation, gender, bloodGroup } = req.body;
          User.create({userID: req.user.id, email, image, dateOfBirth, lastDonation, gender, bloodGroup})
          .then(profile => {
              res.status(201).json(profile);
          }).catch(err => next(err));

      })
    // router.route('/User_Profile')
    // .get ((req, res, next) => {
    //     User.find({user: req.user.id})
    //     .then(UserProfiles=>{
    //         res.json(UserProfiles);
    //     }).catch(next);
   // })
    router.put('/register',(req, res, next)=>{
        User.findOneAndUpdate(User.id, {$set: {
            image: req.body.image,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            bloodGroup: req.body.bloodGroup,
            gender: req.body.gender,
            lastDonation: req.body.lastDonation
    
        }},{new: true})
        .then(updatedProfile => {
            
            res.json(updatedProfile);
        }).catch(next);
        
    })
    
})

module.exports = router;