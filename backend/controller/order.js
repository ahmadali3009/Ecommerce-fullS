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

    async function handlefetchuserorderbyid(req, res) {

        try {
            const { id } = req.user;
            console.log("userid in order" , id)
            let response = await order.find({user : id})
            .populate({
              path: 'products',
              select: 'name price' // Adjust fields to avoid deep nesting
            });
            if (response) {
                return res.status(200).json({response});
            } else {
                return res.status(404).json({ "message": "No categories found" });
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            return res.status(500).json({ "error": error.message });
        }
    }

    async function handleshoworder(req, res) {
        try {
            
            let response = req.body
            console.log(req.body)

        } catch (error) {
            console.error("Error fetching categories:", error);
            return res.status(500).json({ "error": error.message });
        }
    }


    module.exports = {handleOrderdata , handlefetchuserorderbyid , handleshoworder}