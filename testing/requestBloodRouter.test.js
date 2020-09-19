const request = require('supertest');
const express = require('express');
require('dotenv').config();
const auth = require('../auth');
const userRouter = require('../routes/userRouter');
const requestBloodRouter = require('../routes/requestBloodRouter');

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use('/RequestBlood', auth.verifyUser, requestBloodRouter );


require('./setup')
let token;
let requestId;
beforeAll(() => {
    return request(app).post('/users/register')
        .send({
            username: 'test13456',
            password: 'bikash134',
            firstName: 'Dhakal',
            lastName: 'Bikash',
            address:'chitwan'
            

        })
        .then((res) => {
            console.log(res.body)
            return request(app).post('/users/login')
                .send({
                    username: 'test13456',
                    password: 'bikash134'
                }).then((res) => {
                    expect(res.statusCode).toBe(200);
                    token = res.body.token;
                })
        })
})
describe('Request Blood router test', ()=> {
    test(' should not  able to post request with insufficient information',() => {
        return request (app).post('/RequestBlood')
        .set('authorization', token)
        .send({
            
        })
        .then((res)=> {
           
            expect(res.statusCode).toBe(500);
        })

    })
    test(' should be able to post request',() => {
        return request (app).post('/RequestBlood')
        .set('authorization', token)
        .send({
            country:'nepal',
            state:'2',
            district:'dhd',
            city:'cht',
            street:'dbt',
            requirement: 'fresh',
            patientName:'bikash',
            patientAge:'23',
            bloodGroup:'O+',
            hospitalName:'bikash clinic',
            location:'dobato',
            requirementReason:'surgery',
            requireBefore:'20-09-2020',
            needUnit:'3pint'
        })
        .then((res)=> {
            requestId = res.body._id
            expect(res.statusCode).toBe(201);
        })

    })
    test('should be able to get requests', ()=> {
        return request (app).get('/RequestBlood')
        .set('authorization', token)
        .then((res)=> {
            
            expect(res.statusCode).toBe(200);
        })
    })
    test('should be able to get request details by id', () => {
        return request(app).get(`/RequestBlood/${requestId}`)
        .set('authorization', token)
        .then((res)=>{
            
            expect(res.statusCode).toBe(200);
        })
    })
    test('should be able to update request details', ()=>{
        return request(app).put(`/RequestBlood/${requestId}`)
        .set('authorization', token)
        .send({
            country:'Norway',
            state:'Bagmati',
            district:'dhd',
            city:'cht',
            street:'dbt',
            requirement: 'fresh',
            patientName:'bikash',
            patientAge:'23',
            bloodGroup:'O+',
            hospitalName:'bikash clinic',
            location:'dobato',
            requirementReason:'surgery',
            requireBefore:'20-09-2020',
            needUnit:'3pint'
        })

        .then((res)=>{
            
            expect(res.statusCode).toBe(200);
        })
    })
    test('should able to delete request by id',()=>{
        return request(app).delete(`/RequestBlood/${requestId}`)
        .set('authorization', token)
        .then((res) => {
            expect(res.statusCode).toBe(200);
        })
    })
    test(' should able to delete request', ()=> {
        return request(app).delete('/RequestBlood')
        .set('authorization', token)
        .then((res) => {
            
            expect(res.statusCode).toBe(200);
        })
    })
    
})

