const request = require('supertest');
const express = require('express');
require('dotenv').config();
const auth = require('../auth');
const userRouter = require('../routes/userRouter');
const donateBloodRouter = require('../routes/donateBloodRouter');
const { get } = require('mongoose');

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
            return request(app).post('/users/login')
                .send({
                    username: 'test1345',
                    password: 'bikash134'
                }).then((res) => {
    
                    expect(res.statusCode).toBe(200);
                    token = res.body.token;
                })
        })
})
describe('Donate Blood router test', ()=> {
    test(' should not  able to post donation with insufficient information',() => {
        return request (app).post('/DonateBlood')
        .set('authorization', token)
        .send({
            weight:'60',
            country:'nepal'
        })
        .then((res)=> {
            donationId= res.body._id
            
            expect(res.statusCode).toBe(500);
        })

    })
    test(' should be able to post donation',() => {
        return request (app).post('/DonateBlood')
        .set('authorization', token)
        .send({
            weight:'60',
            country:'nepal',
            state:'2',
            district:'dhd',
            city:'cht',
            street:'dbt',
        })
        .then((res)=> {
            donationId= res.body._id
            
            expect(res.statusCode).toBe(201);
        })

    })
    test('should be able to get donations', ()=> {
        return request (app).get('/DonateBlood')
        .set('authorization', token)
        .then((res)=> {
            
            expect(res.statusCode).toBe(200);
        })
    })
    test('should be able to get donation details by id', () => {
        return request(app).get(`/DonateBlood/${donationId}`)
        .set('authorization', token)
        .then((res)=>{
            
            expect(res.statusCode).toBe(200);
        })
    })
    test('should be able to update donation details', ()=>{
        return request(app).put(`/DonateBlood/${donationId}`)
        .set('authorization', token)
        .send({
            weight:'60',
            country:'nepal',
            state:'bagmati',
            district:'dhd',
            city:'cht',
            street:'dbt',
        })

        .then((res)=>{
            
            expect(res.statusCode).toBe(200);
        })
    })
    test('should able to delete donation by id',()=>{
        return request(app).delete(`/DonateBlood/${donationId}`)
        .set('authorization', token)
        .then((res) => {
            
            expect(res.statusCode).toBe(200);
        })
    })
    test(' should able to delete donation', ()=> {
        return request(app).delete('/DonateBlood')
        .set('authorization', token)
        .then((res) => {
            
            expect(res.statusCode).toBe(200);
        })
    })
    
})

