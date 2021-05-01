const express = require('express');
const { permissionValidator } = require('../utils');
const { getAllGroups,getGroupById, createGroup, updateGroup, deleteGroup, addUsersToGroup } = require('../services/GroupService');
const {logger} = require('../logger');
const router = express.Router();

router.use((req,res,next)=>{
    console.log('Logged',req.params.id)
    console.log(`Request Made Type:${req.method} , Arguments:${JSON.stringify(req.params)}`);
    next()
})

router.get('/', async(req, res) => {
    try{
    const groups = await getAllGroups();
    return  res.status(200).json(groups)
    } catch(e) {
        logger.info(`Error ${e.message}, Method:getAllGroups, parameters:none`)
    }
})

router.get('/:id',async(req,res)=>{
    const { id } = req.params;
    try{
    const group = await getGroupById(id)
    if(group) {
        return res.send(group)
    } else {
        return res.send(404)
    }
    } catch(e) {
        logger.info(`Error ${e.message}, Method:getGroupById, parameters:id`)
    }
})

router.post('/createGroup',async(req,res)=>{
    const { permissions,name } = req.body;
    const { isValid, message } = permissionValidator(permissions);
    try{
        if(isValid) {
            await createGroup({name,permissions});
            return res.send(201)
        } else {
            return res.status(400).json(message)
        }
    } catch(e) {
        logger.info(`Error ${e.message}, Method:createGroup, parameters:name,permissions`)
        return res.send(502).json(e)
    }
})

router.put('/updateGroup/:id',async(req,res)=>{
    const { id } = req.params;
    const { permissions,name } = req.body;
    const { isValid, message } = permissionValidator(permissions);
    try{
        if(isValid) {
            await updateGroup({id,name,permissions});
            return res.status(200).send(`Group with ${id} updated successfully`)
        } else {
            return res.status(400).json(message)
        }
    } catch(e) {
        logger.info(`Error ${e.message}, Method:updateGroup, parameters:id,name,permissions`)
        return res.send(502).json(e)
    }
})

router.delete('/deleteGroup/:id',async(req,res)=>{
    const { id } = req.params;
    try{
        await deleteGroup(id)
        return res.status(200).send(`Group with ${id} deleted Successfully`)
    } catch(e) {
        logger.info(`Error ${e.message}, Method:deleteGroup, parameters:id`)
        return res.send(502).json(e)
    }
})

router.post('/addUsersToGroup/:groupId',async(req,res)=>{
    const { groupId  } = req.params;
    const { userIds } = req.body;
    try {
        if(userIds.length === 0) return res.send(400).json('Empty Users List')
        const group = await getGroupById(groupId);
        if(group) {
            await addUsersToGroup({userIds,GroupID:groupId })
            return res.sendStatus(200)
        } else {
            return res.sendStatus(502)
        }
    } catch(e) {
        console.log(e)
        logger.info(`Error ${e.message}, Method:addUsersToGroup, parameters:userIds,groupID`)
        return res.sendStatus(502)
    }
})

module.exports = router