const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;

const connect = require('./connection');
const user = require('./model/user');
const { sanitizeUser, isAuth, cookieExtractor } = require('./services/common');
const { productrouter } = require('./routes/product');
const { categoryrouter } = require('./routes/category');
const { brandrouter } = require('./routes/brand');
const { authrouter } = require('./routes/auth');
const { userrouter } = require('./routes/user');
const { cartrouter } = require('./routes/cart');
const { adminorderrouter } = require('./routes/adminorder');
const { orderrouter } = require('./routes/order');

const PORT = process.env.PORT || 8080;
const SECRET_KEY = process.env.SECRET_KEY || process.env.JWT_SECRET || 'dev-secret-change-in-production';
const SESSION_SECRET = process.env.SESSION_SECRET || process.env.SECRET_KEY || 'session-secret';
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? require('stripe')(stripeKey) : null;

// CORS: allow multiple origins from env (comma-separated), default dev
const corsOrigin = process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:5173';
const corsOrigins = corsOrigin.split(',').map((o) => o.trim()).filter(Boolean);

const corsOptions = {
  origin: (origin, cb) => {
    // With credentials: true we must return the request origin, never '*'
    if (!origin) return cb(null, false);
    if (corsOrigins.length === 0) return cb(null, origin);
    if (corsOrigins.includes(origin)) return cb(null, origin);
    if (corsOrigins.includes('*')) return cb(null, origin);
    return cb(null, false);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  exposedHeaders: ['X-Total-Count'],
};

const server = express();

// JWT options
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;

// Middleware order: CORS first, then body/cookie, then session/auth
server.use(cors(corsOptions));
server.use(express.json());
server.use(cookieParser());
server.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.session());
server.use(passport.authenticate('session'));


server.get('/' , async (req , res)=>
{
   res.json({status : "success"})
})
server.use("/auth" , authrouter)

// Stripe payment intent (before any catch-all "/" routers so it isn't matched by others)
server.post("/create-payment-intent", async (req, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({ error: 'Stripe is not configured' });
    }
    const { totalAmount, orderId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "aed",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId,
      },
    });

    return res.json({
      clientSecret: paymentIntent.client_secret,
      dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    });
  } catch (err) {
    console.error('create-payment-intent error:', err);
    return res.status(500).json({ error: err.message || 'Payment setup failed' });
  }
});

server.use("/users", isAuth(), userrouter)
server.use("/" ,  productrouter)
server.use("/" , categoryrouter)
server.use("/" , brandrouter)
server.use("/cart" , cartrouter)
server.use("/" , adminorderrouter)
server.use("/" , orderrouter)

// server.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
// });
passport.use(
    'local',
    new LocalStrategy(
      { usernameField: 'email' },  // Set usernameField to 'email'
      async function (email, password, done) {
      // by default passport uses username
      console.log("email" , email)
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
            console.log("token in passport",token)
            return done(null, sanitizeUser(User),token); // Send sanitized user data and token
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

connect()
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
