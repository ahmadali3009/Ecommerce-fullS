let brand = require("../model/brand")

async function handlefetchbrand(req, res) {
    try {
        const brands = await brand.find({}).exec();
        res.status(200).json(brands);
      } catch (err) {
        res.status(400).json(err);
      }
}

async function handlecreatebrand(req, res) {
    try {
        let data = req.body;
        
        const response = await brand.create({value: data.value , label: data.label });
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




module.exports = {handlefetchbrand , handlecreatebrand }