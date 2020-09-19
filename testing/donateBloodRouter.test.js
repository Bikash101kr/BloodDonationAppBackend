const request = require('supertest');
const express = require('express');
require('dotenv').config();
const auth = require('../auth');
const userRouter = require('../routes/userRouter');
const donateBloodRouter = require('../routes/donateBloodRouter');

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use('/DonateBlood', auth.verifyUser, donateBloodRouter );


require('./setup')
let token;
let donationId;
beforeAll(() => {
    return request(app).post('/users/register')
        .send({
            username: 'test1345',
            password: 'bikash134',
            firstName: 'Dhakal',
            lastName: 'Bikash',
            address:'chitwan'
            

        })
        .then((res) => {
            console.log(res.body)
            return request(app).post('/users/login')
                .send({
                    username: 'test1345',
                    password: 'bikash134'
                }).then((res) => {
                    console.log(res.body)
                    expect(res.statusCode).toBe(200);
                    token = res.body.token;
                })
        })
})
describe('Donate Blood router test', ()=> {
    test(' should be able to post donation',() => {
        return request (app).post('/DonateBood')
        .set('authorization', token)
        .send({
            weight:'60',
            coumtry:'nepal',
            state:'2',
            district:'dhd',
            city:'cht',
            street:'dbt',
        })
        .then((res)=> {
            console.log(res.body);
            expect(res.statusCode).toBe(201);
        })

    })
    
})

