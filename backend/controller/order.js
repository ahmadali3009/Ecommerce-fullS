let { order } =  require("../model/order");

    async function handleOrderdata(req, res) {
        try {
            
            let orders = new order(req.body);
            console.log("order check",orders)
            const response = await orders.save();
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

    module.exports = {handleOrderdata}