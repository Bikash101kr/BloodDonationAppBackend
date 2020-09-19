const request = require('supertest');
const express = require('express');
require('dotenv').config();
const userRouter = require('../routes/userRouter');
const profileRouter = require('../routes/profileRouter');
const auth = require('../auth');

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use('/Profile', auth.verifyUser, profileRouter);
// Setup
require('./setup');
let token;
let userId;
describe('profile User Route', () => {
    test('should be able to register a user', () => {
        return request(app).post('/users/register')
            .send({
                username: 'bikash122',
                password: 'bikash1',
                firstName: 'Bikash',
                lastName: 'Dhakal',
                address: 'chitwan',
                
            })
            .then((res) => {
                expect(res.statusCode).toBe(201);
            })
    })
    test('should be able to login', () => {
        return request(app).post('/users/login')
            .send({
                username: 'bikash122',
                password: 'bikash1'
            }).then((res) => {
                userId = res.body._id
                expect(res.statusCode).toBe(200);
                token = res.body.token;
            })
    })
    test('should be able to get profile details', () => {
        return request(app).get(`/Profile/${userId}`)
        .set('authorization', token)
            .then((res) => {
                console.log(res)
                expect(res.statusCode).toBe(201);
            })
   
})
// test('should be able to update profile details', ()=>{
//     return request(app).put(`/Profile/${userId}`)
//     .set('authorization', token)
//     .send({
//         firstName: 'Dhakal',
//             lastName: 'Bikash',
//             address:'chitwan',
//             bloodGroup:'o+'
//     })

//     .then((res)=>{
//         console.log(res.body);
//         expect(res.statusCode).toBe(200);
//     })
// })
// test('should able to delete profile by id',()=>{
//     return request(app).delete(`/Profile/${userId}`)
//     .set('authorization', token)
//     .then((res) => {
//         console.log(res.body);
//         expect(res.statusCode).toBe(200);
//     })

// })
})
       

