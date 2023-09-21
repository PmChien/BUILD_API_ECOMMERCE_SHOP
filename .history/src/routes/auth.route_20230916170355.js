const express = require('express');
const app = express();
const router = express.Router();
const Auth = require('../app/authMidleware/auth')

router.post('/login',Auth.login)
router.post('/register',Auth.register)

module.exports = router
