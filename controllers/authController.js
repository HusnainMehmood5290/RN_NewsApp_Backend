const sendMail = require("../configs/nodeMailer");
const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupController = {
  addUser: async (req, res) => {
    try {
      let { fname, lname, email, pass } = req.body;
      const isUnique = await userModel.findOne({ email });
      if (!isUnique) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pass, salt);
        pass = hash;
        const result = new userModel({
          firstName: fname,
          lastName: lname,
          email: email,
          password: pass,
        });
        await result.save();
        sendMail(email);
        // console.log("new");
        res.send("new");
      } else {
        // console.log("exist");
        res.send("exist");
      }
    } catch (error) {
      console.log(`AddUser ERROR: ${error.message}`);
    }
  },
  findEmail: async (req, res) => {
    try {
      let { email } = req.body;
      const isValid = await userModel.findOne({ email });
      // console.log(email);
      if (isValid) {
        res.send("valid");
      } else {
        res.send("inValid");
      }
    } catch (error) {
      console.log(`findEmail ERROR: ${error.message}`);
    }
  },
  updatePass: async (req, res) => {
    try {
      let { email, pass } = req.body;
      // console.log(email, pass);
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(pass, salt);
      pass = hash;
      const result = await userModel.findOneAndUpdate({
        eamil: email,
        password: pass,
      });
      if (result) {
        // console.log(result);

        res.send("done");
      } else {
        // console.log("fail");
      }
    } catch (error) {
      console.log(`UpdatePass ERROR: ${error}`);
    }
  },
  login: async (req, res) => {
    try {
      const { email, pass } = req.body;
      const result = await userModel.findOne({ email });
      if (result) {
        // console.log(pass);
        // console.log(result.password);
        const isValid = await bcrypt.compare(pass, result.password);
        if (isValid) {
          // console.log("valid");
          jwt.sign(
            { result },
            "mySecret",
            { expiresIn: "1h" },
            (err, token) => {
              if (err) {
                console.log(err.message);
                res.send(err.message);
              } else {
                // console.log(token);
                return res.send({ result: result, token: token });
              }
            }
          );
        } else {
          res.send(false);
        }
      } else {
        res.send(false);
      }
      // console.log(token);
    } catch (error) {
      console.log(`Login Error: ${error.message}`);
    }
  },
};

module.exports = signupController;
