const express = require('express');
const Model = require('../Models/SlotModel');
const jwt = require('jsonwebtoken');
const verifyToken =require('../middlewares/verifyToken');

require('dotenv').config();


const router = express.Router();


router.post('/add', verifyToken, (req, res) => {
    req.body.doctor = req.user._id;
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



//getall
router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


//getbyemail
router.get('/getbyemail/:email', (req, res) => {
    Model.findOne({ email: req.params.email })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//getbydoctor
router.get('/getbydoctorid/:id', verifyToken, (req, res) => {
    Model.find({doctor : req.params.id})
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//getbydoctor
router.get('/getbydoctor', verifyToken, (req, res) => {
    Model.find({doctor : req.user._id})
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//getbyid
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


//delete
router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});



//update
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/slot/getbydoctorid', verifyToken, async (req, res) => {
    const { id } = req.params; // Extract doctor ID from request parameters
  
    try {
      // Find all slots where doctorId matches the provided ID
      const slots = await Model.find({ doctorId: id });
  
      if (!slots || slots.length === 0) {
        return res.status(404).json({ message: 'No slots found for this doctor.' });
      }
  
      res.status(200).json(slots); // Return the list of slots
    } catch (error) {
      console.error('Error fetching slots:', error);
      res.status(500).json({ message: 'An error occurred while fetching slots.' });
    }
  });



router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {
            if (result) {
                // payload, secretkey, expiry
                const { _id, email, password } = result;
                const payload = { _id, email, password };
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '1hr' },
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json(err);
                        } else {
                            res.status(200).json({ token: token });
                        }
                    }
                )

            } else {
                res.status(400).json({ message: 'Invalid Credential' })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
})

    
module.exports = router;