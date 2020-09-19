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
let bloodBankId
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
    test(' admin user should be able to post blood bank ',() => {
        return request (app).post('/BloodBank')
        .set('authorization', token)
        .send({
            BloodBankName: 'Nepal Redcross Society'
        })
        .then((res)=> {
            bloodBankId = res.body._id
        })
    })
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
    test('should able to get blood bank',()=>{
        return request(app).get('/BloodBank')
        .set('authorization', token)
        .then((res)=> {
           
            expect(res.statusCode).toBe(200);
        })
    })

   
    test('Admin should able to get bloodbank details by id',()=>{
        return request(app).get(`/BloodBank/${bloodBankId}`)
        .set('authorization', token)
        .then((res)=>{
           
            expect(res.statusCode).toBe(200);
        })
    })

    test('Admin should able to update blood Bank', ()=> {
        return request(app).put(`/BloodBank/${bloodBankId}`)
        .set('authorization', token)
        .send({
            BloodBankName: 'Nepal Redcross Society44'
        })
        .then((res) => {
           
            expect(res.statusCode).toBe(200);
        })
    })

    test('Admin should able to remove blood Bank', ()=> {
        return request(app).delete(`/BloodBank/${bloodBankId}`)
        .set('authorization', token)
        .then((res) => {
            
            expect(res.statusCode).toBe(200);
        })
    })
})
