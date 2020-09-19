const express = require('express');
const router = express.Router();
const User = require('../model/User')
router.route('/:user_id')
.get((req,res,next)=>{
    User.findById(req.params.user_id)
    .then(user=>{
        res.json(user);

    }).catch(err => next(err));
})
.put((req,res,next)=>{
    User.findByIdAndUpdate(req.params.user_id,
        {$set: req.body},{new: true})
        .then(updateduser=> {
            res.json(updateduser);
        }).catch(next);
    })

.delete((req, res, next)=> {
    User.deleteOne({_id:req.params.user_id})
    .then(reply=> {
        res.json(reply);
    }).catch(next);
})
module.exports = router;

