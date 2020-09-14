const express = require('express');
const router = express.Router();
const BloodBank = require('../model/BloodBank');
const auth = require("../auth");
const { verifyAdmin } = require('../auth');
const DonateBlood = require('../model/DonateBlood');
const { request } = require('express');


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
.get(verifyAdmin,(req, res, next)=> {
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
router.route('/:id/donations')
    .get(verifyAdmin,(req, res, next) => {
        BloodBank.findById(req.params.id)
            .populate('donations')
            .then(donatedBlood => {
                res.json(donatedBlood.donations);
            }).catch(next);
    })
    .post(verifyAdmin, (req, res, next) => {
        BloodBank.findById(req.params.id)
            .then(donatedBlood=> {
                DonateBlood.create(req.body)
                    .then(donation => {
                        donatedBlood.donations.push(donation._id);
                        donatedBlood.save()
                            .then(updatedDetails => {
                                res.status(201).json(updatedDetails);
                            }).catch(next);
                    }).catch(next);
            }).catch(next);
    })
    .delete(verifyAdmin, (req, res, next) => {
        BloodBank.findById(req.params.id)
            .then(donatedBlood => {
                DonateBlood.deleteMany({ _id: { $in: donatedBlood.donations } })
                    .then(reply => {
                        donatedBlood.donations = [];
                        donatedBlood.save()
                            .then(updatedDetails => {
                                res.json({ reply, updatedDetails });
                            }).catch(next);
                    }).catch(next);
            }).catch(next);
    })
    router.route('/:id/requests')
    .get((req, res, next) => {
        BloodBank.findById(req.params.id)
            .populate('requests')
            .then(requestedBlood => {
                res.json(requestedBlood.requests);
            }).catch(next);
    })
    .post(verifyAdmin, (req, res, next) => {
        BloodBank.findById(req.params.id)
            .then(requestedBlood=> {
                RequestBlood.create(req.body)
                    .then(request => {
                        requestedBlood.requests.push(request._id);
                        requestedBlood.save()
                            .then(updatedDetails => {
                                res.status(201).json(updatedDetails);
                            }).catch(next);
                    }).catch(next);
            }).catch(next);
    })
    .delete(verifyAdmin, (req, res, next) => {
        BloodBank.findById(req.params.id)
            .then(requestedBlood => {
                DonateBlood.deleteMany({ _id: { $in: requestedBlood.requests } })
                    .then(reply => {
                        requestedBlood.requests = [];
                        requestedtedBlood.save()
                            .then(updatedDetails => {
                                res.json({ reply, updatedDetails });
                            }).catch(next);
                    }).catch(next);
            }).catch(next);
    })
module.exports = router;
