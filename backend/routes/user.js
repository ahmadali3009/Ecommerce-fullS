let express = require("express");
let userrouter = express.Router()
let {handlefetchuserbyid, updateUser} = require('../controller/user')


userrouter.get("/:id" , handlefetchuserbyid).patch("/:id" , updateUser)
// userrouter.get("/self" , handlefetchuser)


module.exports = {userrouter}