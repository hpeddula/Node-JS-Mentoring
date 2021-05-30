const UserRoutes= require('../UserRoutes');
const UserService = require('../../services/UserService');
const request = require('supertest');
const app = require('express');
app().use('/group',UserRoutes)
describe('Test Suite for User Controller',()=>{
    it('should test getAllUsers Controller',async()=>{
        const userData = [{id:1,name:'user'}];
        jest.spyOn(UserService,'getAllUsers').mockResolvedValueOnce(userData);
        const mReq = {path:'/user' };
        const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const mNext = jest.fn();
        const res = await request(app)
        .get('/user')
        .send(userData)
        // await GroupRouter(mReq,mRes,mNext);
        expect(UserService.getAllUsers).toBeCalledTimes(1);
        expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('get')
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.send).toBeCalledWith(userData);
    })
})