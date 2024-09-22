let user = require("../model/user");

const handlefetchuserbyid = async (req, res) => {
    console.log(req.user); // Check if req.user is populated
    if (!req.user) {
        return res.status(400).json({ error: 'No user found in request' });
    }
    const { id } = req.user;
  console.log(id)
  try {
    const User = await user.findById(id);
    res.status(200).json({id:User.id,addresses:User.addresses,email:User.email,role:User.role});
  } catch (err) {
    res.status(400).json(err);
  }
  };

const updateUser = async (req, res) => {
    const { id } = req.user;
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