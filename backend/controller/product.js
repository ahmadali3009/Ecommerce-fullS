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
    try {
        let query =  productmodel.find({})

        if (req.query.category) {
            query = query.find({ category: req.query.category })
        }
        if (req.query.brand) {
            query = query.find({ brand: req.query.brand })
        }
        if (req.query._sort && req.query._order) {
            query = query.sort({ [req.query._sort]: req.query._order })
        }
        const countproduct = await query.clone().countDocuments();
        console.log(countproduct)
        if (req.query._page && req.query._limit) {
            const pageSize = req.query._limit
            const page = req.query._page
            query = query.skip(pageSize * (page - 1)).limit(pageSize)
        }

        const results = await query.exec();  // Execute the query

        res.status(200).json({"success" : results , "totalproduct" : countproduct})

    }
    catch (error) {
        res.status(400).json({ "error": error.message })
    }

}

async function handlefetchproductbyid(req, res) {

    try {
        let id = req.params.id  
        let response = await productmodel.findById(id)      
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