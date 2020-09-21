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

require('./setup');
let token;
let userId;
beforeAll(() => {
    return request(app).post('/users/register')
        .send({
            username: 'test134567',
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
                    username: 'test134567',
                    password: 'bikash134'
                }).then((res) => {
                    console.log(res.body);
                    userId = res.body.id;
                    expect(res.statusCode).toBe(200);
                    token = res.body.token;
                })
        })
})

 describe('profile Route', () => {   
    test('should not able to get profile details without user id', () => {
        return request(app).get('/profile')
        .set('authorization', token)
            .then((res) => {
                console.log(res.body);
                expect(res.statusCode).toBe(404);
            })
    }) 
    test('should be able to get profile details', () => {
        return request(app).get(`/profile/${userId}`)
        .set('authorization', token)
            .then((res) => {
                console.log(res.body);
                expect(res.statusCode).toBe(200);
            })
}) 

   

test('should be able to update profile details', ()=>{
    return request(app).put(`/Profile/${userId}`)
    .set('authorization', token)
    .send({
        firstName: 'Dhakal',
            lastName: 'Bikash',
            address:'chitwan',
            bloodGroup:'o+'
    })

   .then((res)=>{
        console.log(res.body);
        expect(res.statusCode).toBe(200);
    })
})
})
       

