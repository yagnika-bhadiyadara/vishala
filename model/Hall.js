const mongoose = require('mongoose');

const hallModel = mongoose.Schema({
    name: { type: String,unique:true},
    capacity: { type: Number},
});

module.exports = mongoose.model("Halls" , hallModel);