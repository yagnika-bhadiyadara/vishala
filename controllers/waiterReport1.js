var reservationModel = require("../model/Reservation");
var itemModel = require("../model/Item");

// add item
// exports.add = async (req, res, next) => {
//   try {
// if (!req.body.name || !req.body.capacity) {
//   return res.redirect(
//     "/reservation?error=all fields are required&name=" +
//     req.body.name +
//     "&capacity=" +
//     req.body.capacity
//   );
//   // return res.status(400).json({ error: "name and capacity are required" });
// }
// if (req.params.id) {

//   await reservationModel.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name, capacity: req.body.capacity });
// } else {

//   await reservationModel.create({ name: req.body.name, capacity: req.body.capacity });
// }
// return res.redirect("/reservation");
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.show = async (req, res, next) => {
  try {
    if (req.query.error || req.query.message) {
      let data = [];
      var date_ob = new Date();
      var day = ("0" + date_ob.getDate()).slice(-2);
      var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      var year = date_ob.getFullYear();
      var currentDate = year + "-" + month + "-" + day;
      data = await reservationModel.find();
      data = data.reverse();

      return res.render("waiterReport1", {
        data,
        currentDate,
        error: req.query.error,
        message: req.query.message,
        item: req.query.item,
        person: req.query.person,
      });
    } else {
      let data = [];

      if (req.query.date) {

        data = await reservationModel.find({
          date: { $eq: req.query.date },
        }).populate(
          // "hall",
          // { path: 'menu',
          // populate: {
          //   path: 'item',
          //   select: 'name'
          // }},
        ).populate("hall items services");
        data = data.reverse();
        const moment = require('moment');
        const formattedDate = moment(req.query.date).format('DD-MM-YYYY');

        // console.log("data ",data);

        // for(var i=0; i < data.length; i++){
        //   for(var k=0;k < data[i].services.length;k++){
        //     console.log("data.services ",data[i].services[k].name);
        //   }
        // }

        return res.render("waiterReport1", {
          data,
          currentDate,
          // itemList,
          formattedDate,
          error: "",
          message: "",
          item: "",
          person: "",
        });
      } else {
        var date_ob = new Date();
        var day = ("0" + date_ob.getDate()).slice(-2);
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var year = date_ob.getFullYear();
        var currentDate = year + "-" + month + "-" + day;
        // console.log("currentDate ",currentDate);
        itemList = await itemModel.find();
        // menuList = await menuModel.find().populate("item");
        data = await reservationModel.find({
          date: { $eq: currentDate },
        }).populate(
          // "hall",
          // { path: 'menu',
          // populate: {
          //   path: 'item',
          //   select: 'name'
          // }},
        ).populate("hall items services");
        data = data.reverse();

        const moment = require('moment');
        const formattedDate = moment(req.query.date).format('DD-MM-YYYY');
        // console.log("formattedDate ",formattedDate);

        // Create a new Date object
var currentDate = new Date();

// Add one day to the current date

// Format the date as a string in the desired format

// console.log(formattedDate); // Output: "Fri Apr 21 2023 12:44:42 GMT+0530 (India Standard Time)"

        return res.render("waiterReport1", {
          data,
          currentDate,
          formattedDate,
          itemList,
          error: "",
          message: "",
          item: "",
          // menu: "",
          person: "",
          date: "",
        });
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

// delete data
// exports.delete = async (req, res, next) => {
//   try {
//     let id = req.params.id;
//     let data = await reservationModel.findByIdAndRemove({ _id: id });
//     if (!data) {
//       return res.redirect("/reservationShow?error=slider not found");

//       // return res.status(400).json({
//       //   status: "400",
//       //   message: "slider not found",
//       // });
//     }
//     return res.redirect(
//       "/reservationShow?message=Data was successfully delete"
//     );
//     return res.redirect("/reservationShow");
//   } catch (error) {
//     console.log(error);
//   }
// };
