const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/dawa")
    .then(() => console.log("DB Connected Successfully✅"))
    .catch((error) => {
      console.log("this error occured" + error);
      process.exit(1);
    });
};

const UserSchema = new mongoose.Schema({
  email: String,
  age: String,
  name: String,
});

const UserModel = mongoose.model("users", UserSchema);
