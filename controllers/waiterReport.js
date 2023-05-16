var reservationModel = require("../model/Reservation");
var hallModel = require("../model/Hall");

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
      
      return res.render("waiterReport", {
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
        // var date_ob = new Date();
        // var day = ("0" + date_ob.getDate()).slice(-2);
        // var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // var year = date_ob.getFullYear();
        // var currentDate = year + "-" + month + "-" + day;
        console.log("req.query.date ",req.query.date);
        console.log("req.query.hall ",req.query.hall);
        var currentDate = req.query.date;
        data = await reservationModel.find({
          date: { $eq: currentDate },
          date: req.query.date, hall: req.query.hall
        }).populate("services hall");
        data = data.reverse();
        console.log("data ",data);
        var halls = await hallModel.find();
        // console.log("data ",data[0].services);
        // for (var i = 0; i < data.length; i++) {
        //   for(var j=0;j < data[i].services.length;j++){
        //     console.log("extra services ", data[i].services[j]);
        //   }
        // }
        return res.render("waiterReport", {
          data,
          halls,
          currentDate,
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
        data = await reservationModel.find({
          date: { $eq: currentDate },
        }).populate("hall services");
        data = data.reverse();
        // console.log("hall ",data[0].hall);
        // console.log("data ",data);
        // for (var i = 0; i < data.length; i++) {
        //   for(var j=0;j < data[i].services.length;j++){
        //     console.log("extra services ", data[i].services[j].name);
        //   }
        // }

        var halls = await hallModel.find();
        // for(var i=0;i < halls.length;i++){
        //   console.log("halls ",halls[i].name);
        // }
        return res.render("waiterReport", {
          data,
          halls,
          currentDate,
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
