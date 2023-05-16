var reservationModel = require("../model/Reservation");

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

      return res.render("paymentReport", {
        data,
        currentDate,
        error: req.query.error,
        message: req.query.message,
        item: req.query.item,
        person: req.query.person,
      });
    } else {
      let data = [];

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
        var data_update = await reservationModel.updateOne(
          { _id: { $eq: id } },
          { $set: { due_payment: 0 } }
        );
        data_update = data_update.reverse();
        console.log("data_update ",data_update);
      }

      if (req.query.date) {
        // var date_ob = new Date();
        // var day = ("0" + date_ob.getDate()).slice(-2);
        // var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // var year = date_ob.getFullYear();
        // var currentDate = year + "-" + month + "-" + day;
        var currentDate = req.query.date;
        data = await reservationModel.find({
          date: { $eq: currentDate },
        }).populate("services hall");
        data = data.reverse();
        // console.log("data ",data[0].services);
        // for (var i = 0; i < data.length; i++) {
        //   for(var j=0;j < data[i].services.length;j++){
        //     console.log("extra services ", data[i].services[j]);
        //   }
        // }
        return res.render("paymentReport", {
          data,
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
          date: { $lt: currentDate },
          due_payment: { $gt: 0 }
        });
        data = data.reverse();
        console.log("data ",data);
        // for (var i = 0; i < data.length; i++) {
        //   for(var j=0;j < data[i].services.length;j++){
        //     console.log("extra services ", data[i].services[j].name);
        //   }
        // }

        return res.render("paymentReport", {
          data,
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
