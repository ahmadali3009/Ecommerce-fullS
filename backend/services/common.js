const passport = require('passport');

exports.isAuth = () => {
  return (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }
      req.user = user;
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
