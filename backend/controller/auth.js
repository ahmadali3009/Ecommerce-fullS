const { useRouteLoaderData } = require("react-router-dom");
let user = require("../model/user");

async function handlecreateuser(req, res) {
  try {
      let userdata = req.body;

      if (userdata) {
          // Create the user with the provided data, handling optional fields
          let newUser = {};

          // Set name only if provided
          if (userdata.name) {
              newUser.name = userdata.name;
          }

          // Set email and password (email and password assumed to be required)
          if (userdata.email) {
              newUser.email = userdata.email;
          } else {
              return res.status(400).json({ message: "Email is required" });
          }

          if (userdata.password) {
              newUser.password = userdata.password;
          } else {
              return res.status(400).json({ message: "Password is required" });
          }

          // Set role only if provided, otherwise the default in the schema will take effect
          if (userdata.role) {
              newUser.role = userdata.role;
          }

          // Set addresses only if provided
          if (userdata.addresses) {
              newUser.addresses = userdata.addresses;
          }

          // Create the user in the database
          let response = await user.create(newUser);

          // Send the created user as the response
          res.status(201).json(response);
      } else {
          console.log("User data not provided");
          res.status(400).send("User data not provided");
      }

  } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ "error": error.message });
  }
}


async function handleloginuser(req, res) {
        try {
          const userdata = await user.findOne(
            { email: req.body.email },
          ).exec();
          // TODO: this is just temporary, we will use strong password auth
          console.log({userdata})
          if (!useRouteLoaderData) {
            res.status(401).json({ message: 'no such user email' });
          } else if (userdata.password === req.body.password) {
              // TODO: We will make addresses independent of login
            res.status(200).json({id:userdata.id, email:userdata.email, name:userdata.name,addresses:userdata.addresses});
          } else {
            res.status(401).json({ message: 'invalid credentials' });
          }
        } catch (err) {
          res.status(400).json(err);
        }

}
module.exports = { handlecreateuser , handleloginuser };
