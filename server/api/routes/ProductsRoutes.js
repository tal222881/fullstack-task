const express = require("express");
const router = express.Router();
const fs = require("fs");
const json = require("../../../assets/products.json");
const path = "./../assets/products.json";

//set a get route that return the products that conains the chars send via client
router.get("/match/:chars", (req, res) => {
  // the characters that return from client to match the products
  console.log("value = " + req.params.chars);
  if (!req.params.chars) {
    return res.status(400).json({
      success: false,
      msg: "Missing characters"
    });
  }
  const chars = req.params.chars;
  //we use the fs library to read the json file asset
  const filterJson = [
    ...json.filter(p => {
      //i used the function toLoweCase if mabey the user not use capital letters
      //console.log(p);
      if (p["name"] === null || p === null) return false;
      return p["name"].toLowerCase().search(chars.toLowerCase()) !== -1
        ? p
        : false;
    })
  ];
  console.log("request has made");
  //return a positive response to the client

  const tmp = [
    { name: "test" },
    { name: "abc" },
    { name: "abkokojfds" },
    { name: "abutututut" },
    { name: "abckkkk" },
    { name: "def" },
    { name: "defdlpfgok" },
    { name: "debllblblbf" },
    { name: "defaaaa" },
    { name: "ghitutifokkasd" },
    { name: "jklm" },
    { name: "nop" },
    { name: "qrst" },
    { name: "uvw" }
  ];

  const filterTmp = [
    ...tmp.filter(p => {
      //i used the function toLoweCase if mabey the user not use capital letters
      //console.log(p);
      if (p["name"] === null || p === null) return false;
      return p["name"].toLowerCase().search(chars.toLowerCase()) !== -1;
    })
  ];
  return res.status(200).json(filterJson);
});

module.exports = router;
