//import the main data we can uses
const products_data = require("../../../assets/products.json");
let filter_products_data = {};
let last_index = 6;
exports.match_chars_get = (req, res) => {
  // check that we get an empty value
  if (!req.params.chars) {
    return res.status(400).json({
      success: false,
      msg: "Missing characters"
    });
  }
  const chars = req.params.chars;
  last_index = 6; //we init the sumber of return result each time we send a new value
  filter_products_data = products_data // if its the first time search from the big data
    .filter(p => {
      //i used the function toLoweCase if mabey the user not use capital letters
      if (p["name"] === null || p === null) return false;
      return p["name"].toLowerCase().search(chars.toLowerCase()) !== -1
        ? p
        : false;
    });

  //return a positive response to the client
  //i will return just the first 6 results and when we need to see more we pull more
  return res.status(200).json(filter_products_data.slice(0, last_index));
};

exports.get_another_option = (req, res) => {
  //we return the all filtered products obj if we see them all
  if (filter_products_data.length <= last_index + 1) {
    return res.status(200).json(filter_products_data);
  }
  return res.status(200).json(filter_products_data.slice(0, ++last_index)); //increse by 1 the last index for get one more results and save it for later
};
