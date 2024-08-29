let user = require("../model/user");

async function handlefetchuserbyid(req, res) {

    try {
        let id = req.params.id  
        let response = await user.findById(id)      
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

async function updateUser (req, res) {
    const { id } = req.params;
    try {
      const user = await user.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  };

module.exports = {handlefetchuserbyid , updateUser}