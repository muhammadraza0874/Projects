var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    display_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    email_address: String,
    status: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
