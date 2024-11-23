const express = require('express');
const Model = require('../Models/ReviewModel');
const jwt = require('jsonwebtoken');
const verifyToken = require('../Middlewares/verifytoken');
require('dotenv').config();

const router = express.Router();

router.post('/add', verifyToken, (req, res) => {
    req.body.user = req.user._id;
    console.log(req.body);
    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);

        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });
});

router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);

        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });

});
//: denotes url parameters
router.get('/getbyid/:id', (req, res) => {
    console.log(req.params.city);
    Model.find({ city: req.params.city })
        .then((result) => {
            res.status(200).json(result);

        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });


});
router.get('/getbydoctor/:doctor', (req, res) => {
    Model.find({ doctor: req.params.doctor }).populate('user')
        .then((result) => {
            res.status(200).json(result);

        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });


});
router.get('/getbycity/:city', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);

        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });


});

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);

        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });


});

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);

        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });


});
module.exports = router;