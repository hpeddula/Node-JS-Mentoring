const express = require('express');
const { v4: uuidv4 } = require('uuid');

// create a JSON data array
let userData = [
    { id: uuidv4(), login: 'Create a project', password: 1, isDeleted: false, age: 25 },
    { id: uuidv4(), login: 'Take a cofféé', password: 2, isDeleted: false, age: 25 },
    { id: uuidv4(), login: 'Write new article', password: 3, isDeleted: false, age: 25 },
    { id: uuidv4(), login: 'Walk toward home', password: 4, isDeleted: false, age: 25 },
    { id: uuidv4(), login: 'Have some dinner', password: 5, isDeleted: false, age: 25 },
];

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(userData)
})

router.get('/getUserById/:id', (req, res) => {
    let found = userData.find(item => (
        item.id === req.params.id
    ));
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.status(200).sendStatus(404)
    }
})

router.post('/createUser', (req, res) => {
    console.log(req.body)
    let newItem = {
        id: uuidv4(),
        login: req.body.login,
        password: req.body.password,
        isDeleted: false,
        age: req.body.age
    };

    // push new item object to data array of items
    userData.push(newItem);

    // return with status 201
    // 201 means Created. The request has been fulfilled and 
    // has resulted in one or more new resources being created. 
    res.status(201).json(userData);
})

router.put('/updateUser/:id', (req, res) => {

    let found = userData.find(item => (
        item.id === req.params.id
    ));
    console.log('Found', found)
    // check if item found
    if (found) {
        let updated = {
            id: found.id,
            login: req.body.login,
            password: req.body.password,
            age: req.body.age,
            isDeleted: false
        };

        // find index of found object from array of data
        let targetIndex = userData.indexOf(found);

        // replace object from data list with `updated` object
        userData.splice(targetIndex, 1, updated);

        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
})

router.delete('/deleteUser/:id', (req, res) => {
    // find item from array of data
    let found = userData.find(item => (
        item.id === req.params.id
    ));

    if (found) {
        // if item found then find index at which the item is
        // stored in the `data` array
        let targetIndex = userData.indexOf(found);
        found['isDeleted'] = true;

        // splice means delete item from `data` array using index
        userData[targetIndex] = {...found};
    }

    // return with status 204
    // success status response code 204 indicates
    // that the request has succeeded
    res.status(200).json(userData);
});

module.exports = router