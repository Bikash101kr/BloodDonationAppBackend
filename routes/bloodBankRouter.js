const express = require('express');
const router = express.Router();
const BloodBank = require('../model/BloodBank');
const { verifyAdmin } = require('../auth');


router.route('/')
.get((req, res, next)=> {
    BloodBank.find()
    .then(availableBlood=>{
        res.json(availableBlood)
    }).catch(next);
})
.post(verifyAdmin, (req,res,next)=>{
    let {BloodBankName, availableBloodGroup, donations, requests } = req.body;
    BloodBank.create({BloodBankName,availableBloodGroup, donations, requests })
    .then(bloodBank=> {
        res.status(201).json(bloodBank)
    }).catch(next);
    
})

router.route('/:bloodBank_id')
.get(verifyAdmin,(req, res, next)=> {
    BloodBank.findById(req.params.bloodBank_id)
    .then(bloodBank=>{
        res.status(201).json(bloodBank);
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
