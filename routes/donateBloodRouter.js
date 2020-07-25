const express = require('express');
const router = express.Router();
const DonateBlood = require('../model/DonateBlood');

router.route('/')
.get((req, res, next)=>{
    DonateBlood.find()
    .then(donations=> {
        res.json(donations);
    }).catch(next);
})
.post((req, res, next)=> {
    DonateBlood.create(req.body)
    .then( Donation => {
        res.status(201).json(Donation);

    }).catch(next);
})
.delete((req, res,next) => {
    DonateBlood.deleteOne()
    .then(reply=> {
        res.json(reply);
    }).catch(next);
});
router.route('/:donation_id')
.get((req,res,next) => {
    DonateBlood.findById(req.params.donation_id)
    .then(Donation => {
        res.json(Donation);
    }).catch(next);
})
.put((req,res,next) => {
    DonateBlood.findByIdAndUpdate(req.params.donation_id,{$set: req.body},{new: true})
    .then(updateDonation => {
        res.json(updateDonation);

    }).catch(next);
})
.delete((req, res, next) => {
    DonateBlood.deleteOne({_id:req.params.donation_id})
    .then(reply => {
        res.json(reply);
    }).catch(next);
})
router.route('/:donation_id/Status')
.get((req, res, next)=>{
    DonateBlood.findById(req.params.donation_id)
    .then(Donation => {
        res.json(Donation.Status);
    }).catch(next);
})
.post((req, res, next) => {
    DonateBlood.findById(req.params.donation_id)
    .then(Donation => {
        Donation.Status.push(req.body);
        Donation.save()
        .then(updatedDonateblood => {
            res.json(updatedDonateblood.Status);
        }).catch(next);
    }).catch(next);
})
.put((req, res,next) => {
    DonateBlood.findById(req.params.donation_id)
    .then(Donation => {
        let status = Donation.donation_id(req.params.donation_id);
        Status.text = req.body.text;
        Donation.save()
        .then(updatedDonateBlood => {
            res.json(Donation.Status(req.params.donation_id));
        }).catch(next);
    }).catch(next);

})

module.exports = router;