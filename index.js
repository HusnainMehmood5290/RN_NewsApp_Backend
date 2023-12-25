const express = require("express");
require("./configs/mongoose");
// const path = require("path");
// const envPath = path.resolve(__dirname, "./configs/links.env");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.REACT_APP_PORT;
const IP = process.env.REACT_APP_IP;

const app = express();
const route = require("./routes/routes");
app.use(express.json());
app.use("/", route);
app.listen(PORT, IP, () => {
  console.log(`server running at : http://192.168.0.119:3000/`);
});
