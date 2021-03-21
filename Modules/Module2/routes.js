const express = require('express');
const { v4: uuidv4 } = require('uuid');
const validator = require('./utils');

// create a JSON data array
let userData = [
    { id: uuidv4(), login: 'Create a project', password: 'password1', isDeleted: false, age: 25 },
    { id: uuidv4(), login: 'Take a cofféé', password: 'password2', isDeleted: false, age: 25 },
    { id: uuidv4(), login: 'Write new article', password: 'password3', isDeleted: false, age: 25 },
    { id: uuidv4(), login: 'Walk toward home', password: 'password4', isDeleted: false, age: 25 },
    { id: uuidv4(), login: 'Have some dinner', password: 'password5', isDeleted: false, age: 25 },
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

    const { isValid, message } = validator(req.body)
    let newItem = {
        id: uuidv4(),
        login: req.body.login,
        password: req.body.password,
        isDeleted: false,
        age: req.body.age
    };
    if (isValid) {
        // push new item object to data array of items
        userData.push(newItem);

        // return with status 201
        // 201 means Created. The request has been fulfilled and 
        // has resulted in one or more new resources being created. 
        res.status(201).json(userData);
    } else {
        res.status(400).json(message)
    }
})


router.get('/getAutoSuggestUsers', (req, res) => {
    const { login,limit } = req.query;
    const result = userData.sort((a,b)=>(a.login > b.login) ? 1 : ((b.login > a.login) ? -1 : 0)).filter(user => user.login.replace(/ /g,'').toLowerCase() === login.replace(/ /g,'').toLowerCase());
    res.status(200).json(result.slice(0,limit))
   
})
router.put('/updateUser/:id', (req, res) => {
    const { isValid, message } = validator(req.body)
    if (isValid) {
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
    } else {
        res.status(400).json(message)
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
        userData[targetIndex] = { ...found };
    }

    // return with status 204
    // success status response code 204 indicates
    // that the request has succeeded
    res.status(200).json(userData);
});

module.exports = router