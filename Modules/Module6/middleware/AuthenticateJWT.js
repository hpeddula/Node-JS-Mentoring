const { decodeJwt } = require('../services/JwtService');

module.exports = async(req,res,next) => {
    try {
        if(req.headers.hasOwnProperty('authorization')) {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = await decodeJwt(token);
        next()
        } else {
            res.status(401)
        }
      } catch(e) {
        res.status(403).json({
          error: e
        });
      }
}