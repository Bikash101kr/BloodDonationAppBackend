const express = require('express');
const router = express.Router();
const BloodBank = require('../model/BloodBank');
const auth = require("../auth");


router.route('/')
.get((req, res, next)=> {
    BloodBank.find()
    .then(availableBlood=>{
        res.json(availableBlood)
    }).catch(next);
})
.post((req,res,next)=>{
    let {BloodBankName, bloodGroup, BloodStatus } = req.body;
    BloodBank.create({BloodBankName, bloodGroup, BloodStatus })
    .then(storeBlood=> {
        res.status(201).json(storeBlood)
    }).catch(next);
    
})
.delete((req, res, next)=> {
    BloodBank.deleteOne()
    .then(reply=>{
        res.json(reply);
    }).catch(next);
})
.put((req, res, next)=> {
    BloodBank.findOneAndUpdate(req.body)
    .then(updateDetails => {
        res.json(updateDetails);
    }).catch(next)
})

module.exports = router;
