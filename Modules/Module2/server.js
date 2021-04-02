const http = require('http');
const express = require('express');

const user = require('./routes');

const app = express();



// parse application/json

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use('/user',user)

// default URL to API
app.use('/', (req, res) => {
    res.status(200).send('Server Works');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug(`Server listening on port ${port}`  );



