const { useRouteLoaderData } = require("react-router-dom");
let user = require("../model/user");

async function handlecreateuser(req, res) {
    try {
        let userdata = req.body;

        if (userdata) {
            // Create the user with the provided data
            let response = await user.create({
                name: userdata.name,
                email: userdata.email,  // Corrected from userdata.title to userdata.email
                password: userdata.password,
                role: userdata.role,
                addresses: userdata.addresses,
            });

            // Send the created user as the response
            res.status(201).json({ "created": response });
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
