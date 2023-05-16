var reservationModel = require("../model/Reservation");

// add item
exports.add = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.capacity) {
      return res.redirect(
        "/reservation?error=all fields are required&name=" +
        req.body.name +
        "&capacity=" +
        req.body.capacity
      );
      // return res.status(400).json({ error: "name and capacity are required" });
    }
    if (req.params.id) {

      await reservationModel.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name, capacity: req.body.capacity });
    } else {

      await reservationModel.create({ name: req.body.name, capacity: req.body.capacity });
    }
    return res.redirect("/reservation");
  } catch (error) {
    console.log(error);
  }
};

exports.show = async (req, res, next) => {
  try {
    if(req.query.id){
      var id = req.query.id;
      // console.log("req.query.id ",id);
      // var data_set = await reservationModel.aggregate([
      //   { 
      //     // $match : { _id : { $eq: id } },
      //     // $match : { _id : id }
      //     $match:  { _id: id }
      //   },
      //   // {
      //   //   $addFields:
      //   //     {
      //   //       duePayment: { $replaceOne: { input: "$due_payment", find: 10000, replacement: 0 } }
      //   //     }
      //   // }
      //   // {$set: {due_payment: 0}}
      // ]);
      // console.log("data_set ",data_set);
      var data = await reservationModel.find({
        _id : { $eq: id },
        // due_payment : { $set: {value: 0} }
      });
      data = data.reverse();
      console.log("data ",data);
      var data_update = await reservationModel.updateOne(
        { _id: { $eq: id } },
        { $set: { due_payment: 0 } }
      );
      console.log("data_update ",data_update);
    }
    if (req.query.error || req.query.message) {
      let data = [];
      const moment = require('moment');
      // data = await reservationModel.find();
      var date_ob = new Date();
      var day = ("0" + date_ob.getDate()).slice(-2);
      var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      var year = date_ob.getFullYear();
      var currentDate = year + "-" + month + "-" + day;
      data = await reservationModel.find({
        date: { $gte: currentDate }
      }).populate("hall");
      data = data.reverse();

      return res.render("reservationShow", {
        data,
        moment,
        error: req.query.error,
        message: req.query.message,
        date: req.query.date,
        time: req.query.time,
        hall: req.query.hall,
      });
    } else {
      let data = [];

      if (req.query.date && req.query.time) {
        
        var date_ob = new Date();
        var day = ("0" + date_ob.getDate()).slice(-2);
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var year = date_ob.getFullYear();
        var currentDate = year + "-" + month + "-" + day;
        data = await reservationModel.find({
          date: { $gte: currentDate }
        }).populate("hall");
        data = await reservationModel.find({ date: req.query.date, time: req.query.time });
        data = data.reverse();
        const moment = require('moment');
        return res.render("reservationShow", {
          data,
          moment,
          error: "",
          message: "",
          date: req.query.date,
          time: req.query.time,
          hall: req.query.hall,
        });
      } else {
        
        var date_ob = new Date();
        var day = ("0" + date_ob.getDate()).slice(-2);
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var year = date_ob.getFullYear();
        var currentDate = year + "-" + month + "-" + day;
        data = await reservationModel.find({
          date: { $gte: currentDate }
        }).populate("hall");
        data = data.reverse();

        const moment = require('moment');

        return res.render("reservationShow", {
          data,
          moment,
          error: "",
          message: "",
          date: "",
          time: "morning",
          hall: "",
        });
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

// delete data
exports.delete = async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = await reservationModel.findByIdAndRemove({ _id: id });
    if (!data) {
      return res.redirect("/reservationShow?error=slider not found");

      // return res.status(400).json({
      //   status: "400",
      //   message: "slider not found",
      // });
    }
    return res.redirect(
      "/reservationShow?message=Data was successfully delete"
    );
    return res.redirect("/reservationShow");
  } catch (error) {
    console.log(error);
  }
};
