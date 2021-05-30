const GroupRouter= require('../GroupRoutes');
const GroupService = require('../../services/GroupService');
const request = require('supertest');
const app = require('express');
app().use('/group',GroupRouter)
describe('Test Suite for Group Controller',()=>{
    it('should test getAllGroups Controller',async()=>{
        const groupData = [{id:1,name:'Group1'}];
        jest.spyOn(GroupService,'getAllGroups').mockResolvedValueOnce(groupData);
        const mReq = {path:'/user' };
        const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const mNext = jest.fn();
        const res = await request(app)
        .get('/group')
        .send(groupData)
        // await GroupRouter(mReq,mRes,mNext);
        expect(GroupService.getAllGroups).toBeCalledTimes(1);
        expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('get')
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.send).toBeCalledWith(groupData);
    })
})