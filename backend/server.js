const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import Config
const {port} = require("./config/config");

// Importing routes
const googleriveRoutes = require("./routes/googleDrive.routes");
const facebookRoutes = require("./routes/facebook.routes");

// Initialize the app
const app = express();

// Configuring middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuring routes
app.use("/api/googleDrive" , googleriveRoutes.router);
app.use("/api/facebook" , facebookRoutes.router);

// Web route
app.get("/" , (req,res) => {
    res.status(200).send("OAuth Sample Client")
})

// Start the server
app.listen(port, () => console.log(`Server Started ${port}`));