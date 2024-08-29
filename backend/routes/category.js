let express = require("express");
let categoryrouter = express.Router()
let {handlefetchcategory , handlecreatecategory} = require('../controller/category')

categoryrouter.get("/category" , handlefetchcategory)
categoryrouter.post("/category" , handlecreatecategory)





module.exports = {categoryrouter}