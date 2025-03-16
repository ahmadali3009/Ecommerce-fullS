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
        let query = productmodel.find({});
        let totalProductsQuery = productmodel.find({});

        // Handle filters
        if (req.query.category) {
            const categories = Array.isArray(req.query.category) 
                ? req.query.category 
                : [req.query.category];
            query = query.find({ category: { $in: categories } });
            totalProductsQuery = totalProductsQuery.find({ category: { $in: categories } });
        }

        if (req.query.brand) {
            const brands = Array.isArray(req.query.brand) 
                ? req.query.brand 
                : [req.query.brand];
            query = query.find({ brand: { $in: brands } });
            totalProductsQuery = totalProductsQuery.find({ brand: { $in: brands } });
        }

        // Handle sorting
        if (req.query._sort && req.query._order) {
            const sortOrder = req.query._order.toLowerCase() === 'desc' ? -1 : 1;
            const sortField = req.query._sort;
            
            console.log('Sorting by:', sortField, 'Order:', sortOrder); // Debug log
            
            query = query.sort({ [sortField]: sortOrder });
        }

        // Get total count
        const totalDocs = await totalProductsQuery.countDocuments().exec();

        // Handle pagination
        if (req.query._page && req.query.per_page) {
            const pageSize = parseInt(req.query.per_page);
            const page = parseInt(req.query._page);
            query = query.skip(pageSize * (page - 1)).limit(pageSize);
        }

        const docs = await query.exec();
        res.set('X-Total-Count', totalDocs);
        res.status(200).json(docs);

    } catch (err) {
        console.error('Query error:', err);
        res.status(400).json({ error: err.message });
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