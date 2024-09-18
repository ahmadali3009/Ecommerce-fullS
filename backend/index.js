let express = require('express')
let cors = require("cors")
let connect = require('./connection')
let {productrouter} = require('./routes/product')
let {categoryrouter} = require('./routes/category')
let {brandrouter} = require('./routes/brand')
let {authrouter} = require('./routes/auth')
let {userrouter} = require('./routes/user')
let {cartrouter} = require('./routes/cart')
let { orderrouter } = require('./routes/order')
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const user = require('./model/user')
const { sanitizeUser , isAuth , cookieExtractor } = require('./services/common')
const cookieParser = require('cookie-parser');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;




let PORT = process.env.PORT || 8080;
server = express()

server.use(
    session({
      secret: 'keyboard cat',
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
    })
  );
  server.use(passport.authenticate('session'));
  server.use(passport.initialize());  // Add this middleware
  server.use(passport.session()); 

connect("mongodb://127.0.0.1:27017/FullEcommerce").then(()=>{console.log("connection connected")}).catch((err)=>{console.log(err)})


const SECRET_KEY = 'SECRET_KEY';
// JWT options
const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = cookieExtractor;

opts.secretOrKey = SECRET_KEY; // TODO: should not be in code;


// server.use(cheakAuthenticationUser('token'))
server.use(express.urlencoded({extended : true}))
server.use(express.json())
server.use(cors(
    {
        origin: 'http://localhost:5173', // Allow only this domain
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Include PATCH in allowed methods
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    exposedHeaders: ['X-Total-Count'] // Include X-Total-Count here
    }));

// server.use(express.static(path.resolve("./public")))

server.get('/' , async (req , res)=>
{
   res.json({status : "success"})
})

server.use("/" , productrouter)
server.use("/" , categoryrouter)
server.use("/" , brandrouter)
server.use("/auth" , authrouter)
server.use("/user" , userrouter)
server.use("/cart" , cartrouter)
server.use("/order" , orderrouter)


passport.use(
    'local',
    new LocalStrategy(async function (username, password, done) {
      // by default passport uses username
      try {
        const User = await user.findOne({ email: username });
        console.log("in passport authen",User);
        if (!User) {
          return done(null, false, { message: 'invalid credentials' }); // for safety
        }
        crypto.pbkdf2(
          password,
          User.salt,
          310000,
          32,
          'sha256',
          async function (err, hashedPassword) {
            if (!crypto.timingSafeEqual(User.password, hashedPassword)) {
              return done(null, false, { message: 'invalid credentials' });
            }
            const token = jwt.sign(sanitizeUser(User), SECRET_KEY);
            done(null, {token}); // this lines sends to serializer
          }
        );
      } catch (err) {
        done(err);
      }
    })
  );
  
  passport.use(
    'jwt',
    new JwtStrategy(opts, async function (jwt_payload, done) {
      console.log({ jwt_payload });
      try {
        const User = await User.findById(jwt_payload.id);
        if (User) {
          return done(null, sanitizeUser(User)); // this calls serializer
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );


  passport.serializeUser(function (User, cb) {
    console.log('serialize', User);
    process.nextTick(function () {
      return cb(null, { id: User.id, role: User.role });
    });
  });
  
  // this changes session variable req.user when called from authorized request
  
  passport.deserializeUser(function (User, cb) {
    console.log('de-serialize', User);
    process.nextTick(function () {
      return cb(null, User);
    });
  });



server.listen(PORT ,()  => {
    console.log("the server is running port:8000")
})