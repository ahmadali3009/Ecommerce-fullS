let express = require("express");
let productrouter = express.Router()
let {handlecreateproduct , handleAllproductquery , handlefetchbrands , handlefetchcategory} = require('../controller/product')

productrouter.post("/products" , handlecreateproduct)
productrouter.get("/category" , handlefetchcategory)
productrouter.get("/brand" , handlefetchbrands)
productrouter.get("/products" , handleAllproductquery)



module.exports = {productrouter}