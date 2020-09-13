const express = require('express');
const router = express.Router();
const { verifyUser, verifyAdmin } = require('../auth');
const RequestBlood = require('../model/RequestBlood');

router.route('/')
.get((req, res, next)=>{
    RequestBlood.find({user: req.user.id})
    .then(requests=> {
        res.setHeader('Content-Type', 'application/json');
        res.json(requests);
    }).catch(next);
})
.post((req, res, next)=> {
    let { requirement, patientName, patientAge, 
        bloodGroup, country, state, district,
    city, street, hospitalName, location, needUnit,
requirementReason, requireBefore } = req.body;
    RequestBlood.create( { user: req.user.id, requirement, patientName, patientAge, 
        bloodGroup, country, state, district,
    city, street, hospitalName, location, needUnit,
requirementReason, requireBefore })
    .then( Request => {
        res.status(201).json(Request);

    }).catch(err => next(err));
})
.delete((req, res,next) => {
    RequestBlood.deleteMany({user: req.user.id})
    .then(reply=> {
        res.json(reply);
    }).catch(next);
});
router.route('/:request_id')
.get((req,res,next) => {
    RequestBlood.findById(req.params.request_id)
    .then(Request => {

        res.json(Request);
    }).catch(next);
})

.put((req,res,next) => {
    RequestBlood.findByIdAndUpdate(req.params.request_id,{$set: req.body},{new: true})
    .then(updateRequest => {
        res.json(updateRequest);

    }).catch(next);
})
.delete((req, res, next) => {
    RequestBlood.deleteOne({_id:req.params.request_id})
    .then(reply => {
        res.json(reply);
    }).catch(next);
})

module.exports = router;