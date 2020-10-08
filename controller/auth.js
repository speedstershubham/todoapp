const User = require("../models/Users");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");



exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists"
      });
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, name, email } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully"
  });
};

//protected routes


//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.params && req.auth && req.params._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};
