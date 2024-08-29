let express = require("express");
let authrouter = express.Router()
let {handlecreateuser ,handleloginuser} = require('../controller/auth')

authrouter.post("/signup" , handlecreateuser)
authrouter.post("/login" , handleloginuser)






module.exports = {authrouter}