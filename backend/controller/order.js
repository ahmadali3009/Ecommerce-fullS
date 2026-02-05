let { order } =  require("../model/order");

    async function handleOrderdata(req, res) {
        try {
            if (!req.user?.id) {
                return res.status(401).json({ error: 'Authentication required to place an order.' });
            }
            const body = { ...req.body };
            body.user = body.user || req.user.id;
            let orders = new order(body);
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
            
            const orderId = req.params.id;
            // Backend logic to handle the order, e.g., fetch from database
            res.json({ message: `Order ${orderId} processed successfully!` });

        } catch (error) {
            console.error("Error fetching categories:", error);
            return res.status(500).json({ "error": error.message });
        }
    }



    module.exports = {handleOrderdata , handlefetchuserorderbyid , handleshoworder}