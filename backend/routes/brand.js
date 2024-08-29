let express = require("express");
let brandrouter = express.Router()
let {handlecreatebrand , handlefetchbrand} = require('../controller/brand')

brandrouter.get("/brand" , handlefetchbrand)
brandrouter.post("/brand" , handlecreatebrand)





module.exports = {brandrouter}