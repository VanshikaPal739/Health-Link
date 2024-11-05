//importing express
const express = require('express');
const UserRouter = require('./Routers/UserRouter.js');
const DoctorRouter = require('./Routers/DoctorRouter.js');
const SlotRouter = require('./Routers/SlotRouter.js');
const AppointmentRouter = require('./Routers/AppointmentRouter.js');
const LabtestRouter = require('./Routers/LabtestRouter.js');
const utilRouter = require('./Routers/utils.js');
const cors = require('cors');

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
app.use('/Appointment', AppointmentRouter);
app.use('/Labtest', LabtestRouter);
app.use('/util', utilRouter);

app.use(express.static('./static/uploads'));

// endpoint or route
app.get('/', (req, res) => {
    res.send('respond from express');
});

//starting the express server
app.listen(port, () => {
    console.log('server started');
});