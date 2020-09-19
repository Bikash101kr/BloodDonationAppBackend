const request = require('supertest');
const express = require('express');
require('dotenv').config();
const userRouter = require('../routes/userRouter');

const app = express();
app.use(express.json());
app.use('/users', userRouter);
// Setup
require('./setup');
describe('Test of User Route', () => {
    test('should be able to register a user', () => {
        return request(app).post('/users/register')
            .send({
                username: 'bikash1',
                password: 'bikash1',
                firstName: 'Bikash',
                lastName: 'Dhakal',
                address: 'chitwan',
                role: 'admin'
            })
            .then((res) => {
                expect(res.statusCode).toBe(201);
            })
    })
    test('user name should be unique to register', () => {
        return request(app).post('/users/register')
            .send({
                username: 'bikash1',
                password: 'bikash134',
                firstName: 'Bikash',
                lastName: 'Dhakal',
                address: 'chitwan'
            })
            .then((res) => {
<<<<<<< HEAD
                expect(res.statusCode).toBe(401);
=======
                expect(res.statusCode).toBe(400);
>>>>>>> test
            })
    })
    test('should not register user with short username', () => {
        return request(app).post('/users/register')
            .send({
                username: 'bik',
                password: 'bikash'
            }).then((res) => {
<<<<<<< HEAD
                
                expect(res.statusCode).toBe(400);
                
=======
                console.log(res.body);
                expect(res.statusCode).toBe(400);
                expect(res.body.message.firstName).toBe('First name is required');
>>>>>>> test
            })
            
    })
    test('should be able to login', () => {
        return request(app).post('/users/login')
            .send({
                username: 'bikash1',
                password: 'bikash1'
            }).then((res) => {
<<<<<<< HEAD
               
=======
                console.log(res.body);
>>>>>>> test
                expect(res.statusCode).toBe(200);
                expect(res.body.token).not.toBe('undefined');
            })
    })
test('should not login user with without register username', () =>{
    return request(app).post('/users/login')
    .send({
        username:'bikash2',
        password:'bikash1'

    }).then((res) => {
<<<<<<< HEAD
       
=======
        console.log(res.body);
>>>>>>> test
        expect(res.statusCode).toBe(401);
        expect(res.body.token).not.toBe('undefined');

    })

})
test('should not login user with without register username', () =>{
    return request(app).post('/users/login')
    .send({
        username:'bikash1',
        password:'dhakal'

    }).then((res) => {
<<<<<<< HEAD
        
=======
        console.log(res.body);
>>>>>>> test
        expect(res.statusCode).toBe(401);
        expect(res.body.token).not.toBe('undefined');

    })

})
})
