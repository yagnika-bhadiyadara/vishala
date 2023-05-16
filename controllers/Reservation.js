var ReservationModel = require("../model/Reservation");
var hallModel = require("../model/Hall");
var services = require("../model/extraService");
var itemModel = require("../model/Item");

// add item
exports.add = async (req, res, next) => {
  // console.log("object");
  try {
    // console.log("add controller");
    // console.log("req.body.name ",req.body.name);
    // console.log("req.body.date ",req.body.date);
    // console.log("req.body.time ",req.body.time);
    // console.log("req.query ",req.query);
    if (!req.body.time || !req.body.date) {
      return res.redirect(
        "/?message=name and capacity are required&name=" +
        req.body.time +
        "&date=" +
        req.body.date
      );
      // return res.status(400).json({ error: "name and capacity are required" });
    }

    // console.log("req.params.id ", req.params.id);
    if (req.params.id) {
      // console.log("second if");
      await ReservationModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          date: req.body.date,
          capacity: req.body.capacity,
          time: req.body.time,
          person: req.body.person,
          hall: req.body.hall,
          // menu: req.body.menu,
          // items: req.body.item,
          services: req.body.item_id,
          username: req.body.username,
          address: req.body.address,
          phonenumber: req.body.phonenumber,
          email: req.body.email,
          ocation: req.body.ocation,
          price_of_plate: req.body.price_of_plate,
          total_amount: req.body.total_amount,
          price: req.body.price,
          extra_price: req.body.extra_price,
          final_amount: req.body.final_amount,
          advance_payment: req.body.advance_payment,
          due_payment: req.body.due_payment,
          items: req.body.items_id
        }
      );
      return res.redirect(
        "/reservationShow?error=Data was successfully update"
      );
    } else {
      // console.log("else");
      // console.log("req.body.hall ", req.body.hall);
      // console.log("req.body.menu ", req.body.menu);
      console.log("req.body",req.body);
      await ReservationModel.create({
        date: req.body.date,
        capacity: req.body.capacity,
        time: req.body.time,
        person: req.body.person,
        hall: req.body.hall,
        // menu: req.body.menu,
        services: req.body.item_id,
        username: req.body.username,
        address: req.body.address,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
        ocation: req.body.ocation,
        price_of_plate: req.body.price_of_plate,
        total_amount: req.body.total_amount,
        price: req.body.price,
        extra_price: req.body.extra_price,
        final_amount: req.body.final_amount,
        advance_payment: req.body.advance_payment,
        due_payment: req.body.due_payment,
        items: req.body.item_id,
      });
      // console.log("req.body.item_id ",req.body.item_id);
      return res.redirect(
        "/reservationShow?error=Data was successfully add"
      );
    }
    return res.redirect("/reservationShow");
  } catch (error) {
    console.log(error);
  }
};

//show data
exports.show = async (req, res, next) => {
  try {
    let data = await ReservationModel.find();
    // console.log("req.query.date ",req.query.date);
    // console.log("req.query.time ",req.query.time);
    // console.log("req.query.capacity ",req.query.capacity);
    // if (req.query.date && req.query.time && req.query.capacity) {
    //   // console.log("Search");
    //   let firstFind = await ReservationModel.find({
    //     date: req.query.date,
    //     time: req.query.time,
    //   });
    //   if (firstFind.length) {
    //     firatFind_MatchList = firstFind.map((f) => {
    //       return f.hall;
    //     });
    //     // console.log(firatFind_MatchList);
    //     let hallsList = await hallModel.find({
    //       capacity: { $gte: req.query.capacity },
    //       _id: { $nin: firatFind_MatchList },
    //     });
    if (req.query.date && req.query.time) {
      // console.log("Search ");
      let firstFind = await ReservationModel.find({
        date: req.query.date,
        time: req.query.time,
      });
      // console.log("firstFind ",firstFind);
      if (firstFind.length) {
        console.log("object");
        firatFind_MatchList = firstFind.map((f) => {
          return f.hall;
        });
        // console.log(firatFind_MatchList);
        let hallsList = await hallModel.find({
          // capacity: { $gte: req.query.capacity },
          _id: { $nin: firatFind_MatchList },
        });
        // let hallsList = await hallModel.find();
        // menuList = await menuModel.find().populate("item");
        // price = await menuModel.find();
        service = await services.find();
        item = await itemModel.find();
        // menuList = menuList.map((e, i) => {
        //   let item_lest = e.item.map((e) => {
        //     return e.name
        //   })
        //   return {
        //     _id: e._id,
        //     name: e.name,
        //     item: item_lest,
        //     price: e.price,
        //   };
        // })
        // console.log("menu ", menuList);
        return res.render("reservation", {
          // menuList,
          hallsList,
          data,
          // price,
          service,
          error: "",
          message: "",
          date: req.query.date,
          time: req.query.time,
          person: req.query.person,
          capacity: req.query.capacity,
          hall: req.query.hall,
          services: req.query.services,
          username: req.query.username,
          address: req.query.address,
          phonenumber: req.query.phonenumber,
          email: req.query.email,
          ocation: req.query.ocation,
          price_of_plate: req.query.price_of_plate,
          total_amount: req.query.total_amount,
          price: req.query.price,
          extra_price: req.query.extra_price,
          final_amount: req.query.final_amount,
          advance_payment: req.query.advance_payment,
          due_payment: req.query.due_payment,
          items: req.query.items_id,
          edit: false,
        });
      } else {
        let hallsList = await hallModel.find({
          // capacity: { $gte: req.query.capacity },
        });
        // menuList = await menuModel.find().populate("item");
        service = await services.find();
        item = await itemModel.find();
        // menuList = menuList.map((e, i) => {
        //   let item_lest = e.item.map((e) => {
        //     return e.name
        //   })
        //   return {
        //     _id: e._id,
        //     name: e.name,
        //     item: item_lest,
        //     price: e.price,
        //   };
        // })

        return res.render("reservation", {
          // menuList,
          hallsList,
          data,
          // price,
          service,
          error: "",
          message: "",
          date: req.query.date,
          time: req.query.time,
          person: req.query.person,
          capacity: req.query.capacity,
          hall: req.query.hall,
          services: req.query.services,
          username: req.query.username,
          address: req.query.address,
          phonenumber: req.query.phonenumber,
          email: req.query.email,
          ocation: req.query.ocation,
          price_of_plate: req.query.price_of_plate,
          total_amount: req.query.total_amount,
          price: req.query.price,
          extra_price: req.query.extra_price,
          final_amount: req.query.final_amount,
          advance_payment: req.query.advance_payment,
          due_payment: req.query.due_payment,
          items: req.query.items_id,
          edit: false,
        });
      }
    }
    if (req.query.id) {
      let find = await ReservationModel.findOne({ _id: req.query.id }).populate(
        "hall services items"
      );
      hallsList = await hallModel.find();
      service = await services.find();
      item = await itemModel.find();
      // menuList = await menuModel.find().populate("item");
      // menuList = menuList.map((e, i) => {
      //   let item_lest = e.item.map((e) => {
      //     return e.name
      //   })
      //   return {
      //     _id: e._id,
      //     name: e.name,
      //     item: item_lest,
      //     price: e.price,
      //   };
      // })
      // console.log("menuList ",menuList);
      console.log("item ",find.items);
      // console.log("itemList ",itemList);
      if (find) {
        // console.log("services ",service);
        return res.render("reservation", {
          data,
          hallsList,
          // items,
          // menuList,
          itemList: find.items,
          service,
          error: "",
          message: "",
          time: find.time,
          person: find.person,
          date: find.date,
          name: find.name,
          capacity: find.capacity,
          hall: find.hall,
          // menu: find.menu,
          services: find.services,
          username: find.username,
          address: find.address,
          phonenumber: find.phonenumber,
          email: find.email,
          ocation: find.ocation,
          price_of_plate: find.price_of_plate,
          total_amount: find.total_amount,
          price: find.price,
          extra_price: find.extra_price,
          final_amount: find.final_amount,
          advance_payment: find.advance_payment,
          due_payment: find.due_payment,
          items: find.items_id,
          edit: true,
          id: find._id,
        });
        }
    }
    if (req.query.error || req.query.message) {
      let hallsList = await hallModel.find({
        // capacity: { $gte: req.query.capacity },
      });
      // menuList = await menuModel.find().populate("item");
      // menuList = menuList.map((e, i) => {
      //   let item_lest = e.item.map((e) => {
      //     return e.name
      //   })
      //   return {
      //     _id: e._id,
      //     name: e.name,
      //     item: item_lest,
      //     price: e.price,
      //   };
      // })
      // console.log("menuList ",menuList);

      return res.render("reservation", {
        data,
        hallsList,
        // menuList,
        error: req.query.error,
        message: req.query.message,
        date: req.query.date,
        name: req.query.name,
        time: req.query.time,
        person: req.query.person,
        capacity: req.query.capacity,
        hall: req.query.hall,
        services: req.query.services,
        username: req.query.username,
        address: req.query.address,
        phonenumber: req.query.phonenumber,
        email: req.query.email,
        ocation: req.query.ocation,
        price_of_plate: req.query.price_of_plate,
        total_amount: req.query.total_amount,
        price: req.query.price,
        extra_price: req.query.extra_price,
        final_amount: req.query.final_amount,
        advance_payment: req.query.advance_payment,
        due_payment: req.query.due_payment,
        items: req.query.items_id,
        edit: false,
      });
    } else {
      let hallsList = await hallModel.find({});
      // menuList = await menuModel.find().populate("item");
      // menuList = menuList.map((e, i) => {
      //   let item_lest = e.item.map((e) => {
      //     return e.name
      //   })
      //   return {
      //     _id: e._id,
      //     name: e.name,
      //     item: item_lest,
      //     price: e.price,
      //   };
      // })
      // console.log(menuList);

      // price = await menuModel.find();
      // console.log(menu);
      service = await services.find();
      item = await itemModel.find();

      // for(var i=0;i < menuList.length;i++){
      //   for(var j=0;j < menuList[i].item.length;j++){
      //     item = menuList[i].item[j].name;
      //     console.log("menuList ",item);
      //   }
      // }

      return res.render("reservation", {
        // menuList,
        hallsList,
        data,
        // price,
        service,
        error: "",
        message: "",
        date: "",
        time: "",
        person: "",
        capacity: "",
        hall: "",
        services: "",
        username: "",
        address: "",
        phonenumber: "",
        email: "",
        ocation: "",
        price_of_plate: "",
        total_amount: "",
        price: "",
        extra_price: "",
        final_amount: "",
        advance_payment: "",
        due_payment: "",
        items: "",
        edit: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
