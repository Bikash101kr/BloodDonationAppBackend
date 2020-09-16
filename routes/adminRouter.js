const express = require('express');
const router = express.Router();
const DonateBlood = require('../model/DonateBlood');
const RequestBlood = require('../model/RequestBlood');
const User = require('../model/User');

router.route('/donations')
.get((req,res,next)=>{
    DonateBlood.find()
    .then(donations=> {
        res.json(donations);
    }).catch(next);
})

router.route('/:donation_id/status')
.get((req, res, next)=>{
    DonateBlood.findById(req.params.donation_id)
    .then(Donation => {
        res.json(Donation.Status);
    }).catch(next);
})

.put((req, res, next)=> {
    DonateBlood.findByIdAndUpdate(req.params.donation_id, {$set: { status: req.body.status}}, {new: true})
    .then(DonateBlood => {
        res.json(DonateBlood);
    }).catch(next);
})


router.route('/requests')
.get((req,res,next)=>{
    RequestBlood.find()
    .then(requests=> {
        res.json(requests);
    }).catch(next);
})

router.route('/users')
.get((req,res,next)=>{
    User.find()
    .then(users=>{
        res.json(users);
    }).catch(next);
})
router.route('/:user_id')
.get((req, res, next)=>{
    User.findById(req.params.user_id)
    .then(userDetails=>{
        res.json(userDetails);
    }).catch(next)
})
.delete((req, res, next) => {
    User.deleteOne({_id:req.params.user_id})
    .then(reply => {
        res.json(reply);
    }).catch(next);
})
router.route('/:user_id/role')
.get((req, res, next)=>{
    User.findById(req.params.user_id)
    .then(user => {
        res.json(user.role);
    }).catch(next);
})

.put((req, res, next)=> {
    User.findByIdAndUpdate(req.params.user_id, {$set: { role: req.body.role}}, {new: true})
    .then(role => {
        res.json(role);
    }).catch(next);
})
module.exports = router;