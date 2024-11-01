let express = require("express");
let passport = require("passport")
let authrouter = express.Router()
let {handlecreateuser ,handleloginuser , checkUser , checkAuth} = require('../controller/auth')

authrouter.post('/signup', handlecreateuser)
  .post('/login', (req, res, next) => {
    console.log("Request received at /login"); // Check if this gets logged
    next();
  }, passport.authenticate('local', { failureRedirect: '/login-fail' }), handleloginuser) // Optionally handle failures
  .get('/check', passport.authenticate('jwt', { session: false }), checkUser)
  .get('/checkAuth', passport.authenticate('jwt', { session: false }), checkAuth);

// Error handling middleware (if needed)
authrouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


module.exports = {authrouter}