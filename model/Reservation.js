const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservationModel = mongoose.Schema({
  date: { type: String },
  time: { type: String },
  capacity: { type: Number },
  person: { type: Number },
  username: { type: String },
  address: { type: String },
  phonenumber: { type: Number },
  email: { type: String },
  ocation: { type: String },
  hall: { type: mongoose.Schema.Types.ObjectId, ref: "Halls" },
  // menu: { type: mongoose.Schema.Types.ObjectId, ref: "Menus" },
  services: [{ type: Schema.Types.ObjectId, ref: "ExtraService" }],
  price_of_plate: { type: Number },
  total_amount: { type: Number },
  extra_price: { type: Number },
  final_amount: { type: Number },
  advance_payment: { type: Number },
  due_payment: { type: Number },
  // item_list: { type: mongoose.Schema.Types.ObjectId, ref: "Menus" },
  items: [{ type: Schema.Types.ObjectId, ref: "Items" }],
});

module.exports = mongoose.model("Reservation", reservationModel);