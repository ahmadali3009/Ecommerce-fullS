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





let PORT = process.env.PORT || 8080;
server = express()

connect("mongodb://127.0.0.1:27017/FullEcommerce").then(()=>{console.log("connection connected")}).catch((err)=>{console.log(err)})

// server.use(cheakAuthenticationUser('token'))
server.use(express.urlencoded({extended : false}))
server.use(express.json())
server.use(cors(
    { origin: 'http://localhost:5173', // Allow only this domain
    methods: 'GET,POST,PUT,DELETE', // Allow only specific HTTP methods
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
server.use("/users" , userrouter)
server.use("/cart" , cartrouter)
server.use("/order" , orderrouter)






server.listen(PORT ,()  => {
    console.log("the server is running port:8000")
})