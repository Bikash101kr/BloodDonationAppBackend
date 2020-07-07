const express = require('express');
const router = express.Router();
const BloodBank = require('../model/BloodBank');


router.route('/')
.get((req, res, next)=> {
    BloodBank.find()
    .then(availableBlood=>{
        res.json(availableBlood)
    }).catch(next);
})
.post((req,res,next)=>{
    BloodBank.create(req.body)
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
