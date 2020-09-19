const request = require('supertest');
const express = require('express');
require('dotenv').config();
const auth = require('../auth');
const userRouter = require('../routes/userRouter');
const bloodBankRouter = require('../routes/bloodBankRouter');

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use('/BloodBank', auth.verifyUser, bloodBankRouter );


require('./setup')
let token;
beforeAll(() => {
    return request(app).post('/users/register')
        .send({
            username: 'test134',
            password: 'bikash134',
            firstName: 'Dhakal',
            lastName: 'Bikash',
            address:'chitwan',
            role:'admin'
            

        })
        .then((res) => {
            console.log(res.body)
            return request(app).post('/users/login')
                .send({
                    username: 'test134',
                    password: 'bikash134'
                }).then((res) => {
                    console.log(res.body)
                    expect(res.statusCode).toBe(200);
                    token = res.body.token;
                })
        })
})
describe('Blood Bank router test', ()=> {
    test(' basic user should not able to post blood bank ',() => {
        return request (app).post('/BloodBank')
        .set('authorization', token)
        .send({
            bloodBankName: 'Nepal Redcross Society'
        })
        .then((res)=> {
            console.log(res.body);
            expect(res.statusCode).toBe(201);
        })

    })
    
})

