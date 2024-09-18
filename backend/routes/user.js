let express = require("express");
let userrouter = express.Router()
let {handlefetchuserbyid, updateUser} = require('../controller/user')


userrouter.get("/own" , handlefetchuserbyid).patch("/:id" , updateUser)

module.exports = {userrouter}