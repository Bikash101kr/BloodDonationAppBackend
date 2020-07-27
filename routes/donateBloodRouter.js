const express = require('express');
const router = express.Router();
const DonateBlood = require('../model/DonateBlood');
const { verifyUser } = require('../auth');

router.route('/')
.get(verifyUser, (req, res, next)=>{
    DonateBlood.find({user: req.user.id})
    .then(donations=> {
        res.setHeader('Content-Type', 'application/json');
        res.json(donations);
    }).catch(next);
})
.post((req, res, next)=> {
    if (req.user.role  == 'basic') {
        let { weight, country, state, district, city, street, location} = req.body;
        DonateBlood.create({ user: req.user.id, weight, country, state, district, city, street, location})
    .then( Donation => {
        res.status(201).json(Donation);

    }).catch(next);
    next();
    } 
    else if (req.user.role == 'admin'){

        let { donation_id, status} = req.body;
        DonateBlood.create({ user: req.user.id, donation_id, status})
    .then( Donation => {
        res.status(201).json(Donation);

    }).catch(next);
   
    }

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
// router.route('/:donation_id/Status')
// .get((req, res, next)=>{
//     DonateBlood.findById(req.params.donation_id)
//     .then(Donation => {
//         res.json(Donation.Status);
//     }).catch(next);
// })
// .post((req, res, next) => {
//     DonateBlood.findById(req.params.donation_id)
//     .then(Donation => {
//         Donation.Status.push(req.body);
//         Donation.save()
//         .then(updatedDonateblood => {
//             res.json(updatedDonateblood.Status);
//         }).catch(next);
//     }).catch(next);
// })
// .put((req, res,next) => {
//     DonateBlood.findById(req.params.donation_id)
//     .then(Donation => {
//         let status = Donation.donation_id(req.params.donation_id);
//         Status.text = req.body.text;
//         Donation.save()
//         .then(updatedDonateBlood => {
//             res.json(Donation.Status(req.params.donation_id));
//         }).catch(next);
//     }).catch(next);

//})

module.exports = router;