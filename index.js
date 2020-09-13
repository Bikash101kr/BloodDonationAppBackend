const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const userRouter = require('./routes/userRouter');
const donateBloodRouter = require('./routes/donatebloodRouter');
const requestBloodRouter = require ('./routes/requestBloodRouter');
const bloodBankRouter = require ('./routes/bloodBankRouter');
const profileRouter = require ('./routes/profileRouter');
const auth = require('./auth');
const uploadRouter = require('./routes/upload');

const app = express();
app.use(morgan('tiny'));

mongoose.connect(process.env.DbURI,{
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(()=> console.log('Database server connected'))
.catch((err) => console.log(err));

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req, res) => {
    res.send('Welcome, to my app');
});
app.use('/api/users', userRouter);
app.use('/api/DonateBlood', auth.verifyUser, donateBloodRouter);
app.use('/api/RequestBlood',auth.verifyUser, requestBloodRouter);
app.use('/api/BloodBank', auth.verifyUser, bloodBankRouter );
app.use('/api/Profile', auth.verifyUser, profileRouter)
app.use('/api/upload', auth.verifyUser, uploadRouter);
app.use((req, res, next) => {
    let err = new error ('Not found');
    err.status = 404;
    next(err);

    
})
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
        status: 'error',
        message: err.message
    })
})


app.listen(process.env.port, () => {
    console.log(`server is running at localhost:${process.env.port}`);
});