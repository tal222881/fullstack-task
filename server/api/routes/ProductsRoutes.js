const express = require("express");
const router = express.Router();

//import the products constroller
const products_controller = require("../controllers/ProductController");
//set a get route that return the products that conains the chars send via client
router.get("/match/:chars", products_controller.match_chars_get);
router.get("/more_option", products_controller.get_another_option);

module.exports = router;
