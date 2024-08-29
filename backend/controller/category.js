let category = require("../model/category")

async function handlefetchcategory(req, res) {
    try {
        const response = await category.find({});
        
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

async function handlecreatecategory(req, res) {
    try {
        let data = req.body;
        
        const response = await category.create({value: data.value , label: data.label });
        if (response) {
            return res.status(200).json({ "response": response });
        } else {
            return res.status(404).json({ "message": "somethings wrong" });
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({ "error": error.message });
    }
}




module.exports = {handlefetchcategory , handlecreatecategory }