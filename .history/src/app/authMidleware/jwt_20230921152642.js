const {expressjwt : expressjwt}  = require('express-jwt')

function authJwt(){
    const secret = process.env.JWT_SECRET 
    return expressjwt({
        secret,
        algorithms:['HS256'],
    }).unless({
        path :[
            'api/v1/login',
            'api/v1/register',
        ]
    })
}
module.exports = authJwt

// const { expressjwt: expressjwt } = require("express-jwt");

// function authJwt() {
//   const secret = process.env.JWT_SECRET ;
//   const apiUrl = process.env.API_URL;
//   return expressjwt({
//     secret,
//     algorithms: ["HS256"],
    // isRevoked: isRevoked,
//   }).unless({
//     path: [
//       { url: /\/api\/v1\/product(.*)/, methods: ["GET", "OPTIONS"] },
//       { url: /\/api\/v1\/category(.*)/, methods: ["GET", "OPTIONS"] },
//     //   { url: /\/api\/v1\/order(.*)/, methods: ["GET", "OPTIONS", "POST"] },
//       `${apiUrl}/user/register`,
//       `${apiUrl}/user/get-new-token`,
//       `${apiUrl}/login`,
//       `${apiUrl}/register`,
//       `${apiUrl}/api-docs`,
//     ],
//   });
// }

// async function isRevoked(req, token) {
//   if (!token.payload.isAdmin) {
//     return true;
//   }
// }

// module.exports = authJwt;
