let express = require('express')
let server = express()
const path = require('path');
const stripe = require('stripe')('sk_test_51Q22khFoe1OIUX47QUaQBCGT0YWfiB9VbrZvvpgxAXaDvKgAA7XNZ9iB9UTQoj0bcAVSk3p7zPtnJwnlQB2MQiw800rBff4JeY');

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

server.use(
    session({
      secret: 'keyboard cat',
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
    })
  );
  server.use(passport.session()); 

connect("mongodb://127.0.0.1:27017/FullEcommerce").then(()=>{console.log("connection connected")}).catch((err)=>{console.log(err)})


const SECRET_KEY = 'SECRET_KEY';
// JWT options
const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = cookieExtractor;

opts.secretOrKey = SECRET_KEY; // TODO: should not be in code;
server.use(cookieParser());
server.use(passport.authenticate('session'));

// server.use(cheakAuthenticationUser('token'))
server.use(express.urlencoded({extended : true}))
server.use(express.json())
server.use(cors(
    {
    //     origin: 'http://localhost:5173', // Allow only this domain
    //     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Include PATCH in allowed methods
    //     credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    // allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    exposedHeaders: ['X-Total-Count'] // Include X-Total-Count here
    }));

// server.use(express.static(path.resolve("./public")))
// server.use(express.static(path.join(__dirname, 'dist'))); // Adjust as necessary

server.get('/' , async (req , res)=>
{
   res.json({status : "success"})
})


server.use("/" ,isAuth(), productrouter)
server.use("/" ,isAuth(), categoryrouter)
server.use("/" ,isAuth(), brandrouter)
server.use("/auth" , authrouter)
server.use("/users",isAuth() , userrouter)
server.use("/cart" ,isAuth(), cartrouter)
server.use("/order",isAuth() , orderrouter)

// server.get('*', (req, res) =>
//   res.sendFile(path.resolve('dist', 'index.html'))
// );

passport.use(
    'local',
    new LocalStrategy(
      { usernameField: 'email' },  // Set usernameField to 'email'
      async function (email, password, done) {
      // by default passport uses username
      try {
        const User = await user.findOne({ email });
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
      console.log("in use-passport-JWT",{ jwt_payload });
      try {
        const User = await user.findById(jwt_payload.id);
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
// Stripe payment way
server.post("/create-payment-intent", async (req, res) => {
  const { totalAmount , orderId} = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount, // for decimal compensation
    currency: "aed",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      orderId,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  });
});


server.listen(PORT ,()  => {
    console.log("the server is running port:8000")
})