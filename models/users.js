const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, lowercase: true },
  password: { type: String, trim: true, required: true },
});

const users = mongoose.model("users", signupSchema);
module.exports = users;
