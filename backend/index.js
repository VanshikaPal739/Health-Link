//importing express
const express = require('express');
const UserRouter = require('./Routers/UserRouter.js');
const DoctorRouter = require('./Routers/DoctorRouter.js');
const SlotRouter = require('./Routers/SlotRouter.js');
const AppointmentRouter = require('./Routers/AppointmentRouter.js');
const LabtestRouter = require('./Routers/LabtestRouter.js');
const utilRouter = require('./Routers/utils.js');
const ReviewRouter = require('./Routers/ReviewRouter.js');

require('dotenv').config();
// const GenerateOTP = require('./Routers/utilRouter.js');
const cors = require('cors');
const Razorpay = require('razorpay');

// initialize express
const app = express();
const port = 5000;

//middleware
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use('/user', UserRouter);
app.use('/doctor', DoctorRouter);
app.use('/slot', SlotRouter);
app.use('/appointment', AppointmentRouter);
app.use('/Labtest', LabtestRouter);
app.use('/utils', utilRouter);
app.use('/review', ReviewRouter);
app.post('/create-order', async (req, res) => {
    try {
        const { amount } = req.body;
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const options = {
            amount,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Error creating order: ", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
)
// app.use('/send-otp', GenerateOTP);

app.use(express.static('./static/uploads'));

// endpoint or route
app.get('/', (req, res) => {
    res.send('respond from express');
});

//starting the express server
app.listen(port, () => {
    console.log('server started');
});

