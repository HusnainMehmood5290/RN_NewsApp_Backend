const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const bearer = req.header("Authorization");
  if (!bearer) {
    return res.status(401).json({ message: "No bearer provided" });
  }
  const token = bearer.split(" ");
  jwt.verify(token[1], "mySecret", (err, decoded) => {
    if (err) {
      //   console.log(token[1]);
      return res.send(false);
    }
    // res.send(decoded);
    next();
  });
};

module.exports = verifyToken;
