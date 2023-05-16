const mongoose = require('mongoose');

const itemModel = mongoose.Schema({
    name: { type: String,unique:true},
    price: { type: Number},
});

module.exports = mongoose.model("ExtraService" , itemModel);