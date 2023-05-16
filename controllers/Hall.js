var HallModel = require("../model/Hall");

// add item
exports.add = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.capacity) {
      return res.redirect(
        "/hall?message=All fields are required&name=" +
          req.body.name +
          "&capacity=" +
          req.body.capacity
      );
      // return res.status(400).json({ error: "name and capacity are required" });
    }
    if (req.params.id){

      await HallModel.findByIdAndUpdate({_id : req.params.id},{ name: req.body.name, capacity: req.body.capacity });
      return res.redirect(
        "/hall?error=Data was successfully update"
      );
    }else{

      HallModel.findOne({ name: req.body.name }, function(err, HallModel) {
        if ( err ){
          console.log("err ",err);
        }
        //existing user found, stop registration
        if ( HallModel ) {
            console.log("object");
            return res.redirect(
              "/hall?message=Data is already exists"
            );
        }
      });

      await HallModel.create({ name: req.body.name, capacity: req.body.capacity });
      return res.redirect(
        "/hall?error=Data was successfully add"
      );
    }
    return res.redirect("/hall");
  } catch (error) {
    console.log(error);
  }
};

// show data
exports.show = async (req, res, next) => {
  try {
    console.log("show");
    let data = await HallModel.find();

    if (req.query.id) {
      let find = await HallModel.findOne({ _id: req.query.id });
      if (find) {
        data = data.reverse();
        return res.render("hall", {
          data,
          error: "",
          message: "",
          name: find.name,
          capacity: find.capacity,
          edit: true,
          id : find._id
        });
      }
    }
    if (req.query.error || req.query.message) {
      data = data.reverse();
      return res.render("hall", {
        data,
        error: req.query.error,
        message: req.query.message,
        name: req.query.name,
        capacity: req.query.capacity,
        edit: false,
      });
    } else {
      data = data.reverse();
      console.log("data ",data);
      return res.render("hall", {
        data,
        error: "",
        message: "",
        name: "",
        capacity: "",
        edit: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// delete data
exports.delete = async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = await HallModel.findByIdAndRemove({ _id: id });
    if (!data) {
      return res.redirect("/hall?error=slider not found");

      // return res.status(400).json({
      //   status: "400",
      //   message: "slider not found",
      // });
    }
    return res.redirect(
      "/hall?message=Data was successfully delete"
    );
    return res.redirect("/hall");
  } catch (error) {
    console.log(error);
  }
};
