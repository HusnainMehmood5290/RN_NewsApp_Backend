const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const path = require("path"); // Import the 'path' module

// const envPath = path.resolve(__dirname, "../configs/links.env");
dotenv.config();
mongoose
  .connect(process.env.REACT_APP_URL)
  .then(() => {
    console.log("Mongoose Connection succeeded");
  })
  .catch((error) => {
    console.log("Mongoose Connection failed:", error);
  });

module.exports = mongoose;
