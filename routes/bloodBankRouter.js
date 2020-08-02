const express = require('express');
const router = express.Router();
const BloodBank = require('../model/BloodBank');
const auth = require("../auth");
const { verifyAdmin } = require('../auth');


router.route('/')
.get((req, res, next)=> {
    BloodBank.find({user: req.user.id})
    .then(availableBlood=>{
        res.json(availableBlood)
    }).catch(next);
})
.post(verifyAdmin, (req,res,next)=>{
    let {BloodBankName, donations, requests } = req.body;
    BloodBank.create({BloodBankName, donations, requests })
    .then(storeBlood=> {
        res.status(201).json(storeBlood)
    }).catch(next);
    
})
.delete(verifyAdmin, (req, res, next)=> {
    BloodBank.deleteMany({user: req.use.id})
    .then(reply=>{
        res.json(reply);
    }).catch(next);
})
router.route('/:bloodBank_id')
.get(verifyAdmin, (req, res, next)=> {
    BloodBank.findById(req.params.bloodBank_id)
    .then(availableBlood=>{
        res.json(availableBlood);
    }).catch(next);
})
.put(verifyAdmin, (req, res, next)=> {
    BloodBank.findOneAndUpdate(req.params.bloodBank_id,
        {$set: req.body}, {new: true})
    .then(updateDetails => {
        res.json(updateDetails);
    }).catch(next)
})
.delete(verifyAdmin, (req, res, next)=> {
    BloodBank.deleteOne({_id:req.params.bloodBank_id})
    .then(reply=> {
        res.json(reply);
    }).catch(next);
})

module.exports = router;
