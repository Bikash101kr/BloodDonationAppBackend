const express = require('express');
const router = express.Router();
const RequestBlood = require('../model/RequestBlood');

router.route('/')
.get((req, res, next)=>{
    RequestBlood.find()
    .then(requests=> {
        res.json(requests);
    }).catch(next);
})
.post((req, res, next)=> {
    RequestBlood.create(req.body)
    .then( Request => {
        res.status(201).json(Request);

    }).catch(next);
})
.delete((req, res,next) => {
    RequestBlood.deleteOne()
    .then(reply=> {
        res.json(reply);
    }).catch(next);
});
router.route('/:request_id')
.get((req,res,next) => {
    RequestBlood.findById(req.params.donation_id)
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