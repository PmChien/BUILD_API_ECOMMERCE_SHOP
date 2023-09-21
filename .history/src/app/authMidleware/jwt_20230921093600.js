// const expressJwt = require('express-jwt')

// function authJwt(){
//     const secret = process.env.JWT_SECRET 
//     return expressJwt({
//         secret,
//         algorithms:['HS256'],
//     })
// }
// module.exports = authJwt

const { expressjwt: expressjwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.JWT_SECRET ;
  const apiUrl = process.env.BACK_END_URL;
  return expressjwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/api\/v1\/product(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/category(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/order(.*)/, methods: ["GET", "OPTIONS", "POST"] },
      `${API_URL}/user/register`,
      `${API_URL}/user/get-new-token`,
      `${API_URL}/login`,
      `${API_URL}/api-docs`,
    ],
  });
}

async function isRevoked(req, token) {
  if (!token.payload.isAdmin) {
    return true;
  }
}

module.exports = authJwt;
