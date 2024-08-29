let express = require("express");
let productrouter = express.Router()
let {handlecreateproduct , handleAllproductquery , handlefetchproductbyid , handleupdateproductbyid} = require('../controller/product')

productrouter.post("/products" , handlecreateproduct)
productrouter.get("/products" , handleAllproductquery)
productrouter.get("/products/:id" , handlefetchproductbyid)
productrouter.patch("/products/:id" , handleupdateproductbyid)





module.exports = {productrouter}