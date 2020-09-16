const express = require('express');
const router = express.Router();
const User = require('../model/User')
const validation = require('../validation');

// router.route('/')
// .get((req, res, next) =>{
// 	let profileId = req.user.pro_id;
//     Profile.find({_id: profileId})
//     .then((profiles) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.json(profiles);
//     }).catch(err => next(err));
// })
// .post((req, res, next) => {
//     let {email, image, dateOfBirth, gender,bloodGroup, lastDonation} = req.body;
// //   \ req.user is from auth.verifyUser which is from payload. 
//     Profile.create({owner: req.user.id, email, image, dateOfBirth, gender,bloodGroup, lastDonation})
//     .then(profile => {
//         res.status(201).json(profile);
//     }).catch(err => next(err));
// })

// router.route('/:profile_id')
// .get((req, res, next) => {
//     Profile.findById(req.params.profile_id)
//     .then(profile => {
//         res.json(profile);
//     }).catch(err => next(err));
// })
// .put((req,res,next) => {
//     Profile.findByIdAndUpdate(req.params.profile_id, {$set: req.body},{new: true})
//     .then(profile => {
//         res.json(profile);
        
//     }).catch(err => next(err));
// })
router.route('/:user_id')
.get((req,res,next)=>{
    User.findById(req.params.user_id)
    .then(user=>{
        res.json(user);

    }).catch(err => next(err));
})
.put((req,res,next)=>{
    User.findByIdAndUpdate(req.params.user_id,
        {$set: req.body},{new: true})
        .then(updateduser=> {
            res.json(updateduser);
        }).catch(next);
    })

.delete((req, res, next)=> {
    User.deleteOne({_id:req.params.user_id})
    .then(reply=> {
        res.json(reply);
    }).catch(next);
})
module.exports = router;

