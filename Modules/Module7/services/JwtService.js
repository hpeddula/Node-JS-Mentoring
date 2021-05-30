require('dotenv').config()
const randomString = require('randomstring');
const jsonwebtoken = require('jsonwebtoken');

const secret = randomString.generate(100);
const VALIDATION_ERROR = 'JSON-web-token validation failed.';



module.exports = {
    getJwt :(data) => {
        return new Promise((resolve, reject) => {
            jsonwebtoken.sign(data, process.env.SECRET_KEY || secret, (err, token) => {
                err ? reject(err) : resolve(token || '');
            });
        });
    },
    decodeJwt:(jwt)=>{
        return new Promise((res, rej) => {
            jsonwebtoken.verify(jwt, process.env.SECRET_KEY ||secret, (err, decoded) => {
                return err ? rej(VALIDATION_ERROR) : res(decoded);
            });
        });
    }
}