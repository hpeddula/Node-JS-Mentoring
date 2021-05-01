const http = require('http');
const express = require('express');
const dotenv = require('dotenv')
dotenv.config();



const user = require('./controllers/UserRoutes');
const group = require('./controllers/GroupRoutes');

const app = express();

// parse application/json

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(function (err, req, res, next) {
    console.error(err.stack)
    process.on('unhandledRejection', function(reason, p) {
        console.log("Unhandled Rejection:", reason.stack);
        res.status(500).send('Internal Server Error');
    })
    next();
    process.removeEventLister('unhandledRejection', l);
})
app.use('/user',user)
app.use('/group',group)

// default URL to API
app.use('/', (req, res) => {
    res.status(200).send('Server Works');
});

const server = http.createServer(app);
const port = process.env.SERVER_PORT || 3001;
server.listen(port);

console.log('Port',process.env.SERVER_PORT)

console.debug(`Server listening on port ${port}`  );


process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
    process.exit(1)
})



