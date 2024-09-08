let user = require("../model/user");

async function handlefetchuserbyid(req, res) {

    try {
        let {id} = req.params 
        let response = await user.findById(id).select('-password');
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

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
      // Using `{ new: true }` to return the updated document
      const updatedUser = await user.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select("-password");

      if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
  } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Error updating user", error: error.message });
  }
};


module.exports = {handlefetchuserbyid , updateUser}