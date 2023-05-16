var reservationModel = require("../model/Reservation");

exports.show = async (req, res, next) => {
  try {
    // if(req.query.id){
    //   function getDatesInRange(startDate, endDate) {
    //     const date = new Date(startDate.getTime());
    //     const dates = [];
    //     while (date <= endDate) {
    //       dates.push(new Date(date));
    //       date.setDate(date.getDate() + 1);
    //     }
    //     return dates;
    //   }
    //   const d1 = new Date(req.query.from_date);
    //   const d2 = new Date(req.query.to_date);
    //   data = await reservationModel.find(
    //     { date: { $gte: req.query.from_date, 
    //       $lte: req.query.to_date } }
    //   );
    // }
    if (req.query.error || req.query.message) {
      let data = [];
      data = await reservationModel.find().populate("hall services items");
      data = data.reverse();
      // var date_ob = new Date();
      //   var day = ("0" + date_ob.getDate()).slice(-2);
      //   var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      //   var year = date_ob.getFullYear();
      //   var currentDate = year + "-" + month + "-" + day;
      //   data = await reservationModel.find({
      //     date: { $gte: currentDate }
      // }).populate("hall");

      // console.log("req.query.from_date ", req.query.from_date);
      // console.log("req.query.to_date ", req.query.to_date);

      return res.render("report", {
        data,
        data1,
        error: req.query.error,
        message: req.query.message,
        from_date: req.query.from_date,
        to_date: req.query.to_date,
        time: req.query.time,
        hall: req.query.hall,
      });
    } else {
      let data = [];
      let data1 = [];

      if ((req.query.from_date && req.query.to_date) || req.query.id) {
        // console.log("req.query.id ",req.query.id);
        // console.log("req.query.from_date ",req.query.from_date);
        // console.log("req.query.to_date ",req.query.to_date);
        function getDatesInRange(startDate, endDate) {
          const date = new Date(startDate.getTime());
          const dates = [];
          while (date <= endDate) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
          }
          return dates;
        }
        const d1 = new Date(req.query.from_date);
        const d2 = new Date(req.query.to_date);
        // console.log("date ",getDatesInRange(d1, d2));
        var dates = getDatesInRange(d1, d2);
        // console.log("d1 ",d1);
        // console.log("d2 ",d2);
        // console.log("dates ", dates);
        
        data = await reservationModel.find({ 
          date: { $gte: req.query.from_date, 
                  $lte: req.query.to_date } 
          }).populate("hall");
        data1 = await reservationModel.find({
          _id: { $eq: req.query.id }
        }).populate("hall services items");
        data1 = data1.reverse();
        const moment = require('moment');
        const formattedDate = moment(data1[0].date).format('DD-MM-YYYY');

        console.log("data1 ",data1[0].date);
        // for(var i=0;i < data1[0].services.length;i++){
        //   console.log("data ",data1[0].services[i].name);
        // }

        return res.render("report", {
          data,
          data1,
          formattedDate,
          error: "",
          message: "",
          date: req.query.date,
          from_date: req.query.from_date,
          to_date: req.query.to_date,
          time: req.query.time,
          hall: req.query.hall,
        });
      } else {
        //   var date_ob = new Date();
        //   var day = ("0" + date_ob.getDate()).slice(-2);
        //   var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        //   var year = date_ob.getFullYear();
        //   var currentDate = year + "-" + month + "-" + day;
        //   data = await reservationModel.find({
        //     date: { $gte: currentDate }
        // }).populate("hall");
        data = data.reverse();

        return res.render("report", {
          data,
          data1,
          error: "",
          message: "",
          from_date: "",
          to_date: "",
          time: "morning",
          hall: "",
        });
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};