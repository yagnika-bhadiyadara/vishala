var extraServiceModel = require("../model/extraService");

// add item
exports.add = async (req, res, next) => {
  try {
    // console.log("show extraService");

    if (!req.body.name || !req.body.price) {
      return res.redirect(
        "/extraService?message=All fields are required&name=" +
        req.body.name +
        "&price=" +
        req.body.price
      );
      // return res.status(400).json({ error: "name and price are required" });
    }
    if (req.params.id) {

      await extraServiceModel.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name, price: req.body.price });
      return res.redirect(
        "/extraService?error=Data was successfully update"
      );
    } else {

      extraServiceModel.findOne({ name: req.body.name }, function (err, extraServiceModel) {
        if (err) {
          console.log("err ", err);
        }
        //existing user found, stop registration
        if (extraServiceModel) {
          console.log("object");
          return res.redirect(
            "/extraService?message=Data is already exists"
          );
        }
      });

      await extraServiceModel.create({ name: req.body.name, price: req.body.price });
      return res.redirect(
        "/extraService?error=Data was successfully add"
      );
    }
    return res.redirect("/extraService");
  } catch (error) {
    console.log(error);
  }
};

// show data
exports.show = async (req, res, next) => {
  try {
    let data = await extraServiceModel.find();

    if (req.query.id) {
      let find = await extraServiceModel.findOne({ _id: req.query.id });
      data = data.reverse();
      if (find) {
        return res.render("extraService", {
          data,
          error: "",
          message: "",
          name: find.name,
          price: find.price,
          edit: true,
          id: find._id
        });
      }
    }
    if (req.query.error || req.query.message) {
      data = data.reverse();
      return res.render("extraService", {
        data,
        error: req.query.error,
        message: req.query.message,
        name: req.query.name,
        price: req.query.price,
        edit: false,
      });
    } else {
      data = data.reverse();
      return res.render("extraService", {
        data,
        error: "",
        message: "",
        name: "",
        price: "",
        edit: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//edit data
// exports.edit = async (req, res, next) => {
//   try {
//     // console.log(req.params.id);
//     let id = req.params.id;
//     let data = await extraServiceModel.find({ _id: id });
//     if (!data) {
//       return res.status(400).json({
//         status: "400",
//         message: "slider not found",
//       });
//     }

//     res.status(200).json({
//       status: "200",
//       message: "slider edit successfully",
//       data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// update data
// exports.update = async (req, res, next) => {
//   try {
//     // console.log(req.body);
//     let id = req.params.id;
//     let data = await extraServiceModel.findByIdAndUpdate(
//       { _id: id },
//       {
//         title: req.body.title,
//         image: req.file.filename,
//       }
//     );
//     if (!data) {
//       return res.status(400).json({
//         status: "400",
//         message: "slider not found",
//       });
//     }

//     res.status(200).json({
//       status: "200",
//       message: "slider edit successfully",
//       data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// delete data
exports.delete = async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = await extraServiceModel.findByIdAndRemove({ _id: id });
    if (!data) {
      return res.redirect("/extraService?error=slider not found");

      // return res.status(400).json({
      //   status: "400",
      //   message: "slider not found",
      // });
    }
    return res.redirect(
      "/extraService?message=Data was successfully delete"
    );
    return res.redirect("/extraService");
  } catch (error) {
    console.log(error);
  }
};
