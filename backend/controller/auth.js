const { useRouteLoaderData } = require("react-router-dom");
let user = require("../model/user");
const crypto = require('crypto');
const { sanitizeUser } = require("../services/common");
const SECRET_KEY = 'SECRET_KEY';
const jwt = require('jsonwebtoken');
async function handlecreateuser(req, res) {
  try {
    console.log(req.body)
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      'sha256',
      async function (err, hashedPassword) {
        const User = new user({ ...req.body, password: hashedPassword, salt });
        const doc = await User.save();

        req.login(sanitizeUser(doc), (err) => {  // this also calls serializer and adds to session
          if (err) {
            res.status(400).json(err);
          } else {
            const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
            res.status(201).json(token);
          }
        });
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

  let checkUser = async (req, res) => {
    res.json({status:'success',user: req.user});
};

async function handleloginuser(req, res) {
  res.cookie('jwt', req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    }).status(201).json(req.user.token);
}

async function checkAuth(req, res){
  if(req.user){
    res.json(req.user);
  } else{
    res.sendStatus(401);
  }
};


module.exports = { handlecreateuser , handleloginuser , checkUser , checkAuth};
