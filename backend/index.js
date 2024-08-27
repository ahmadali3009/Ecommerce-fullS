let express = require('express')
let connect = require('./connection')
let {productrouter} = require('./routes/product')
let PORT = process.env.PORT || 8000;
server = express()

connect("mongodb://127.0.0.1:27017/FullEcommerce").then(()=>{console.log("connection connected")}).catch((err)=>{console.log(err)})

// server.use(cheakAuthenticationUser('token'))
server.use(express.urlencoded({extended : false}))
server.use(express.json())
// server.use(express.static(path.resolve("./public")))

server.get('/' , async (req , res)=>
{
   res.json({status : "success"})
})

server.use("/admin" , productrouter)
server.listen(PORT ,()  => {
    console.log("the server is running port:8000")
})