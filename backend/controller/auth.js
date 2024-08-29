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
        let userdata = req.body;

        if (userdata) {
                let response = await user.findOne(
                    { email: userdata.email },        // Filter object
                    'id email addresses'              // Projection string to select specific fields
                );
                if(userdata.password === response.password){

                    res.status(200).json({
                        id: response.id,
                        email: response.email,
                        addresses: response.addresses
                    });}
                else{
                    return res.status(404).send("invaild candentials")
                } 
            }
         else {
            console.log("User data not provided");
            res.status(400).send("User data not provided");
        }
    }
     catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ "error": error.message });
    }

}
module.exports = { handlecreateuser , handleloginuser };
