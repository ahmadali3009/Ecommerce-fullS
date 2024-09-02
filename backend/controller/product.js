let productmodel = require("../model/product")
async function handlecreateproduct(req, res) {
    let products = req.body
    if (products) {
        let newproduct = await productmodel.create({
            title: products.title,
            description: products.description,
            brand: products.brand,
            price: products.price,
            discountPercentage: products.discountPercentage,
            stock: products.stock,
            category: products.category,
            thumbnail: products.thumbnail,
            images: products.images,

        })
        res.json({ "created": newproduct })
    }
    else {
        console.log("product not found")
        res.status(500).send("not found")
    }

}
async function handleAllproductquery(req, res) {
    let query = productmodel.find({});
    let totalProductsQuery = productmodel.find({});
  
    if (req.query.category) {
      query = query.find({ category: req.query.category });
      totalProductsQuery = totalProductsQuery.find({
        category: req.query.category,
      });
    }
    if (req.query.brand) {
      query = query.find({ brand: req.query.brand });
      totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
    }
    //TODO : How to get sort on discounted Price not on Actual price
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
  
    const totalDocs = await totalProductsQuery.countDocuments().exec();
    console.log({ totalDocs });
  
    if (req.query._page && req.query.per_page) {
      const pageSize = req.query.per_page;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
  
    try {
      const docs = await query.exec();
      res.set('X-Total-Count', totalDocs);
      res.status(200).json(docs);
    } catch (err) {
      res.status(400).json(err);
    }
}


async function handlefetchproductbyid(req, res) {

    const { id } = req.params;

    try {
      const product = await productmodel.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json(err);
    }
}

async function handleupdateproductbyid(req, res) {

    try {
        let id = req.params.id  
        let response = await productmodel.findByIdAndUpdate(id , req.body ,{new:true} )      
        if (response) {
            return res.status(200).json({ "response": response });
        } else {
            return res.status(404).json({ "message": "No categories found" });
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({ "error": error.message });
    }
}



module.exports = {handlecreateproduct, handleAllproductquery , handlefetchproductbyid , handleupdateproductbyid}