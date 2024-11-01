const passport = require('passport');

exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt')
};

exports.sanitizeUser = (user)=>{
    return {id:user.id, role:user.role}
}

// exports.cookieExtractor = function (req) {
//   let token = null;
//   if (req && req.cookies) {
//     console.log("req in cookieextracter", req.cookies);
//     token = req.cookies['Cookie_1']; // Change this to 'Cookie_1'
//   }
//   console.log("extracted token ", token);
//   return token;
// };



exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    console.log("req in cookieextracter", req.cookies)
    token = req.cookies['jwt']; // Extract token from the 'jwt' cookie
  }
  console.log("extracted token " , token)

  // Use hardcoded token only if no token is found in the cookies (for testing)
  if (!token) {
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRmNjcxMDYxMGVhNjVmNzVmNmFkZiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzMwNDc1NjgwfQ.D1SO8lIXrXQXeNFwFhPt1OhOX_VbwZBz5sSU_bV0u_A";
  }
  
  return token;
};