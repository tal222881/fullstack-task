//first i will be initial express for the server API
const express = require("express");
const app = express();

//define my port
const PORT = 4000;

//define my routes
const ProductsRoutes = require("./api/routes/ProductsRoutes");

//define some packages of middlewares
const cors = require("cors");
const bodyParser = require("body-parser");

//set the middlewares
app.use(cors()); // for some security purpuse
//for i can hanlde some req / res with json style....
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set my routes for the projects
app.use("/api/products", ProductsRoutes);
app.listen(PORT, () => {
  console.log("Servier is up and running on port " + PORT);
});
