let express = require("express");
let passport = require("passport")
let authrouter = express.Router()
let {handlecreateuser ,handleloginuser , checkUser , checkAuth} = require('../controller/auth')

authrouter.post('/signup', handlecreateuser)
.post('/login', (req, res, next) => {
    console.log("Request received at /login"); // Check if this gets logged
    next();
  }, passport.authenticate('local'), handleloginuser)
  .get('/check',passport.authenticate('jwt'), checkUser)
  .get('/checkAuth',passport.authenticate('jwt'), checkAuth);

module.exports = {authrouter}