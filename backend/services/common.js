const passport = require('passport');

exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt')
};

exports.sanitizeUser = (user)=>{
    return {id:user.id, role:user.role}
}

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt']; // Extract token from the 'jwt' cookie
  }

  // Use hardcoded token only if no token is found in the cookies (for testing)
  if (!token) {
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZWFlNTRjMmY5MjYzZWNjNDczZGNlOCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI2NjcwNjQxfQ.aHM677MJT-HdW8bLWW52Nu3xg_q-xqLhp8GptXxXi2A";
  }
  
  return token;
};