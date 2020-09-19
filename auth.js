
const jwt = require('jsonwebtoken');

function verifyUser(req, res, next) {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        let err = new Error('No authentication information!');
        err.status = 401;
        return next(err);
    }
    let token = authHeader.split("")[1];//at 0 Bearer will be stored and at 1 token will be stored. Pda
    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if (err) return next(err);
        req.user = payload;
        console.log( req.user);
        next();
    })
}


function verifyAdmin(req, res, next) {
    if (!req.user) {
        let err = new Error('No authentication information');
        err.status = 401;
        return next(err);
    }
    else if (req.user.role !== 'admin') {
        let err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }
    //verified
    next();
}

module.exports = {
    verifyUser,
    verifyAdmin
};


//JWT WEB-TOKEN WORKING MECHANISM IN THIS SYSTEM:
//After login jwt is created and provided to client-side. This process is called jwt 
// Jwt token include 3 main information: 1. Header: which contains info about algorithm used to encode etc,
//2. Payload: which contain username and other user info. (here, password is not included due to security reason.)
//3. Secret key: This is the key used to verify token. Server check Secret key which is stored in itself to verify. 
//This token is checked in every task request.