const express = require('express');
const router = express.Router();
const DonateBlood = require('../model/DonateBlood');
const { verifyUser } = require('../auth');
const { update } = require('../model/DonateBlood');

router.route('/')
.get(verifyUser, (req, res, next)=>{
    DonateBlood.find({user: req.user.id})
    .then(donations=> {
        res.setHeader('Content-Type', 'application/json');
        res.json(donations);
    }).catch(next);
})
.post((req, res, next)=> {
        let { weight, country, state, district, city, street, location} = req.body;
        DonateBlood.create({ userID: req.user.id, weight, country, state, 
            district, city, street, location})
    .then( Donation => {
        res.status(201).json(Donation);

    }).catch(err => next(err));

})
.delete((req, res,next) => {
    DonateBlood.deleteMany({userID: req.user.id})
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
// if (req.user.role == 'basic'){
//     DonateBlood.findByIdAndUpdate(req.params.donation_id, {$set: req.body}, {new:true})
//     .then(updatedDonation => {
//         res.json(updatedDonation)
//     }).catch(next);
// }
    // if(req.user.role == 'basic')
    // {

    DonateBlood.findByIdAndUpdate( req.params.donation_id,
        {$set: {weight: req.body.weight, 
            country: req.body.country, 
            state: req.body.state, 
            district: req.body.district, 
            city: req.body.city, 
            street: req.body.street, 
            location: req.body.location }},{new: true})
    .then(updatedDonation => {
        res.json(updatedDonation);

    }).catch(next);
   //} 
        
    if (req.user.role == 'admin')
    {
        DonateBlood.findByIdAndUpdate(req.params.donation_id,
            {$set: { status: req.body.status, donation_id: req.body.donation_id}}, {new: true})
            .then(updatedDonation => {
                res.json(updatedDonation)

            }).catch(next);
    }

    // else 
    // {
    //     let err = new Error('No authentication information!');
    //     err.status = 401;
    //     return next(err);
    // }
})
.delete((req, res, next) => {
    DonateBlood.deleteOne({_id:req.params.donation_id})
    .then(reply => {
        res.json(reply);
    }).catch(next);
})
router.route('/:donation_id/status')
.get((req, res, next)=>{
    DonateBlood.findById(req.params.donation_id)
    .then(Donation => {
        res.json(Donation.Status);
    }).catch(next);
})

module.exports = router;