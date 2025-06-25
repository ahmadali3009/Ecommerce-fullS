const { useRouteLoaderData } = require("react-router-dom");
let user = require("../model/user");
const crypto = require('crypto');
const { sanitizeUser } = require("../services/common");
const SECRET_KEY = 'SECRET_KEY';
const jwt = require('jsonwebtoken');
async function handlecreateuser(req, res) {
  try {
    console.log("signupchecking", req.body)
    if (!req.body) {
      return res.status(400).json({ error: "Password is required" });
    }
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
            console.log("User document:", doc);
            const sanitizedUser = sanitizeUser(doc);
            console.log("Sanitized user:", sanitizedUser);
            console.log("Secret key:", SECRET_KEY);
            const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
            console.log("Generated token:", token);
            res.cookie('jwt', token, { 
              httpOnly: true, 
              secure: false, // Set to true in production with HTTPS
              sameSite: 'Lax', // Adjust if needed
              path: '/' // Ensure this path is correct
          });
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
  res.json({ status: 'success', user: req.user });
};

async function handleloginuser(req, res) {

  const token = jwt.sign(sanitizeUser(req.user), SECRET_KEY);
res.cookie('jwt', token, {
  httpOnly: true,
  sameSite: 'Lax',
  maxAge: 1000 * 60 * 60 * 24, // 1 day
});
res.status(200).json({ success: true, user: sanitizeUser(req.user) });
}

async function checkAuth(req, res) {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};


module.exports = { handlecreateuser, handleloginuser, checkUser, checkAuth };
