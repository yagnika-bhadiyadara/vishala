const mongoose = require('mongoose');

const itemModel = mongoose.Schema({
  name: { type: String, unique: true },
  price: { type: Number },
  // ingredients_value: [],
});

module.exports = mongoose.model("Items", itemModel);