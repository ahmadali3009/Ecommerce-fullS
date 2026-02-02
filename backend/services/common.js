const passport = require('passport');

exports.isAuth = () => {
  return (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, User, info) => {
      if (err) {
        return next(err);
      }
      console.log("user in isAuth middleware" , User || "no user found" || "no user found in request")
      if (!User) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }
      req.user = User;
      next();
    })(req, res, next);
  };
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
  
  return token;
};
