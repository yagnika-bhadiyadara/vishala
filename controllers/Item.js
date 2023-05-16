var ItemModel = require("../model/Item");

// add item
exports.add = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.price) {
      return res.redirect(
        "/item?message=All fields are required&name=" +
        req.body.name +
        "&price=" +
        req.body.price
      );
      // return res.status(400).json({ error: "name and price are required" });
    }
    if (req.params.id) {
      await ItemModel.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name, price: req.body.price,
        //  ingredients_value: req.body.ingredients_value 
        });
      return res.redirect(
        "/item?error=Data was successfully update"
      );
    } else {


      ItemModel.findOne({ name: req.body.name }, function (err, ItemModel) {
        if (err) {
          console.log("err ", err);
        }
        //existing user found, stop registration
        if (ItemModel) {
          console.log("object");
          return res.redirect(
            "/item?message=Data is already exists"
          );
        }
      });
      // let ingredients_value_array = req.body.ingredients_value.split(",");
      await ItemModel.create({ name: req.body.name, price: req.body.price, 
        // ingredients_value: ingredients_value_array 
      });
      return res.redirect(
        "/item?error=Data was successfully add"
      );
    }
    return res.redirect("/item");
  } catch (error) {
    console.log(error);
  }
};

// show data
exports.show = async (req, res, next) => {
  try {
    // console.log("show");
    let data = await ItemModel.find();

    if (req.query.id) {
      let find = await ItemModel.findOne({ _id: req.query.id });
      if (find) {
        data = data.reverse();
        return res.render("index", {
          data,
          error: "",
          message: "",
          name: find.name,
          price: find.price,
          // ingredients_value: find.ingredients_value,
          edit: true,
          id: find._id
        });
      }
    }
    if (req.query.error || req.query.message) {
      data = data.reverse();
      return res.render("index", {
        data,
        error: req.query.error,
        message: req.query.message,
        name: req.query.name,
        price: req.query.price,
        // ingredients_value: req.query.ingredients_value,
        edit: false,
      });
    } else {

      // console.log("ingredients_value ",data[7].ingredients_value);
      // console.log("ingredients_value ",data);
      // data = ingredients_value.map((e, i) => {
      //   let ingredients_value = e.ingredients.map((e) => {
      //     console.log("e ", e);
      //     console.log("ingredients_value ",ingredients_value);
      //   })
      // })

      // for(var i=0;i < data.length;i++){
      //   let ingredients = data[i].ingredients_value;
      //   var ingredients_item = [];
      //   var ingredients_name = ingredients.split(",");
      //   for (let j = 0; j < ingredients_name.length; j++) {
      //     ingredients_item.push(ingredients_name[j]);
      //   }
      //   console.log("ingredients ",ingredients);
      //   console.log("ingredients_item ",ingredients_item);
      //   console.log("ingredients_name ",ingredients_name);
      // }

      // for(var i=0;i < data.length;i++){
      //   let ingredients = data[i].ingredients_value;
      //   console.log("ingredients ",ingredients);
      //   let ingredients_item = ingredients.split(',');
      //   console.log("ingredients_item ",ingredients_item);
      // }

      data = data.reverse();
      return res.render("index", {
        data,
        error: "",
        message: "",
        name: "",
        price: "",
        // ingredients_value: "",
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
    let data = await ItemModel.findByIdAndRemove({ _id: id });
    if (!data) {
      return res.redirect("/item?error=slider not found");

      // return res.status(400).json({
      //   status: "400",
      //   message: "slider not found",
      // });
    }
    return res.redirect(
      "/item?message=Data was successfully delete"
    );
    return res.redirect("/item");
  } catch (error) {
    console.log(error);
  }
};