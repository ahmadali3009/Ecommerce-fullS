let {order} = require('../model/order')

async function handlefetchAllorder(req, res) {
    try {
        let response = await order.find()
        console.log("response in adminorderstatus",response)
        if (response) {
            return res.status(200).json({response});
        } else {
            return res.status(404).json({ "message": "No order found" });
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({ "error": error.message });
    }   
}

module.exports = {handlefetchAllorder}