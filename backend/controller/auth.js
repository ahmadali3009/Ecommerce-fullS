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
  try {
    console.log("User object attached by passport:", req.user);
    
    if (!req.user) {
      return res.status(400).json({ message: "No user found in request" });
    }

    res.json(req.user);
  } catch (err) {
    console.error("Error in handleloginuser:", err);
    res.status(400).json({ error: err.message });
  }
}

module.exports = { handlecreateuser , handleloginuser , checkUser };
