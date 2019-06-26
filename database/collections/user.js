const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var userSchema = new Schema({
  name : String,
  password : String,
  email : String,
  fechaRegistro : String
});
var user = mongoose.model("user", userSchema);
module.exports = user;
