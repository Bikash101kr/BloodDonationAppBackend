const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./routes/userRouter');
const donateBloodRouter = require('./routes/donatebloodRouter');
const requestBloodRouter = require ('./routes/requestBloodRouter');

const app = express();
mongoose.connect(process.env.DbURI,{
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(()=> console.log('Database server connected'))
.catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/',(req, res) => {
    res.send('Welcome, to my app');
});
app.use('/api/users', userRouter);
app.use('/api/DonateBlood', donateBloodRouter);
app.use('/api/RequestBlood', requestBloodRouter);


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