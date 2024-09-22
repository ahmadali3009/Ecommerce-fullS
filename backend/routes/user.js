let express = require("express");
let userrouter = express.Router()
let {handlefetchuserbyid, updateUser} = require('../controller/user')


userrouter.get("/self" , handlefetchuserbyid).patch("/" , updateUser)

module.exports = {userrouter}