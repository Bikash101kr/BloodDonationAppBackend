const request = require('supertest');
const express = require('express');
require('dotenv').config();
const userRouter = require('../routes/userRouter');
const adminRouter = require('../routes/adminRouter');
const donateBloodRouter = require('../routes/donateBloodRouter');
const auth = require('../auth');

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use('/admin', auth.verifyUser, auth.verifyAdmin, adminRouter);
app.use('/DonateBlood', auth.verifyUser, donateBloodRouter );
// Setup
require('./setup');
let token;
let userId;
let donationId;
describe('Admin  Route', () => {
    test('should be able to register a user', () => {
        return request(app).post('/users/register')
            .send({
                username: 'bikash1223',
                password: 'bikash1',
                firstName: 'Bikash',
                lastName: 'Dhakal',
                address: 'chitwan',
                role:'admin'
                
            })
            .then((res) => {
                expect(res.statusCode).toBe(201);
            })
    })
    
    test('should be able to login', () => {
        return request(app).post('/users/login')
            .send({
                username: 'bikash1223',
                password: 'bikash1'
            }).then((res) => {
                userId = res.body.id
                expect(res.statusCode).toBe(200);
                token = res.body.token;
            })
    })
    test('should be able to get all donations', () => {
        return request(app).get(`/admin/donations`)
        .set('authorization', token)
            .then((res) => {
               
                expect(res.statusCode).toBe(200);
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
       
        donationId= res.body._id;
        expect(res.statusCode).toBe(201);
    })

})
test('should be able to get donation status ', ()=>{
    return request(app).get(`/admin/${donationId}/status`)
    .set('authorization', token)

    .then((res)=>{
       
        expect(res.statusCode).toBe(200);
    })
})
test('should be able to update donation status', ()=>{
    return request(app).put(`/admin/${donationId}/status`)
    .set('authorization', token)
    .send({
        
            status:'used'
    })

    .then((res)=>{
      
        expect(res.statusCode).toBe(200);
    })
})


test('should be able to get all requests', () => {
    return request(app).get(`/admin/requests`)
    .set('authorization', token)
        .then((res) => {
            
            requestId= res.body._id
            expect(res.statusCode).toBe(200);
        })

})
test('should be able to get all users', () => {
    return request(app).get(`/admin/users`)
    .set('authorization', token)
        .then((res) => {
            expect(res.statusCode).toBe(200);
        })

})

test('should be able to get user details ', ()=>{
    return request(app).get(`/admin/${userId}`)
    .set('authorization', token)

    .then((res)=>{
      
        expect(res.statusCode).toBe(200);
    })
})
test('should be able to get user role ', ()=>{
    return request(app).get(`/admin/${userId}/role`)
    .set('authorization', token)

    .then((res)=>{
      
        expect(res.statusCode).toBe(200);
    })
})
test('should be able to update user role ', ()=>{
    return request(app).put(`/admin/${userId}/role`)
    .set('authorization', token)
    .send({
        
        role:'basic'
})
    .then((res)=>{
      
        expect(res.statusCode).toBe(200);
    })
})
test('should able to delete user ',()=>{
    return request(app).delete(`/admin/${userId}`)
    .set('authorization', token)
    .then((res) => {
      
        expect(res.statusCode).toBe(200);
    })

})

})
       

