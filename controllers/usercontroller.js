const Usermodal = require("../modal/user");
const jwt = require("jsonwebtoken");

exports.newuser = async function (req, res) {
  try {
    if (req.body.password !== req.body.cpassword) {
      return res.status(422).json({
        message: "invalid password",
        success: false,
      });
    }
    let modalnew = await Usermodal.create(req.body);
    return res.status(200).json({
      message: "success",
      success: true,
      data: { user: modalnew },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "something error",
      success: false,
    });
  }
};
exports.createsession = async function (req, res) {
  try {
    console.log("req body for session :", req.body);
    let user = await Usermodal.findOne({
      email: req.body.email,
    });
    console.log("session user :", user);
    if (!user || user.password != req.body.password) {
      return res.status(422).json({
        message: "invalid user",
        success: false,
      });
    }
    console.log("userrrrrrr", req.user);
    return res.status(200).json({
      message: "successfully logged in",
      success: true,
      data: {
        token: jwt.sign(user.toJSON(), "secret", {
          expiresIn: "10000000000000",
        }),
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "there is error",
      success: false,
    });
  }
};
